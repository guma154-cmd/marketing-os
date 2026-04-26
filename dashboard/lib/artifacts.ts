import { ConfigArtefato } from './types';

export const ARTIFACTS_CONFIG: Record<string, ConfigArtefato> = {
  'onboarding': {
    tipo: 'onboarding',
    titulo: 'Onboarding',
    descricao: 'Coleta de acessos e alinhamento de expectativas.',
    fase: 1,
    help: {
      descricao: "Documento inicial que alinha expectativas e coleta acessos do cliente.",
      exemplosDeUso: [
        "Primeira reunião com cliente novo que nunca fez marketing digital",
        "Cliente que já tentou agência antes e ficou insatisfeito",
        "Negócio local querendo crescer no Instagram"
      ],
      oQueAIGera: [
        "Resumo executivo do negócio",
        "Objetivos mapeados com prazo",
        "Histórico de marketing anterior analisado",
        "Próximos passos dos primeiros 7 dias"
      ]
    },
    campos: [
      {
        nome: 'nome_empresa',
        label: 'Nome da Empresa',
        tipo: 'text',
        obrigatorio: true,
        placeholder: 'Ex: Noctua Segurança Eletrônica'
      },
      {
        nome: 'segmento',
        label: 'Segmento de Negócio',
        tipo: 'text',
        obrigatorio: true,
        placeholder: 'Ex: Segurança eletrônica para condomínios residenciais'
      },
      {
        nome: 'cidade',
        label: 'Cidade / Região de Atuação',
        tipo: 'text',
        placeholder: 'Ex: São Paulo, Zona Sul'
      },
      {
        nome: 'responsavel',
        label: 'Responsável pelo Contato',
        tipo: 'text',
        placeholder: 'Ex: João Silva — Sócio'
      },
      {
        nome: 'objetivo_principal',
        label: 'Objetivo Principal',
        tipo: 'textarea',
        obrigatorio: true,
        placeholder: 'Ex: Aparecer mais no Instagram e atrair 5 novos condomínios por mês',
        ajuda: 'Pergunte ao cliente: O que você quer alcançar com o marketing nos próximos 90 dias?'
      },
      {
        nome: 'maior_desafio',
        label: 'Maior Desafio Atual',
        tipo: 'textarea',
        placeholder: 'Ex: Não tenho tempo para postar e não sei o que funciona para o meu público',
        ajuda: 'Pergunte ao cliente: Qual é o maior obstáculo de marketing que você enfrenta hoje?'
      },
      {
        nome: 'orcamento',
        label: 'Orçamento Mensal Disponível',
        tipo: 'text',
        placeholder: 'Ex: R$ 2.000,00/mês',
        ajuda: 'Pergunte ao cliente: Qual é o investimento mensal disponível para marketing?'
      },
      {
        nome: 'historico_marketing',
        label: 'Histórico de Marketing Anterior',
        tipo: 'textarea',
        placeholder: 'Ex: Teve agência por 6 meses, não via resultado, não entendia os relatórios',
        ajuda: 'Pergunte ao cliente: Já tentou alguma ação de marketing antes? O que funcionou e o que não funcionou?'
      },
      {
        nome: 'check_meta_admin',
        label: 'Cliente adicionou consultor como Admin no Meta Business Suite',
        tipo: 'checkbox',
        secao: 'consultor'
      },
      {
        nome: 'check_instagram_profissional',
        label: 'Instagram convertido para conta Profissional (Business ou Creator)',
        tipo: 'checkbox',
        secao: 'consultor'
      },
      {
        nome: 'check_gmb_gerente',
        label: 'Cliente adicionou consultor como Gerente no Google Meu Negócio',
        tipo: 'checkbox',
        secao: 'consultor'
      },
      {
        nome: 'check_gmb_verificado',
        label: 'Google Meu Negócio verificado (pin recebido)',
        tipo: 'checkbox',
        secao: 'consultor'
      },
      {
        nome: 'check_whatsapp_business',
        label: 'WhatsApp Business App configurado',
        tipo: 'checkbox',
        secao: 'consultor'
      },
      {
        nome: 'canal_comunicacao',
        label: 'Canal de Comunicação',
        tipo: 'text',
        placeholder: 'Ex: WhatsApp para urgências, Trello para tarefas, reunião quinzenal às terças 10h',
        secao: 'consultor'
      },
      {
        nome: 'frequencia_report',
        label: 'Frequência de Report',
        tipo: 'select',
        opcoes: ['Semanal', 'Quinzenal', 'Mensal'],
        secao: 'consultor'
      },
      {
        nome: 'acessos_garantidos',
        label: 'Acessos Recebidos',
        tipo: 'textarea',
        placeholder: 'Ex: Meta Business Suite ✅, Instagram ✅, Google Meu Negócio ⏳',
        ajuda: 'Registre quais acessos já foram concedidos e quais ainda estão pendentes.',
        secao: 'consultor'
      }
    ]
  },
  'briefing': {
    tipo: 'briefing',
    titulo: 'Briefing',
    descricao: 'Entendimento profundo do negócio e posicionamento.',
    fase: 1,
    help: {
      descricao: "Entendimento profundo do negócio, diferenciais e público-alvo.",
      exemplosDeUso: [
        "Definição estratégica do tom de voz da marca",
        "Mapeamento de concorrentes diretos e indiretos",
        "Criação de personas para campanhas de conteúdo"
      ],
      oQueAIGera: [
        "Análise SWOT resumida",
        "Sugestão de tom de voz e arquétipo",
        "Lista de dores que o produto/serviço resolve",
        "Sinais de oportunidade no nicho"
      ]
    },
    campos: [
      {
        nome: 'resumo_negocio',
        label: 'O que a empresa faz (resumo)',
        tipo: 'textarea',
        obrigatorio: true,
        placeholder: 'Empresa de segurança eletrônica premium para condomínios residenciais em SP, diferenciada pelo monitoramento 24h com resposta em menos de 5 minutos'
      },
      {
        nome: 'diferenciais',
        label: 'Principais diferenciais',
        tipo: 'textarea',
        placeholder: 'Tempo de resposta de 5min, técnicos próprios (sem terceirização), contrato sem fidelidade, app de monitoramento próprio',
        ajuda: 'O que o cliente faz que o concorrente vizinho não faz? (Ex: Atendimento em 15min, garantia estendida, material importado).'
      },
      {
        nome: 'cliente_ideal',
        label: 'Cliente Ideal',
        tipo: 'textarea',
        placeholder: 'Síndicos e administradoras de condomínios de médio e alto padrão, 35-55 anos, que já tiveram problemas com segurança ou querem prevenir'
      },
      {
        nome: 'problema_resolvido',
        label: 'Problema que resolve',
        tipo: 'textarea',
        placeholder: 'Insegurança em áreas comuns, demora no atendimento técnico, falta de controle sobre quem entra e sai'
      },
      {
        nome: 'servico_principal',
        label: 'Serviço Principal',
        tipo: 'text',
        placeholder: 'Monitoramento Remoto e Portaria Virtual'
      },
      {
        nome: 'objetivo_30d',
        label: 'Objetivo Principal (30 dias)',
        tipo: 'textarea',
        placeholder: 'Aumentar o número de orçamentos qualificados vindos do Google em 20%'
      },
      {
        nome: 'concorrentes',
        label: 'Principais Concorrentes',
        tipo: 'text',
        placeholder: 'Ex: Prosegur, G4S, empresas locais sem app próprio'
      },
      {
        nome: 'tom_comunicacao',
        label: 'Tom de Comunicação',
        tipo: 'select',
        opcoes: [
          'Profissional e técnico',
          'Descontraído e próximo',
          'Premium e aspiracional',
          'Autoritário e direto',
          'Emocional e humano'
        ],
        ajuda: 'Como a marca deve "soar"? Profissional (Segurança/Saúde), Próximo (Varejo/Comida), Premium (Luxo), Autoritário (Liderança/Educação).'
      },
      {
        nome: 'redes_ativas',
        label: 'Redes Sociais Onde Já Está Presente',
        tipo: 'text',
        placeholder: 'Ex: Instagram (3.200 seguidores), Google Meu Negócio, WhatsApp Business'
      }
    ]
  },
  'briefing-lite': {
    tipo: 'briefing-lite',
    titulo: 'Briefing Lite',
    descricao: 'Versão simplificada para clientes locais.',
    fase: 1,
    help: {
      descricao: "Versão rápida do briefing para negócios de extrema simplicidade.",
      exemplosDeUso: [
        "Pequenos comércios locais (ex: padaria, salão)",
        "Profissionais liberais em início de carreira",
        "Clientes que precisam de execução imediata"
      ],
      oQueAIGera: [
        "Resumo prático de atuação",
        "Pilar principal de vendas",
        "Instruções rápidas de postagem"
      ]
    },
    campos: [
      {
        nome: 'resumo_negocio',
        label: 'O que a empresa faz',
        tipo: 'textarea',
        obrigatorio: true,
        placeholder: 'Barbearia clássica focada em atendimento sem hora marcada para o público masculino do bairro'
      },
      {
        nome: 'servico_principal',
        label: 'Serviço Principal',
        tipo: 'text',
        placeholder: 'Corte de cabelo e barba'
      }
    ]
  },
  'diagnostico': {
    tipo: 'diagnostico',
    titulo: 'Diagnóstico',
    descricao: 'Análise técnica da presença digital e gargalos.',
    fase: 1,
    help: {
      descricao: "Análise técnica e visual da presença digital atual do cliente.",
      exemplosDeUso: [
        "Cliente com Instagram ativo mas sem resultado",
        "Negócio querendo começar anúncios pagos",
        "Perfil com muitos seguidores mas sem conversão"
      ],
      oQueAIGera: [
        "3 maiores erros que afastam clientes qualificados",
        "Score técnico e visual com justificativa",
        "Veredicto de mídia paga (LIBERADO ou BLOQUEADO)",
        "Plano de saneamento com prazo e responsáveis"
      ]
    },
    campos: [
      {
        nome: 'cenario_atual',
        label: 'Resumo do Cenário Atual',
        tipo: 'textarea',
        placeholder: 'O cliente posta esporadicamente, não tem link de contato funcional e a bio não explica o serviço principal.'
      },
      {
        nome: 'dores_visiveis',
        label: 'Dores Visíveis',
        tipo: 'textarea',
        placeholder: 'Link da bio quebrado, Google Meu Negócio sem fotos, site sem SSL, WhatsApp Business não configurado'
      },
      {
        nome: 'dores_ocultas',
        label: 'Dores Ocultas (Gargalos)',
        tipo: 'textarea',
        placeholder: 'Foto de perfil com baixa resolução, feed sem identidade visual, stories com fontes inconsistentes, sem destaque de produtos/serviços'
      },
      {
        nome: 'risco_midia',
        label: 'Risco de Mídia Paga (Bloqueio?)',
        tipo: 'select',
        opcoes: ['NÃO', 'SIM'],
        ajuda: 'Selecione SIM se o perfil for amador: bio confusa, sem link de WhatsApp, sem depoimentos ou se o último post tiver mais de 15 dias.'
      }
    ]
  },
  'proposta': {
    tipo: 'proposta',
    titulo: 'Proposta Comercial',
    descricao: 'Formatação da oferta e pacote de serviços.',
    fase: 2,
    help: {
      descricao: "Documento de venda que transforma o diagnóstico em uma oferta comercial.",
      exemplosDeUso: [
        "Apresentação final de fechamento de contrato",
        "Renegociação de escopo com cliente atual",
        "Up-sell de serviços de tráfego pago"
      ],
      oQueAIGera: [
        "Tabela de serviços incluídos",
        "Cronograma de entregáveis por semana",
        "Investimento e condições de pagamento",
        "Termos de rescisão e escopo negativo"
      ]
    },
    campos: [
      {
        nome: 'produto_recomendado',
        label: 'Pacote / Produto Recomendado',
        tipo: 'select',
        obrigatorio: true,
        opcoes: ['Presença Essencial', 'Presença + Captação', 'Growth Local'],
        ajuda: 'Presença Essencial = base comprometida (bloqueio ativo). Presença + Captação = base razoável sem conversão. Growth Local = base sólida, foco em escala.'
      },
      {
        nome: 'produto_recomendado_nome',
        label: 'Nome Personalizado do Pacote/Produto',
        tipo: 'text',
        placeholder: 'Marketing OS - Presença + Captação'
      },
      {
        nome: 'escopo_inicial',
        label: 'Escopo Inicial (30 dias)',
        tipo: 'textarea',
        placeholder: 'Gestão completa do Instagram (4 posts/semana), criação de 2 reels/mês, relatório quinzenal de métricas, otimização do Google Meu Negócio, bio e destaques'
      },
      {
        nome: 'investimento_fee',
        label: 'Investimento Mensal (Fee)',
        tipo: 'text',
        placeholder: 'R$ 2.500,00/mês'
      },
      {
        nome: 'investimento_midia',
        label: 'Verba de Mídia Sugerida',
        tipo: 'text',
        placeholder: 'Mínimo de R$ 1.000,00/mês direto nas plataformas'
      }
    ]
  },
  'termos-aceite': {
    tipo: 'termos-aceite',
    titulo: 'Termos de Aceite',
    descricao: 'Contrato simplificado de expectativas e responsabilidades.',
    fase: 2,
    help: {
      descricao: "Formalização das regras do jogo para o início da operação.",
      exemplosDeUso: [
        "Início imediato após pagamento de setup",
        "Alinhamento de prazos de aprovação do cliente",
        "Definição de canais oficiais de comunicação"
      ],
      oQueAIGera: [
        "Cláusulas de responsabilidade mútua",
        "Política de atrasos e reuniões",
        "Definição de propriedade de ativos criados"
      ]
    },
    campos: [
      {
        nome: 'data_inicio',
        label: 'Data de Início',
        tipo: 'text',
        placeholder: '01/05/2026'
      },
      {
        nome: 'responsabilidades_cliente',
        label: 'Responsabilidades do Cliente',
        tipo: 'textarea',
        placeholder: 'Aprovar posts em até 24h, enviar fotos de novos produtos toda segunda, manter saldo no cartão do Meta Ads'
      },
      {
        nome: 'prazo_contrato',
        label: 'Prazo do Contrato',
        tipo: 'select',
        opcoes: ['1 mês', '3 meses', '6 meses', '12 meses']
      },
      {
        nome: 'forma_pagamento',
        label: 'Forma de Pagamento',
        tipo: 'text',
        placeholder: 'Ex: PIX até o dia 5 de cada mês'
      },
      {
        nome: 'condicao_cancelamento',
        label: 'Condição de Cancelamento',
        tipo: 'textarea',
        placeholder: 'Ex: Aviso com 15 dias de antecedência, sem multa após 3 meses de contrato'
      }
    ]
  },
  'plano-semana-1': {
    tipo: 'plano-semana-1',
    titulo: 'Plano Semana 1',
    descricao: 'Ações prioritárias para as primeiras vitórias.',
    fase: 3,
    help: {
      descricao: "Plano de ação imediato para gerar resultados rápidos (Quick Wins).",
      exemplosDeUso: [
        "Primeira semana após fechamento de contrato",
        "Retomada de projeto após período de inatividade",
        "Saneamento de emergência de perfil bloqueado"
      ],
      oQueAIGera: [
        "Lista de tarefas diárias detalhadas",
        "Responsáveis por cada ação",
        "Lista de materiais necessários (fotos/textos)",
        "Checklist de validação de configuração"
      ]
    },
    campos: [
      {
        nome: 'acoes_prioritarias',
        label: 'Ações Prioritárias',
        tipo: 'textarea',
        placeholder: 'Seg: corrigir link da bio + configurar WhatsApp Business. Ter: criar 3 destaques (Quem Somos, Serviços, Contato). Qua-Sex: publicar posts 1, 2 e 3 do calendário'
      },
      {
        nome: 'blockers',
        label: 'Possíveis Blockers',
        tipo: 'textarea',
        placeholder: 'Cliente pode demorar para enviar acesso ao Meta Business Suite — solicitar até segunda-feira no máximo'
      }
    ]
  },
  'gestao-resultados': {
    tipo: 'gestao-resultados',
    titulo: 'Gestão de Resultados',
    descricao: 'Acompanhamento do ciclo de crescimento.',
    fase: 3,
    help: {
      descricao: "Monitoramento mensal ou quinzenal de métricas de negócio.",
      exemplosDeUso: [
        "Reunião de fechamento de mês",
        "Ajuste de rota estratégica no meio do ciclo",
        "Comprovação de ROI para o cliente"
      ],
      oQueAIGera: [
        "Comparativo com mês anterior",
        "Análise de custo por lead (CPL)",
        "Sugestão de melhoria para o próximo ciclo"
      ]
    },
    campos: [
      {
        nome: 'metricas_chave',
        label: 'Métricas Chave (Leads, Cliques, etc)',
        tipo: 'textarea',
        placeholder: 'Número de leads via WhatsApp, novos seguidores qualificados, alcance de perfis não seguidores'
      },
      {
        nome: 'resultados_periodo',
        label: 'Resultados do Período',
        tipo: 'textarea',
        placeholder: '45 leads novos (aumento de 30%), 3 contratos fechados via Instagram, custo por lead de R$ 12,00'
      }
    ]
  },
  'retrospectiva': {
    tipo: 'retrospectiva',
    titulo: 'Retrospectiva',
    descricao: 'Análise do ciclo passado.',
    fase: 4,
    help: {
      descricao: "Análise profunda do que funcionou e o que precisa ser descartado.",
      exemplosDeUso: [
        "Fim de contrato de 3 meses",
        "Encerramento de campanha de lançamento",
        "Revisão trimestral estratégica"
      ],
      oQueAIGera: [
        "Lista de aprendizados validados",
        "Novas diretrizes para criativos",
        "Plano de evolução de oferta"
      ]
    },
    campos: [
      {
        nome: 'funcionou',
        label: 'O que funcionou',
        tipo: 'textarea',
        placeholder: 'Stories com depoimentos em vídeo converteram 3x mais que imagens estáticas'
      },
      {
        nome: 'nao_funcionou',
        label: 'O que não funcionou',
        tipo: 'textarea',
        placeholder: 'Postagens técnicas demais no feed tiveram baixo engajamento e pouca tração'
      },
      {
        nome: 'aprendizados',
        label: 'Aprendizados',
        tipo: 'textarea',
        placeholder: 'O público prefere ver o "bastidor" e a equipe do que apenas o produto final'
      }
    ]
  },
  'hardening': {
    tipo: 'hardening',
    titulo: 'Hardening',
    descricao: 'Melhorias de processo e novos templates.',
    fase: 4,
    help: {
      descricao: "Blindagem do processo de marketing para escalar com segurança.",
      exemplosDeUso: [
        "Padronização de respostas de WhatsApp",
        "Criação de manual de marca para novos designers",
        "Automação de relatórios de métricas"
      ],
      oQueAIGera: [
        "Novos Procedimentos Operacionais Padrão (SOPs)",
        "Templates de design validados",
        "Scripts de vendas atualizados"
      ]
    },
    campos: [
      {
        nome: 'melhorias_processo',
        label: 'Melhorias no Processo',
        tipo: 'textarea',
        placeholder: 'Implementar o CRM Pipedrive para não perder leads no WhatsApp, criar template de design fixo para carrosséis'
      }
    ]
  },
  'auditoria-fundacao': {
    tipo: 'auditoria-fundacao',
    titulo: 'Auditoria de Fundação',
    descricao: 'Revisão geral da base do cliente.',
    fase: 4,
    help: {
      descricao: "Checklist final para garantir que nada foi esquecido antes da escala.",
      exemplosDeUso: [
        "Antes de iniciar tráfego pago pesado",
        "Auditoria de conformidade com o método Marketing OS",
        "Revisão de segurança de contas"
      ],
      oQueAIGera: [
        "Checklist de pendências críticas",
        "Validação de integração de dados",
        "Selo de prontidão para escala"
      ]
    },
    campos: [
      {
        nome: 'status_auditoria',
        label: 'Status da Auditoria',
        tipo: 'select',
        opcoes: ['Aprovada', 'Reprovada']
      },
      {
        nome: 'pontos_atencao',
        label: 'Pontos de Atenção',
        tipo: 'textarea',
        placeholder: 'Pixel do Facebook ainda não está capturando eventos de "Compra", Google Tag Manager precisa de revisão'
      }
    ]
  },
  'briefing-trafego': {
    tipo: 'briefing-trafego',
    titulo: 'Briefing de Tráfego',
    descricao: 'Planejamento para escala de anúncios.',
    fase: 5,
    help: {
      descricao: "Estratégia de distribuição paga para atrair novos leads.",
      exemplosDeUso: [
        "Início de campanhas de Facebook/Google Ads",
        "Aumento de orçamento de mídia",
        "Teste de novos públicos"
      ],
      oQueAIGera: [
        "Estrutura de campanhas e conjuntos",
        "Sugestão de públicos (Lookalike, Interesses)",
        "Estimativa de resultados (KPIs esperados)"
      ]
    },
    campos: [
      {
        nome: 'objetivo_campanha',
        label: 'Objetivo da Campanha',
        tipo: 'text',
        placeholder: 'Conversão para WhatsApp (Vendas Diretas)'
      },
      {
        nome: 'orcamento',
        label: 'Orçamento',
        tipo: 'text',
        placeholder: 'R$ 50,00 por dia (Total R$ 1.500,00/mês)'
      },
      {
        nome: 'canal',
        label: 'Canal',
        tipo: 'select',
        opcoes: ['Meta', 'Google', 'Ambos']
      },
      {
        nome: 'publico',
        label: 'Público Alvo',
        tipo: 'textarea',
        placeholder: 'Raio de 5km da loja, mulheres 25-45 anos, interessadas em estética e bem-estar'
      }
    ]
  },
  'briefing-criativos': {
    tipo: 'briefing-criativos',
    titulo: 'Briefing de Criativos',
    descricao: 'Planejamento das artes e vídeos para anúncios.',
    fase: 5,
    help: {
      descricao: "Direção de arte e copy para os anúncios pagos.",
      exemplosDeUso: [
        "Produção de fotos e vídeos para tráfego",
        "Renovação de criativos que saturaram",
        "Testes A/B de headlines e imagens"
      ],
      oQueAIGera: [
        "Roteiros para vídeos curtos",
        "Instruções de design para artes estáticas",
        "Copywriting para legendas e títulos"
      ]
    },
    campos: [
      {
        nome: 'formato',
        label: 'Formatos',
        tipo: 'text',
        placeholder: '1 Vídeo Reels + 2 Imagens Estáticas para Feed'
      },
      {
        nome: 'mensagem_principal',
        label: 'Mensagem Principal',
        tipo: 'textarea',
        placeholder: 'Mostre a transformação do serviço em 15 segundos com um gancho de curiosidade no início'
      },
      {
        nome: 'cta',
        label: 'Call to Action',
        tipo: 'text',
        placeholder: 'Clique no botão e agende sua avaliação gratuita'
      }
    ]
  }
};
