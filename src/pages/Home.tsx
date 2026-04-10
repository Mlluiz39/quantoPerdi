import { Link } from "react-router-dom";
import { TrendingUp, CreditCard, EyeOff, Waves, Brain, Zap, CheckCircle, LineChart } from "lucide-react";
import SEOHead from "../components/SEOHead";
import AdBanner from "../components/AdBanner";

export default function Home() {
  return (
    <div className="hero-gradient">
      <SEOHead
        titulo="Descubra quanto dinheiro você já perdeu"
        descricao="O choque de realidade que suas finanças precisam. Descubra quanto você perdeu com inflação, juros do cartão, gastos invisíveis e poupança."
        url="/"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 lg:py-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-outline-variant/30 bg-surface-container-low mb-8">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[11px] font-bold tracking-widest uppercase text-on-surface-variant">Mais de 100.000 simulações realizadas</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-on-surface mb-6 max-w-4xl leading-[1.1]">
          O Choque de Realidade que suas <span className="text-primary italic">Finanças</span> Precisam
        </h1>
        
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-12 leading-relaxed">
          Pare de ignorar os custos invisíveis que estão corroendo seu patrimônio. Descubra quanto você deixou na mesa por não agir hoje.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link to="/perda-cartao" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_40px_-5px_rgba(75,226,119,0.3)] transition-all duration-300 active:scale-95">
            Calcular minha perda
          </Link>
          <a href="#calculadoras" className="border border-outline-variant/40 text-on-surface px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-container-low transition-all duration-300">
            Como funciona?
          </a>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl p-8 rounded-3xl bg-surface-container-low/50 backdrop-blur-md">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-4xl md:text-5xl font-black text-secondary tracking-tighter">R$ 847M+</span>
            <span className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mt-2">em perdas calculadas</span>
          </div>
          <div className="flex flex-col items-center md:items-start border-t md:border-t-0 md:border-l border-outline-variant/20 pt-8 md:pt-0 md:pl-8">
            <span className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter">150K+</span>
            <span className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mt-2">mentes despertadas</span>
          </div>
        </div>
      </section>

      <AdBanner formato="horizontal" className="max-w-4xl mx-auto px-6" />

      {/* Calculators Bento Grid */}
      <section id="calculadoras" className="px-6 py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-4">A Ferramenta</h2>
            <h3 className="text-4xl font-bold tracking-tight text-on-surface leading-tight">Escolha sua dor. Encare os números.</h3>
          </div>
          <p className="text-on-surface-variant max-w-xs md:text-right">Selecione uma das nossas calculadoras forenses para começar sua auditoria pessoal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Most Popular - Big Card */}
          <Link to="/perda-poupanca" className="md:col-span-8 group relative overflow-hidden rounded-[2rem] bg-surface-container-low p-8 md:p-12 transition-all hover:bg-surface-container block">
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 rounded-full glass-badge border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">Most Popular</div>
              <h4 className="text-3xl font-bold mb-4">Investimento Perdido</h4>
              <p className="text-on-surface-variant text-lg max-w-md mb-8">Descubra quanto você teria hoje se tivesse começado a investir aquele gasto supérfluo há 5 anos.</p>
              <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                Começar análise <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:opacity-20 transition-opacity">
              <LineChart className="w-[300px] h-[300px]" />
            </div>
          </Link>

          {/* Card 2 - Chocante */}
          <Link to="/perda-cartao" className="md:col-span-4 group rounded-[2rem] bg-surface-container-low p-8 transition-all hover:bg-surface-container border border-transparent hover:border-secondary/10 block">
            <div className="inline-block px-3 py-1 rounded-full bg-secondary-container/40 text-secondary text-[10px] font-black uppercase tracking-widest mb-6">Chocante</div>
            <h4 className="text-2xl font-bold mb-4">Juros do Cartão</h4>
            <p className="text-on-surface-variant mb-8">O verdadeiro custo de empurrar a dívida com a barriga. Uma visualização brutal dos juros compostos negativos.</p>
            <CreditCard className="w-10 h-10 text-secondary" />
          </Link>

          {/* Card 3 - Revelador */}
          <Link to="/perda-gastos" className="md:col-span-4 group rounded-[2rem] bg-surface-container-low p-8 transition-all hover:bg-surface-container block">
            <div className="inline-block px-3 py-1 rounded-full bg-primary-container/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">Revelador</div>
            <h4 className="text-2xl font-bold mb-4">Gastos Invisíveis</h4>
            <p className="text-on-surface-variant mb-8">Streamings, anuidades e taxas que você nem percebe, mas que somam uma pequena fortuna anualmente.</p>
            <EyeOff className="w-10 h-10 text-primary" />
          </Link>

          {/* Card 4 - Silencioso */}
          <Link to="/perda-inflacao" className="md:col-span-8 group relative overflow-hidden rounded-[2rem] bg-surface-container-low p-8 md:p-12 transition-all hover:bg-surface-container block">
            <div className="flex flex-col md:flex-row md:items-center justify-between h-full">
              <div className="relative z-10 md:max-w-md">
                <div className="inline-block px-3 py-1 rounded-full glass-badge border border-on-surface-variant/20 text-on-surface-variant text-[10px] font-black uppercase tracking-widest mb-6">Silencioso</div>
                <h4 className="text-3xl font-bold mb-4">Perda com Inflação</h4>
                <p className="text-on-surface-variant text-lg mb-8">Dinheiro parado é dinheiro derretendo. Veja o quanto seu poder de compra foi corroído nos últimos anos.</p>
              </div>
              <div className="flex items-center justify-center p-6 bg-surface-container-high rounded-3xl mt-8 md:mt-0">
                <Waves className="w-16 h-16 text-on-surface-variant/40" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <AdBanner formato="retangulo" className="max-w-xl mx-auto px-6" />

      {/* Value Prop */}
      <section className="px-6 py-24 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-surface-container-high flex items-center justify-center">
              <div className="text-center p-8">
                <span className="text-8xl md:text-9xl font-black text-secondary/20">😱</span>
                <p className="text-on-surface-variant mt-4 font-bold text-xl">O choque que você precisa</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 glass-badge p-8 rounded-3xl border border-outline-variant/20 max-w-xs">
              <p className="text-xl font-bold text-on-surface italic">"A ignorância é cara. A consciência é o melhor investimento."</p>
            </div>
          </div>
          
          <div className="space-y-12">
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">Por que encarar a <span className="text-secondary">verdade</span> agora?</h3>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-xl font-bold mb-2">Consciência financeira</h5>
                  <p className="text-on-surface-variant">Transforme números abstratos em metas reais. Quando você vê o que perde, entende o que pode ganhar.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-xl font-bold mb-2">Motivação para investir</h5>
                  <p className="text-on-surface-variant">O "choque" é o catalisador necessário para sair da inércia e começar a construir seu futuro hoje.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-xl font-bold mb-2">Decisões melhores</h5>
                  <p className="text-on-surface-variant">Baseie suas escolhas em dados forenses, não em impulsos. Proteja seu patrimônio dos inimigos silenciosos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
