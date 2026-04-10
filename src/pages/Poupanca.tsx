import { useState, useMemo } from 'react';
import { TrendingDown, ShoppingCart, Plane, ShieldAlert, EyeOff, ArrowRight } from 'lucide-react';
import { calcularPerdaPoupanca, parseMoeda, parseNumero, formatarMoeda, formatarPercentual } from '../lib/calculators';
import ResultCard from '../components/ResultCard';
import ShareButton from '../components/ShareButton';
import AdBanner from '../components/AdBanner';
import SEOHead from '../components/SEOHead';

export default function Poupanca() {
  const [valor, setValor] = useState('50000');
  const [aporte, setAporte] = useState('500');
  const [anos, setAnos] = useState('5');

  const resultado = useMemo(() => {
    return calcularPerdaPoupanca(
      parseMoeda(valor),
      parseMoeda(aporte),
      parseNumero(anos)
    );
  }, [valor, aporte, anos]);

  return (
    <div className="px-6 pt-12 space-y-16 max-w-7xl mx-auto">
      <SEOHead
        titulo="Simulador de Perda na Poupança"
        descricao="Descubra quanto você perdeu por deixar dinheiro na poupança. Compare poupança vs CDI vs renda fixa e veja quanto deixou na mesa."
        url="/perda-poupanca"
      />

      {/* Hero Header */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container rounded-md glass-effect">
          <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Alerta de Patrimônio</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-on-surface">
          O Silêncio que Consome seu <span className="text-secondary">Patrimônio</span>
        </h1>
        <p className="text-on-surface-variant text-lg max-w-md">
          A caderneta de poupança é um vazamento silencioso. Enquanto você acredita estar poupando, a inflação drena seu poder de compra dia após dia.
        </p>
      </section>

      {/* Calculator Section */}
      <section className="bg-surface-container-low rounded-xl p-8 space-y-8 max-w-2xl">
        <div className="space-y-6">
          <div className="relative">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Valor Investido (R$)</label>
            <input
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-2xl font-bold p-0 pb-2 text-on-surface placeholder:text-surface-variant"
              placeholder="50.000"
              type="text"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>
          <div className="relative">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Aporte Mensal (R$)</label>
            <input
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-2xl font-bold p-0 pb-2 text-on-surface placeholder:text-surface-variant"
              placeholder="500"
              type="text"
              value={aporte}
              onChange={(e) => setAporte(e.target.value)}
            />
          </div>
          <div className="relative">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Tempo (Anos)</label>
            <input
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-2xl font-bold p-0 pb-2 text-on-surface placeholder:text-surface-variant"
              placeholder="5"
              type="text"
              value={anos}
              onChange={(e) => setAnos(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Impact Result */}
      {resultado ? (
        <>
          <section className="space-y-6 max-w-4xl">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant">Resultado do Diagnóstico</h3>

            <ResultCard
              titulo="Dinheiro Deixado na Mesa"
              valor={resultado.perdaPoupancaVsRendaFixa}
              subtitulo={`${formatarPercentual(resultado.percentualPerdido)} a menos que investimento inteligente`}
              storytelling={resultado.storytelling}
              comparacoes={resultado.comparacoes}
              severidade="chocante"
            />

            {/* Comparison cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-surface-container-low rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Poupança</span>
                <p className="text-xl font-bold text-on-surface">{formatarMoeda(resultado.totalPoupanca)}</p>
                <span className="text-xs text-on-surface-variant">~7.1% a.a.</span>
              </div>
              <div className="p-6 bg-surface-container-low rounded-xl space-y-2 border border-primary/10">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">CDI / Selic</span>
                <p className="text-xl font-bold text-primary">{formatarMoeda(resultado.totalCDI)}</p>
                <span className="text-xs text-primary/70">~13.25% a.a.</span>
              </div>
              <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Renda Fixa (CDB 110%)</span>
                <p className="text-xl font-bold text-primary">{formatarMoeda(resultado.totalRendaFixa)}</p>
                <span className="text-xs text-primary/70">~14.5% a.a.</span>
              </div>
            </div>

            {/* Delta highlight */}
            <div className="flex items-center gap-4 p-6 bg-secondary/5 border border-secondary/20 rounded-xl">
              <ArrowRight className="text-secondary w-8 h-8 flex-shrink-0" />
              <div>
                <p className="font-bold text-on-surface text-lg">Diferença Poupança vs CDI</p>
                <p className="text-secondary text-2xl font-black">{formatarMoeda(resultado.perdaPoupancaVsCDI)}</p>
              </div>
            </div>
          </section>

          <ShareButton
            valor={formatarMoeda(resultado.perdaPoupancaVsRendaFixa)}
            pagina="perda-poupanca"
            className="max-w-4xl"
          />

          <AdBanner formato="horizontal" className="max-w-4xl" />

          {/* Opportunity Cost Visualization */}
          <section className="space-y-8 max-w-4xl">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant">O que você está perdendo</h3>
            <div className="grid grid-cols-1 gap-4">
              {resultado.comparacoes.map((comp, i) => (
                <div key={i} className="flex items-center gap-6 p-4 bg-surface-container-low rounded-xl">
                  <div className="w-14 h-14 rounded-full bg-secondary-container/30 flex items-center justify-center shrink-0">
                    <span className="text-2xl">{comp.emoji}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">{comp.descricao}</h4>
                    <p className="text-sm text-on-surface-variant">Valor que a poupança destruiu silenciosamente.</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="max-w-4xl">
          <div className="bg-surface-container-highest/40 rounded-xl p-8 flex items-center justify-center min-h-[200px]">
            <p className="text-on-surface-variant text-lg text-center">Preencha os campos acima para ver o diagnóstico</p>
          </div>
        </section>
      )}

      {/* Educational Content */}
      <section className="space-y-8 max-w-4xl">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant">A Anatomia de um Crime Financeiro</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 md:h-[400px]">
          <div className="md:col-span-4 bg-surface-container-high rounded-xl p-6 flex flex-col justify-end min-h-[200px]">
            <ShieldAlert className="text-primary mb-4 w-6 h-6" />
            <h4 className="font-bold text-lg leading-tight">Falsa Liquidez</h4>
            <p className="text-xs text-on-surface-variant mt-2">A facilidade de resgate esconde a destruição lenta do seu capital.</p>
          </div>
          <div className="md:col-span-2 bg-surface-container-low rounded-xl p-6 flex flex-col justify-center items-center text-center min-h-[200px]">
            <span className="text-5xl font-black text-secondary">70%</span>
            <span className="text-[10px] font-bold uppercase mt-2">dos brasileiros usam só poupança</span>
          </div>
          <div className="md:col-span-2 bg-surface-container-low rounded-xl p-6 flex items-center justify-center min-h-[200px]">
            <EyeOff className="text-on-surface-variant w-12 h-12" />
          </div>
          <div className="md:col-span-4 bg-primary/10 rounded-xl p-6 flex flex-col justify-end min-h-[200px]">
            <h4 className="font-bold text-lg leading-tight text-primary">Custos Ocultos</h4>
            <p className="text-xs text-primary/80 mt-2">O spread bancário que você paga sem nunca ver uma fatura. Bancos lucram com sua inércia.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-12 max-w-4xl">
        <div className="p-8 bg-gradient-to-br from-primary-container to-primary rounded-xl text-on-primary-container space-y-6">
          <h3 className="text-2xl font-black tracking-tight leading-tight">Pronto para parar de perder dinheiro?</h3>
          <p className="text-sm font-medium opacity-90">Abra uma conta em uma corretora, invista em CDB ou Tesouro Direto. O primeiro passo é sair da poupança.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="https://www.tesourodireto.com.br/" target="_blank" rel="noopener noreferrer" className="bg-on-primary-container text-primary-container font-black uppercase tracking-widest py-4 rounded-md shadow-lg hover:opacity-90 transition-opacity text-center text-sm">
              Tesouro Direto
            </a>
            <a href="https://www.nuinvest.com.br/" target="_blank" rel="noopener noreferrer" className="bg-on-primary-container/80 text-primary-container font-black uppercase tracking-widest py-4 rounded-md shadow-lg hover:opacity-90 transition-opacity text-center text-sm">
              Abrir Conta Corretora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
