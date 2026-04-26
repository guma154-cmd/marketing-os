import Database from 'better-sqlite3';
import { randomUUID } from 'crypto';

const db = new Database('./marketing-os.db');

console.log('Seeding clientes Marketing OS...');

const sql1 = "CREATE TABLE IF NOT EXISTS clientes (id TEXT PRIMARY KEY, nome TEXT NOT NULL, segmento TEXT, cidade TEXT, fase_atual INTEGER DEFAULT 1, bloqueio_midia INTEGER DEFAULT 0, cor TEXT DEFAULT '#f59e0b', criado_em TEXT DEFAULT CURRENT_TIMESTAMP, atualizado_em TEXT);";
const sql2 = "CREATE TABLE IF NOT EXISTS artefatos (id TEXT PRIMARY KEY, cliente_id TEXT NOT NULL, tipo TEXT NOT NULL, form_data TEXT, conteudo_gerado TEXT, conteudo_editado TEXT, status TEXT DEFAULT 'pendente', criado_em TEXT DEFAULT CURRENT_TIMESTAMP, atualizado_em TEXT, FOREIGN KEY (cliente_id) REFERENCES clientes(id));";
const sql3 = "CREATE TABLE IF NOT EXISTS historico_geracoes (id TEXT PRIMARY KEY, artefato_id TEXT, prompt_usado TEXT, conteudo TEXT, criado_em TEXT DEFAULT CURRENT_TIMESTAMP);";

db.exec(sql1);
db.exec(sql2);
db.exec(sql3);

const clientes = [
  { id: randomUUID(), nome: 'cliente-01', segmento: 'Varejo', fase_atual: 3, bloqueio_midia: 0 },
  { id: randomUUID(), nome: 'FitLife Studio', segmento: 'Fitness', fase_atual: 1, bloqueio_midia: 0 },
  { id: randomUUID(), nome: 'Megahair', segmento: 'Beleza', fase_atual: 1, bloqueio_midia: 1 },
  { id: randomUUID(), nome: 'Noctua', segmento: 'Segurança', fase_atual: 2, bloqueio_midia: 0 }
];

const stmtCliente = db.prepare('INSERT INTO clientes (id, nome, segmento, fase_atual, bloqueio_midia) VALUES (?, ?, ?, ?, ?)');
const stmtArtefato = db.prepare('INSERT INTO artefatos (id, cliente_id, tipo, status) VALUES (?, ?, ?, ?)');

for (const c of clientes) {
  try {
    stmtCliente.run(c.id, c.nome, c.segmento, c.fase_atual, c.bloqueio_midia);
    if (c.fase_atual > 1 || c.bloqueio_midia === 1) {
      stmtArtefato.run(randomUUID(), c.id, 'onboarding', 'aprovado');
      stmtArtefato.run(randomUUID(), c.id, 'briefing', 'aprovado');
      stmtArtefato.run(randomUUID(), c.id, 'diagnostico', 'aprovado');
    }
    if (c.fase_atual > 2) {
      stmtArtefato.run(randomUUID(), c.id, 'proposta', 'aprovado');
      stmtArtefato.run(randomUUID(), c.id, 'termos-aceite', 'aprovado');
    }
    console.log("OK: " + c.nome);
  } catch (e) {}
}

console.log('Seed finalizado!');
db.close();
