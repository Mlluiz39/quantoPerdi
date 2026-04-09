import { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import ResultCard from '../components/ResultCard';
import ShareButtons from '../components/ShareButtons';
import AdBanner from '../components/AdBanner';
import { calcInflationLoss, formatCurrency } from '../utils/calculators';

export default function PerdaInflacao() {
  const currentYear = new Date().getFullYear();
  const [value, setValue] = useState(1000);
  const [startYear, setStartYear] = useState(2010);

  const result = useMemo(() => {
    if (value === '' || startYear === '' || value <= 0 || startYear < 1900 || startYear >= currentYear) return null;
    return calcInflationLoss(Number(value), Number(startYear));
  }, [value, startYear, currentYear]);

  // Quick year presets
  const yearPresets = [
    { year: 2000, label: '2000' },
    { year: 2005, label: '2005' },
    { year: 2010, label: '2010' },
    { year: 2015, label: '2015' },
    { year: 2020, label: '2020' },
  ];

  // Quick value presets
  const valuePresets = [
    { value: 100, label: 'R$ 100' },
    { value: 1000, label: 'R$ 1.000' },
    { value: 5000, label: 'R$ 5.000' },
    { value: 10000, label: 'R$ 10.000' },
    { value: 50000, label: 'R$ 50.000' },
  ];

  return (
    <>
      <SEO
        title="Calculadora de Perda com Inflação"
        description="Descubra quanto seu dinheiro perdeu de valor com a inflação. Veja o poder de compra real do seu dinheiro ao longo dos anos. Dados reais do IPCA."
        path="/perda-inflacao"
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 ">
          <span className="text-4xl mb-4 block">📊</span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-100 mb-3">
            Perda com <span className="text-red-400">Inflação</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Seu dinheiro perde valor todos os dias.
            <span className="text-red-400 font-medium"> Descubra quanto ele já encolheu.</span>
          </p>
        </div>

        {/* Input Form */}
        <div className="glass-card p-6 md:p-8 mb-6 " >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="input-value" className="block text-sm font-medium text-gray-300 mb-2">
                💰 Valor em reais (R$)
              </label>
              <input
                type="number"
                className="input-dark"
                value={value}
                onChange={(e) => setValue(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                placeholder="Ex: 1000"
                min="0"
                id="input-value"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {valuePresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setValue(preset.value)}
                    className="text-xs px-2 py-1 rounded-md cursor-pointer transition-all border-none"
                    style={{
                      background: value === preset.value ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)',
                      color: value === preset.value ? '#ef4444' : '#6b7280',
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="input-year" className="block text-sm font-medium text-gray-300 mb-2">
                📆 Ano de referência
              </label>
              <input
                type="number"
                className="input-dark"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="Ex: 2010"
                min="1995"
                max={currentYear - 1}
                id="input-year"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {yearPresets.map((preset) => (
                  <button
                    key={preset.year}
                    onClick={() => setStartYear(preset.year)}
                    className="text-xs px-2 py-1 rounded-md cursor-pointer transition-all border-none"
                    style={{
                      background: startYear === preset.year ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)',
                      color: startYear === preset.year ? '#ef4444' : '#6b7280',
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        {result && result.loss > 0 && (
          <>
            {/* Main insight card */}
            <div className="glass-card p-6 md:p-8 mb-6 text-center ">
              <p className="text-sm text-gray-400 mb-4">Para ter o mesmo poder de compra</p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">{formatCurrency(value)} em {startYear}</p>
                  <p className="text-2xl font-bold text-gray-300">{formatCurrency(value)}</p>
                </div>
                <div className="text-3xl">→</div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Equivale hoje a</p>
                  <p className="text-2xl font-bold text-red-400">{formatCurrency(result.equivalentToday)}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Ou seja, seus {formatCurrency(value)} de {startYear} compram hoje o que{' '}
                <span className="text-red-400 font-bold">{formatCurrency(result.currentPurchasingPower)}</span>
                {' '}compravam na época.
              </p>
            </div>

            <ResultCard
              value={result.loss}
              label={`Você precisaria de mais ${formatCurrency(result.loss)} para manter o poder de compra`}
              emoji="📉"
              story={`Em ${result.years} anos, a inflação acumulada foi de ${result.accumulatedInflation}%. Seus ${formatCurrency(value)} de ${startYear} perderam poder de compra equivalente a ${formatCurrency(result.loss)}. Isso é a inflação comendo seu dinheiro silenciosamente, todo dia, sem você perceber.`}
              details={[
                { label: 'Inflação acumulada', value: `${result.accumulatedInflation}%`, color: '#ef4444' },
                { label: 'Poder de compra atual', value: formatCurrency(result.currentPurchasingPower), color: '#f97316' },
                { label: 'Seria necessário', value: formatCurrency(result.equivalentToday), color: '#22c55e' },
                { label: 'Período', value: `${result.years} anos`, color: '#9ca3af' },
              ]}
            />

            {/* Ad */}
            <div className="my-6">
              <AdBanner format="rectangle" />
            </div>

            {/* Protection tips */}
            <div className="glass-card p-6 mt-6" style={{ borderColor: 'rgba(34, 197, 94, 0.2)' }}>
              <h3 className="text-lg font-bold text-green-400 mb-2">🛡️ Como proteger seu dinheiro da inflação</h3>
              <ul className="text-sm text-gray-400 space-y-2 list-none">
                <li>✅ <strong className="text-gray-300">Tesouro IPCA+:</strong> Rende a inflação + taxa fixa, protege seu poder de compra</li>
                <li>✅ <strong className="text-gray-300">Fundos Imobiliários:</strong> Aluguéis são reajustados pela inflação</li>
                <li>✅ <strong className="text-gray-300">Ações de empresas sólidas:</strong> Lucros tendem a acompanhar a inflação no longo prazo</li>
                <li>✅ <strong className="text-gray-300">Dólar/ouro:</strong> Ativos em moeda forte servem como hedge cambial</li>
              </ul>
            </div>

            {/* Share */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">📊 Compartilhe esse dado:</p>
              <ShareButtons
                value={result.loss}
                simulatorName="perda com inflação"
                path="/perda-inflacao"
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
                O que é o IPCA?
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                O IPCA (Índice Nacional de Preços ao Consumidor Amplo) é o índice oficial de inflação 
                do Brasil, calculado pelo IBGE. Ele mede a variação dos preços de produtos e serviços 
                consumidos pelas famílias brasileiras. Nosso simulador utiliza dados reais do IPCA 
                para calcular a perda de poder de compra.
              </p>
            </details>
            <details className="glass-card p-5 cursor-pointer group">
              <summary className="font-medium text-gray-200 list-none flex justify-between items-center">
                Deixar dinheiro parado perde valor?
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                Sim! Mesmo que o valor numérico não mude, o poder de compra diminui com a inflação. 
                R$ 1.000 guardados em casa em 2010 compram hoje o equivalente a aproximadamente R$ 450. 
                Por isso é essencial investir em ativos que superem a inflação.
              </p>
            </details>
          </div>
        </section>
      </div>
    </>
  );
}
