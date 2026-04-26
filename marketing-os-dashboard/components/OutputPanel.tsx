"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { PlayCircle, Check, Presentation, Edit3, X } from 'lucide-react';

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
          <button 
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-zinc-800 text-zinc-400 transition-colors"
            onClick={() => setShowPresentation(false)}
          >
            <X size={20} />
          </button>
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
        <h3 className="font-bold text-zinc-100 flex items-center gap-2">
          <Check size={16} className={status === 'aprovado' ? 'text-emerald-500' : 'text-zinc-600'} />
          Resultado da IA
        </h3>
        <div className="flex gap-2">
          {!isEditing && conteudo && (
            <>
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all text-xs font-bold"
              >
                <Edit3 size={14} /> Editar
              </button>
              <button 
                onClick={() => setShowPresentation(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all text-xs font-bold"
              >
                <Presentation size={14} /> Apresentar
              </button>
            </>
          )}
          {isEditing && (
            <button 
              onClick={() => { setIsEditing(false); onSaveEdit(); }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-all text-xs font-bold shadow-lg"
            >
              Salvar Edição
            </button>
          )}
          {status !== 'aprovado' && conteudo && !isEditing && (
            <button 
              onClick={onApprove}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all text-xs font-bold shadow-lg"
            >
              <Check size={14} /> Aprovar
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 p-0 overflow-hidden flex flex-col relative">
        {!conteudo && !isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
            <PlayCircle size={48} className="mb-4 opacity-50" />
            <p className="text-sm font-medium">Preencha os campos e clique em Gerar</p>
            <button 
              onClick={onGenerate}
              className="mt-4 px-6 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all transform hover:scale-105"
            >
              ✦ Gerar com IA
            </button>
          </div>
        )}

        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm z-10">
            <div className="text-amber-500 flex flex-col items-center">
              <span className="animate-spin text-4xl mb-4">✦</span>
              <p className="animate-pulse font-bold tracking-widest text-[10px] uppercase">Processando Dados...</p>
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
