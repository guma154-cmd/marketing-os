"use client";

import Link from 'next/link';
import { CheckCircle2, Clock, PlayCircle, HelpCircle } from 'lucide-react';
import { Artefato, ConfigArtefato } from '@/lib/types';
import { useState } from 'react';

interface Props {
  config: ConfigArtefato;
  clienteId: string;
  artefato?: Artefato;
  bloqueado?: boolean;
}

export function ArtifactCard({ config, clienteId, artefato, bloqueado }: Props) {
  const [showHelp, setShowHelp] = useState(false);
  const status = artefato?.status || 'pendente';
  
  const getStatusDisplay = () => {
    switch (status) {
      case 'aprovado': return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-900/50 text-emerald-400 border border-emerald-800/50"><CheckCircle2 size={12} className="mr-1"/> Aprovado</span>;
      case 'gerado': return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-900/50 text-amber-400 border border-amber-800/50"><PlayCircle size={12} className="mr-1"/> Gerado</span>;
      default: return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-800/30 text-zinc-500 border border-zinc-700/50"><Clock size={12} className="mr-1"/> Pendente</span>;
    }
  };

  const helpContent = config.help ? (
    <div className="space-y-4 py-2">
      <div className="space-y-1">
        <h4 className="font-bold text-amber-500 text-sm">O que é este artefato?</h4>
        <p className="text-zinc-300 text-xs leading-relaxed">{config.help.descricao}</p>
      </div>
      
      <div className="space-y-1">
        <h4 className="font-bold text-zinc-100 text-xs">Exemplos de uso:</h4>
        <ul className="list-disc list-inside text-[10px] text-zinc-400 space-y-0.5">
          {config.help.exemplosDeUso.map((ex, i) => <li key={i}>{ex}</li>)}
        </ul>
      </div>

      <div className="space-y-1">
        <h4 className="font-bold text-zinc-100 text-xs">O que a IA vai gerar:</h4>
        <ul className="list-disc list-inside text-[10px] text-zinc-400 space-y-0.5">
          {config.help.oQueAIGera.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    </div>
  ) : null;

  if (bloqueado) {
    return (
      <div className="p-6 rounded-xl border border-zinc-800/50 bg-zinc-950/50 opacity-40 cursor-not-allowed">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-zinc-500 text-base font-semibold">{config.titulo}</h3>
            <p className="text-zinc-600 text-xs mt-1">{config.descricao}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group/card-wrapper h-full">
      <Link href={`/clientes/${clienteId}/${config.tipo}`} className="block h-full">
        <div className="h-full p-6 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-amber-500/50 transition-colors cursor-pointer flex flex-col justify-between gap-4">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-zinc-100 text-base font-semibold">{config.titulo}</h3>
              <p className="text-zinc-400 text-xs mt-1">{config.descricao}</p>
            </div>
            <div className="flex-shrink-0">
              {getStatusDisplay()}
            </div>
          </div>
        </div>
      </Link>

      {helpContent && (
        <>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowHelp(!showHelp); }}
            className="absolute top-2 right-2 z-20 p-1 text-zinc-500 hover:text-amber-500 transition-colors focus:outline-none"
            aria-label="Ajuda"
          >
            <HelpCircle size={16} />
          </button>
          
          {showHelp && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowHelp(false)} />
              <div className="absolute right-0 top-8 z-40 bg-zinc-900 border border-zinc-800 p-4 rounded-lg shadow-2xl w-[280px] text-left animate-in fade-in zoom-in duration-150">
                {helpContent}
                <button 
                   onClick={() => setShowHelp(false)}
                   className="mt-3 w-full text-[10px] uppercase tracking-wider font-bold text-zinc-500 hover:text-zinc-300 transition-colors py-1 border-t border-zinc-800"
                >
                  Fechar
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
