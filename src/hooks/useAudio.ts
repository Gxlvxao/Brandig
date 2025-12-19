import { useState, useEffect, useRef } from 'react';

export const useAudio = (url: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = 0.5; // Começa com 50% do volume para não assustar
    audioRef.current = audio;

    // Cleanup se o componente desmontar
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [url]);

  const toggle = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // O navegador pode bloquear o autoplay se não houver interação do usuário antes
      audioRef.current.play().catch((error) => {
        console.error("Erro ao reproduzir áudio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return { isPlaying, toggle };
};