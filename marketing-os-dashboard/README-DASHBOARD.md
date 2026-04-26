# Marketing OS Dashboard

Interface operacional para consultores atenderem clientes PME usando o método Marketing OS. Construído com Next.js 14, Tailwind CSS, shadcn/ui, e SQLite.

## Arquitetura
O sistema segue fielmente as diretrizes e regras do método Marketing OS:
- **Hard Gates**: Bloqueio de mídia paga dinâmico em caso de gaps de fundação identificados no Diagnóstico.
- **Progressão Linear**: Sistema de fases baseado em aprovação de artefatos.
- **AI-Powered**: Integração via Groq SDK com prompts contextuais para geração fluída de documentos (Onboarding, Briefings, Planos de Ação, Propostas).

## Setup Rápido e Execução

1. Certifique-se de estar na pasta `marketing-os-dashboard`:
   ```bash
   cd marketing-os-dashboard
   ```

2. Instale as dependências (já executado):
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente (Obrigatório para geração IA):
   - Copie o arquivo `.env.example` para `.env.local`
   - Insira sua chave da Groq (`GROQ_API_KEY`)
   ```bash
   cp .env.example .env.local
   ```

4. Popule o banco de dados inicial (Seed com clientes de exemplo do repositório base):
   \`\`\`bash
   npm run db:seed
   \`\`\`

5. Inicie o servidor de desenvolvimento:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Acesse a aplicação:
   [http://localhost:3000](http://localhost:3000)