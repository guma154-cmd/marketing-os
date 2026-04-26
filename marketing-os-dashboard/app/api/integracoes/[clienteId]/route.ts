import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET(req: Request, { params }: { params: { clienteId: string } }) {
  try {
    const stmt = db.prepare('SELECT * FROM integracoes WHERE cliente_id = ?');
    const integracoes = stmt.all(params.clienteId);
    return NextResponse.json(integracoes);
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar integrações' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { clienteId: string } }) {
  try {
    const body = await req.json();
    const { plataforma, tipo_conexao, access_token, token_expira_em, account_id } = body;

    // Check if exists
    const existing = db.prepare('SELECT id FROM integracoes WHERE cliente_id = ? AND plataforma = ?').get(params.clienteId, plataforma) as { id: string } | undefined;

    if (existing) {
      db.prepare(`
        UPDATE integracoes 
        SET tipo_conexao = ?, access_token = ?, token_expira_em = ?, account_id = ?, status = 'ativo', atualizado_em = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(tipo_conexao, access_token, token_expira_em, account_id, existing.id);
      return NextResponse.json({ id: existing.id, success: true });
    } else {
      const id = randomUUID();
      db.prepare(`
        INSERT INTO integracoes (id, cliente_id, plataforma, tipo_conexao, access_token, token_expira_em, account_id, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'ativo')
      `).run(id, params.clienteId, plataforma, tipo_conexao, access_token, token_expira_em, account_id);
      return NextResponse.json({ id, success: true });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao salvar integração' }, { status: 500 });
  }
}
