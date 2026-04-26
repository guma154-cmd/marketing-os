import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clienteId = searchParams.get('clienteId');
  const tipo = searchParams.get('tipo');

  try {
    let query = 'SELECT * FROM artefatos WHERE 1=1';
    const params = [];

    if (clienteId) {
      query += ' AND cliente_id = ?';
      params.push(clienteId);
    }
    if (tipo) {
      query += ' AND tipo = ?';
      params.push(tipo);
    }

    const stmt = db.prepare(query);
    const artefatos = stmt.all(...params);
    return NextResponse.json(artefatos);
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar artefatos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Check if exists
    const stmtCheck = db.prepare('SELECT id FROM artefatos WHERE cliente_id = ? AND tipo = ?');
    const existing = stmtCheck.get(body.cliente_id, body.tipo) as { id: string } | undefined;

    if (existing) {
      // Update
      const stmtUpdate = db.prepare('UPDATE artefatos SET form_data = ?, conteudo_gerado = ?, conteudo_editado = ?, status = ?, atualizado_em = CURRENT_TIMESTAMP WHERE id = ?');
      stmtUpdate.run(
        body.form_data || null, 
        body.conteudo_gerado || null, 
        body.conteudo_editado || null, 
        body.status || 'pendente', 
        existing.id
      );
      
      // Regra Megahair / Bloqueio Midia Paga
      if (body.tipo === 'diagnostico' && body.form_data) {
        const formDataObj = JSON.parse(body.form_data);
        if (formDataObj.risco_midia === 'SIM') {
          db.prepare('UPDATE clientes SET bloqueio_midia = 1 WHERE id = ?').run(body.cliente_id);
        } else if (formDataObj.risco_midia === 'NÃO') {
          db.prepare('UPDATE clientes SET bloqueio_midia = 0 WHERE id = ?').run(body.cliente_id);
        }
      }

      return NextResponse.json({ id: existing.id, success: true });
    } else {
      // Insert
      const id = randomUUID();
      const stmtInsert = db.prepare('INSERT INTO artefatos (id, cliente_id, tipo, form_data, conteudo_gerado, conteudo_editado, status, atualizado_em) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)');
      stmtInsert.run(
        id, 
        body.cliente_id, 
        body.tipo, 
        body.form_data || null, 
        body.conteudo_gerado || null, 
        body.conteudo_editado || null, 
        body.status || 'pendente'
      );
      return NextResponse.json({ id, success: true });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao salvar artefato' }, { status: 500 });
  }
}
