import { useState, useMemo } from 'react';
import { Calculator, TrendingDown, ShoppingBasket, History, EyeOff, ShieldCheck } from 'lucide-react';
import { calcularPerdaInflacao, parseMoeda, parseNumero, formatarMoeda, formatarPercentual } from '../lib/calculators';
import ResultCard from '../components/ResultCard';
import ShareButton from '../components/ShareButton';
import AdBanner from '../components/AdBanner';
import SEOHead from '../components/SEOHead';

export default function Inflacao() {
  const [valor, setValor] = useState('100000');
  const [anos, setAnos] = useState('10');
  const [taxa, setTaxa] = useState('6.5');

  const resultado = useMemo(() => {
    return calcularPerdaInflacao(
      parseMoeda(valor),
      parseNumero(anos),
      parseNumero(taxa)
    );
  }, [valor, anos, taxa]);

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12 flex flex-col gap-16">
      <SEOHead
        titulo="Simulador de Perda com Inflação"
        descricao="Descubra quanto poder de compra você perdeu com a inflação. Simule o impacto corrosivo da inflação no seu patrimônio."
        url="/perda-inflacao"
      />

      {/* Hero & Intent */}
      <section className="flex flex-col gap-4 text-left">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-secondary-container/20 text-secondary text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md">Diagnóstico Financeiro</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-on-background max-w-2xl">
          Simulador Perda <span className="text-secondary">Inflação</span>
        </h1>
        <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
          Descubra o impacto corrosivo da inflação no seu patrimônio e entenda por que deixar o dinheiro parado é um prejuízo silencioso.
        </p>
      </section>

      {/* Main Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calculator Card */}
        <div className="lg:col-span-5 bg-surface-container-low rounded-xl p-8 flex flex-col gap-8 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-on-surface">Parâmetros de Análise</h2>
            <div className="h-1 w-12 bg-primary rounded-full"></div>
          </div>
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant opacity-70">Valor Inicial (R$)</label>
              <input
                className="bg-transparent border-b border-outline-variant focus:border-primary outline-none py-3 text-2xl font-bold transition-all placeholder:text-surface-variant"
                placeholder="Ex: 100.000"
                type="text"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant opacity-70">Tempo de Espera (Anos)</label>
              <input
                className="bg-transparent border-b border-outline-variant focus:border-primary outline-none py-3 text-2xl font-bold transition-all placeholder:text-surface-variant"
                placeholder="Ex: 10"
                type="text"
                value={anos}
                onChange={(e) => setAnos(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant opacity-70">Taxa de Inflação Anual (%)</label>
              <input
                className="bg-transparent border-b border-outline-variant focus:border-primary outline-none py-3 text-2xl font-bold transition-all placeholder:text-surface-variant"
                placeholder="Ex: 6.50"
                type="text"
                value={taxa}
                onChange={(e) => setTaxa(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Result Card */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {resultado ? (
            <>
              {/* Main Impact Display */}
              <ResultCard
                titulo="Poder de Compra Perdido"
                valor={resultado.perdaAbsoluta}
                subtitulo={`Em ${parseNumero(anos)} anos de inércia`}
                storytelling={resultado.storytelling}
                comparacoes={resultado.comparacoes}
                severidade="chocante"
              />

              {/* Secondary details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container rounded-xl p-6 flex flex-col gap-4 border border-outline-variant/10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Percentual Perdido</span>
                    <TrendingDown className="text-secondary w-5 h-5" />
                  </div>
                  <span className="text-4xl font-extrabold tracking-tighter text-secondary">
                    -{formatarPercentual(resultado.percentualPerdido)}
                  </span>
                </div>
                <div className="bg-surface-container rounded-xl p-6 flex flex-col gap-4 border border-outline-variant/10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Valor Real</span>
                    <ShoppingBasket className="text-tertiary w-5 h-5" />
                  </div>
                  <span className="text-4xl font-extrabold tracking-tighter text-on-surface">
                    {formatarMoeda(resultado.powerCompra)}
                  </span>
                </div>
              </div>

              <ShareButton
                valor={formatarMoeda(resultado.perdaAbsoluta)}
                pagina="perda-inflacao"
              />

              <AdBanner formato="horizontal" />
            </>
          ) : (
            <div className="bg-surface-container-highest/40 backdrop-blur-xl rounded-xl p-8 flex items-center justify-center min-h-[200px]">
              <p className="text-on-surface-variant text-lg text-center">Preencha os campos para ver o impacto da inflação</p>
            </div>
          )}
        </div>
      </div>

      {/* Silent Tax Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 border-t border-outline-variant/20">
        <div className="flex flex-col gap-6">
          <h3 className="text-3xl font-bold tracking-tight text-on-background italic">O Imposto Silencioso</h3>
          <p className="text-on-surface-variant leading-relaxed">
            A inflação é frequentemente chamada de "imposto oculto". Diferente dos impostos declarados, ela não aparece no seu contracheque, mas remove riqueza de cada nota em sua carteira todos os dias.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-surface-container-high">
                <EyeOff className="text-secondary w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-on-surface">Invisibilidade</p>
                <p className="text-sm text-on-surface-variant">Você mantém o mesmo número de notas, mas elas compram cada vez menos.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-surface-container-high">
                <ShieldCheck className="text-primary w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-on-surface">Proteção de Ativos</p>
                <p className="text-sm text-on-surface-variant">Somente ativos que rendem acima do IPCA/IGP-M protegem seu futuro.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low rounded-2xl p-10 flex flex-col items-center text-center gap-4">
          <History className="text-primary w-12 h-12" />
          <h4 className="text-xl font-bold">A inércia custa caro</h4>
          <p className="text-on-surface-variant text-sm leading-relaxed">Ao não investir, você está efetivamente pagando para manter seu dinheiro parado. Cada ano parado é patrimônio destruído.</p>
        </div>
      </section>
    </div>
  );
}
