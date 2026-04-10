import { useEffect } from 'react';

interface SEOHeadProps {
  titulo: string;
  descricao: string;
  url?: string;
}

export default function SEOHead({ titulo, descricao, url }: SEOHeadProps) {
  useEffect(() => {
    document.title = `${titulo} | QuantoPerdi`;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', descricao);
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', titulo);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', descricao);

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', titulo);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', descricao);

    if (url) {
      const fullUrl = `https://quantoperdi.netlify.app${url}`;

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', fullUrl);

      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', fullUrl);
    }
  }, [titulo, descricao, url]);

  return null;
}
