import Database from 'better-sqlite3';
import path from 'path';

/**
 * DATABASE CONFIGURATION - Marketing OS Dashboard
 * Estratégia: Self-Hosted Runner (Deploy Local em 100.0.4.90)
 * O banco de dados SQLite é persistido em um volume Docker (/app/data).
 */
const dbPath = process.env.DATABASE_URL || path.join(process.cwd(), 'marketing-os.db');
export const db = new Database(dbPath);

// Criação do Schema SQLite
db.exec(`
  CREATE TABLE IF NOT EXISTS clientes (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    segmento TEXT,
    cidade TEXT,
    fase_atual INTEGER DEFAULT 1,
    bloqueio_midia INTEGER DEFAULT 0,
    cor TEXT DEFAULT '#f59e0b',
    criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TEXT
  );

  CREATE TABLE IF NOT EXISTS artefatos (
    id TEXT PRIMARY KEY,
    cliente_id TEXT NOT NULL,
    tipo TEXT NOT NULL,
    form_data TEXT,
    conteudo_gerado TEXT,
    conteudo_editado TEXT,
    status TEXT DEFAULT 'pendente',
    criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TEXT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
  );

  CREATE TABLE IF NOT EXISTS historico_geracoes (
    id TEXT PRIMARY KEY,
    artefato_id TEXT,
    prompt_usado TEXT,
    conteudo TEXT,
    criado_em TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);
