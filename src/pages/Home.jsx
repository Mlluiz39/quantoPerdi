import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AdBanner from '../components/AdBanner';

const simulators = [
  {
    path: '/perda-poupanca',
    emoji: '📉',
    title: 'Investimento Perdido',
    description: 'Quanto você teria hoje se tivesse investido?',
    gradient: 'from-red-500 to-orange-500',
    tag: 'Mais popular',
  },
  {
    path: '/perda-cartao',
    emoji: '💳',
    title: 'Juros do Cartão',
    description: 'Quanto você realmente paga com os juros do rotativo?',
    gradient: 'from-orange-500 to-amber-500',
    tag: 'Chocante',
  },
  {
    path: '/gastos-invisiveis',
    emoji: '🚬',
    title: 'Gastos Invisíveis',
    description: 'Aquele "gasto pequeno" que devora seu dinheiro.',
    gradient: 'from-purple-500 to-pink-500',
    tag: 'Revelador',
  },
  {
    path: '/perda-inflacao',
    emoji: '📊',
    title: 'Perda com Inflação',
    description: 'Quanto seu dinheiro perdeu de valor sem você perceber?',
    gradient: 'from-blue-500 to-cyan-500',
    tag: 'Silencioso',
  },
];

export default function Home() {
  return (
    <>
      <SEO
        title="Descubra quanto dinheiro você já perdeu"
        description="Simuladores financeiros gratuitos que revelam quanto dinheiro você perdeu por não investir, por pagar juros, ou por gastos do dia a dia. Abra os olhos agora."
        path="/"
      />

      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Clean background */}
        <div className="absolute inset-0 pointer-events-none bg-dark-900/50" />
        
        <div className="text-center px-4 max-w-3xl mx-auto  relative z-10">
          <div className="text-5xl md:text-6xl mb-4" role="img" aria-hidden="true">💸</div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Descubra quanto
            <br />
            <span className="text-red-500">
              dinheiro você perdeu
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
            Aquele dinheiro que <strong className="text-gray-200">já era</strong>. 
            Gastos invisíveis, juros que engoliram seu salário, investimentos que você não fez.
            <br />
            <span className="text-red-400 font-medium mb-2">A conta chega agora.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/perda-poupanca" className="btn-primary text-center no-underline text-lg px-8 py-4">
              Calcular minha perda →
            </Link>
            <a href="#simuladores" className="btn-secondary text-center no-underline text-lg px-8 py-4">
              Ver simuladores
            </a>
          </div>
          
          <p className="mt-6 text-xs text-gray-600">
            Mais de 100.000 simulações realizadas
          </p>
        </div>
      </section>

      {/* Ad space */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <AdBanner format="leaderboard" />
      </div>

      {/* Simulators Grid */}
      <section id="simuladores" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-3">
            Escolha sua <span className="text-red-400">dor</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Cada simulador revela uma verdade que você talvez preferia não saber.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full justify-items-stretch">
          {simulators.map((sim) => (
            <Link
              key={sim.path}
              to={sim.path}
              className="glass-card p-6 no-underline group block w-full h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300 inline-block">
                  {sim.emoji}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full border border-gray-700/50 bg-white/5 text-gray-300">
                  {sim.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-red-400 transition-colors">
                {sim.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {sim.description}
              </p>
              <div className="mt-4 text-sm font-medium text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Simular agora →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="glass-card p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center w-full">
            <div>
              <div className="text-3xl md:text-4xl font-black text-red-400 mb-2">R$ 847M+</div>
              <p className="text-sm text-gray-400">em perdas calculadas</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-orange-400 mb-2">150K+</div>
              <p className="text-sm text-gray-400">simulações realizadas</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-amber-400 mb-2">42%</div>
              <p className="text-sm text-gray-400">começaram a investir depois</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-100 mb-8">
            Por que você precisa saber quanto perdeu?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full justify-items-stretch">
            <div className="glass-card p-5 w-full h-full">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">🧠 Consciência financeira</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                A maioria das pessoas não faz ideia de quanto dinheiro perdeu ao longo da vida. 
                Saber o número exato é o primeiro passo para mudar seus hábitos financeiros.
              </p>
            </div>
            <div className="glass-card p-5 w-full h-full">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">📈 Motivação para investir</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Ver o quanto você já perdeu cria uma urgência real. 
                Diferente de promessas de ganho futuro, a perda passada é concreta e motivadora.
              </p>
            </div>
            <div className="glass-card p-5 w-full h-full">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">💡 Educação financeira</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Nossos simuladores explicam juros compostos, inflação e gastos invisíveis 
                de forma visual e intuitiva. Aprenda enquanto descobre.
              </p>
            </div>
            <div className="glass-card p-5 w-full h-full">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">🎯 Decisões melhores</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Com dados reais baseados em índices históricos (IPCA, CDI, Ibovespa), 
                você toma decisões financeiras mais informadas a partir de agora.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <AdBanner format="leaderboard" />
      </div>
    </>
  );
}
