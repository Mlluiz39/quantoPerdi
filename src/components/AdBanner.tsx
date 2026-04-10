interface AdBannerProps {
  slot?: string;
  formato?: 'horizontal' | 'retangulo' | 'vertical';
  className?: string;
}

export default function AdBanner({ slot, formato = 'horizontal', className = '' }: AdBannerProps) {
  const alturas: Record<string, string> = {
    horizontal: 'h-[90px]',
    retangulo: 'h-[250px]',
    vertical: 'h-[600px]',
  };

  return (
    <div className={`w-full flex items-center justify-center ${alturas[formato]} ${className}`}>
      {
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7696925881338469"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      }
      <div className="w-full h-full rounded-lg border border-dashed border-outline-variant/20 bg-surface-container-low/30 flex items-center justify-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/30">Espaço Publicitário</span>
      </div>
    </div>
  );
}
