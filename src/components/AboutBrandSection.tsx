import { useInView } from '../hooks/useInView';
import { useBrandStore } from '@/store/useBrandStore';

const AboutBrandSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  // Conectando ao Store
  const { aboutBrand } = useBrandStore();

  return (
    <section 
      id="sobre-marca" 
      ref={ref}
      className="section-padding relative"
    >
      <div className="content-container">
        {/* Section Header */}
        <div className={`mb-12 md:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">{aboutBrand.sectionNumber}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">{aboutBrand.title}</h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Main Text */}
          <div className={`transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl md:text-2xl lg:text-3xl font-heading font-light leading-relaxed text-foreground">
              {aboutBrand.highlightText}
            </p>
          </div>

          {/* Right Column - Details */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Mapeando os parágrafos dinamicamente */}
            {aboutBrand.descriptionParagraphs.map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
            
            {/* Quote */}
            <blockquote className="border-l-2 border-accent pl-6 py-2 mt-8">
              <p className="text-lg md:text-xl italic text-foreground">
                {aboutBrand.quote}
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBrandSection;