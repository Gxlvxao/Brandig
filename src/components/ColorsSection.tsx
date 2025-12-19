import { useInView } from '../hooks/useInView';
import { useBrandStore } from '@/store/useBrandStore';

// Movido para fora para evitar recriação desnecessária, mas aceita props do Store
const ColorCard = ({
  color,
  index
}: {
  color: any; // Usando any aqui para simplificar, mas idealmente seria a interface ColorItem
  index: number;
}) => (
  <div 
    className="rounded-2xl overflow-hidden bg-card border border-border/50 card-lift" 
    style={{ transitionDelay: `${(index + 2) * 0.1}s` }}
  >
    {/* Solid Color */}
    <div 
      className="aspect-[3/2] w-full" 
      style={{ backgroundColor: color.hex }} 
    />
    
    {/* 5 Gradient Stop Blocks */}
    <div className="flex w-full">
      {color.gradientStops.map((stop: string, i: number) => (
        <div 
          key={i} 
          className="flex-1 h-10" 
          style={{ backgroundColor: stop }} 
        />
      ))}
    </div>
    
    <div className="p-4 md:p-6">
      <h4 className="font-heading font-medium text-foreground mb-3">{color.name}</h4>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-mono">
          <span className="text-accent">HEX</span> {color.hex}
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          <span className="text-accent">RGB</span> {color.rgb}
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          <span className="text-accent">CMYK</span> {color.cmyk}
        </p>
      </div>
      <p className="text-sm text-accent mt-4">{color.usage}</p>
    </div>
  </div>
);

const ColorsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { colors } = useBrandStore();

  return (
    <section id="colors" ref={ref} className="section-padding relative">
      <div className="content-container">
        {/* Section Header */}
        <div className={`mb-12 md:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">{colors.sectionNumber}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">{colors.title}</h2>
        </div>

        {/* Primary Colors */}
        <div className={`mb-16 md:mb-24 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">{colors.primaryPaletteTitle}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {colors.primaryColors.map((color, index) => (
              <ColorCard key={index} color={color} index={index} />
            ))}
          </div>
        </div>

        {/* Secondary Colors */}
        <div className={`mb-16 md:mb-24 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">{colors.secondaryPaletteTitle}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {colors.secondaryColors.map((color, index) => (
              <ColorCard key={index} color={color} index={index} />
            ))}
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className={`transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">{colors.usageTitle}</h3>
          
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/50">
            <ul className="space-y-4 text-muted-foreground">
              {colors.usageGuidelines.map((guideline, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-accent">•</span>
                  <span>{guideline}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorsSection;