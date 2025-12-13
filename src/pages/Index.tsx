import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import IndexSection from '@/components/IndexSection';
import IntroductionSection from '@/components/IntroductionSection';
import IntroductionSection2 from '@/components/IntroductionSection2';
import BrandSection from '@/components/BrandSection';
import IdentitySection from '@/components/IdentitySection';
import TypographySection from '@/components/TypographySection';
import ColorsSection from '@/components/ColorsSection';
import ApplicationSection from '@/components/ApplicationSection';
import DownloadsSection from '@/components/DownloadsSection';
import CreditsSection from '@/components/CreditsSection';
import AmbientGlow from '@/components/AmbientGlow';

const Index = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  const handleSoundToggle = () => {
    setIsSoundEnabled(!isSoundEnabled);
    // Sound implementation would go here
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Ambient Glow Effects */}
      <AmbientGlow />
      
      {/* Navigation */}
      <Navigation 
        onSoundToggle={handleSoundToggle}
        isSoundEnabled={isSoundEnabled}
      />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        
        {/* Divider */}
        <div className="content-container px-6 md:px-12 lg:px-20">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        
        <IndexSection />
        
        <div className="content-container px-6 md:px-12 lg:px-20">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        
        <IntroductionSection />
        <IntroductionSection2 />
        <BrandSection />
        <IdentitySection />
        <TypographySection />
        <ColorsSection />
        <ApplicationSection />
        <DownloadsSection />
        <CreditsSection />
        
        {/* Footer */}
        <footer className="section-padding border-t border-border/50">
          <div className="content-container text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Sensorial. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
