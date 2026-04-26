import Link from 'next/link';
import { LayoutDashboard, Users } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col p-4 sticky top-0">
      <div className="text-xl font-bold text-amber-500 mb-8 px-4 mt-4">Marketing OS</div>
      <nav className="flex flex-col gap-2">
        <Link href="/" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link href="/clientes/novo" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors">
          <Users size={20} />
          Novo Cliente
        </Link>
      </nav>
      
      <div className="mt-auto pt-4 border-t border-zinc-900 px-4">
        <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
          Marketing OS v1.1.0
        </div>
      </div>
    </div>
  );
}
