export interface Cliente {
  id: string;
  nome: string;
  segmento?: string;
  cidade?: string;
  fase_atual: number;
  bloqueio_midia: number; // Mudado para number (0 ou 1) para bater com SQLite
  cor: string;
  criado_em: string;
  atualizado_em?: string;
}

export interface Artefato {
  id: string;
  cliente_id: string;
  tipo: string;
  form_data?: string;
  conteudo_gerado?: string;
  conteudo_editado?: string;
  status: 'pendente' | 'gerado' | 'aprovado';
  criado_em: string;
  atualizado_em?: string;
}

export interface CampoArtefato {
  nome: string;
  label: string;
  tipo: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';
  opcoes?: string[];
  placeholder?: string;
  obrigatorio?: boolean;
  ajuda?: string;
  secao?: 'consultor';
}

export interface HelpInfo {
  descricao: string;
  exemplosDeUso: string[];
  oQueAIGera: string[];
}

export interface ConfigArtefato {
  tipo: string;
  titulo: string;
  descricao: string;
  fase: number;
  campos: CampoArtefato[];
  help?: HelpInfo;
}

export interface Fase {
  numero: number;
  nome: string;
  descricao: string;
  artefatos: string[];
}
