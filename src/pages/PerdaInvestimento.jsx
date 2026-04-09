import { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import ResultCard from '../components/ResultCard';
import ShareButtons from '../components/ShareButtons';
import AdBanner from '../components/AdBanner';
import { calcInvestmentLoss, formatCurrency, INVESTMENT_LABELS } from '../utils/calculators';
import PresetButton from '../components/PresetButton';

export default function PerdaInvestimento() {
  const currentYear = new Date().getFullYear();
  const [initialValue, setInitialValue] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [startYear, setStartYear] = useState(2015);
  const [investmentType, setInvestmentType] = useState('cdi');

  const result = useMemo(() => {
    if (initialValue === '' || startYear === '' || initialValue <= 0 || startYear < 1900 || startYear >= currentYear) return null;
    return calcInvestmentLoss(Number(initialValue), Number(monthlyContribution || 0), Number(startYear), investmentType);
  }, [initialValue, monthlyContribution, startYear, investmentType, currentYear]);

  // Calculate comparison across all investment types
  const allResults = useMemo(() => {
    if (initialValue === '' || startYear === '' || initialValue <= 0 || startYear < 1900 || startYear >= currentYear) return [];
    return Object.keys(INVESTMENT_LABELS).map(type => ({
      type,
      ...INVESTMENT_LABELS[type],
      result: calcInvestmentLoss(Number(initialValue), Number(monthlyContribution || 0), Number(startYear), type),
    }));
  }, [initialValue, monthlyContribution, startYear, currentYear]);

  return (
    <>
      <SEO
        title="Simulador de Investimento Perdido"
        description="Descubra quanto dinheiro você perdeu por não investir. Calcule quanto teria hoje na poupança, CDI, Ibovespa ou Bitcoin com juros compostos."
        path="/perda-poupanca"
      />

      <div className="mx-auto px-4 py-8">
        <div className="mb-8 text-center flex flex-col items-center">
          <span className="text-4xl mb-4 block text-center">📉</span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-100 mb-3">
            Investimento <span className="text-red-400">Perdido</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Se você tivesse investido, quanto teria hoje? 
            <span className="text-gray-300 font-medium"> A resposta pode doer.</span>
          </p>
        </div>

        {/* Input Form */}
        <div className="glass-card p-6 md:p-8 mb-12 lg:mb-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="input-initial-value" className="block text-sm font-medium text-gray-300 mb-2">
                💰 Valor inicial (R$)
              </label>
              <input
                type="number"
                className="input-dark text-center"
                value={initialValue}
                onChange={(e) => setInitialValue(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                placeholder="Ex: 1000"
                min="0"
                id="input-initial-value"
              />
            </div>
            
            <div>
              <label htmlFor="input-monthly" className="block text-sm font-medium text-gray-300 mb-2">
                📅 Aporte mensal (R$)
              </label>
              <input
                type="number"
                className="input-dark text-center"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                placeholder="Ex: 200"
                min="0"
                id="input-monthly"
              />
            </div>
            
            <div>
              <label htmlFor="input-start-year" className="block text-sm font-medium text-gray-300 mb-2">
                📆 Ano inicial
              </label>
              <input
                type="number"
                className="input-dark text-center"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="Ex: 2015"
                min="1995"
                max={currentYear - 1}
                id="input-start-year"
              />
            </div>
            
            <div>
              <p className="block text-sm font-medium text-gray-300 mb-2">
                📈 Tipo de investimento
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {Object.entries(INVESTMENT_LABELS).map(([key, { name, emoji }]) => (
                  <PresetButton
                    key={key}
                    onClick={() => setInvestmentType(key)}
                    id={`btn-${key}`}
                    isActive={investmentType === key}
                  >
                    {emoji} {name}
                  </PresetButton>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        {result && result.profit > 0 && (
          <>
            <ResultCard
              value={result.profit}
              label={`Em ${result.years} anos, você perdeu`}
              emoji="😱"
              story={`Se você tivesse investido ${formatCurrency(initialValue)} em ${startYear}${monthlyContribution > 0 ? ` e colocado ${formatCurrency(monthlyContribution)} por mês` : ''}, hoje teria ${formatCurrency(result.finalValue)} em ${INVESTMENT_LABELS[investmentType].name}. Você investiu um total de ${formatCurrency(result.totalInvested)}, mas os juros compostos fariam o trabalho pesado.`}
              details={[
                { label: 'Total investido', value: formatCurrency(result.totalInvested), color: '#9ca3af' },
                { label: 'Teria hoje', value: formatCurrency(result.finalValue), color: '#22c55e' },
                { label: 'Lucro perdido', value: formatCurrency(result.profit), color: '#ef4444' },
                { label: 'Rendimento a.a.', value: `${result.annualRate}%`, color: '#f97316' },
              ]}
            />

            {/* Ad after result (high CTR position) */}
            <div className="my-6">
              <AdBanner format="rectangle" />
            </div>

            {/* Comparison table */}
            <div className="glass-card p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-200 mb-4">📊 Comparação entre investimentos</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th className="text-left py-3 text-gray-400 font-medium">Investimento</th>
                      <th className="text-right py-3 text-gray-400 font-medium">Teria hoje</th>
                      <th className="text-right py-3 text-gray-400 font-medium">Lucro perdido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allResults.map(({ type, name, emoji, color, result: r }) => (
                      <tr key={type} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td className="py-3 font-medium" style={{ color }}>
                          {emoji} {name}
                        </td>
                        <td className="py-3 text-right text-gray-200 font-semibold">
                          {formatCurrency(r.finalValue)}
                        </td>
                        <td className="py-3 text-right font-bold" style={{ color: '#ef4444' }}>
                          {formatCurrency(r.profit)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Share */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">😱 Compartilhe quanto você perdeu:</p>
              <ShareButtons
                value={result.profit}
                simulatorName="investimentos que não fiz"
                path="/perda-poupanca"
              />
            </div>
          </>
        )}

        {/* SEO FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Perguntas frequentes</h2>
          <div className="space-y-4">
            <details className="glass-card p-5 cursor-pointer group">
              <summary className="font-medium text-gray-200 list-none flex justify-between items-center">
                O que são juros compostos?
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                Juros compostos são "juros sobre juros". Quando você investe, os rendimentos gerados 
                também geram rendimentos no período seguinte. Isso cria um efeito bola de neve que 
                multiplica seu dinheiro ao longo do tempo. Quanto mais cedo você começa, maior o impacto.
              </p>
            </details>
            <details className="glass-card p-5 cursor-pointer group">
              <summary className="font-medium text-gray-200 list-none flex justify-between items-center">
                Os cálculos são realistas?
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                Sim! Utilizamos médias históricas reais de cada tipo de investimento. A Poupança rende 
                em média 6,5% a.a., o CDI cerca de 10,8% a.a., e o Ibovespa por volta de 13% a.a. 
                Os valores são aproximados e não consideram impostos e taxas.
              </p>
            </details>
          </div>
        </section>
      </div>
    </>
  );
}
