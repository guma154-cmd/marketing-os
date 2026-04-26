import { ARTIFACTS_CONFIG } from './artifacts';
import { Database } from 'better-sqlite3';

type FormDataValue = string | number | boolean | null | undefined;

export function buildPrompt(
  tipo: string, 
  formData: Record<string, FormDataValue>, 
  clienteNome: string, 
  contextoCliente: { tipo: string; form_data: Record<string, FormDataValue> }[]
) {
  const config = ARTIFACTS_CONFIG[tipo];

  let baseContext = `Você é um Consultor Sênior operando o método Marketing OS.
O Marketing OS visa transformar presenças digitais amadoras de PMEs em canais profissionais de captação (confiança, clareza, conversão).
Estamos na Fase ${config.fase} com o cliente ${clienteNome}.
Gere o artefato final em formato Markdown limpo e profissional, utilizando os dados abaixo e o contexto prévio do cliente se relevante.
Mantenha um tom direto, focado em resultados comerciais, sem "enrolação" e evitando termos complexos de engenharia de software.\n\n`;

  if (tipo === 'diagnostico') {
    baseContext += `\n**IMPORTANTE**: Para o diagnóstico, você DEVE incluir uma seção final chamada "VEREDICTO DE MÍDIA PAGA" onde você dirá ✅ LIBERADO (se não houver risco de mídia) ou 🚫 BLOQUEADO (se houver risco de mídia). Regra: Se a Bio estiver fraca, se não houver prova social, ou o feed estiver abandonado (Risco de Mídia Paga = SIM), DEVE ser BLOQUEADO.\n\n`;
  }

  baseContext += `DADOS PREENCHIDOS:\n`;
  for (const [key, value] of Object.entries(formData)) {
    baseContext += `- **${key.replace('_', ' ').toUpperCase()}**: ${value || 'N/A'}\n`;
  }

  if (contextoCliente && contextoCliente.length > 0) {
    baseContext += `\nCONTEXTO DO CLIENTE (Artefatos anteriores):\n`;
    contextoCliente.forEach((art) => {
      baseContext += `[${art.tipo}]: ${JSON.stringify(art.form_data)}\n`;
    });
  }

  baseContext += `\nCom base nisso, escreva o artefato completo em Markdown, pronto para ser apresentado ao cliente. O título do documento deve ser o nome do artefato.`;

  return baseContext;
}

export async function buildPromptComMetricas(
  tipoArtefato: string,
  formData: Record<string, FormDataValue>,
  clienteNome: string,
  clienteId: string,
  contextoCliente: { tipo: string; form_data: Record<string, FormDataValue> }[],
  db: Database
): Promise<string> {

  // Buscar snapshot mais recente do cliente
  const snapshots = db.prepare(`
    SELECT * FROM metricas_snapshot
    WHERE cliente_id = ?
    ORDER BY criado_em DESC
    LIMIT 2
  `).all(clienteId) as { dados: string }[];

  // Buscar dados manuais do WhatsApp
  const whatsapp = db.prepare(`
    SELECT * FROM whatsapp_manual
    WHERE cliente_id = ?
    ORDER BY semana_referencia DESC
    LIMIT 4
  `).all(clienteId) as { semana_referencia: string; mensagens_recebidas: number; orcamentos_solicitados: number; conversoes: number }[];

  let contextoMetricas = '';

  if (snapshots.length > 0) {
    const atual = JSON.parse(snapshots[0].dados);
    const anterior = snapshots[1] ? JSON.parse(snapshots[1].dados) : null;

    contextoMetricas = `
MÉTRICAS REAIS DO CLIENTE (coletadas automaticamente):

INSTAGRAM / META:
- Seguidores: ${atual.seguidores || 'N/A'}
- Último post: ${atual.ultimo_post_data || 'N/A'}
- Posts nos últimos 30 dias: ${atual.frequencia_posts_30d || 'N/A'}
- Alcance médio por post: ${atual.alcance_medio || 'N/A'}
- Taxa de engajamento: ${atual.taxa_engajamento_media || 'N/A'}%

GOOGLE MEU NEGÓCIO:
- Visualizações no Maps (30d): ${atual.visualizacoes_perfil || 'N/A'}
- Cliques para ligar: ${atual.cliques_ligar || 'N/A'}
- Cliques para rota: ${atual.cliques_rota || 'N/A'}
- Avaliação média: ${atual.avaliacao_media || 'N/A'}
- Total de avaliações: ${atual.total_avaliacoes || 'N/A'}

WHATSAPP (entrada manual):
${whatsapp.map((w) => `- Semana ${w.semana_referencia}: ${w.mensagens_recebidas} mensagens, ${w.orcamentos_solicitados} orçamentos, ${w.conversoes} conversões`).join('\n') || 'Sem dados registrados'}

${anterior ? `
COMPARATIVO COM PERÍODO ANTERIOR:
- Seguidores: ${anterior.seguidores || 'N/A'} → ${atual.seguidores || 'N/A'}
- Engajamento: ${anterior.taxa_engajamento_media || 'N/A'}% → ${atual.taxa_engajamento_media || 'N/A'}%
- Visualizações Maps: ${anterior.visualizacoes_perfil || 'N/A'} → ${atual.visualizacoes_perfil || 'N/A'}
` : ''}

Use esses dados reais para embasar toda a análise. Não invente números.
Se um dado for N/A, indique que não foi coletado ainda.
    `;
  }

  const promptBase = buildPrompt(tipoArtefato, formData, clienteNome, contextoCliente);
  return promptBase + '\n\n' + contextoMetricas;
}
