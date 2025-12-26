import { useInView } from '../hooks/useInView';
import { useBrandStore } from '@/store/useBrandStore';

const SHADES = [
  { opacity: 1, label: '100%' },
  { opacity: 0.9, label: '90%' },
  { opacity: 0.6, label: '60%' },
  { opacity: 0.4, label: '40%' },
  { opacity: 0.2, label: '20%' },
];

const ColorCard = ({
  color,
  index
}: {
  color: any;
  index: number;
}) => {
  return (
    <div 
      className="rounded-2xl overflow-hidden bg-card border border-border/50 card-lift" 
      style={{ transitionDelay: `${(index + 2) * 0.1}s` }}
    >
      <div 
        className="aspect-[3/2] w-full relative group" 
        style={{ backgroundColor: color.hex }}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      
      <div className="flex w-full h-12">
        {SHADES.map((shade, i) => (
          <div 
            key={i} 
            className="flex-1 h-full flex items-end justify-center pb-1 text-[9px] text-foreground/70 font-mono tracking-tighter"
            style={{ 
              backgroundColor: color.hex, 
              opacity: shade.opacity 
            }} 
            title={`Opacidade ${shade.label}`}
          >
            {shade.label}
          </div>
        ))}
      </div>
      
      <div className="p-4 md:p-6">
        <h4 className="font-heading font-medium text-foreground mb-3">{color.name}</h4>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-mono uppercase">
            <span className="text-accent mr-2">HEX</span> {color.hex}
          </p>
        </div>
        <p className="text-sm text-accent mt-4 border-t border-border/50 pt-3">{color.usage}</p>
      </div>
    </div>
  );
};

const SecondaryColorCard = ({
  color,
  index
}: {
  color: any;
  index: number;
}) => {
  return (
    <div 
      className="rounded-2xl overflow-hidden bg-card border border-border/50 card-lift" 
      style={{ transitionDelay: `${(index + 2) * 0.1}s` }}
    >
      <div 
        className="aspect-[3/2] w-full relative group" 
        style={{ backgroundColor: color.hex }}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      
      <div 
        className="w-full h-12 flex items-center justify-center relative"
        style={{ 
          background: `linear-gradient(to right, ${color.hex} 0%, #FFFFFF 100%)`
        }}
      >
        <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-black/40 mix-blend-multiply">
          Degradê
        </span>
      </div>
      
      <div className="p-4 md:p-6">
        <h4 className="font-heading font-medium text-foreground mb-3">{color.name}</h4>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-mono uppercase">
            <span className="text-accent mr-2">HEX</span> {color.hex}
          </p>
        </div>
        <p className="text-sm text-accent mt-4 border-t border-border/50 pt-3">{color.usage}</p>
      </div>
    </div>
  );
};

const ColorsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { colors } = useBrandStore();

  return (
    <section id="colors" ref={ref} className="section-padding relative">
      <div className="content-container">
        <div className={`mb-12 md:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">{colors.sectionNumber}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">{colors.title}</h2>
        </div>

        <div className={`mb-16 md:mb-24 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">{colors.primaryPaletteTitle}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {colors.primaryColors.map((color, index) => (
              <ColorCard key={index} color={color} index={index} />
            ))}
          </div>
        </div>

        {colors.secondaryColors && colors.secondaryColors.length > 0 && (
            <div className={`mb-16 md:mb-24 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">{colors.secondaryPaletteTitle}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {colors.secondaryColors.map((color, index) => (
                  <SecondaryColorCard key={index} color={color} index={index} />
                ))}
              </div>
            </div>
        )}

        <div className={`transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">{colors.usageTitle}</h3>
          
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
            <ul className="space-y-4 text-muted-foreground">
              {colors.usageGuidelines.map((guideline, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <span className="text-accent mt-1.5 text-xs">●</span>
                  <span className="leading-relaxed">{guideline}</span>
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