import { ARTIFACTS_CONFIG } from './artifacts';

export function buildPrompt(tipo: string, formData: any, clienteNome: string, contextoCliente: any) {
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
    contextoCliente.forEach((art: any) => {
      baseContext += `[${art.tipo}]: ${JSON.stringify(art.form_data)}\n`;
    });
  }
  
  baseContext += `\nCom base nisso, escreva o artefato completo em Markdown, pronto para ser apresentado ao cliente. O título do documento deve ser o nome do artefato.`;

  return baseContext;
}