import { useInView } from '../hooks/useInView';
import { useBrandStore } from '@/store/useBrandStore';

const CreditsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { credits } = useBrandStore();

  return (
    <section 
      id="credits" 
      ref={ref}
      className="section-padding relative"
    >
      <div className="content-container">
        {/* Section Header */}
        <div className={`mb-12 md:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">{credits.sectionNumber}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">{credits.title}</h2>
        </div>

        {/* Team Grid */}
        <div className={`mb-16 md:mb-24 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {credits.team.map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border/50 card-lift"
                style={{ transitionDelay: `${(index + 2) * 0.1}s` }}
              >
                <p className="text-xs tracking-wider uppercase text-accent mb-2">{member.role}</p>
                <p className="font-heading text-lg md:text-xl font-medium text-foreground">{member.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Studio Credit */}
        <div className={`text-center transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 text-muted-foreground">
            <span className="w-12 h-px bg-border" />
            <span className="text-sm tracking-widest uppercase">{credits.studioName} — {credits.year}</span>
            <span className="w-12 h-px bg-border" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreditsSection;