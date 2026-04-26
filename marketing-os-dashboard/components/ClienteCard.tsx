"use client";

import Link from 'next/link';
import { Cliente } from '@/lib/types';
import { FASES } from '@/lib/phases';

export function ClienteCard({ cliente }: { cliente: Cliente }) {
  const faseObj = FASES.find(f => f.numero === cliente.fase_atual) || FASES[0];

  return (
    <Link href={`/clientes/${cliente.id}`} className="h-full">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition-all cursor-pointer h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-zinc-100 uppercase tracking-tight">{cliente.nome}</h3>
            {cliente.bloqueio_midia === 1 && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-900/30 text-red-500 border border-red-900/50">
                BLOQUEADO
              </span>
            )}
          </div>
          <p className="text-zinc-500 text-xs mb-4">{cliente.segmento || 'Sem segmento'}</p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            <span>Progresso</span>
            <span className="text-amber-500">Fase {cliente.fase_atual}</span>
          </div>
          <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-zinc-800">
            <div 
              className="bg-amber-500 h-full transition-all" 
              style={{ width: `${(cliente.fase_atual / 5) * 100}%` }}
            />
          </div>
          <p className="text-xs text-zinc-400 font-medium">{faseObj.nome}</p>
        </div>
      </div>
    </Link>
  );
}
