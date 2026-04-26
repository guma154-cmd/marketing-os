"use client";

import { ConfigArtefato, CampoArtefato } from '@/lib/types';
import { HelpCircle } from 'lucide-react';

type FormDataValue = string | number | boolean | null | undefined;

interface Props {
  config: ConfigArtefato;
  formData: Record<string, FormDataValue>;
  setFormData: (data: Record<string, FormDataValue>) => void;
}

export function FormularioArtefato({ config, formData, setFormData }: Props) {
  const handleChange = (nome: string, valor: FormDataValue) => {
    setFormData({ ...formData, [nome]: valor });
  };

  const renderCampo = (campo: CampoArtefato) => {
    return (
      <div key={campo.nome} className="space-y-2">
        <div className="flex items-center gap-2">
          {campo.tipo !== 'checkbox' && (
            <label htmlFor={campo.nome} className="text-sm font-medium text-zinc-300">
              {campo.label} {campo.obrigatorio && <span className="text-red-500">*</span>}
            </label>
          )}
          
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
            value={String(formData[campo.nome] || '')}
            onChange={e => handleChange(campo.nome, e.target.value)}
            className="w-full rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
          />
        )}
        
        {campo.tipo === 'textarea' && (
          <textarea 
            id={campo.nome}
            placeholder={campo.placeholder || ''}
            value={String(formData[campo.nome] || '')}
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

        {campo.tipo === 'checkbox' && (
          <div className="flex items-center gap-3 p-3 rounded-md bg-zinc-950/50 border border-zinc-800/50 hover:bg-zinc-950 transition-colors">
            <input 
              id={campo.nome}
              type="checkbox"
              checked={!!formData[campo.nome]}
              onChange={e => handleChange(campo.nome, e.target.checked)}
              className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-amber-600 focus:ring-amber-500 focus:ring-offset-zinc-900"
            />
            <label htmlFor={campo.nome} className="text-sm text-zinc-300 cursor-pointer select-none">
              {campo.label}
            </label>
          </div>
        )}
      </div>
    );
  };

  const camposCliente = config.campos.filter(c => !c.secao);
  const camposConsultor = config.campos.filter(c => c.secao === 'consultor');

  return (
    <div className="space-y-8">
      {/* Grupo Dados do Cliente */}
      <div className="space-y-6">
        {config.tipo === 'onboarding' && (
          <h3 className="text-lg font-bold text-zinc-100 border-b border-zinc-800 pb-2">Dados do Cliente</h3>
        )}
        {camposCliente.map(renderCampo)}
      </div>

      {/* Grupo Checklist / Logística (Consultor) */}
      {camposConsultor.length > 0 && (
        <div className="space-y-6 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 shadow-inner">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h3 className="text-lg font-bold text-zinc-100">Checklist & Logística</h3>
            <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full border border-amber-500/20">
              Preenchido pelo Consultor
            </span>
          </div>
          {camposConsultor.map(renderCampo)}
        </div>
      )}
    </div>
  );
}
