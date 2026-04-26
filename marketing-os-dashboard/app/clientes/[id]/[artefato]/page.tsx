"use client";

import { useState, useEffect } from 'react';
import { ARTIFACTS_CONFIG } from '@/lib/artifacts';

import { FormularioArtefato } from '@/components/FormularioArtefato';
import { OutputPanel } from '@/components/OutputPanel';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ArtefatoPage({ params }: { params: { id: string, artefato: string } }) {
  const config = ARTIFACTS_CONFIG[params.artefato];
  const router = useRouter();

  const [cliente, setCliente] = useState<{ id: string; nome: string } | null>(null);
  const [formData, setFormData] = useState<Record<string, string | number | boolean | null | undefined>>({});
  const [conteudo, setConteudo] = useState('');
  const [status, setStatus] = useState('pendente');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [resCliente, resArtefato] = await Promise.all([
        fetch(`/api/clientes/${params.id}`),
        fetch(`/api/artefatos?clienteId=${params.id}&tipo=${params.artefato}`)
      ]);
      const dataCliente = await resCliente.json();
      const dataArtefatoList = await resArtefato.json();
      
      setCliente(dataCliente);
      if (dataArtefatoList.length > 0) {
        const art = dataArtefatoList[0];
        setFormData(JSON.parse(art.form_data || '{}'));
        setConteudo(art.conteudo_editado || art.conteudo_gerado || '');
        setStatus(art.status);
      }
      setLoading(false);
    }
    load();
  }, [params.id, params.artefato]);

  const salvarFormulario = async (c_gerado?: string, stat?: string) => {
    await fetch('/api/artefatos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cliente_id: params.id,
        tipo: params.artefato,
        form_data: JSON.stringify(formData),
        conteudo_gerado: c_gerado !== undefined ? c_gerado : conteudo,
        conteudo_editado: c_gerado !== undefined ? c_gerado : conteudo,
        status: stat || status
      })
    });
  };

  const handleGenerate = async () => {
    if (!cliente) return;
    setIsGenerating(true);
    setConteudo('');
    setStatus('gerado');
    await salvarFormulario('', 'gerado');

    try {
      const response = await fetch('/api/gerar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipoArtefato: params.artefato,
          formData,
          clienteNome: cliente.nome,
          clienteId: cliente.id
        })
      });

      if (!response.body) throw new Error('No body');
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        
        fullText += chunk;
        setConteudo(fullText);
      }
      
      await salvarFormulario(fullText, 'gerado');
      
    } catch (err) {
      console.error(err);
      alert('Erro ao gerar artefato');
    } finally {
      setIsGenerating(false);
      router.refresh();
    }
  };

  const handleApprove = async () => {
    setStatus('aprovado');
    await salvarFormulario(conteudo, 'aprovado');
    router.push(`/clientes/${params.id}`);
  };

  const handleSaveEdit = async () => {
    await salvarFormulario(conteudo, status);
  };

  if (!config) return <div>Artefato inválido.</div>;
  if (loading || !cliente) return <div className="p-8 text-zinc-500">Carregando...</div>;

  return (
    <div className="h-[100vh] flex flex-col">
      <div className="p-6 border-b border-zinc-800 bg-zinc-950 flex justify-between items-center shrink-0">
        <div>
          <div className="mb-2">
            <Link href={`/clientes/${params.id}`} className="inline-flex items-center text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
              <ArrowLeft size={16} className="mr-1" /> Voltar para Perfil do Cliente
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-amber-500">{config.titulo}</h1>
          <p className="text-zinc-400 text-sm mt-1">{cliente.nome} • Fase {config.fase}</p>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/3 min-w-[400px] border-r border-zinc-800 bg-zinc-950/50 p-6 overflow-y-auto">
          <FormularioArtefato 
            config={config} 
            formData={formData} 
            setFormData={setFormData} 
          />
        </div>

        <div className="flex-1 bg-zinc-950 p-6 overflow-hidden">
          <OutputPanel 
            conteudo={conteudo}
            setConteudo={setConteudo}
            status={status}
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
            onApprove={handleApprove}
            onSaveEdit={handleSaveEdit}
          />
        </div>
      </div>
    </div>
  );
}
