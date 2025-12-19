import { useEffect, useState } from 'react';
import { useBrandStore } from '@/store/useBrandStore';

const AmbientGlow = () => {
  const [scrollY, setScrollY] = useState(0);
  const { colors } = useBrandStore();
  
  // Pegamos a cor primária (ou usamos um fallback se der erro)
  const primaryColor = colors.primaryColors[0]?.hex || '#D4A842';

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate position based on scroll
  const yOffset = 30 + (scrollY * 0.05);
  const xOffset = 50 + Math.sin(scrollY * 0.001) * 10;

  // Estilo dinâmico para o background com a cor da marca
  const glowStyle = {
    background: `radial-gradient(circle, ${primaryColor}40 0%, transparent 70%)`
  };

  return (
    <>
      {/* Primary Glow */}
      <div 
        className="ambient-glow fixed pointer-events-none z-0 rounded-full blur-[100px]"
        style={{
          top: `${yOffset}%`,
          left: `${xOffset}%`,
          width: '50vw',
          height: '50vw',
          transform: 'translate(-50%, -50%)',
          ...glowStyle // Aplica a cor dinâmica
        }}
      />
      
      {/* Secondary Glow (smaller, different position) */}
      <div 
        className="ambient-glow fixed pointer-events-none z-0 rounded-full blur-[80px]"
        style={{
          top: `${60 + (scrollY * 0.03)}%`,
          left: `${30 + Math.cos(scrollY * 0.002) * 15}%`,
          width: '40vw',
          height: '40vw',
          maxWidth: '500px',
          maxHeight: '500px',
          opacity: 0.4,
          transform: 'translate(-50%, -50%)',
          ...glowStyle // Aplica a cor dinâmica
        }}
      />
    </>
  );
};

export default AmbientGlow; 