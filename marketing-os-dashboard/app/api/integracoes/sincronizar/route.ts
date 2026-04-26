import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { randomUUID } from 'crypto';
import { coletarMetricasMeta, coletarMetricasGMB } from '@/lib/integrations';

export async function POST(req: Request) {
  try {
    const { clienteId, plataforma } = await req.json();

    const integracao = db.prepare('SELECT * FROM integracoes WHERE cliente_id = ? AND plataforma = ?').get(clienteId, plataforma) as { id: string; access_token: string; account_id: string } | undefined;

    if (!integracao) {
      return NextResponse.json({ error: 'Integração não encontrada' }, { status: 404 });
    }

    let dados: unknown = null;
    const hoje = new Date();
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(hoje.getDate() - 30);

    const periodo = {
      inicio: trintaDiasAtras.toISOString().split('T')[0],
      fim: hoje.toISOString().split('T')[0]
    };

    if (plataforma === 'meta') {
      dados = await coletarMetricasMeta(integracao.access_token, integracao.account_id);
    } else if (plataforma === 'google_gmb') {
      dados = await coletarMetricasGMB(integracao.access_token, integracao.account_id, periodo);
    }

    if (dados) {
      const snapshotId = randomUUID();
      db.prepare(`
        INSERT INTO metricas_snapshot (id, cliente_id, integracao_id, plataforma, periodo_inicio, periodo_fim, dados, marco)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'baseline')
      `).run(snapshotId, clienteId, integracao.id, plataforma, periodo.inicio, periodo.fim, JSON.stringify(dados));

      db.prepare('UPDATE integracoes SET ultima_sincronizacao = CURRENT_TIMESTAMP, status = "ativo" WHERE id = ?').run(integracao.id);

      return NextResponse.json({ sucesso: true, snapshot: dados });
    }

    return NextResponse.json({ error: 'Erro ao coletar dados' }, { status: 500 });

  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
