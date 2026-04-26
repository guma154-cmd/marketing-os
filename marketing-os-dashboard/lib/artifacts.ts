import { ConfigArtefato } from './types';

export const ARTIFACTS_CONFIG: Record<string, ConfigArtefato> = {
  'onboarding': {
    tipo: 'onboarding',
    titulo: 'Onboarding',
    descricao: 'Coleta de acessos e alinhamento de expectativas.',
    fase: 1,
    campos: [
      { nome: 'acessos_garantidos', label: 'Acessos Garantidos', tipo: 'textarea', placeholder: 'Meta Business Suite, Instagram, Google Meu Negócio, etc.' },
      { nome: 'canal_comunicacao', label: 'Canal de Comunicação', tipo: 'text', placeholder: 'WhatsApp / Slack / Trello' },
      { nome: 'frequencia_report', label: 'Frequência de Report', tipo: 'select', opcoes: ['Semanal', 'Quinzenal', 'Mensal'] },
      { nome: 'entregaveis', label: 'O que entregamos nesta fase', tipo: 'textarea' },
      { nome: 'nao_entregaveis', label: 'O que NÃO entregamos', tipo: 'textarea' }
    ]
  },
  'briefing': {
    tipo: 'briefing',
    titulo: 'Briefing',
    descricao: 'Entendimento profundo do negócio e posicionamento.',
    fase: 1,
    campos: [
      { nome: 'resumo_negocio', label: 'O que a empresa faz (resumo)', tipo: 'textarea', obrigatorio: true },
      { nome: 'diferenciais', label: 'Principais diferenciais', tipo: 'textarea' },
      { nome: 'cliente_ideal', label: 'Cliente Ideal', tipo: 'textarea' },
      { nome: 'problema_resolvido', label: 'Problema que resolve', tipo: 'textarea' },
      { nome: 'servico_principal', label: 'Serviço Principal', tipo: 'text' },
      { nome: 'objetivo_30d', label: 'Objetivo Principal (30 dias)', tipo: 'textarea' }
    ]
  },
  'briefing-lite': {
    tipo: 'briefing-lite',
    titulo: 'Briefing Lite',
    descricao: 'Versão simplificada para clientes locais.',
    fase: 1,
    campos: [
      { nome: 'resumo_negocio', label: 'O que a empresa faz', tipo: 'textarea', obrigatorio: true },
      { nome: 'servico_principal', label: 'Serviço Principal', tipo: 'text' }
    ]
  },
  'diagnostico': {
    tipo: 'diagnostico',
    titulo: 'Diagnóstico',
    descricao: 'Análise técnica da presença digital e gargalos.',
    fase: 1,
    campos: [
      { nome: 'cenario_atual', label: 'Resumo do Cenário Atual', tipo: 'textarea' },
      { nome: 'dores_visiveis', label: 'Dores Visíveis', tipo: 'textarea' },
      { nome: 'dores_ocultas', label: 'Dores Ocultas (Gargalos)', tipo: 'textarea' },
      { nome: 'risco_midia', label: 'Risco de Mídia Paga (Bloqueio?)', tipo: 'select', opcoes: ['NÃO', 'SIM'] },
      { nome: 'produto_recomendado', label: 'Produto Recomendado', tipo: 'select', opcoes: ['Presença Essencial', 'Presença + Captação', 'Growth Local'] }
    ]
  },
  'proposta': {
    tipo: 'proposta',
    titulo: 'Proposta Comercial',
    descricao: 'Formatação da oferta e pacote de serviços.',
    fase: 2,
    campos: [
      { nome: 'dores_identificadas', label: 'Dores Identificadas', tipo: 'textarea' },
      { nome: 'produto_recomendado', label: 'Nome do Pacote/Produto', tipo: 'text' },
      { nome: 'escopo_inicial', label: 'Escopo Inicial (30 dias)', tipo: 'textarea' },
      { nome: 'investimento_fee', label: 'Investimento Mensal (Fee)', tipo: 'text' },
      { nome: 'investimento_midia', label: 'Verba de Mídia Sugerida', tipo: 'text' }
    ]
  },
  'termos-aceite': {
    tipo: 'termos-aceite',
    titulo: 'Termos de Aceite',
    descricao: 'Contrato simplificado de expectativas e responsabilidades.',
    fase: 2,
    campos: [
      { nome: 'data_inicio', label: 'Data de Início', tipo: 'text' },
      { nome: 'responsabilidades_cliente', label: 'Responsabilidades do Cliente', tipo: 'textarea' }
    ]
  },
  'plano-semana-1': {
    tipo: 'plano-semana-1',
    titulo: 'Plano Semana 1',
    descricao: 'Ações prioritárias para as primeiras vitórias.',
    fase: 3,
    campos: [
      { nome: 'acoes_prioritarias', label: 'Ações Prioritárias', tipo: 'textarea' },
      { nome: 'blockers', label: 'Possíveis Blockers', tipo: 'textarea' }
    ]
  },
  'gestao-resultados': {
    tipo: 'gestao-resultados',
    titulo: 'Gestão de Resultados',
    descricao: 'Acompanhamento do ciclo de crescimento.',
    fase: 3,
    campos: [
      { nome: 'metricas_chave', label: 'Métricas Chave (Leads, Cliques, etc)', tipo: 'textarea' },
      { nome: 'resultados_periodo', label: 'Resultados do Período', tipo: 'textarea' }
    ]
  },
  'retrospectiva': {
    tipo: 'retrospectiva',
    titulo: 'Retrospectiva',
    descricao: 'Análise do ciclo passado.',
    fase: 4,
    campos: [
      { nome: 'funcionou', label: 'O que funcionou', tipo: 'textarea' },
      { nome: 'nao_funcionou', label: 'O que não funcionou', tipo: 'textarea' },
      { nome: 'aprendizados', label: 'Aprendizados', tipo: 'textarea' }
    ]
  },
  'hardening': {
    tipo: 'hardening',
    titulo: 'Hardening',
    descricao: 'Melhorias de processo e novos templates.',
    fase: 4,
    campos: [
      { nome: 'melhorias_processo', label: 'Melhorias no Processo', tipo: 'textarea' }
    ]
  },
  'auditoria-fundacao': {
    tipo: 'auditoria-fundacao',
    titulo: 'Auditoria de Fundação',
    descricao: 'Revisão geral da base do cliente.',
    fase: 4,
    campos: [
      { nome: 'status_auditoria', label: 'Status da Auditoria', tipo: 'select', opcoes: ['Aprovada', 'Reprovada'] },
      { nome: 'pontos_atencao', label: 'Pontos de Atenção', tipo: 'textarea' }
    ]
  },
  'briefing-trafego': {
    tipo: 'briefing-trafego',
    titulo: 'Briefing de Tráfego',
    descricao: 'Planejamento para escala de anúncios.',
    fase: 5,
    campos: [
      { nome: 'objetivo_campanha', label: 'Objetivo da Campanha', tipo: 'text' },
      { nome: 'orcamento', label: 'Orçamento', tipo: 'text' },
      { nome: 'canal', label: 'Canal', tipo: 'select', opcoes: ['Meta', 'Google', 'Ambos'] },
      { nome: 'publico', label: 'Público Alvo', tipo: 'textarea' }
    ]
  },
  'briefing-criativos': {
    tipo: 'briefing-criativos',
    titulo: 'Briefing de Criativos',
    descricao: 'Planejamento das artes e vídeos para anúncios.',
    fase: 5,
    campos: [
      { nome: 'formato', label: 'Formatos', tipo: 'text' },
      { nome: 'mensagem_principal', label: 'Mensagem Principal', tipo: 'textarea' },
      { nome: 'cta', label: 'Call to Action', tipo: 'text' }
    ]
  }
};