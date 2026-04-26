import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clienteId = searchParams.get('clienteId');

  try {
    const stmt = db.prepare('SELECT * FROM whatsapp_manual WHERE cliente_id = ? ORDER BY semana_referencia DESC');
    const dados = stmt.all(clienteId);
    return NextResponse.json(dados);
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar dados do WhatsApp' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cliente_id, semana_referencia, mensagens_recebidas, orcamentos_solicitados, conversoes, obs } = body;

    const id = randomUUID();
    db.prepare(`
      INSERT INTO whatsapp_manual (id, cliente_id, semana_referencia, mensagens_recebidas, orcamentos_solicitados, conversoes, obs)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, cliente_id, semana_referencia, mensagens_recebidas, orcamentos_solicitados, conversoes, obs);

    return NextResponse.json({ id, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao salvar dados do WhatsApp' }, { status: 500 });
  }
}
