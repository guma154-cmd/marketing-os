import Database from 'better-sqlite3';
import path from 'path';

/**
 * DATABASE CONFIGURATION - Marketing OS Dashboard
 * Estratégia: Lazy Initialization para evitar erros durante o build do Next.js.
 */
let dbInstance: Database.Database | null = null;

export const getDb = (): Database.Database => {
  if (!dbInstance) {
    const dbPath = process.env.DATABASE_URL || path.join(process.cwd(), 'marketing-os.db');
    dbInstance = new Database(dbPath);
    
    // Inicialização do Schema
    dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS clientes (
        id TEXT PRIMARY KEY, nome TEXT NOT NULL, segmento TEXT, cidade TEXT,
        fase_atual INTEGER DEFAULT 1, bloqueio_midia INTEGER DEFAULT 0,
        cor TEXT DEFAULT '#f59e0b', criado_em TEXT DEFAULT CURRENT_TIMESTAMP, atualizado_em TEXT
      );
      CREATE TABLE IF NOT EXISTS artefatos (
        id TEXT PRIMARY KEY, cliente_id TEXT NOT NULL, tipo TEXT NOT NULL,
        form_data TEXT, conteudo_gerado TEXT, conteudo_editado TEXT,
        status TEXT DEFAULT 'pendente', criado_em TEXT DEFAULT CURRENT_TIMESTAMP, atualizado_em TEXT,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
      );
      CREATE TABLE IF NOT EXISTS historico_geracoes (
        id TEXT PRIMARY KEY,
        artefato_id TEXT,
        prompt_usado TEXT,
        conteudo TEXT,
        criado_em TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS integracoes (
        id TEXT PRIMARY KEY,
        cliente_id TEXT NOT NULL,
        plataforma TEXT NOT NULL,        -- 'meta' | 'google_gmb'
        tipo_conexao TEXT NOT NULL,      -- 'oauth' | 'token_manual'
        access_token TEXT,
        token_expira_em TEXT,
        account_id TEXT,
        status TEXT DEFAULT 'pendente',  -- 'pendente' | 'ativo' | 'erro' | 'expirado'
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
        plataforma TEXT NOT NULL,        -- 'meta' | 'google_gmb'
        periodo_inicio TEXT NOT NULL,
        periodo_fim TEXT NOT NULL,
        dados TEXT NOT NULL,             -- JSON com todas as métricas
        marco TEXT,                      -- 'baseline' | 'pos-modificacao' | 'ciclo-N'
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
    `);
  }
  return dbInstance;
};

// Exporta um proxy para manter compatibilidade com o código existente
export const db = new Proxy({} as unknown as Database.Database, {
  get: (target, prop) => {
    const instance = getDb();
    const val = instance[prop as keyof Database.Database];
    return typeof val === 'function' ? val.bind(instance) : val;
  }
});
