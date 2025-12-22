import { useCallback } from 'react';

export const useSoundEffect = () => {
  const playHover = useCallback(() => {
    // Usa o arquivo que você adicionou
    const audio = new Audio('/ambient-sound.mp3');
    
    // Volume baixo para ser "smooth" e não invasivo
    audio.volume = 0.15; 
    audio.currentTime = 0; // Reinicia se tocar rápido várias vezes
    
    // Tenta tocar (navegadores modernos podem bloquear se não houver interação prévia na página)
    audio.play().catch(() => {
      // Falha silenciosa (comum em autplay policies)
    });
  }, []);

  return { playHover };
};