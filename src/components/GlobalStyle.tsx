import { useEffect } from 'react';
import { useBrandStore } from '@/store/useBrandStore';

const GlobalStyle = () => {
  const { typography } = useBrandStore();

  useEffect(() => {
    console.log("🎨 GlobalStyle: Iniciando injeção de estilos...");
    console.log("🎨 GlobalStyle: URL Primária:", typography.primaryFontUrl);

    const styleId = 'dynamic-brand-style';
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    let css = `
      /* FORÇAR QUEBRA DE TEXTO GLOBALMENTE */
      h1, h2, h3, h4, h5, h6, p, span, div {
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word; 
        hyphens: auto;
      }
    `;

    // Injeta a Fonte Principal
    if (typography.primaryFontUrl) {
      console.log("🎨 GlobalStyle: Criando regra @font-face para Primária...");
      
      // Tenta detectar formato pela extensão (ajuda navegadores antigos)
      let format = 'truetype';
      if (typography.primaryFontUrl.endsWith('.woff2')) format = 'woff2';
      if (typography.primaryFontUrl.endsWith('.woff')) format = 'woff';
      if (typography.primaryFontUrl.endsWith('.otf')) format = 'opentype';

      css += `
        @font-face {
          font-family: 'CustomPrimary';
          src: url('${typography.primaryFontUrl}') format('${format}');
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
        // Se não tiver fonte, garante que a variável exista para não quebrar o Tailwind
        css += `
        :root, html, body {
          --font-heading: 'Outfit', sans-serif;
        }
        `;
    }

    // Injeta a Fonte Secundária
    if (typography.secondaryFontUrl) {
      css += `
        @font-face {
          font-family: 'CustomSecondary';
          src: url('${typography.secondaryFontUrl}') format('truetype');
          font-weight: 100 900;
          font-display: swap;
        }
        :root, html, body {
          --font-body: 'CustomSecondary', sans-serif !important;
        }
      `;
    }

    styleElement.textContent = css;
    console.log("🎨 GlobalStyle: CSS injetado com sucesso!");

  }, [typography.primaryFontUrl, typography.secondaryFontUrl, typography.extraFonts]);

  return null;
};

export default GlobalStyle;