"use client";

import Link from 'next/link';
import { Cliente } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FASES } from '@/lib/phases';

export function ClienteCard({ cliente }: { cliente: Cliente }) {
  const faseObj = FASES.find(f => f.numero === cliente.fase_atual) || FASES[0];

  return (
    <Link href={`/clientes/${cliente.id}`}>
      <Card className="bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-colors cursor-pointer h-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg text-zinc-100">{cliente.nome}</CardTitle>
              <CardDescription className="text-zinc-400 mt-1">{cliente.segmento || 'Sem segmento'}</CardDescription>
            </div>
            {cliente.bloqueio_midia === 1 && (
              <Badge variant="destructive" className="bg-red-900/50 text-red-400 border-0 hover:bg-red-900/70">Mídia Bloqueada</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-400">Fase Atual</span>
              <span className="font-medium text-amber-500">Fase {cliente.fase_atual}</span>
            </div>
            <div className="text-sm text-zinc-300 font-medium">{faseObj.nome}</div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-amber-500 h-full transition-all" 
                style={{ width: `${(cliente.fase_atual / 5) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
