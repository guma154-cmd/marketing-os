"use client";

import { FASES, canAdvancePhase } from '@/lib/phases';
import { Cliente, Artefato } from '@/lib/types';
import { ARTIFACTS_CONFIG } from '@/lib/artifacts';
import { ArtifactCard } from './ArtifactCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

interface Props {
  cliente: Cliente;
  artefatos: Artefato[];
}

export function PhaseTimeline({ cliente, artefatos }: Props) {
  const router = useRouter();
  const aprovados = artefatos.filter(a => a.status === 'aprovado').map(a => a.tipo);

  const handleAdvance = async () => {
    if (!canAdvancePhase(cliente.fase_atual, aprovados, cliente.bloqueio_midia)) {
      alert('Critérios não atingidos para avançar de fase.');
      return;
    }
    
    await fetch(`/api/clientes/${cliente.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fase_atual: cliente.fase_atual + 1 })
    });
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {FASES.map((fase) => {
        const isActive = fase.numero === cliente.fase_atual;
        const isPast = fase.numero < cliente.fase_atual;
        const isFuture = fase.numero > cliente.fase_atual;
        const isBloqueada = fase.numero === 5 && cliente.bloqueio_midia === 1;

        return (
          <div key={fase.numero} className={`p-6 rounded-xl border transition-colors ${isActive ? 'bg-zinc-900/60 border-amber-500/30' : isPast ? 'bg-zinc-950/80 border-zinc-800' : 'bg-transparent border-zinc-900'} relative`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h3 className={`text-xl font-bold flex items-center gap-2 ${isActive ? 'text-amber-500' : isPast ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  Fase {fase.numero}: {fase.nome}
                  {isBloqueada && <Lock size={18} className="text-red-500" />}
                </h3>
                <p className="text-sm text-zinc-500 mt-1">{fase.descricao}</p>
              </div>
              
              {isActive && (
                <Button 
                  onClick={handleAdvance} 
                  disabled={!canAdvancePhase(fase.numero, aprovados, cliente.bloqueio_midia)}
                  variant="outline"
                  className="border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-zinc-950 bg-amber-500/10"
                >
                  Avançar para Fase {fase.numero + 1}
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fase.artefatos.map(tipo => (
                <ArtifactCard 
                  key={tipo} 
                  config={ARTIFACTS_CONFIG[tipo]} 
                  clienteId={cliente.id}
                  artefato={artefatos.find(a => a.tipo === tipo)}
                  bloqueado={isFuture || isBloqueada}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
