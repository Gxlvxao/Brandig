import { useInView } from '../hooks/useInView';

const ColorsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const primaryColors = [
    { 
      name: 'Preto Profundo', 
      hex: '#0A0A0B', 
      hsl: '240° 6% 4%', 
      usage: 'Fundo principal',
      gradient: 'linear-gradient(135deg, #0A0A0B 0%, #1A1917 50%, #0A0A0B 100%)'
    },
    { 
      name: 'Branco Quente', 
      hex: '#E8E4DD', 
      hsl: '40° 10% 90%', 
      usage: 'Texto principal',
      gradient: 'linear-gradient(135deg, #E8E4DD 0%, #F5F2ED 50%, #E8E4DD 100%)'
    },
    { 
      name: 'Amarelo Luz', 
      hex: '#D4A842', 
      hsl: '45° 80% 55%', 
      usage: 'Destaque e acentos',
      gradient: 'linear-gradient(135deg, #D4A842 0%, #E8C35A 50%, #D4A842 100%)'
    },
  ];

  const secondaryColors = [
    { name: 'Cinza Quente', hex: '#1A1917', hsl: '40° 4% 12%', usage: 'Superfícies' },
    { name: 'Cinza Médio', hex: '#8B8680', hsl: '40° 6% 50%', usage: 'Texto secundário' },
    { name: 'Cinza Claro', hex: '#C2BBB0', hsl: '40° 10% 75%', usage: 'Texto terciário' },
  ];

  const PrimaryColorCard = ({ color, index }: { color: typeof primaryColors[0], index: number }) => (
    <div 
      className="rounded-2xl overflow-hidden bg-card border border-border/50 card-lift"
      style={{ transitionDelay: `${(index + 2) * 0.1}s` }}
    >
      {/* Solid Color */}
      <div 
        className="aspect-[3/2] w-full"
        style={{ backgroundColor: color.hex }}
      />
      {/* Gradient Sample */}
      <div 
        className="h-16 w-full"
        style={{ background: color.gradient }}
      />
      <div className="p-4 md:p-6">
        <h4 className="font-heading font-medium text-foreground mb-1">{color.name}</h4>
        <p className="text-xs text-muted-foreground font-mono mb-2">{color.hex}</p>
        <p className="text-xs text-muted-foreground">{color.hsl}</p>
        <p className="text-sm text-accent mt-3">{color.usage}</p>
      </div>
    </div>
  );

  const SecondaryColorCard = ({ color, index }: { color: typeof secondaryColors[0], index: number }) => (
    <div 
      className="rounded-2xl overflow-hidden bg-card border border-border/50 card-lift"
      style={{ transitionDelay: `${(index + 2) * 0.1}s` }}
    >
      <div 
        className="aspect-[3/2] w-full"
        style={{ backgroundColor: color.hex }}
      />
      <div className="p-4 md:p-6">
        <h4 className="font-heading font-medium text-foreground mb-1">{color.name}</h4>
        <p className="text-xs text-muted-foreground font-mono mb-2">{color.hex}</p>
        <p className="text-xs text-muted-foreground">{color.hsl}</p>
        <p className="text-sm text-accent mt-3">{color.usage}</p>
      </div>
    </div>
  );

  return (
    <section 
      id="colors" 
      ref={ref}
      className="section-padding relative"
    >
      <div className="content-container">
        {/* Section Header */}
        <div className={`mb-12 md:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">05</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">Cores</h2>
        </div>

        {/* Primary Colors */}
        <div className={`mb-16 md:mb-24 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">Paleta Principal</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {primaryColors.map((color, index) => (
              <PrimaryColorCard key={color.name} color={color} index={index} />
            ))}
          </div>
        </div>

        {/* Secondary Colors */}
        <div className={`mb-16 md:mb-24 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">Paleta Secundária</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {secondaryColors.map((color, index) => (
              <SecondaryColorCard key={color.name} color={color} index={index} />
            ))}
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className={`transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">Diretrizes de Uso</h3>
          
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/50">
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>O preto profundo é a base de toda a comunicação visual.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>O amarelo luz deve ser usado com moderação, apenas para acentos e destaques.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>Evitar combinações de alto contraste que comprometam a elegância.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>Em fundos claros, inverter a hierarquia mantendo a mesma harmonia cromática.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorsSection;
