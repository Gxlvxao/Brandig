import { useInView } from '../hooks/useInView';
import { useBrandStore } from '@/store/useBrandStore';

const TypographySection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { typography } = useBrandStore();

  return (
    <section 
      id="typography" 
      ref={ref}
      className="section-padding relative"
    >
      <div className="content-container">
        {/* Section Header */}
        <div className={`mb-12 md:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">{typography.sectionNumber}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">{typography.title}</h2>
        </div>

        {/* Primary Font */}
        <div className={`mb-16 md:mb-24 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">{typography.primaryFontTitle}</h3>
          
          <div className="p-8 md:p-12 rounded-2xl bg-card border border-border/50">
            <p className="text-sm text-muted-foreground mb-4">{typography.primaryFontName}</p>
            <p className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-none">
              {typography.primaryFontAlphabet}
            </p>
            <p className="font-heading text-lg md:text-xl text-muted-foreground mt-6 whitespace-pre-line">
              {typography.primaryFontCharacters}
            </p>
          </div>
        </div>

        {/* Font Weights */}
        <div className={`mb-16 md:mb-24 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">{typography.weightsTitle}</h3>
          
          <div className="space-y-4">
            {typography.primaryWeights.map((weight, index) => (
              <div 
                key={index}
                className="p-4 md:p-6 rounded-xl bg-card border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <span 
                  className="font-heading text-2xl md:text-3xl"
                  style={{ fontWeight: weight.weight }}
                >
                  Sensorial
                </span>
                <span className="text-sm text-muted-foreground">
                  {weight.name} — {weight.weight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Font */}
        <div className={`mb-16 md:mb-24 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">{typography.secondaryFontTitle}</h3>
          
          <div className="p-8 md:p-12 rounded-2xl bg-card border border-border/50">
            <p className="text-sm text-muted-foreground mb-4">{typography.secondaryFontName}</p>
            <p className="font-body text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-none">
              {typography.secondaryFontAlphabet}
            </p>
            <p className="font-body text-base md:text-lg text-muted-foreground mt-6">
              {typography.secondaryFontDescription}
            </p>
          </div>
        </div>

        {/* Secondary Font Weights */}
        <div className={`transition-all duration-700 delay-400 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">{typography.secondaryWeightsTitle}</h3>
          
          <div className="space-y-4">
            {typography.secondaryWeights.map((weight, index) => (
              <div 
                key={index}
                className="p-4 md:p-6 rounded-xl bg-card border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <span 
                  className="font-body text-2xl md:text-3xl"
                  style={{ fontWeight: weight.weight }}
                >
                  Sensorial
                </span>
                <span className="text-sm text-muted-foreground">
                  {weight.name} — {weight.weight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypographySection;