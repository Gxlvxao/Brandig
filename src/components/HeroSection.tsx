import { ChevronDown } from 'lucide-react';
import { useBrandStore } from '@/store/useBrandStore';

const HeroSection = () => {
  const { hero } = useBrandStore();

  const scrollToIndex = () => {
    const element = document.querySelector('#index');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative px-6 py-20 md:px-12">
      <div className="content-container text-center z-10 flex flex-col items-center">
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight mb-6 md:mb-8 fade-in-up stagger-2">
          <span className="text-gradient my-[15px] text-7xl">
            {hero.titleLine1}
            <br />
            {hero.titleLine2}
          </span>
        </h1>
        
        <div className="flex items-center gap-3 text-sm text-muted-foreground fade-in-up stagger-4">
          <span className="w-8 h-px bg-border" />
          <span className="tracking-widest uppercase text-xs">{hero.agencyName}</span>
          <span className="w-8 h-px bg-border" />
        </div>
      </div>

      <button onClick={scrollToIndex} className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 fade-in-up stagger-5">
        <span className="text-xs tracking-widest uppercase">Explorar</span>
        <ChevronDown className="w-5 h-5 scroll-indicator" />
      </button>
    </section>
  );
};

export default HeroSection;