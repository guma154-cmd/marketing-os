import { db } from '@/lib/db';
import { Cliente, Artefato } from '@/lib/types';
import { PhaseTimeline } from '@/components/PhaseTimeline';
import { BloqueioMidiaBanner } from '@/components/BloqueioMidiaBanner';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Zap } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ClientePage({ params }: { params: { id: string } }) {
  const clienteStmt = db.prepare('SELECT * FROM clientes WHERE id = ?');
  const cliente = clienteStmt.get(params.id) as Cliente | undefined;

  if (!cliente) return notFound();

  const artefatosStmt = db.prepare('SELECT * FROM artefatos WHERE cliente_id = ?');
  const artefatos = artefatosStmt.all(params.id) as Artefato[];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="inline-flex items-center text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Voltar para o Dashboard
        </Link>
        
        <Link href={`/clientes/${params.id}/integracoes`}>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20 transition-all text-sm font-bold">
            <Zap size={16} fill="currentColor" />
            Integrações
          </button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100">{cliente.nome}</h1>
        <p className="text-zinc-400 mt-1">{cliente.segmento || 'Sem segmento'} • {cliente.cidade || 'Sem cidade'}</p>
      </div>

      {cliente.bloqueio_midia === 1 && (
        <BloqueioMidiaBanner clienteNome={cliente.nome} />
      )}

      <div className="mt-8">
        <h2 className="text-xl font-bold text-zinc-100 mb-6">Jornada Marketing OS</h2>
        <PhaseTimeline cliente={cliente} artefatos={artefatos} />
      </div>
    </div>
  );
}
