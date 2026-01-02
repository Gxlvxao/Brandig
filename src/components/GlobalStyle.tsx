import { useBrandStore } from '@/store/useBrandStore';

const GlobalStyle = () => {
  const { typography } = useBrandStore();

  const getFormat = (url: string) => {
    if (url.endsWith('.woff2')) return 'woff2';
    if (url.endsWith('.woff')) return 'woff';
    if (url.endsWith('.otf')) return 'opentype';
    return 'truetype';
  };

  // Função mágica que troca a URL direta pela URL segura da API
  const getCorsUrl = (url: string) => {
    if (!url) return '';
    // Troca '/storage/' por '/api/public-file/' mantendo o domínio original
    return url.replace('/storage/', '/api/public-file/');
  };

  const generateCss = () => {
    let css = `
      h1, h2, h3, h4, h5, h6, p, span, div {
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word; 
        hyphens: auto;
      }
    `;

    if (typography.primaryFontUrl) {
      const format = getFormat(typography.primaryFontUrl);
      const safeUrl = getCorsUrl(typography.primaryFontUrl); // <--- AQUI ESTÁ A CORREÇÃO

      css += `
        @font-face {
          font-family: 'CustomPrimary';
          src: url('${safeUrl}') format('${format}');
          font-weight: 100 900;
          font-style: normal;
          font-display: swap;
        }
        :root, html, body {
          --font-heading: 'CustomPrimary', sans-serif !important;
          ${!typography.secondaryFontUrl ? "--font-body: 'CustomPrimary', sans-serif !important;" : ""}
        }
      `;
    } else {
      css += `
        :root, html, body {
          --font-heading: 'Outfit', sans-serif;
        }
      `;
    }

    if (typography.secondaryFontUrl) {
      const format = getFormat(typography.secondaryFontUrl);
      const safeUrl = getCorsUrl(typography.secondaryFontUrl); // <--- AQUI TAMBÉM

      css += `
        @font-face {
          font-family: 'CustomSecondary';
          src: url('${safeUrl}') format('${format}');
          font-weight: 100 900;
          font-display: swap;
        }
        :root, html, body {
          --font-body: 'CustomSecondary', sans-serif !important;
        }
      `;
    }

    return css;
  };

  return <style dangerouslySetInnerHTML={{ __html: generateCss() }} />;
};

export default GlobalStyle;

//FRIST 