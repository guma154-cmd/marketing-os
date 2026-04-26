"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
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
      
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Dados Iniciais</CardTitle>
          <CardDescription className="text-zinc-400">Insira as informações básicas para iniciar a jornada do Marketing OS.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-zinc-300">Nome da Empresa / Projeto <span className="text-red-500">*</span></Label>
              <Input 
                id="nome" required 
                value={formData.nome} 
                onChange={e => setFormData({ ...formData, nome: e.target.value })}
                className="bg-zinc-950 border-zinc-800"
                placeholder="Ex: FitLife Studio"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="segmento" className="text-zinc-300">Segmento / Nicho</Label>
                <Input 
                  id="segmento" 
                  value={formData.segmento} 
                  onChange={e => setFormData({ ...formData, segmento: e.target.value })}
                  className="bg-zinc-950 border-zinc-800"
                  placeholder="Ex: Fitness / Academia"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cidade" className="text-zinc-300">Cidade / Região</Label>
                <Input 
                  id="cidade" 
                  value={formData.cidade} 
                  onChange={e => setFormData({ ...formData, cidade: e.target.value })}
                  className="bg-zinc-950 border-zinc-800"
                  placeholder="Ex: São Paulo, SP"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-zinc-800">
              <Button type="submit" disabled={loading} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                {loading ? 'Criando ambiente...' : 'Criar Cliente e Iniciar Fundação'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
