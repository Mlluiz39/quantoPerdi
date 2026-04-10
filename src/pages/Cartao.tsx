import { useState, useMemo } from 'react';
import { BarChart3, TrendingDown, AlertTriangle, PieChart, Lock } from 'lucide-react';
import { calcularPerdaCartao, parseMoeda, parseNumero, formatarMoeda } from '../lib/calculators';
import ResultCard from '../components/ResultCard';
import ShareButton from '../components/ShareButton';
import AdBanner from '../components/AdBanner';
import SEOHead from '../components/SEOHead';

export default function Cartao() {
  const [divida, setDivida] = useState('4500');
  const [taxa, setTaxa] = useState('14.5');
  const [pagamento, setPagamento] = useState('300');

  const resultado = useMemo(() => {
    return calcularPerdaCartao(
      parseMoeda(divida),
      parseNumero(taxa),
      parseMoeda(pagamento)
    );
  }, [divida, taxa, pagamento]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <SEOHead
        titulo="Simulador de Perda no Cartão de Crédito"
        descricao="Descubra quanto você paga de juros no cartão de crédito. Simulador de juros compostos do rotativo e parcelamento."
        url="/perda-cartao"
      />

      {/* Hero Section */}
      <section className="mb-16">
        <div className="inline-block bg-secondary-container/40 backdrop-blur-xl px-4 py-1 rounded-full mb-6 border border-secondary/10">
          <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">Fiscal Forensic Report</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-4 leading-none">
          Simulador Perda <span className="text-secondary">Cartão</span>
        </h1>
        <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
          O crédito rotativo não é apenas um empréstimo; é uma erosão silenciosa do seu patrimônio. Descubra a verdade sobre os juros compostos que trabalham contra você.
        </p>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel */}
        <div className="lg:col-span-5 bg-surface-container-low rounded-xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
            <BarChart3 className="text-primary w-6 h-6" />
            Parâmetros da Dívida
          </h2>
          <div className="space-y-10">
            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Dívida Atual (R$)</label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 text-3xl font-bold tracking-tight py-2 px-0 text-on-surface transition-all"
                type="text"
                value={divida}
                onChange={(e) => setDivida(e.target.value)}
                placeholder="4.500"
              />
            </div>
            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Taxa de Juros Mensal (%)</label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 text-3xl font-bold tracking-tight py-2 px-0 text-on-surface transition-all"
                type="text"
                value={taxa}
                onChange={(e) => setTaxa(e.target.value)}
                placeholder="14.5"
              />
            </div>
            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Pagamento Mensal (R$)</label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 text-3xl font-bold tracking-tight py-2 px-0 text-on-surface transition-all"
                type="text"
                value={pagamento}
                onChange={(e) => setPagamento(e.target.value)}
                placeholder="300"
              />
            </div>
          </div>

          {/* Info cards */}
          {resultado && isFinite(resultado.mesesParaQuitar) && (
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-container rounded-lg">
                <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest mb-1">Tempo de Quitação</p>
                <p className="text-on-background text-xl font-bold">{resultado.mesesParaQuitar} Meses</p>
              </div>
              <div className="p-4 bg-surface-container rounded-lg">
                <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest mb-1">Total Pago</p>
                <p className="text-on-background text-xl font-bold">{formatarMoeda(resultado.totalPago)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Analysis Panel */}
        <div className="lg:col-span-7 grid grid-cols-1 gap-8">
          {resultado ? (
            <>
              <ResultCard
                titulo="Fortuna Perdida em Juros"
                valor={isFinite(resultado.jurosPagos) ? resultado.jurosPagos : 999999}
                subtitulo={isFinite(resultado.jurosPagos) ? "apenas em juros e taxas" : "dívida infinita — seus pagamentos não cobrem os juros!"}
                storytelling={resultado.storytelling}
                comparacoes={resultado.comparacoes}
                severidade="chocante"
              />

              <ShareButton
                valor={isFinite(resultado.jurosPagos) ? formatarMoeda(resultado.jurosPagos) : "uma fortuna"}
                pagina="perda-cartao"
              />

              <AdBanner formato="horizontal" className="mt-2" />
            </>
          ) : (
            <div className="bg-surface-container-highest/60 backdrop-blur-md rounded-xl p-8 md:p-10 relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center justify-center text-center py-8">
                <AlertTriangle className="w-16 h-16 text-on-surface-variant/20 mb-4" />
                <p className="text-on-surface-variant text-lg">Preencha os campos ao lado para ver o impacto</p>
              </div>
            </div>
          )}

          {/* Interest Trap Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center">
                  <Lock className="text-tertiary w-5 h-5" />
                </div>
                <h4 className="font-bold">A Armadilha dos Juros</h4>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                O pagamento mínimo é desenhado para manter você na dívida. Em 5 meses, os juros acumulados já superam o valor principal da sua compra original.
              </p>
            </div>
            <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <PieChart className="text-secondary w-5 h-5" />
                </div>
                <h4 className="font-bold">Juros sobre Juros</h4>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Cada mês sem quitar a dívida, os juros são calculados sobre o saldo atualizado — incluindo os juros anteriores. É uma bola de neve financeira.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Narrative Section */}
      <section className="mt-24 max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Anatomia do Prejuízo</h2>
        <div className="space-y-12">
          <div className="flex gap-6">
            <span className="text-primary font-bold text-lg">01.</span>
            <div>
              <h4 className="text-on-surface font-bold mb-2">A ilusão do parcelamento</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Cada parcela carrega consigo um prêmio de risco embutido. Quando você acumula vários "pequenos" parcelamentos, o volume total exposto aos juros do cartão cria um efeito de avalanche.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <span className="text-primary font-bold text-lg">02.</span>
            <div>
              <h4 className="text-on-surface font-bold mb-2">O gatilho do rotativo</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Uma falha no pagamento total aciona taxas que chegam a 400% ao ano. Isso não é uma taxa de mercado, é uma penalidade severa sobre o seu futuro.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <span className="text-primary font-bold text-lg">03.</span>
            <div>
              <h4 className="text-on-surface font-bold mb-2">A saída inteligente</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Negocie o valor total, busque portabilidade de crédito ou um empréstimo pessoal com taxa menor. Cada dia no rotativo é dinheiro queimado.</p>
            </div>
          </div>
        </div>
      </section>

      <AdBanner formato="horizontal" className="mt-16" />
    </div>
  );
}
