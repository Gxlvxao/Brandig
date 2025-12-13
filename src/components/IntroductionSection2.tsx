import { useInView } from '../hooks/useInView';

const IntroductionSection2 = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section 
      id="introduction-2" 
      ref={ref}
      className="section-padding relative"
    >
      <div className="content-container">
        {/* Section Header */}
        <div className={`mb-12 md:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">02</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">Introdução</h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Main Text */}
          <div className={`transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl md:text-2xl lg:text-3xl font-heading font-light leading-relaxed text-foreground">
              Este brand book é mais do que um guia — é uma imersão na identidade visual e conceptual de uma marca que respira sofisticação.
            </p>
          </div>

          {/* Right Column - Details */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Cada elemento foi cuidadosamente pensado para transmitir a essência da marca: elegância discreta, atenção ao detalhe e uma experiência sensorial única.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Nas páginas seguintes, encontrará as diretrizes que definem a nossa identidade — desde a paleta cromática aos elementos tipográficos, das aplicações práticas aos princípios que guiam cada decisão visual.
            </p>
            
            {/* Quote */}
            <blockquote className="border-l-2 border-accent pl-6 py-2 mt-8">
              <p className="text-lg md:text-xl italic text-foreground">
                "O luxo está nos detalhes que não se veem à primeira vista."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection2;
