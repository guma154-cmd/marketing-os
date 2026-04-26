import { db } from '@/lib/db';
import { ClienteCard } from '@/components/ClienteCard';
import { Cliente } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const stmt = db.prepare('SELECT * FROM clientes ORDER BY atualizado_em DESC, criado_em DESC');
  const clientes = stmt.all() as Cliente[];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Gerencie a evolução dos seus clientes Marketing OS.</p>
        </div>
        <Link href="/clientes/novo">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white">Novo Cliente</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {clientes.map(c => (
          <ClienteCard key={c.id} cliente={c} />
        ))}
        {clientes.length === 0 && (
          <div className="col-span-full py-16 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/50">
            <p className="mb-4">Nenhum cliente cadastrado ainda.</p>
            <Link href="/clientes/novo">
              <Button variant="outline" className="border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-white">
                Adicionar Primeiro Cliente
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
