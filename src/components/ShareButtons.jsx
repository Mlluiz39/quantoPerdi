import { useState } from 'react';
import { formatCurrency } from '../utils/calculators';

/**
 * Share buttons for WhatsApp, Instagram, TikTok, and clipboard.
 * @param {object} props
 * @param {number} props.value - The loss value to share
 * @param {string} props.simulatorName - Name of the simulator used
 * @param {string} [props.path] - URL path for sharing
 */
export default function ShareButtons({ value, simulatorName, path = '' }) {
  const [toast, setToast] = useState('');
  
  const baseUrl = 'https://quantoperdi.netlify.app';
  const url = `${baseUrl}${path}`;
  const formattedValue = formatCurrency(value);
  const text = `😱 Descobri que perdi ${formattedValue} com ${simulatorName}! Descubra quanto você perdeu:`;
  
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3500);
  };
  
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = async (silent = false) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${text} ${url}`);
      } else {
        throw new Error('Fallback');
      }
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = `${text} ${url}`;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    if (!silent) {
      showToast('Link e texto copiados com sucesso!');
    }
  };

  const shareNativeApp = async (platformName) => {
    // If Web Share API is available (Mobile/MacOS Safari), open the native OS share sheet!
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QuantoPerdi',
          text: text,
          url: url,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing', err);
        }
      }
    } else {
      // Fallback for desktops where native sharing isn't supported
      copyToClipboard(true);
      showToast(`Texto copiado! Agora é só abrir o ${platformName} e colar seu resultado.`);
    }
  };

  return (
    <div className="grid grid-cols-2 md:flex md:flex-row gap-3 mt-4 w-full">
      <button
        onClick={shareWhatsApp}
        className="flex justify-center items-center gap-2 w-full md:flex-1 min-h-[48px] px-4 rounded-xl font-bold text-sm cursor-pointer transition-all duration-200 border-none hover:scale-105 active:scale-95"
        style={{ 
          background: '#25D366', 
          color: 'white',
          boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)'
        }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        WhatsApp
      </button>

      <button
        onClick={() => shareNativeApp('Instagram')}
        className="flex justify-center items-center gap-2 w-full md:flex-1 min-h-[48px] px-4 rounded-xl font-bold text-sm cursor-pointer transition-all duration-200 border-none hover:scale-105 active:scale-95"
        style={{ 
          background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', 
          color: 'white',
          boxShadow: '0 4px 14px rgba(220, 39, 67, 0.4)'
        }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
        Instagram
      </button>

      <button
        onClick={() => shareNativeApp('TikTok')}
        className="flex justify-center items-center gap-2 w-full md:flex-1 min-h-[48px] px-4 rounded-xl font-bold text-sm cursor-pointer transition-all duration-200 border-none hover:scale-105 active:scale-95 text-white bg-[rgba(20,20,20,1)] shadow-[0_4px_14px_rgba(0,0,0,0.6)]"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ filter: 'drop-shadow(1.5px 1.5px 0 rgba(238,29,82,0.9)) drop-shadow(-1.5px -1.5px 0 rgba(105,201,208,0.9))' }}>
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.25-.97 4.41-2.43 6.01-1.39 1.54-3.35 2.58-5.46 2.87-2.11.28-4.26-.06-6.1-1.12-1.85-1.07-3.3-2.73-4.04-4.69-.73-1.95-.73-4.11.02-6.07.75-1.95 2.21-3.6 4.07-4.67 1.85-1.05 4.01-1.38 6.09-1.09.05 1.45.02 2.9.03 4.35-1.14-.38-2.42-.4-3.6-.08-1.17.32-2.22 1.05-2.88 2.05-.67 1-1.03 2.21-.99 3.4.03 1.19.46 2.37 1.18 3.32.73.95 1.76 1.62 2.93 1.86 1.18.25 2.41.13 3.52-.35 1.11-.47 2.05-1.29 2.65-2.3.61-1 1-2.26.96-3.46v-16.7h.02z"/>
        </svg>
        TikTok
      </button>

      <button
        onClick={() => copyToClipboard(false)}
        className="btn-secondary flex justify-center items-center gap-2 w-full md:flex-1 min-h-[48px] px-4 font-bold active:scale-95 transition-all outline-none"
      >
        📋 Copiar
      </button>

      {/* Toast Notification */}
      {toast ? (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] animate-fade-in-up">
          <div className="bg-gray-800 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-gray-700 flex items-center gap-2 whitespace-nowrap">
            <span className="text-green-400 text-lg">✓</span> {toast}
          </div>
        </div>
      ) : null}
    </div>
  );
}
