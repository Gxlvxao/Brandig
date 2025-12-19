import { useInView } from '../hooks/useInView';
import { useBrandStore } from '@/store/useBrandStore';

const IntroductionSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { introduction } = useBrandStore();

  return (
    <section 
      id="introduction" 
      ref={ref}
      className="section-padding relative"
    >
      <div className="content-container">
        <div className={`mb-12 md:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">{introduction.sectionNumber}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">{introduction.title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className={`transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl md:text-2xl lg:text-3xl font-heading font-light leading-relaxed text-foreground mb-8">
              {introduction.mainText}
            </p>
            
            <blockquote className="border-l-2 border-accent pl-6 py-2">
              <p className="text-lg md:text-xl italic text-foreground">
                {introduction.quote}
              </p>
            </blockquote>
          </div>

          <div className={`transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6">Conteúdos</p>
            <ul className="space-y-4">
              {introduction.contentList.map((item, index) => (
                <li 
                  key={index}
                  className="flex items-center gap-4 group cursor-pointer"
                  style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                >
                  <span className="text-xs text-muted-foreground font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base md:text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;