"use client";

import { ConfigArtefato } from '@/lib/types';
import { HelpCircle } from 'lucide-react';

interface Props {
  config: ConfigArtefato;
  formData: Record<string, string | number>;
  setFormData: (data: Record<string, string | number>) => void;
}

export function FormularioArtefato({ config, formData, setFormData }: Props) {
  const handleChange = (nome: string, valor: string) => {
    setFormData({ ...formData, [nome]: valor });
  };

  return (
    <div className="space-y-6">
      {config.campos.map(campo => (
        <div key={campo.nome} className="space-y-2">
          <div className="flex items-center gap-2">
            <label htmlFor={campo.nome} className="text-sm font-medium text-zinc-300">
              {campo.label} {campo.obrigatorio && <span className="text-red-500">*</span>}
            </label>
            
            {campo.ajuda && (
               <span 
                 title={campo.ajuda} 
                 className="text-zinc-500 cursor-help hover:text-amber-500 transition-colors"
                 aria-label={`Ajuda para ${campo.label}`}
               >
                  <HelpCircle size={14} />
               </span>
            )}
          </div>
          
          {campo.tipo === 'text' && (
            <input 
              id={campo.nome}
              type="text"
              placeholder={campo.placeholder || ''}
              value={formData[campo.nome] || ''}
              onChange={e => handleChange(campo.nome, e.target.value)}
              className="w-full rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
            />
          )}
          
          {campo.tipo === 'textarea' && (
            <textarea 
              id={campo.nome}
              placeholder={campo.placeholder || ''}
              value={formData[campo.nome] || ''}
              onChange={e => handleChange(campo.nome, e.target.value)}
              className="w-full rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-zinc-100 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
            />
          )}

          {campo.tipo === 'select' && campo.opcoes && (
            <select 
              id={campo.nome}
              value={String(formData[campo.nome] || '')} 
              onChange={e => handleChange(campo.nome, e.target.value)}
              className="w-full rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all appearance-none"
            >
              <option value="" disabled>Selecione...</option>
              {campo.opcoes.map(op => (
                <option key={op} value={op} className="bg-zinc-900 text-zinc-100">{op}</option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
}
