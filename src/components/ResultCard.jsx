import { formatCurrency, getComparisons } from '../utils/calculators';

/**
 * Impactful result display with large number, emoji, comparisons.
 * @param {object} props
 * @param {number} props.value - The loss value
 * @param {string} [props.label] - Label above the number
 * @param {string} [props.emoji] - Emoji to show
 * @param {string} [props.story] - Storytelling text
 * @param {boolean} [props.isGain] - If true, shows as green (gain rather than loss)
 * @param {Array} [props.details] - Additional detail lines
 */
export default function ResultCard({ value, label = 'Você perdeu', emoji = '😱', story, isGain = false, details = [] }) {
  if (!value || value <= 0) return null;

  const comparisons = getComparisons(value);
  const displayColor = isGain ? '#22c55e' : '#ef4444';

  return (
    <div className="animate-count-up mt-6">
      <div 
        className="glass-card p-6 md:p-8 text-center"
        style={{ borderColor: `${displayColor}22` }}
      >
        {/* Main result */}
        <p className="text-sm font-medium mb-2" style={{ color: '#9ca3af' }}>
          {label}
        </p>
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-3xl md:text-4xl">{emoji}</span>
          <span
            className={`text-3xl md:text-5xl font-black ${!isGain ? ' ' : ''}`}
            style={{ color: displayColor }}
          >
            {formatCurrency(value)}
          </span>
        </div>

        {/* Story */}
        {story && (
          <p className="text-sm md:text-base mt-4 leading-relaxed" style={{ color: '#d1d5db' }}>
            {story}
          </p>
        )}

        {/* Details */}
        {details.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {details.map((detail, i) => (
              <div key={i} className="px-4 py-2 rounded-lg text-sm" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <span style={{ color: '#9ca3af' }}>{detail.label}: </span>
                <span className="font-semibold" style={{ color: detail.color || '#e5e7eb' }}>
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Comparisons */}
        {comparisons.length > 0 && (
          <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs uppercase tracking-wider font-medium mb-3" style={{ color: '#6b7280' }}>
              Com esse dinheiro você poderia ter comprado
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {comparisons.map((comp, i) => (
                <div 
                  key={i} 
                  className="px-4 py-2 rounded-lg text-sm animate-fade-in-up"
                  style={{ 
                    background: 'rgba(255,255,255,0.04)',
                    animationDelay: `${i * 0.15}s`,
                    opacity: 0,
                  }}
                >
                  <span className="mr-1">{comp.emoji}</span>
                  <span className="font-bold" style={{ color: displayColor }}>{comp.quantity}</span>
                  <span style={{ color: '#9ca3af' }}> {comp.item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
