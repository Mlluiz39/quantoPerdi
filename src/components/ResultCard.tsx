import { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

function CountUp({ end, duration = 1200, prefix = '', suffix = '', className = '' }: CountUpProps) {
  const [current, setCurrent] = useState(0);
  const prevEnd = useRef(0);

  useEffect(() => {
    if (end === prevEnd.current) return;
    const startVal = prevEnd.current;
    prevEnd.current = end;

    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutExpo for dramatic effect
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(Math.floor(startVal + (end - startVal) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  const formatted = current.toLocaleString('pt-BR');

  return (
    <span className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

interface Comparacao {
  emoji: string;
  descricao: string;
}

type Severidade = 'chocante' | 'preocupante' | 'alerta';

interface ResultCardProps {
  titulo: string;
  valor: number;
  subtitulo?: string;
  storytelling?: string;
  comparacoes?: Comparacao[];
  severidade?: Severidade;
  prefix?: string;
  suffix?: string;
}

const severidadeConfig = {
  chocante: {
    badge: 'Chocante',
    badgeClass: 'bg-secondary-container text-on-secondary-container',
    valorClass: 'text-secondary',
  },
  preocupante: {
    badge: 'Preocupante',
    badgeClass: 'bg-tertiary/20 text-tertiary',
    valorClass: 'text-tertiary',
  },
  alerta: {
    badge: 'Alerta',
    badgeClass: 'bg-primary/20 text-primary',
    valorClass: 'text-primary',
  },
};

export default function ResultCard({
  titulo,
  valor,
  subtitulo,
  storytelling,
  comparacoes = [],
  severidade = 'chocante',
  prefix = 'R$ ',
  suffix = '',
}: ResultCardProps) {
  const config = severidadeConfig[severidade];

  return (
    <div className="bg-surface-container-highest/60 backdrop-blur-md rounded-xl p-8 md:p-10 relative overflow-hidden group animate-in">
      {/* Background glow */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full transition-opacity group-hover:opacity-100 opacity-50" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className={`px-3 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest ${config.badgeClass}`}>
            {config.badge}
          </span>
          <span className="text-on-surface-variant text-sm">{titulo}</span>
        </div>

        {/* Main value with count-up animation */}
        <div className="flex flex-col gap-2 mb-4">
          <CountUp
            end={Math.abs(isFinite(valor) ? valor : 0)}
            prefix={isFinite(valor) ? prefix : ''}
            suffix={suffix}
            className={`text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none ${config.valorClass}`}
          />
          {subtitulo && (
            <span className={`${config.valorClass}/60 text-lg font-medium tracking-tight`}>
              {subtitulo}
            </span>
          )}
        </div>

        {/* Storytelling */}
        {storytelling && (
          <p className="mt-6 text-on-surface-variant leading-relaxed text-sm md:text-base max-w-xl">
            {storytelling}
          </p>
        )}

        {/* Comparações */}
        {comparacoes.length > 0 && (
          <div className="mt-8 pt-6 border-t border-outline-variant/20 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {comparacoes.map((comp, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-2xl">{comp.emoji}</span>
                <span className="text-on-surface-variant text-sm font-medium">{comp.descricao}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
