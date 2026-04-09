import { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import ResultCard from '../components/ResultCard';
import ShareButtons from '../components/ShareButtons';
import AdBanner from '../components/AdBanner';
import { calcCreditCardDebt, formatCurrency } from '../utils/calculators';

export default function PerdaCartao() {
  const [debtValue, setDebtValue] = useState(3000);
  const [monthlyRate, setMonthlyRate] = useState(14);
  const [months, setMonths] = useState(12);

  const result = useMemo(() => {
    if (debtValue === '' || monthlyRate === '' || months === '' || debtValue <= 0 || monthlyRate <= 0 || months <= 0) return null;
    return calcCreditCardDebt(Number(debtValue), Number(monthlyRate), Number(months));
  }, [debtValue, monthlyRate, months]);

  // Common rate presets
  const ratePresets = [
    { label: 'Rotativo médio', rate: 14, emoji: '🔥' },
    { label: 'Rotativo alto', rate: 18, emoji: '💀' },
    { label: 'Parcelamento', rate: 8, emoji: '📋' },
    { label: 'Empréstimo pessoal', rate: 4, emoji: '🏦' },
  ];

  return (
    <>
      <SEO
        title="Simulador de Juros do Cartão de Crédito"
        description="Calcule quanto você realmente paga com juros do cartão de crédito. Veja o efeito devastador dos juros compostos na sua dívida. Simulador gratuito."
        path="/perda-cartao"
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 ">
          <span className="text-4xl mb-4 block">💳</span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-100 mb-3">
            Juros do <span className="text-red-400">Cartão</span>
          </h1>
          <p className="text-gray-400 text-lg">
            O rotativo do cartão é a maior armadilha financeira do Brasil.
            <span className="text-red-400 font-medium"> Veja quanto você realmente paga.</span>
          </p>
        </div>

        {/* Input Form */}
        <div className="glass-card p-6 md:p-8 mb-6 " >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label htmlFor="input-debt" className="block text-sm font-medium text-gray-300 mb-2">
                💰 Valor da dívida (R$)
              </label>
              <input
                type="number"
                className="input-dark"
                value={debtValue}
                onChange={(e) => setDebtValue(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                placeholder="Ex: 3000"
                min="0"
                id="input-debt"
              />
            </div>
            
            <div>
              <label htmlFor="input-rate" className="block text-sm font-medium text-gray-300 mb-2">
                📈 Juros mensal (%)
              </label>
              <input
                type="number"
                className="input-dark"
                value={monthlyRate}
                onChange={(e) => setMonthlyRate(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                placeholder="Ex: 14"
                min="0"
                step="0.1"
                id="input-rate"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {ratePresets.map((preset) => (
                  <button
                    key={preset.rate}
                    onClick={() => setMonthlyRate(preset.rate)}
                    className="text-xs px-2 py-1 rounded-md cursor-pointer transition-all border-none"
                    style={{
                      background: monthlyRate === preset.rate ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)',
                      color: monthlyRate === preset.rate ? '#ef4444' : '#6b7280',
                    }}
                  >
                    {preset.emoji} {preset.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="input-months" className="block text-sm font-medium text-gray-300 mb-2">
                📅 Tempo (meses)
              </label>
              <input
                type="number"
                className="input-dark"
                value={months}
                onChange={(e) => setMonths(e.target.value === '' ? '' : Math.max(1, Math.min(120, Number(e.target.value))))}
                placeholder="Ex: 12"
                min="1"
                max="120"
                id="input-months"
              />
              <div className="flex gap-2 mt-2">
                {[6, 12, 24, 36].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMonths(m)}
                    className="text-xs px-2 py-1 rounded-md cursor-pointer transition-all border-none"
                    style={{
                      background: months === m ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)',
                      color: months === m ? '#ef4444' : '#6b7280',
                    }}
                  >
                    {m} meses
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        {result && (
          <>
            <ResultCard
              value={result.interestPaid}
              label="Só em juros você pagou"
              emoji="🤮"
              story={`Uma dívida de ${formatCurrency(debtValue)} com juros de ${monthlyRate}% ao mês se transforma em ${formatCurrency(result.totalPaid)} após ${months} meses. Você pagou ${result.multiplier}x o valor original. O dinheiro dos juros foi direto pro banco.`}
              details={[
                { label: 'Dívida original', value: formatCurrency(debtValue), color: '#9ca3af' },
                { label: 'Total pago', value: formatCurrency(result.totalPaid), color: '#ef4444' },
                { label: 'Juros pagos', value: formatCurrency(result.interestPaid), color: '#f87171' },
                { label: 'Multiplicador', value: `${result.multiplier}x`, color: '#f97316' },
              ]}
            />

            {/* Growth visualization */}
            <div className="glass-card p-6 mt-6 " >
              <h3 className="text-lg font-bold text-gray-200 mb-4">📈 Evolução da dívida mês a mês</h3>
              <div className="space-y-2">
                {[1, 3, 6, 12, 18, 24, 36].filter(m => m <= months).map((m) => {
                  const r = calcCreditCardDebt(debtValue, monthlyRate, m);
                  const barWidth = Math.min((r.totalPaid / result.totalPaid) * 100, 100);
                  return (
                    <div key={m} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-16 text-right shrink-0">{m} {m === 1 ? 'mês' : 'meses'}</span>
                      <div className="flex-1 h-6 rounded-md overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div
                          className="h-full rounded-md transition-all duration-700"
                          style={{
                            width: `${barWidth}%`,
                            background: `linear-gradient(90deg, #ef4444, #f97316)`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-300 w-24 text-right shrink-0">
                        {formatCurrency(r.totalPaid)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ad after result */}
            <div className="my-6">
              <AdBanner format="rectangle" />
            </div>

            {/* Tip card */}
            <div className="glass-card p-6 mt-6" style={{ borderColor: 'rgba(34, 197, 94, 0.2)' }}>
              <h3 className="text-lg font-bold text-green-400 mb-2">💡 Dica: como sair dessa</h3>
              <ul className="text-sm text-gray-400 space-y-2 list-none">
                <li>✅ Negocie a dívida diretamente com o banco (descontos de até 70%)</li>
                <li>✅ Troque o rotativo por um empréstimo com juros menores</li>
                <li>✅ Use o método avalanche: pague primeiro a dívida com maior juros</li>
                <li>✅ Considere portabilidade de crédito para taxas menores</li>
              </ul>
            </div>

            {/* Share */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">🤯 Compartilhe esse absurdo:</p>
              <ShareButtons
                value={result.interestPaid}
                simulatorName="juros do cartão de crédito"
                path="/perda-cartao"
              />
            </div>
          </>
        )}

        {/* SEO */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Perguntas frequentes</h2>
          <div className="space-y-4">
            <details className="glass-card p-5 cursor-pointer group">
              <summary className="font-medium text-gray-200 list-none flex justify-between items-center">
                Qual a taxa média do rotativo do cartão?
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                Em 2024, a taxa média do rotativo do cartão de crédito no Brasil ficou em torno de 
                14% ao mês (431% ao ano). Essa é uma das taxas mais altas do mundo, o que torna o 
                rotativo uma das piores formas de dívida que você pode ter.
              </p>
            </details>
            <details className="glass-card p-5 cursor-pointer group">
              <summary className="font-medium text-gray-200 list-none flex justify-between items-center">
                Como os juros compostos aumentam a dívida?
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                No cartão de crédito, os juros compostos trabalham contra você. A cada mês, os juros 
                incidem sobre o valor original mais os juros acumulados dos meses anteriores. 
                Uma dívida de R$ 1.000 a 14% ao mês vira mais de R$ 4.800 em apenas 12 meses.
              </p>
            </details>
          </div>
        </section>
      </div>
    </>
  );
}
