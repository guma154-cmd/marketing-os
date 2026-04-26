import Groq from 'groq-sdk';
import { buildPromptComMetricas } from '@/lib/prompts';
import { db } from '@/lib/db';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { tipoArtefato, formData, clienteNome, clienteId } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return new Response('GROQ_API_KEY não configurada', { status: 500 });
    }

    // Busca contexto de artefatos anteriores
    const stmt = db.prepare("SELECT tipo, form_data FROM artefatos WHERE cliente_id = ? AND status = 'aprovado'");
    const contextoBruto = stmt.all(clienteId) as { tipo: string; form_data: string }[];
    const contextoCliente = contextoBruto.map(a => ({ tipo: a.tipo, form_data: JSON.parse(a.form_data || '{}') }));

    const prompt = await buildPromptComMetricas(tipoArtefato, formData, clienteNome, clienteId, contextoCliente, db);

    // Salva historico
    try {
      db.prepare('INSERT INTO historico_geracoes (id, prompt_usado) VALUES (?, ?)').run(randomUUID(), prompt);
    } catch {
      // Ignora erro de log
    } 

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 2048,
      stream: true,
      messages: [{ role: 'user', content: prompt }]
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || '';
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      }
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });

  } catch (error: unknown) {
    console.error('Erro na API de geração (Groq):', error);
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
