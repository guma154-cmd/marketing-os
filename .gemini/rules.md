# Gemini Rules - Marketing OS

Este arquivo define as instruções do projeto para o Gemini CLI neste repositório.

## Regras Core

1. **Domínio de Marketing:** Siga as diretrizes do método Marketing OS descritas em `GEMINI.md`.
2. **Prioridade de Domínio:** Priorize `Confiança -> Clareza -> Conversão`.
3. **Vocabulário:** Use terminologia de marketing (leads, conversão, autoridade). **NUNCA** use terminologia de engenharia de software (stories, sprints, backlog, etc.).
4. **Respeito aos Dados:** NUNCA altere ou delete dados de clientes em `casos/` sem instrução explícita.

## Quality Gates de Marketing

- Valide a **Regra Megahair** antes de sugerir ou configurar tráfego pago.
- Garanta que toda entrega de Bio responda: *O que faz? Para quem? Por que eu?*
- Verifique se o Link de contato está funcional e leva a uma mensagem de entrada clara.
- Certifique-se de que há prova social visível antes de avançar para a Fase 5 (Escala).

## Agent Skills

O projeto utiliza a arquitetura de **Agent Skills**.
- As habilidades estão localizadas em `.gemini/skills/`.
- Cada skill possui um `SKILL.md` com instruções de ativação e execução.
- Utilize as skills conforme a necessidade da fase atual do cliente.

## Estrutura do Projeto

- `casos/`: Histórico e trilhas de clientes.
- `templates/`: Modelos base para artefatos.
- `criterios/`: Regras de passagem de fase e bloqueio.
- `.gemini/skills/`: Habilidades especializadas do agente.

## Comandos Recomendados

- Use as skills ativando-as por nome ou contexto.
- Consulte `GEMINI.md` para entender as fases e artefatos.
- Consulte `criterios/` antes de cada entrega importante.
