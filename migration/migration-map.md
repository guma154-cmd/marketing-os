# Mapa de Migração — Marketing OS

## Inventário de Dados de Clientes
| Cliente | Arquivos | Localização Atual | Destino (Fase 3) |
| :--- | :--- | :--- | :--- |
| cliente-01 | briefing, diagnostico, gestao, onboarding, plano-s1, proposta, termos | docs\clients\cliente-01 | casos\cliente-01 |
| cliente-02 (FitLife) | briefing, diagnostico, onboarding | docs\clients\cliente-02 | casos\cliente-02-fitlife |
| cliente-03 (Megahair) | artes, bio-cta, briefing-lite, diagnostico, execucao, onboarding, plano-s1, proposta, resgate, roteiro, sanity, termos | docs\clients\cliente-03-megahair | casos\cliente-03-megahair |
| cliente-04 (Noctua) | briefing, diagnostico, onboarding, plano-s1, proposta, vendas | docs\clients\cliente-04-noctua | casos\cliente-04-noctua |

## Inventário de Artefatos do Método (Templates)
| Artefato | Arquivo Atual | Localização Atual | Destino na Nova Estrutura |
| :--- | :--- | :--- | :--- |
| Briefing Base | briefing-base.md | docs\templates | .gemini\skills\briefing\ |
| Diagnóstico Base | diagnostico-base.md | docs\templates | .gemini\skills\diagnostico\ |
| Onboarding Base | onboarding-base.md | docs\templates | .gemini\skills\onboarding\ |
| Proposta Base | proposta-comercial-base.md | docs\templates | .gemini\skills\proposta\ |
| Plano Semana 1 | plano-semana-1.md (vários) | docs\clients\... | .gemini\skills\plano-semana-1\ |
| Relatório Mensal | relatorio-mensal-base.md | docs\templates | .gemini\skills\gestao-resultados\ |
| Retrospectiva | retrospectiva-cliente-01.md | docs\core | .gemini\skills\retrospectiva\ |
| Hardening | hardening-templates-core.md | docs\core | .gemini\skills\hardening\ |
| Auditoria Fundação | auditoria-fundacao-final.md | docs\core | .gemini\skills\escala\ |

## Inventário de Infra AIOX que DEVE ser removida
| Arquivo/Pasta | Motivo da remoção |
| :--- | :--- |
| .aiox-core/ | Framework de engenharia de software obsoleto para este domínio. |
| .agent/workflows/*.md | Workflows de dev (architect, qa, devops) não aplicáveis. |
| .antigravity/agents/*.md | Personas de engenharia de software. |
| AGENTS.md | Substituído por GEMINI.md focado em marketing. |

## Inventário de Infra que DEVE ser preservada/adaptada
| Arquivo/Pasta | Motivo da preservação |
| :--- | :--- |
| .gemini/ | Base para as novas Agent Skills. |
| docs/core/marketing-os-base.md | Documentação central do método. |
| .env.example | Configurações de ambiente. |
| .gitignore | Proteção de dados. |
