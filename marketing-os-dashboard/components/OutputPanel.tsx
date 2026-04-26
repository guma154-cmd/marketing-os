"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { PlayCircle, Check, Presentation } from 'lucide-react';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);
const Markdown = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false }
);

interface Props {
  conteudo: string;
  setConteudo: (c: string) => void;
  status: string;
  isGenerating: boolean;
  onGenerate: () => void;
  onApprove: () => void;
  onSaveEdit: () => void;
}

export function OutputPanel({ conteudo, setConteudo, status, isGenerating, onGenerate, onApprove, onSaveEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);

  if (showPresentation) {
    return (
      <div className="fixed inset-0 z-50 bg-zinc-950 p-8 overflow-y-auto" data-color-mode="dark">
        <div className="max-w-4xl mx-auto bg-zinc-900 p-12 rounded-xl border border-zinc-800 shadow-2xl relative">
          <Button 
            variant="outline" 
            className="absolute top-4 right-4 bg-zinc-950 border-zinc-700"
            onClick={() => setShowPresentation(false)}
          >
            Sair da Apresentação
          </Button>
          <div className="prose prose-invert prose-amber max-w-none">
             <Markdown source={conteudo} style={{ backgroundColor: 'transparent' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-sm" data-color-mode="dark">
      <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center z-10">
        <h3 className="font-bold text-zinc-100">Resultado da IA</h3>
        <div className="flex gap-2">
          {!isEditing && conteudo && (
            <>
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300" onClick={() => setIsEditing(true)}>Editar</Button>
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300" onClick={() => setShowPresentation(true)}>
                <Presentation size={16} className="mr-2" /> Apresentar
              </Button>
            </>
          )}
          {isEditing && (
            <Button variant="default" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => { setIsEditing(false); onSaveEdit(); }}>Salvar Edição</Button>
          )}
          {status !== 'aprovado' && conteudo && !isEditing && (
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={onApprove}>
              <Check size={16} className="mr-2" /> Aprovar Artefato
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 p-0 overflow-hidden flex flex-col relative">
        {!conteudo && !isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
            <PlayCircle size={48} className="mb-4 opacity-50" />
            <p>Preencha os campos e clique em Gerar</p>
            <Button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white" onClick={onGenerate}>✦ Gerar com IA</Button>
          </div>
        )}

        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm z-10">
            <div className="text-amber-500 flex flex-col items-center">
              <span className="animate-spin text-4xl mb-4">✦</span>
              <p className="animate-pulse font-medium">A inteligência está processando...</p>
            </div>
          </div>
        )}

        {conteudo && !isEditing && (
          <div className="p-8 overflow-y-auto h-full prose prose-invert prose-amber max-w-none">
             <Markdown source={conteudo} style={{ backgroundColor: 'transparent' }} />
          </div>
        )}

        {conteudo && isEditing && (
          <div className="h-full w-full">
            <MDEditor
              value={conteudo}
              onChange={(val) => setConteudo(val || '')}
              height="100%"
              preview="edit"
              className="border-0 rounded-none h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
