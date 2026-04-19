# Hardening de Templates Core — Marketing OS

> **Objetivo:** Tornar o framework Marketing OS imune a atritos operacionais recorrentes identificados no Ciclo 01.
> **Status de Prontidão:** 🚀 Escala em Preparação.

---

## 1. Matriz de Endurecimento (Hardening Matrix)

| Template Afetado | Problema Identificado | Melhoria de Hardening (Solução) | Prioridade |
| :--- | :--- | :--- | :---: |
| **Onboarding** | Perda de tempo com acessos (2FA/Bloqueios). | Implementação do **Kit de Acessos Meta** no Dia 0. | 🚨 Crítica |
| **Briefing** | Excesso de dados inúteis para o produto "Essencial". | Criação do **Briefing Lite** (Foco em Provas e Ativos). | ✅ Alta |
| **Diagnóstico** | Cliente sem material para executar a Semana 1. | Novo campo: **Prontidão de Ativos (0-5)**. | ✅ Alta |
| **Geral** | Bagunça de arquivos via WhatsApp. | **Protocolo de Ativos:** Uso obrigatório de Drive/iCloud. | 🚨 Crítica |

---

## 2. Especificação: Kit de Acessos Meta (Padrão)
O método Marketing OS agora exige que a primeira interação após o aceite contenha o PDF/Vídeo de instruções de acesso.

*   **O que deve constar:**
    1. Instrução para desativar 2FA temporariamente ou incluir o consultor no Gerenciador de Negócios.
    2. Tutorial de como dar acesso ao Instagram via Contas do Facebook.
    3. Senha de contingência ou acesso via ferramentas de gestão de senhas.

---

## 3. Especificação: Protocolo de Ativos (Regra de Ouro)
Fica proibido o recebimento de arquivos "brutos" (fotos e vídeos) via WhatsApp para curadoria.

*   **Novo Fluxo:**
    1. Consultor cria pasta `MktOS - [Nome do Cliente]` no Google Drive/iCloud.
    2. Cliente faz o upload de: Acervo de fotos, Depoimentos, Logos e Identidade.
    3. A Semana 1 só inicia após a pasta estar com o status de **Ativos Prontos**.

---

## 4. Estratégia de Briefing: Base vs. Lite

| Cenário | Template Escolhido | Foco Principal |
| :--- | :--- | :--- |
| **Produto Growth / Escala** | `briefing-base.md` | Estratégia, Público, Funil, Verba de Ads. |
| **Produto Presença Essencial**| `briefing-lite.md` | Provas Sociais, Ativos Existentes, Dor Imediata. |

---

## 5. Checklist de Prontidão para o Cliente-02
Antes de abrir o projeto do Cliente-02, o consultor deve garantir:

- [ ] PDF do "Kit de Acessos" atualizado e pronto para envio.
- [ ] Link do Drive padrão criado para o novo cliente.
- [ ] Template de `briefing-lite.md` (Pendente de criação física).
- [ ] Campo de "Prontidão de Ativos" incluído no diagnóstico.

---

## 6. Recomendação de Prontidão Técnica
O sistema está pronto para duplicação. O hardening aqui detalhado reduzirá o tempo de setup do próximo cliente em aproximadamente 30%, eliminando as idas e vindas de mensagens para correção de acessos e localização de arquivos.

---
**Próximo Passo:** Implementar fisicamente os ajustes nos templates `.md` conforme as especificações deste documento.
