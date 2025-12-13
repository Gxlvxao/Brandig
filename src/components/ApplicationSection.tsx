import { useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';

const ApplicationSection = () => {
  const { ref: inViewRef, isInView } = useInView({ threshold: 0.1 });
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const mockups = [
    { title: 'Cartão de Visita', description: 'Frente e verso', number: '01' },
    { title: 'Papel Timbrado', description: 'A4 corporativo', number: '02' },
    { title: 'Envelope', description: 'Formato C5', number: '03' },
    { title: 'Website', description: 'Página principal', number: '04' },
    { title: 'App Mobile', description: 'Interface principal', number: '05' },
    { title: 'Redes Sociais', description: 'Templates de post', number: '06' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress through the section
      const scrolled = -rect.top;
      const totalScrollable = sectionHeight - viewportHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      
      setScrollProgress(progress);
      
      // Calculate which slide should be active
      const slideProgress = progress * mockups.length;
      const newIndex = Math.min(Math.floor(slideProgress), mockups.length - 1);
      setActiveIndex(Math.max(0, newIndex));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mockups.length]);

  const handleIndexClick = (index: number) => {
    if (!sectionRef.current) return;
    
    const section = sectionRef.current;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const totalScrollable = sectionHeight - viewportHeight;
    
    const targetProgress = index / mockups.length;
    const targetScroll = sectionTop + (targetProgress * totalScrollable);
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
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
      style={{ height: `${mockups.length * 100}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex overflow-hidden">
        
        {/* Main Content Area */}
        <div className="flex-1 relative flex items-center justify-center">
          {/* Section Header - Fixed Position */}
          <div className={`absolute top-8 left-8 md:left-16 z-10 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-2">06</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold">Aplicação</h2>
          </div>

          {/* Slides */}
          {mockups.map((mockup, index) => {
            const isActive = index === activeIndex;
            const isPrev = index < activeIndex;
            const isNext = index > activeIndex;
            
            return (
              <div
                key={mockup.title}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                  isActive 
                    ? 'opacity-100 scale-100' 
                    : isPrev 
                      ? 'opacity-0 scale-95 -translate-y-8' 
                      : 'opacity-0 scale-95 translate-y-8'
                }`}
                style={{ pointerEvents: isActive ? 'auto' : 'none' }}
              >
                {/* Mockup Container */}
                <div className="w-full max-w-4xl mx-auto px-8 md:px-16">
                  <div className="aspect-[16/10] rounded-3xl bg-card border border-border/30 overflow-hidden relative group">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03]">
                      <div className="absolute inset-8 border border-current rounded-2xl" />
                      <div className="absolute inset-16 border border-current rounded-xl" />
                      <div className="absolute inset-24 border border-current rounded-lg" />
                    </div>
                    
                    {/* Center Logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground/20 group-hover:text-foreground/30 transition-colors duration-500">
                        SENSORIAL
                      </span>
                    </div>
                    
                    {/* Mockup Number */}
                    <div className="absolute top-6 left-6 md:top-8 md:left-8">
                      <span className="text-xs tracking-[0.3em] uppercase text-accent">{mockup.number}</span>
                    </div>
                    
                    {/* Mockup Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-card via-card/80 to-transparent">
                      <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-2">
                        {mockup.title}
                      </h3>
                      <p className="text-base md:text-lg text-muted-foreground">
                        {mockup.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Index */}
        <div className="hidden md:flex flex-col items-end justify-center pr-8 lg:pr-16 w-64 lg:w-80">
          <div className="space-y-4">
            {mockups.map((mockup, index) => {
              const isActive = index === activeIndex;
              
              return (
                <button
                  key={mockup.title}
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
                      <p className={`text-xs transition-colors duration-300 ${
                        isActive ? 'text-accent' : 'text-muted-foreground/60'
                      }`}>
                        {mockup.description}
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
          
          {/* Progress Indicator */}
          <div className="mt-8 w-12 h-[2px] bg-muted-foreground/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-300 rounded-full"
              style={{ width: `${((activeIndex + 1) / mockups.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Mobile Index Dots */}
        <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {mockups.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndexClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-accent w-6' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationSection;
