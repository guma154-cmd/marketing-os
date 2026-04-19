# Template: Base para Automação / Gerador de Conteúdo — Marketing OS

> **Instruções para o Consultor:** Este documento serve como a "Especificação Técnica" para a geração de conteúdo. Ele deve ser preenchido com base no `diagnostico.md` e na `estrutura-conteudo.md`. Estes dados serão usados como context-window para IAs gerarem sugestões de pautas e legendas precisas.

---

## 1. Identificação e Contexto de Escala
*   **Cliente/Marca:** 
*   **Nicho de Atuação:** 
*   **Oferta Irresistível:** (O que estamos vendendo especificamente nesta peça?)
*   **Diferencial Competitivo:** (O que nos separa da concorrência local?)

---

## 2. Configuração do Funil e Intenção
*Defina o momento do cliente e o que queremos dele agora.*

| Variável | Opções Disponíveis | Seleção Atual |
| :--- | :--- | :--- |
| **Estágio do Cliente** | Suspect | Prospect | Lead | Cliente | |
| **Estágio do Funil** | Consciência | Consideração | Decisão | |
| **Intenção da Comunicação** | Autoridade Técnica | Conexão Pessoal | Quebra de Objeção | |
| **Objetivo Comercial** | Tráfego Bio | Engajamento Direto | Agendamento Direct | |
| **Canal Principal** | Instagram (Feed/Reels/Stories) | Google Meu Negócio | WhatsApp Business | |

---

## 3. Matriz de Intenção Estratégica
*Regras de tom para a IA seguir baseada na intenção escolhida.*

*   **Intenção: Autoridade Técnica**
    *   **Foco:** Mostrar domínio, técnica e segurança.
    *   **Linguagem:** Educativa, segura, uso de termos do nicho (com explicação).
    *   **Gatilho:** "Eles são os melhores no que fazem."
*   **Intenção: Conexão Pessoal**
    *   **Foco:** Humanização, valores e bastidores.
    *   **Linguagem:** Amigável, narrativa (storytelling), vulnerabilidade controlada.
    *   **Gatilho:** "Eu gosto deles, eles são como eu."

---

## 4. Mapeamento de Psicologia de Venda
*   **Público-Alvo Resumido:** 
*   **Dor Principal (Pain):** (O que tira o sono do cliente hoje?)
*   **Desejo Principal (Dream):** (Onde o cliente quer chegar?)
*   **Objeção Principal (Barrier):** (Por que ele ainda não comprou?)

---

## 5. Estrutura de Output (AI-Ready Prompting)
*Utilize esta estrutura para orientar a geração de cada peça.*

### 5.1. A Ideia (O Gancho)
*   **Tipo:** [ ] Lista [ ] Tutorial [ ] Storytelling [ ] Direta ao Ponto
*   **Headline Sugerida:** (Mínimo 3 variações focadas no gancho de curiosidade ou dor).

### 5.2. A Legenda (Copywriting)
*   **Estrutura de Copy:** [ ] AIDA (Atenção, Interesse, Desejo, Ação) | [ ] PAS (Problema, Agitação, Solução)
*   **Restrições:** Evitar superlativos exagerados, manter parágrafos curtos, usar emojis coerentes.

### 5.3. CTA Dinâmico (Chamada para Ação)
*   **Canal: WhatsApp** -> "Clique no link da Bio e nos envie uma mensagem para [Oferta]."
*   **Canal: Comentários** -> "Comenta aqui embaixo a sua maior dúvida sobre [Tópico]."
*   **Canal: Link na Bio** -> "Toque no link da minha Bio para baixar o [Recurso/Agenda]."

### 5.4. Hashtags e SEO Local
*   **Hashtags Base:** #NomeDaMarca #[Nicho] #[Cidade]
*   **Palavras-Chave de Busca:** (Ex: "Melhor [Serviço] em [Cidade]")

---

## 6. Governança e Qualidade do Output
*Regras para manter a integridade comercial.*

*   **O que NUNCA dizer:** (Ex: Não prometer cura milagrosa, não usar gírias ofensivas, não falar de política).
*   **Sinais de Qualidade (Review):**
    - [ ] A legenda reflete o posicionamento do diagnóstico?
    - [ ] O CTA está correto para o canal escolhido?
    - [ ] O conteúdo resolve a objeção mapeada?
    - [ ] A localidade está evidente?

---

## 7. Instruções de Reutilização e Expansão
1.  **Novos Nichos:** Adapte os termos técnicos da seção 3 e as dores da seção 4.
2.  **Automação:** Utilize as chaves {{cliente}}, {{oferta_principal}} e {{dor_principal}} para automatizar o preenchimento via planilhas ou scripts.
3.  **Expansão:** Este template deve ser atualizado mensalmente com base no que performou melhor no `diagnostico.md`.
