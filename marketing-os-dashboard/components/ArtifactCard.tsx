import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, PlayCircle } from 'lucide-react';
import { Artefato, ConfigArtefato } from '@/lib/types';

interface Props {
  config: ConfigArtefato;
  clienteId: string;
  artefato?: Artefato;
  bloqueado?: boolean;
}

export function ArtifactCard({ config, clienteId, artefato, bloqueado }: Props) {
  const status = artefato?.status || 'pendente';
  
  const getStatusDisplay = () => {
    switch (status) {
      case 'aprovado': return <Badge className="bg-emerald-900/50 text-emerald-400 border-0 hover:bg-emerald-900/70"><CheckCircle2 size={12} className="mr-1"/> Aprovado</Badge>;
      case 'gerado': return <Badge className="bg-amber-900/50 text-amber-400 border-0 hover:bg-amber-900/70"><PlayCircle size={12} className="mr-1"/> Gerado</Badge>;
      default: return <Badge variant="outline" className="text-zinc-500 border-zinc-700 bg-zinc-800/30"><Clock size={12} className="mr-1"/> Pendente</Badge>;
    }
  };

  if (bloqueado) {
    return (
      <Card className="bg-zinc-950/50 border-zinc-800/50 opacity-40 cursor-not-allowed">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-zinc-500 text-base">{config.titulo}</CardTitle>
              <CardDescription className="text-zinc-600 mt-1">{config.descricao}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Link href={`/clientes/${clienteId}/${config.tipo}`}>
      <Card className="bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-colors cursor-pointer h-full">
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <div>
              <CardTitle className="text-zinc-100 text-base">{config.titulo}</CardTitle>
              <CardDescription className="text-zinc-400 mt-1">{config.descricao}</CardDescription>
            </div>
            <div className="flex-shrink-0">
              {getStatusDisplay()}
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
