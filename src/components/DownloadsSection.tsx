import { useInView } from '../hooks/useInView';
import { Download, FileText, Image, Package } from 'lucide-react';
import { useBrandStore } from '@/store/useBrandStore';

// Mapa de ícones disponíveis
const iconMap = {
  Package: Package,
  Image: Image,
  FileText: FileText
};

const DownloadsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { downloads } = useBrandStore();

  return (
    <section 
      id="downloads" 
      ref={ref}
      className="section-padding relative"
    >
      <div className="content-container">
        {/* Section Header */}
        <div className={`mb-12 md:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">{downloads.sectionNumber}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">{downloads.title}</h2>
        </div>

        {/* Description */}
        <div className={`mb-12 md:mb-16 max-w-2xl transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {downloads.description}
          </p>
        </div>

        {/* Downloads Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {downloads.items.map((item, index) => {
            // Pega o ícone correto baseado no nome, ou usa FileText como fallback
            const Icon = iconMap[item.iconName as keyof typeof iconMap] || FileText;
            
            return (
              <button
                key={index}
                className={`group text-left p-6 md:p-8 rounded-2xl bg-card border border-border/50 card-lift transition-all duration-700 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index + 2) * 0.1}s` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-secondary">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                          {item.format}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                          {item.size}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-heading text-lg md:text-xl font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                    <Download className="w-5 h-5 text-accent" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;