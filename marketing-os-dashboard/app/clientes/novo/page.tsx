"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NovoCliente() {
  const router = useRouter();
  const [formData, setFormData] = useState({ nome: '', segmento: '', cidade: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      router.push(`/clientes/${data.id}`);
    } catch {
      alert("Erro ao criar cliente.");
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Voltar para o Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-zinc-100 mb-8">Novo Cliente</h1>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-100">Dados Iniciais</h2>
          <p className="text-zinc-400 text-sm mt-1">Insira as informações básicas para iniciar a jornada do Marketing OS.</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="nome" className="text-sm font-medium text-zinc-300 flex gap-1">Nome da Empresa / Projeto <span className="text-red-500">*</span></label>
              <input 
                id="nome" required 
                value={formData.nome} 
                onChange={e => setFormData({ ...formData, nome: e.target.value })}
                className="w-full rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                placeholder="Ex: FitLife Studio"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="segmento" className="text-sm font-medium text-zinc-300">Segmento / Nicho</label>
                <input 
                  id="segmento" 
                  value={formData.segmento} 
                  onChange={e => setFormData({ ...formData, segmento: e.target.value })}
                  className="w-full rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  placeholder="Ex: Fitness / Academia"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="cidade" className="text-sm font-medium text-zinc-300">Cidade / Região</label>
                <input 
                  id="cidade" 
                  value={formData.cidade} 
                  onChange={e => setFormData({ ...formData, cidade: e.target.value })}
                  className="w-full rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  placeholder="Ex: São Paulo, SP"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-zinc-800">
              <button type="submit" disabled={loading} className="w-full px-4 py-2 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-medium transition-colors disabled:opacity-50">
                {loading ? 'Criando ambiente...' : 'Criar Cliente e Iniciar Fundação'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
