import { Fase } from './types';

export const FASES: Fase[] = [
  { numero: 1, nome: 'Fundação', descricao: 'Organização da base e entendimento do mercado.', artefatos: ['onboarding', 'briefing', 'briefing-lite', 'diagnostico'] },
  { numero: 2, nome: 'Estrutura', descricao: 'Ajuste da vitrine digital.', artefatos: ['proposta', 'termos-aceite'] },
  { numero: 3, nome: 'Conteúdo & Posicionamento', descricao: 'Criação de autoridade e operações iniciais.', artefatos: ['plano-semana-1', 'gestao-resultados'] },
  { numero: 4, nome: 'Conversão', descricao: 'Facilitação do contato e estruturação da oferta.', artefatos: ['retrospectiva', 'hardening', 'auditoria-fundacao'] },
  { numero: 5, nome: 'Escala (Growth)', descricao: 'Tráfego pago.', artefatos: ['briefing-trafego', 'briefing-criativos'] }
];

export function canAdvancePhase(faseAtual: number, artefatosAprovados: string[], bloqueioMidia: number): boolean {
  if (faseAtual === 1) {
    const hasOnboarding = artefatosAprovados.includes('onboarding');
    const hasBriefing = artefatosAprovados.includes('briefing') || artefatosAprovados.includes('briefing-lite');
    const hasDiagnostico = artefatosAprovados.includes('diagnostico');
    return hasOnboarding && hasBriefing && hasDiagnostico; 
  }
  if (faseAtual === 2) {
    return artefatosAprovados.includes('proposta') && artefatosAprovados.includes('termos-aceite');
  }
  if (faseAtual === 3) {
    return artefatosAprovados.includes('gestao-resultados');
  }
  if (faseAtual === 4) {
    return artefatosAprovados.includes('retrospectiva') && artefatosAprovados.includes('hardening') && artefatosAprovados.includes('auditoria-fundacao') && bloqueioMidia === 0;
  }
  return false;
}