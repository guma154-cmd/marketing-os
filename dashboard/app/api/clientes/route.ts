import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM clientes ORDER BY atualizado_em DESC, criado_em DESC');
    const clientes = stmt.all();
    return NextResponse.json(clientes);
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar clientes' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = randomUUID();
    const stmt = db.prepare('INSERT INTO clientes (id, nome, segmento, cidade, cor, atualizado_em) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)');
    stmt.run(id, body.nome, body.segmento, body.cidade, body.cor || '#f59e0b');
    return NextResponse.json({ id, ...body });
  } catch {
    return NextResponse.json({ error: 'Erro ao criar cliente' }, { status: 500 });
  }
}
