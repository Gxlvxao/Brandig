import { useInView } from '../hooks/useInView';
import { useBrandStore } from '@/store/useBrandStore';

const IdentitySection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { identity } = useBrandStore();

  return (
    <section id="identity" ref={ref} className="section-padding relative">
      <div className="content-container">
        {/* Section Header */}
        <div className={`mb-12 md:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">{identity.sectionNumber}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">{identity.title}</h2>
        </div>

        {/* Logo Section */}
        <div className={`mb-16 md:mb-24 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">{identity.logoSectionTitle}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Primary Logo */}
            <div className="aspect-[4/3] rounded-2xl bg-card border border-border/50 flex items-center justify-center p-12 card-lift relative overflow-hidden">
              <div className="text-center z-10 w-full h-full flex flex-col items-center justify-center">
                {identity.primaryLogoImage ? (
                  <img src={identity.primaryLogoImage} alt="Logo Principal" className="max-w-full max-h-[60%] object-contain mb-4" />
                ) : (
                  <span className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                    {identity.primaryLogoText}
                  </span>
                )}
                <p className="text-sm text-muted-foreground">{identity.primaryLogoLabel}</p>
              </div>
            </div>
            
            {/* Inverted Logo */}
            <div className="aspect-[4/3] rounded-2xl bg-foreground flex items-center justify-center p-12 card-lift relative overflow-hidden">
              <div className="text-center z-10 w-full h-full flex flex-col items-center justify-center">
                {identity.invertedLogoImage ? (
                  <img src={identity.invertedLogoImage} alt="Logo Invertido" className="max-w-full max-h-[60%] object-contain mb-4" />
                ) : (
                  <span className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-background mb-4">
                    {identity.invertedLogoText}
                  </span>
                )}
                <p className="text-sm text-background/60">{identity.invertedLogoLabel}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clear Space */}
        <div className={`mb-16 md:mb-24 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">{identity.clearSpaceTitle}</h3>
          
          <div className="p-8 md:p-12 rounded-2xl bg-card border border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="relative border-2 border-dashed border-accent/30 p-8 md:p-12 rounded-lg flex justify-center items-center min-h-[300px]">
                
                {identity.clearSpaceImage ? (
                  <img src={identity.clearSpaceImage} alt="Diagrama de Proteção" className="max-w-full max-h-full object-contain" />
                ) : (
                  <>
                    <span className="font-heading text-2xl md:text-3xl font-bold tracking-tight block text-center">
                      {identity.clearSpaceLogoText}
                    </span>
                    {/* Indicadores padrão */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 text-xs text-accent">S</div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3 text-xs text-accent">S</div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 text-xs text-accent">S</div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 text-xs text-accent">S</div>
                  </>
                )}

              </div>
              <p className="text-sm text-muted-foreground text-center mt-6">
                {identity.clearSpaceDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Minimum Size */}
        <div className={`transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">{identity.minSizeTitle}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/50">
              <p className="text-sm text-muted-foreground mb-4">{identity.minSizePrintLabel}</p>
              <span className="font-heading text-lg font-medium">{identity.minSizePrintValue}</span>
            </div>
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/50">
              <p className="text-sm text-muted-foreground mb-4">{identity.minSizeDigitalLabel}</p>
              <span className="font-heading text-lg font-medium">{identity.minSizeDigitalValue}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdentitySection;