/**
 * AdSense placeholder banner.
 * Replace the placeholder with actual AdSense code when ready.
 * 
 * High-CTR positions:
 * - After result reveal (user most engaged)
 * - Between sections on home page
 * - Sidebar on desktop
 * - Footer leaderboard
 * 
 * Affiliate ideas:
 * - Nubank, XP Investimentos, Rico, BTG Pactual
 * - Curso de finanças pessoais
 * - Apps de controle financeiro
 * 
 * @param {object} props
 * @param {'leaderboard'|'rectangle'|'banner'} [props.format] - Ad format
 * @param {string} [props.className] - Additional classes
 */
export default function AdBanner({ format = 'banner', className = '' }) {
  const heights = {
    leaderboard: '90px',
    rectangle: '250px',
    banner: '60px',
  };

  return (
    <div 
      className={`ad-slot ${className}`}
      style={{ minHeight: heights[format] }}
      aria-hidden="true"
    >
      {/* 
        Replace with actual AdSense code:
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      */}
      <span>Publicidade</span>
    </div>
  );
}
