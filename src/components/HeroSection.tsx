import { ChevronDown } from 'lucide-react';
const HeroSection = () => {
  const scrollToIndex = () => {
    const element = document.querySelector('#index');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative px-6 py-20 md:px-12">
      {/* Content */}
      <div className="content-container text-center z-10 flex flex-col items-center">
        {/* Overline */}
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 md:mb-8 fade-in-up stagger-1">
          Brand Book Digital
        </p>
        
        {/* Main Title */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight mb-6 md:mb-8 fade-in-up stagger-2">
          <span className="text-gradient my-[15px] text-7xl">Your branding, your future,
is Here
        </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xl md:max-w-2xl leading-relaxed mb-8 md:mb-12 fade-in-up stagger-3">
          Uma experiência visual e sensorial que transcende o comum. 
          <span className="hidden md:inline"><br /></span>
          {' '}Onde a marca encontra a sua essência.
        </p>
        
        {/* Agency Credit */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground fade-in-up stagger-4">
          <span className="w-8 h-px bg-border" />
          <span className="tracking-widest uppercase text-xs">Por Studio Sensorial</span>
          <span className="w-8 h-px bg-border" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <button onClick={scrollToIndex} className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 fade-in-up stagger-5">
        <span className="text-xs tracking-widest uppercase">Explorar</span>
        <ChevronDown className="w-5 h-5 scroll-indicator" />
      </button>
    </section>;
};
export default HeroSection;