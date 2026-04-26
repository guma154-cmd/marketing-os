import { AlertTriangle } from 'lucide-react';

export function BloqueioMidiaBanner({ clienteNome }: { clienteNome: string }) {
  return (
    <div className="bg-red-950/40 border border-red-900 text-red-300 p-4 rounded-lg flex items-start gap-4 mb-6">
      <AlertTriangle className="mt-1 flex-shrink-0 text-red-500" />
      <div>
        <h3 className="font-bold text-red-400">Tráfego Pago Bloqueado</h3>
        <p className="text-sm mt-1 text-red-200/80">
          A Fase 5 (Escala) está bloqueada para <strong>{clienteNome}</strong>. Motivo: Risco de mídia paga identificado no Diagnóstico (ex: Bio fraca, sem prova social). Resolva os gaps de fundação antes de investir dinheiro em anúncios.
        </p>
      </div>
    </div>
  );
}
