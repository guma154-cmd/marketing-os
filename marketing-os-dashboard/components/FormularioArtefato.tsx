import { ConfigArtefato } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Props {
  config: ConfigArtefato;
  formData: any;
  setFormData: (data: any) => void;
}

export function FormularioArtefato({ config, formData, setFormData }: Props) {
  const handleChange = (nome: string, valor: string) => {
    setFormData({ ...formData, [nome]: valor });
  };

  return (
    <div className="space-y-6">
      {config.campos.map(campo => (
        <div key={campo.nome} className="space-y-2">
          <Label htmlFor={campo.nome} className="text-zinc-300">
            {campo.label} {campo.obrigatorio && <span className="text-red-500">*</span>}
          </Label>
          
          {campo.tipo === 'text' && (
            <Input 
              id={campo.nome}
              placeholder={campo.placeholder}
              value={formData[campo.nome] || ''}
              onChange={e => handleChange(campo.nome, e.target.value)}
              className="bg-zinc-950 border-zinc-800"
            />
          )}
          
          {campo.tipo === 'textarea' && (
            <Textarea 
              id={campo.nome}
              placeholder={campo.placeholder}
              value={formData[campo.nome] || ''}
              onChange={e => handleChange(campo.nome, e.target.value)}
              className="bg-zinc-950 border-zinc-800 min-h-[100px]"
            />
          )}

          {campo.tipo === 'select' && campo.opcoes && (
            <Select 
              value={formData[campo.nome] || ''} 
              onValueChange={v => handleChange(campo.nome, v)}
            >
              <SelectTrigger className="bg-zinc-950 border-zinc-800">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                {campo.opcoes.map(op => (
                  <SelectItem key={op} value={op} className="hover:bg-zinc-800 focus:bg-zinc-800">{op}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      ))}
    </div>
  );
}
