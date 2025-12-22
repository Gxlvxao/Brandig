import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useBrandStore } from '@/store/useBrandStore';
import { useSoundEffect } from '@/hooks/useSoundEffect';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { navigation } = useBrandStore();
  const { playHover } = useSoundEffect();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Índice', href: '#index' },
    { label: 'Identidade', href: '#identity' },
    { label: 'Aplicação', href: '#application' },
    { label: 'Downloads', href: '#downloads' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 z-50 transition-all duration-500 ${
          isScrolled ? 'top-3 md:top-4' : ''
        }`}
      >
        <div className="glass rounded-2xl px-4 py-3 md:px-6 md:py-4 flex items-center justify-between shadow-soft">
          <a 
            href="#hero" 
            onMouseEnter={playHover}
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            className="flex items-center gap-3 font-heading font-semibold text-lg md:text-xl tracking-tight text-foreground hover:text-accent transition-colors duration-300 min-w-0"
          >
            {navigation.logoImage && (
              <img src={navigation.logoImage} alt={navigation.logoText} className="h-8 md:h-10 w-auto object-contain shrink-0" />
            )}
            
            {(navigation.showBoth || !navigation.logoImage) && (
              <span className="truncate">{navigation.logoText}</span>
            )}
          </a>

          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={playHover}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors duration-300"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <>
          <div 
            className="menu-overlay animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-20 left-4 right-4 z-50 glass rounded-2xl p-6 animate-scale-in">
            <div className="flex flex-col gap-4">
              {menuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="text-lg font-medium text-foreground py-2 border-b border-border/50 last:border-0 transition-colors duration-300 active:text-accent"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;