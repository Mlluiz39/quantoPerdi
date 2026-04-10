import { useState, useMemo } from 'react';
import { ArrowRight, Droplet, Brain } from 'lucide-react';
import { calcularGastosInvisiveis, parseMoeda, formatarMoeda, type Frequencia } from '../lib/calculators';
import ResultCard from '../components/ResultCard';
import ShareButton from '../components/ShareButton';
import AdBanner from '../components/AdBanner';
import SEOHead from '../components/SEOHead';

export default function Gastos() {
  const [nome, setNome] = useState('Café Gourmet');
  const [valor, setValor] = useState('15');
  const [frequencia, setFrequencia] = useState<Frequencia>('diario');

  const resultado = useMemo(() => {
    return calcularGastosInvisiveis(parseMoeda(valor), frequencia);
  }, [valor, frequencia]);

  const frequenciaLabel: Record<Frequencia, string> = {
    diario: 'Diário',
    semanal: 'Semanal',
    mensal: 'Mensal',
    anual: 'Anual',
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <SEOHead
        titulo="Simulador de Gastos Invisíveis"
        descricao="Descubra quanto você perde com gastos pequenos do dia a dia. Café, streaming, delivery — veja o impacto real em 30 anos."
        url="/perda-gastos"
      />

      {/* Hero Section */}
      <section className="mb-16">
        <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4 block">Análise Forense Fiscal</span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-6 max-w-4xl">
          Simulador <span className="text-primary">Gastos Invisíveis</span>
        </h1>
        <p className="text-on-surface-variant text-xl max-w-2xl leading-relaxed">
          Pequenas escolhas diárias são os maiores drenos de riqueza a longo prazo. Identifique os micro-vazamentos que estão sabotando sua liberdade financeira.
        </p>
      </section>

      {/* Main Content Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Calculator Card */}
        <div className="lg:col-span-5 bg-surface-container-low rounded-xl p-8 shadow-2xl shadow-emerald-900/5">
          <h2 className="text-2xl font-bold mb-10 tracking-tight">Rastrear Despesa</h2>
          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Nome da Despesa</label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant/40 py-2 px-0 text-on-surface text-lg focus:ring-0 placeholder:text-surface-variant transition-all"
                placeholder="Ex: Café Gourmet, Streaming, Delivery"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Valor (R$)</label>
                <input
                  className="w-full bg-transparent border-0 border-b border-outline-variant/40 py-2 px-0 text-on-surface text-lg focus:ring-0 placeholder:text-surface-variant transition-all"
                  placeholder="0,00"
                  type="text"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Frequência</label>
                <select
                  className="w-full bg-transparent border-0 border-b border-outline-variant/40 py-2 px-0 text-on-surface text-lg focus:ring-0 transition-all appearance-none cursor-pointer"
                  value={frequencia}
                  onChange={(e) => setFrequencia(e.target.value as Frequencia)}
                >
                  <option value="diario" className="bg-surface">Diário</option>
                  <option value="semanal" className="bg-surface">Semanal</option>
                  <option value="mensal" className="bg-surface">Mensal</option>
                  <option value="anual" className="bg-surface">Anual</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Analysis Result Area */}
        <div className="lg:col-span-7 space-y-8">
          {resultado ? (
            <>
              {/* Cumulative Loss Highlight */}
              <ResultCard
                titulo={`Perda Projetada em 30 Anos — ${nome}`}
                valor={resultado.custoOportunidade30Anos}
                subtitulo={`${formatarMoeda(resultado.totalGasto30Anos)} gastos + custo de oportunidade`}
                storytelling={resultado.storytelling}
                comparacoes={resultado.comparacoes}
                severidade="chocante"
              />

              {/* Time projections */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: '1 Ano', valor: resultado.totalGasto1Ano },
                  { label: '5 Anos', valor: resultado.totalGasto5Anos },
                  { label: '10 Anos', valor: resultado.totalGasto10Anos },
                  { label: '30 Anos', valor: resultado.totalGasto30Anos },
                ].map((item) => (
                  <div key={item.label} className="bg-surface-container-low rounded-xl p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{item.label}</p>
                    <p className="text-lg font-bold text-on-surface">{formatarMoeda(item.valor)}</p>
                  </div>
                ))}
              </div>

              {/* Opportunity cost highlight */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Se investisse ao invés de gastar (10 anos)</p>
                <p className="text-3xl font-bold text-primary">{formatarMoeda(resultado.custoOportunidade10Anos)}</p>
              </div>

              <ShareButton
                valor={formatarMoeda(resultado.custoOportunidade30Anos)}
                pagina="perda-gastos"
              />

              <AdBanner formato="horizontal" />
            </>
          ) : (
            <div className="bg-surface-container-highest rounded-xl p-10 flex items-center justify-center min-h-[200px]">
              <p className="text-on-surface-variant text-lg text-center">Preencha os campos para ver o impacto</p>
            </div>
          )}

          {/* Micro-drains Bento Subgrid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-low rounded-xl p-6">
              <Droplet className="text-tertiary mb-4 w-6 h-6" />
              <h5 className="text-xl font-bold mb-3">Micro-drains</h5>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Assinaturas esquecidas e taxas bancárias são "vazamentos lentos". Eles não quebram o banco hoje, mas esvaziam o reservatório amanhã.
              </p>
            </div>
            <div className="bg-surface-container-low rounded-xl p-6">
              <Brain className="text-primary mb-4 w-6 h-6" />
              <h5 className="text-xl font-bold mb-3">Efeito Ilusório</h5>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                O cérebro humano falha em processar exponenciação. R$ 50/mês parece pouco, mas no tempo certo, é um carro popular.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <section className="mt-32">
        <h3 className="text-3xl font-bold tracking-tight mb-12">Anatomia do Dreno</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-on-surface-variant text-xs uppercase tracking-widest font-bold">
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Frequência</th>
                <th className="px-6 py-4">Custo Mensal</th>
                <th className="px-6 py-4 text-right">Perda em 10 Anos</th>
              </tr>
            </thead>
            <tbody className="space-y-4">
              {[
                { cat: 'Café Diário (R$ 8)', freq: 'Diário', mensal: 240, perda10: 28800 },
                { cat: 'Streaming Extras', freq: 'Mensal', mensal: 54.9, perda10: 6588 },
                { cat: 'Delivery (2x Semana)', freq: 'Semanal', mensal: 640, perda10: 76800 },
                { cat: 'Cigarro (1 maço/dia)', freq: 'Diário', mensal: 450, perda10: 54000 },
                { cat: 'Uber desnecessário', freq: 'Semanal', mensal: 260, perda10: 31200 },
              ].map((item) => (
                <tr key={item.cat} className="bg-surface-container-low rounded-xl">
                  <td className="px-6 py-6 rounded-l-xl font-bold">{item.cat}</td>
                  <td className="px-6 py-6">{item.freq}</td>
                  <td className="px-6 py-6">{formatarMoeda(item.mensal)}</td>
                  <td className="px-6 py-6 rounded-r-xl text-right text-secondary font-bold">{formatarMoeda(item.perda10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <AdBanner formato="horizontal" className="mt-16" />
    </div>
  );
}
