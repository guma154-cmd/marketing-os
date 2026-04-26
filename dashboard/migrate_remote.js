const Database = require('better-sqlite3');
const db = new Database('/home/telematica/marketing-os/data/marketing-os.db');

const schema = `
CREATE TABLE IF NOT EXISTS integracoes (
  id TEXT PRIMARY KEY,
  cliente_id TEXT NOT NULL,
  plataforma TEXT NOT NULL,
  tipo_conexao TEXT NOT NULL,
  access_token TEXT,
  token_expira_em TEXT,
  account_id TEXT,
  status TEXT DEFAULT 'pendente',
  ultima_sincronizacao TEXT,
  erro_mensagem TEXT,
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TEXT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE IF NOT EXISTS metricas_snapshot (
  id TEXT PRIMARY KEY,
  cliente_id TEXT NOT NULL,
  integracao_id TEXT NOT NULL,
  plataforma TEXT NOT NULL,
  periodo_inicio TEXT NOT NULL,
  periodo_fim TEXT NOT NULL,
  dados TEXT NOT NULL,
  marco TEXT,
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (integracao_id) REFERENCES integracoes(id)
);

CREATE TABLE IF NOT EXISTS whatsapp_manual (
  id TEXT PRIMARY KEY,
  cliente_id TEXT NOT NULL,
  semana_referencia TEXT NOT NULL,
  mensagens_recebidas INTEGER DEFAULT 0,
  orcamentos_solicitados INTEGER DEFAULT 0,
  conversoes INTEGER DEFAULT 0,
  obs TEXT,
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
`;

db.exec(schema);
console.log('Tabelas de integração criadas no banco de PRODUÇÃO!');
db.close();
