import { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import ResultCard from '../components/ResultCard';
import ShareButtons from '../components/ShareButtons';
import AdBanner from '../components/AdBanner';
import { calcInvisibleExpenses, formatCurrency, EXPENSE_PRESETS } from '../utils/calculators';
import PresetButton from '../components/PresetButton';

export default function GastosInvisiveis() {
  const [amount, setAmount] = useState(15);
  const [frequency, setFrequency] = useState('daily');
  const [selectedPreset, setSelectedPreset] = useState(null);

  const result = useMemo(() => {
    if (amount === '' || amount <= 0) return null;
    return calcInvisibleExpenses(Number(amount), frequency);
  }, [amount, frequency]);

  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset.name);
    if (preset.frequency === 'daily') {
      setFrequency('daily');
      setAmount(preset.dailyValue);
    } else {
      setFrequency('monthly');
      setAmount(preset.monthlyValue);
    }
  };

  const timelineItems = result ? [
    { period: '1 mês', value: result.monthly, emoji: '📅' },
    { period: '6 meses', value: result.sixMonths, emoji: '📆' },
    { period: '1 ano', value: result.yearly, emoji: '🗓️' },
    { period: '5 anos', value: result.fiveYears, emoji: '⏳' },
    { period: '10 anos', value: result.tenYears, emoji: '💀' },
  ] : [];

  return (
    <>
      <SEO
        title="Calculadora de Gastos Invisíveis"
        description="Descubra quanto você perde com gastos diários que parecem inofensivos. Café, cigarro, delivery — pequenos gastos que viram fortunas perdidas."
        path="/gastos-invisiveis"
      />

      <div className="mx-auto px-4 py-8">
        <div className="mb-8 text-center flex flex-col items-center">
          <span className="text-4xl mb-4 block text-center">🚬</span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-100 mb-3">
            Gastos <span className="text-red-400">Invisíveis</span>
          </h1>
          <p className="text-gray-400 text-lg">
            "É só um cafézinho." "É só um delivery." 
            <span className="text-red-400 font-medium"> Errado. É uma fortuna escorrendo pelo ralo.</span>
          </p>
        </div>

        {/* Presets */}
        <div className="mb-6 text-center">
          <p className="text-sm font-medium text-gray-400 mb-3">Escolha um gasto comum:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {EXPENSE_PRESETS.map((preset) => (
              <PresetButton
                key={preset.name}
                onClick={() => handlePresetSelect(preset)}
                id={`preset-${preset.name.toLowerCase().replace(/\s/g, '-')}`}
                isActive={selectedPreset === preset.name}
              >
                {preset.emoji} {preset.name}
              </PresetButton>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div className="glass-card p-6 md:p-8 mb-12 lg:mb-16 text-center" >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="input-amount" className="block text-sm font-medium text-gray-300 mb-2">
                💰 Valor do gasto (R$)
              </label>
              <input
                type="number"
                className="input-dark text-center"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)));
                  setSelectedPreset(null);
                }}
                placeholder="Ex: 15"
                min="0"
                step="0.5"
                id="input-amount"
              />
            </div>
            
            <div>
              <p className="block text-sm font-medium text-gray-300 mb-2">
                🔄 Frequência
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setFrequency('daily')}
                  className="flex-1 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all border-none"
                  style={{
                    background: frequency === 'daily' ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)',
                    color: frequency === 'daily' ? '#ef4444' : '#9ca3af',
                  }}
                  id="btn-daily"
                >
                  Diário
                </button>
                <button
                  onClick={() => setFrequency('monthly')}
                  className="flex-1 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all border-none"
                  style={{
                    background: frequency === 'monthly' ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)',
                    color: frequency === 'monthly' ? '#ef4444' : '#9ca3af',
                  }}
                  id="btn-monthly"
                >
                  Mensal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        {result && (
          <>
            <div className="glass-card p-6 md:p-8 mb-6 text-center" >
              <h3 className="text-lg font-bold text-gray-200 mb-5">⏱️ Linha do tempo da perda</h3>
              <div className="space-y-3">
                {timelineItems.map((item, i) => {
                  const maxValue = timelineItems[timelineItems.length - 1].value;
                  const barWidth = Math.max((item.value / maxValue) * 100, 5);
                  const intensity = (i + 1) / timelineItems.length;
                  return (
                    <div key={item.period} className="flex items-center gap-3 "
                      >
                      <span className="text-lg">{item.emoji}</span>
                      <span className="text-xs text-gray-500 w-16 text-right shrink-0">{item.period}</span>
                      <div className="flex-1 h-8 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div
                          className="h-full rounded-lg flex items-center px-3 transition-all duration-1000"
                          style={{
                            width: `${barWidth}%`,
                            background: `linear-gradient(90deg, rgba(239,68,68,${0.3 + intensity * 0.7}), rgba(249,115,22,${0.3 + intensity * 0.7}))`,
                          }}
                        >
                          <span className="text-xs font-bold text-white whitespace-nowrap">
                            {formatCurrency(item.value)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main result */}
            <ResultCard
              value={result.tenYears}
              label="Em 10 anos, você jogou fora"
              emoji="🗑️"
              story={`Gastando ${formatCurrency(result.daily)} por dia (${formatCurrency(result.monthly)} por mês), em 10 anos você terá jogado fora ${formatCurrency(result.tenYears)}. E se tivesse investido esse valor no CDI? Teria ${formatCurrency(result.tenYearsInvested)}.`}
              details={[
                { label: 'Por dia', value: formatCurrency(result.daily), color: '#9ca3af' },
                { label: 'Por mês', value: formatCurrency(result.monthly), color: '#f97316' },
                { label: 'Por ano', value: formatCurrency(result.yearly), color: '#ef4444' },
                { label: 'Se investisse (10a)', value: formatCurrency(result.tenYearsInvested), color: '#22c55e' },
              ]}
            />

            {/* Ad */}
            <div className="my-6">
              <AdBanner format="rectangle" />
            </div>

            {/* Share */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">🤔 Mostre isso para um amigo:</p>
              <ShareButtons
                value={result.tenYears}
                simulatorName="gastos invisíveis do dia a dia"
                path="/gastos-invisiveis"
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
                O que são gastos invisíveis?
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                Gastos invisíveis são despesas recorrentes e pequenas que parecem insignificantes no dia a dia, 
                mas que se acumulam ao longo do tempo. Exemplos comuns incluem: cafézinho diário, cigarro, 
                aplicativos de delivery, apostas, e assinaturas que você esqueceu de cancelar.
              </p>
            </details>
          </div>
        </section>
      </div>
    </>
  );
}
