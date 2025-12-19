import { useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { useBrandStore } from '@/store/useBrandStore';

const ApplicationSection = () => {
  const { ref: inViewRef, isInView } = useInView({ threshold: 0.1 });
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { application } = useBrandStore();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      const scrolled = -rect.top;
      const totalScrollable = sectionHeight - viewportHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      
      const slideProgress = progress * application.items.length;
      const newIndex = Math.min(Math.floor(slideProgress), application.items.length - 1);
      setActiveIndex(Math.max(0, newIndex));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [application.items.length]);

  const handleIndexClick = (index: number) => {
    if (!sectionRef.current) return;
    
    const section = sectionRef.current;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const totalScrollable = sectionHeight - viewportHeight;
    
    const targetProgress = index / application.items.length;
    const targetScroll = sectionTop + (targetProgress * totalScrollable);
    
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section 
      id="application" 
      ref={(el) => {
        if (el) {
          (inViewRef as React.MutableRefObject<HTMLElement | null>).current = el;
          (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        }
      }}
      className="relative"
      style={{ height: `${(application.items.length + 1) * 50}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex overflow-hidden">
        
        <div className="flex-1 relative flex items-center justify-center">
          {/* Título da Seção */}
          <div className={`absolute top-8 left-8 md:left-16 z-10 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-2">{application.sectionNumber}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold">{application.title}</h2>
          </div>

          {/* Slides */}
          {application.items.map((mockup, index) => {
            const isActive = index === activeIndex;
            const isPrev = index < activeIndex;
            
            return (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                  isActive 
                    ? 'opacity-100 scale-100' 
                    : isPrev 
                      ? 'opacity-0 scale-95 -translate-y-8' 
                      : 'opacity-0 scale-95 translate-y-8'
                }`}
                style={{ pointerEvents: isActive ? 'auto' : 'none' }}
              >
                <div className="w-full h-full flex items-center justify-center px-8 md:px-16 lg:px-24 py-24">
                  <div className="w-full max-w-6xl h-full max-h-[70vh] rounded-2xl bg-card border border-border/30 overflow-hidden relative group shadow-2xl">
                    
                    {/* LÓGICA DE EXIBIÇÃO DA IMAGEM */}
                    {mockup.image ? (
                      <img 
                        src={mockup.image} 
                        alt={mockup.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      /* Placeholder caso não tenha imagem */
                      <>
                        <div className="absolute inset-0 opacity-[0.03]">
                          <div className="absolute inset-6 border border-current rounded-xl" />
                          <div className="absolute inset-12 border border-current rounded-lg" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground/20 group-hover:text-foreground/30 transition-colors duration-500">
                            SENSORIAL
                          </span>
                        </div>
                      </>
                    )}
                    
                    {/* Informações sobrepostas */}
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-background/80 backdrop-blur px-2 py-1 rounded">
                      <span className="text-xs tracking-[0.3em] uppercase text-accent">{mockup.number}</span>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-background/90 via-background/60 to-transparent">
                      <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-1">
                        {mockup.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground">
                        {mockup.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Index (Direita) */}
        <div className="hidden md:flex flex-col items-end justify-center pr-8 lg:pr-16 w-64 lg:w-80">
          <div className="space-y-4">
            {application.items.map((mockup, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={index}
                  onClick={() => handleIndexClick(index)}
                  className={`text-right transition-all duration-500 group cursor-pointer ${
                    isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-end gap-4">
                    <div>
                      <p className={`font-heading text-sm md:text-base font-medium transition-colors duration-300 ${
                        isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                      }`}>
                        {mockup.title}
                      </p>
                    </div>
                    <div className={`w-8 h-[2px] transition-all duration-500 ${
                      isActive ? 'bg-accent w-12' : 'bg-muted-foreground/30 group-hover:bg-muted-foreground/50'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Dots */}
        <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {application.items.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndexClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-accent w-6' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationSection;