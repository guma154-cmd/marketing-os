"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, RefreshCw, MessageSquare, BarChart3, Zap } from 'lucide-react';
import Link from 'next/link';

export default function IntegracoesPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [cliente, setCliente] = useState<{ id: string; nome: string } | null>(null);
  const [integracoes, setIntegracoes] = useState<{ plataforma: string; status: string; ultima_sincronizacao: string; access_token: string; account_id: string }[]>([]);
  const [whatsappHistory, setWhatsappHistory] = useState<{ semana_referencia: string; mensagens_recebidas: number; orcamentos_solicitados: number; conversoes: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);

  // Forms state
  const [metaToken, setMetaToken] = useState('');
  const [metaId, setMetaId] = useState('');
  const [showMetaManual, setShowMetaManual] = useState(false);

  const [gmbToken, setGmbToken] = useState('');
  const [gmbId, setGmbId] = useState('');
  const [showGmbManual, setShowGmbManual] = useState(false);

  const [wsData, setWsData] = useState({
    semana_referencia: new Date().toISOString().split('T')[0],
    mensagens_recebidas: 0,
    orcamentos_solicitados: 0,
    conversoes: 0,
    obs: ''
  });

  useEffect(() => {
    async function load() {
      try {
        const [resCliente, resInt, resWS] = await Promise.all([
          fetch(`/api/clientes/${id}`),
          fetch(`/api/integracoes/${id}`),
          fetch(`/api/integracoes/whatsapp-manual?clienteId=${id}`)
        ]);
        
        setCliente(await resCliente.json());
        setIntegracoes(await resInt.json());
        setWhatsappHistory(await resWS.json());
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [id]);

  const handleSaveIntegration = async (plataforma: string, token: string, accountId: string) => {
    try {
      const res = await fetch(`/api/integracoes/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plataforma,
          tipo_conexao: 'token_manual',
          access_token: token,
          account_id: accountId
        })
      });
      
      if (res.ok) {
        alert('Integração salva! Sincronizando dados...');
        handleSincronizar(plataforma);
      }
    } catch {
      alert('Erro ao salvar integração');
    }
  };

  const handleSincronizar = async (plataforma: string) => {
    setSyncing(plataforma);
    try {
      const res = await fetch('/api/integracoes/sincronizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clienteId: id, plataforma })
      });
      const data = await res.json();
      if (data.sucesso) {
        alert('Sincronização concluída com sucesso!');
        router.refresh();
        window.location.reload();
      } else {
        alert('Erro: ' + (data.error || 'Falha na sincronização'));
      }
    } catch {
      alert('Erro ao sincronizar');
    } finally {
      setSyncing(null);
    }
  };

  const handleSaveWhatsapp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/integracoes/whatsapp-manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...wsData, cliente_id: id })
      });
      if (res.ok) {
        alert('Dados registrados!');
        setWhatsappHistory([{...wsData}, ...whatsappHistory]);
      }
    } catch {
      alert('Erro ao salvar dados');
    }
  };

  if (loading) return <div className="p-8 text-zinc-500">Carregando ambiente de dados...</div>;

  const getStatusBadge = (plataforma: string) => {
    const int = integracoes.find(i => i.plataforma === plataforma);
    if (!int) return <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-500">PENDENTE</span>;
    if (int.status === 'ativo') return <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-900/50 text-emerald-400 border border-emerald-800/50">CONECTADO ✅</span>;
    return <span className="px-2 py-0.5 rounded text-[10px] bg-red-900/50 text-red-400 border border-red-800/50">ERRO ❌</span>;
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <Link href={`/clientes/${id}`} className="inline-flex items-center text-sm text-zinc-400 hover:text-zinc-200 mb-4 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Voltar para Perfil
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-zinc-100">Integrações</h1>
            <Zap size={24} className="text-amber-500" fill="currentColor" />
          </div>
          <p className="text-zinc-400 mt-1">{cliente?.nome} • Conecte as plataformas para coleta automática de métricas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SEÇÃO META */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500">
                <BarChart3 size={24} />
              </div>
              <div>
                <h3 className="font-bold text-zinc-100">Meta (Instagram)</h3>
                {getStatusBadge('meta')}
              </div>
            </div>
          </div>
          <div className="p-6 flex-1 space-y-4">
            <p className="text-xs text-zinc-400">Coleta seguidores, alcance, engajamento e performance dos últimos 30 dias.</p>
            
            {!showMetaManual ? (
              <div className="flex gap-2">
                <button 
                  onClick={() => alert('Fluxo OAuth em desenvolvimento. Use o Token Manual por ora.')}
                  className="flex-1 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm rounded-md transition-colors"
                >
                  Conectar via Login
                </button>
                <button 
                  onClick={() => setShowMetaManual(true)}
                  className="px-3 py-2 border border-zinc-700 text-zinc-400 text-sm rounded-md hover:text-zinc-100 transition-colors"
                >
                  Token Manual
                </button>
              </div>
            ) : (
              <div className="space-y-3 bg-zinc-950 p-4 rounded-lg border border-zinc-800 animate-in fade-in slide-in-from-top-2">
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Access Token</label>
                  <input 
                    type="password"
                    value={metaToken}
                    onChange={(e) => setMetaToken(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-xs mt-1"
                    placeholder="EAAA..."
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Instagram Account ID</label>
                  <input 
                    type="text"
                    value={metaId}
                    onChange={(e) => setMetaId(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-xs mt-1"
                    placeholder="1784..."
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => handleSaveIntegration('meta', metaToken, metaId)}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2 rounded transition-colors"
                  >
                    Salvar e Validar
                  </button>
                  <button 
                    onClick={() => setShowMetaManual(false)}
                    className="px-3 text-zinc-500 hover:text-zinc-300 text-xs"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {integracoes.find(i => i.plataforma === 'meta')?.status === 'ativo' && (
              <div className="pt-4 border-t border-zinc-800 flex justify-between items-center text-[10px]">
                <span className="text-zinc-500">Última sinc: {integracoes.find(i => i.plataforma === 'meta')?.ultima_sincronizacao || 'Nunca'}</span>
                <button 
                  disabled={syncing === 'meta'}
                  onClick={() => handleSincronizar('meta')}
                  className="text-amber-500 hover:text-amber-400 flex items-center gap-1 font-bold"
                >
                  <RefreshCw size={12} className={syncing === 'meta' ? 'animate-spin' : ''} /> Sincronizar Agora
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SEÇÃO GOOGLE */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500">
                <RefreshCw size={24} />
              </div>
              <div>
                <h3 className="font-bold text-zinc-100">Google Meu Negócio</h3>
                {getStatusBadge('google_gmb')}
              </div>
            </div>
          </div>
          <div className="p-6 flex-1 space-y-4">
            <p className="text-xs text-zinc-400">Coleta visualizações no Maps, cliques para ligar e solicitações de rota.</p>
            
            {!showGmbManual ? (
              <button 
                onClick={() => setShowGmbManual(true)}
                className="w-full px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm rounded-md transition-colors"
              >
                Configurar Token GMB
              </button>
            ) : (
              <div className="space-y-3 bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Google Access Token</label>
                  <input 
                    type="password"
                    value={gmbToken}
                    onChange={(e) => setGmbToken(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Location Name (accounts/X/locations/Y)</label>
                  <input 
                    type="text"
                    value={gmbId}
                    onChange={(e) => setGmbId(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-xs mt-1"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => handleSaveIntegration('google_gmb', gmbToken, gmbId)}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2 rounded transition-colors"
                  >
                    Salvar e Validar
                  </button>
                  <button 
                    onClick={() => setShowGmbManual(false)}
                    className="px-3 text-zinc-500 hover:text-zinc-300 text-xs"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEÇÃO WHATSAPP */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden md:col-span-2">
          <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="font-bold text-zinc-100">WhatsApp (Entrada Manual)</h3>
              <p className="text-xs text-zinc-400">Registre o fluxo de mensagens e conversões da semana</p>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <form onSubmit={handleSaveWhatsapp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Semana Referência</label>
                  <input 
                    type="date"
                    value={wsData.semana_referencia}
                    onChange={(e) => setWsData({...wsData, semana_referencia: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Msgs Recebidas</label>
                  <input 
                    type="number"
                    value={wsData.mensagens_recebidas}
                    onChange={(e) => setWsData({...wsData, mensagens_recebidas: parseInt(e.target.value) || 0})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Orçamentos</label>
                  <input 
                    type="number"
                    value={wsData.orcamentos_solicitados}
                    onChange={(e) => setWsData({...wsData, orcamentos_solicitados: parseInt(e.target.value) || 0})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-500">Conversões (Vendas)</label>
                <input 
                  type="number"
                  value={wsData.conversoes}
                  onChange={(e) => setWsData({...wsData, conversoes: parseInt(e.target.value) || 0})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm mt-1"
                />
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-md transition-colors">
                Registrar Semana
              </button>
            </form>

            <div className="lg:col-span-2 bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-500 uppercase">
                  <tr>
                    <th className="px-4 py-2 font-bold">Semana</th>
                    <th className="px-4 py-2 font-bold">Mensagens</th>
                    <th className="px-4 py-2 font-bold">Orçamentos</th>
                    <th className="px-4 py-2 font-bold">Conversões</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {whatsappHistory.map((h, i) => (
                    <tr key={i} className="hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 text-zinc-300">{h.semana_referencia}</td>
                      <td className="px-4 py-3 text-zinc-100">{h.mensagens_recebidas}</td>
                      <td className="px-4 py-3 text-zinc-100">{h.orcamentos_solicitados}</td>
                      <td className="px-4 py-3 text-emerald-500 font-bold">{h.conversoes}</td>
                    </tr>
                  ))}
                  {whatsappHistory.length === 0 && (
                    <tr><td colSpan={4} className="px-4 py-8 text-center text-zinc-600 italic">Nenhum registro ainda</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
