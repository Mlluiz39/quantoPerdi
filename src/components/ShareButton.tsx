import { Share2, MessageCircle, Instagram, Music, Link2, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
  valor: string;
  pagina: string;
  className?: string;
}

export default function ShareButton({ valor, pagina, className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const mensagem = `😱 Descobri que perdi ${valor}! Veja quanto você perdeu também:`;
  const url = `https://quantoperdi.netlify.app/${pagina}`;
  const textoCompleto = `${mensagem} ${url}`;

  const compartilharWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(textoCompleto)}`, '_blank');
  };

  const compartilharInstagram = async () => {
    try {
      await navigator.clipboard.writeText(textoCompleto);
    } catch { /* fallback silencioso */ }
    window.open('https://www.instagram.com/', '_blank');
  };

  const compartilharTikTok = async () => {
    try {
      await navigator.clipboard.writeText(textoCompleto);
    } catch { /* fallback silencioso */ }
    window.open('https://www.tiktok.com/', '_blank');
  };

  const copiarLink = async () => {
    try {
      await navigator.clipboard.writeText(textoCompleto);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = textoCompleto;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    // Try Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QuantoPerdi',
          text: mensagem,
          url: url,
        });
        return;
      } catch {
        // User cancelled or API failed, show manual options
      }
    }
    setOpen(!open);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleShare}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-5 rounded-xl font-bold text-lg hover:shadow-[0_0_40px_-5px_rgba(75,226,119,0.3)] transition-all active:scale-95"
      >
        <Share2 className="w-5 h-5" />
        Veja quanto eu perdi 😱
      </button>

      {/* Dropdown share options */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-surface-container-high rounded-xl border border-outline-variant/20 shadow-2xl overflow-hidden z-50 animate-in">
          <button
            onClick={compartilharWhatsApp}
            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-surface-container-highest transition-colors text-left"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span className="font-medium text-on-surface">WhatsApp</span>
          </button>
          <button
            onClick={compartilharInstagram}
            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-surface-container-highest transition-colors text-left border-t border-outline-variant/10"
          >
            <Instagram className="w-5 h-5 text-[#E4405F]" />
            <span className="font-medium text-on-surface">Instagram</span>
          </button>
          <button
            onClick={compartilharTikTok}
            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-surface-container-highest transition-colors text-left border-t border-outline-variant/10"
          >
            <Music className="w-5 h-5 text-[#00f2ea]" />
            <span className="font-medium text-on-surface">TikTok</span>
          </button>
          <button
            onClick={copiarLink}
            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-surface-container-highest transition-colors text-left border-t border-outline-variant/10"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-primary" />
                <span className="font-medium text-primary">Link copiado!</span>
              </>
            ) : (
              <>
                <Link2 className="w-5 h-5 text-on-surface-variant" />
                <span className="font-medium text-on-surface">Copiar link</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
