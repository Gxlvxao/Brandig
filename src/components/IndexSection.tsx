import { useInView } from '../hooks/useInView';
import { useBrandStore } from '@/store/useBrandStore';
import { useSoundEffect } from '@/hooks/useSoundEffect';

const IndexSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { indexSection } = useBrandStore();
  const { playHover } = useSoundEffect();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="index" 
      ref={ref}
      className="section-padding relative"
    >
      <div className="content-container">
        {/* Section Header */}
        <div className={`mb-12 md:mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">{indexSection.sectionNumber}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold break-words">{indexSection.title}</h2>
        </div>

        {/* Index Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {indexSection.items.map((section, index) => (
            <button
              key={index}
              onMouseEnter={playHover}
              onClick={() => scrollToSection(section.href)}
              className={`group text-left p-6 md:p-8 rounded-2xl bg-card border border-border/50 card-lift transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1"> {/* Proteção contra overflow flex */}
                  <p className="text-xs text-accent font-medium tracking-wider mb-2">
                    {section.number}
                  </p>
                  <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground group-hover:text-accent transition-colors duration-300 break-words">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 break-words">
                    {section.subtitle}
                  </p>
                </div>
                <span className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndexSection;