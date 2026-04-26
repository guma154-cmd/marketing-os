import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const stmt = db.prepare('SELECT * FROM clientes WHERE id = ?');
    const cliente = stmt.get(params.id);
    if (!cliente) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
    return NextResponse.json(cliente);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar cliente' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updates = [];
    const values = [];
    
    for (const [key, value] of Object.entries(body)) {
      updates.push(`${key} = ?`);
      values.push(value);
    }
    
    if (updates.length === 0) return NextResponse.json({ message: 'Nada a atualizar' });

    values.push(params.id);
    const query = `UPDATE clientes SET ${updates.join(', ')}, atualizado_em = CURRENT_TIMESTAMP WHERE id = ?`;
    const stmt = db.prepare(query);
    stmt.run(...values);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar cliente' }, { status: 500 });
  }
}
