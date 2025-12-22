import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import IndexSection from '@/components/IndexSection';
import IntroductionSection from '@/components/IntroductionSection';
import AboutBrandSection from '@/components/AboutBrandSection';
import BrandSection from '@/components/BrandSection';
import PersonasSection from '@/components/PersonasSection';
import IdentitySection from '@/components/IdentitySection';
import TypographySection from '@/components/TypographySection';
import ColorsSection from '@/components/ColorsSection';
import ApplicationSection from '@/components/ApplicationSection';
import DownloadsSection from '@/components/DownloadsSection';
import CreditsSection from '@/components/CreditsSection';
import AmbientGlow from '@/components/AmbientGlow';
import { BrandEditor } from '@/components/editor/BrandEditor';

import GlobalStyle from '@/components/GlobalStyle'; // <--- O IMPORT QUE FALTAVA
import { useBrandStore } from '@/store/useBrandStore';
import { useAuthStore } from '@/store/useAuthStore';

const ProjectView = () => {
  const { slug } = useParams();
  const loadProject = useBrandStore((state) => state.loadProject);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (slug) {
      loadProject(slug);
    }
  }, [slug, loadProject]);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Componente Global de Estilos (Fontes) - AQUI ESTAVA O ERRO */}
      <GlobalStyle />
      
      <AmbientGlow />
      
      
      <Navigation />
      
      <main className="relative z-10">
        <HeroSection />
        
        <div className="content-container px-6 md:px-12 lg:px-20">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        
        <IndexSection />
        
        <div className="content-container px-6 md:px-12 lg:px-20">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        
        <IntroductionSection />
        <AboutBrandSection />
        <BrandSection />
        
        <PersonasSection />
        
        <IdentitySection />
        <TypographySection />
        <ColorsSection />
        <ApplicationSection />
        <DownloadsSection />
        <CreditsSection />
        
        <footer className="section-padding border-t border-border/50">
          <div className="content-container text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 MaxSell. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </main>

      {isAuthenticated && <BrandEditor />}
    </div>
  );
};

export default ProjectView;