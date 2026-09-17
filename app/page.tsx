import HeroSection from '@/components/hero-section';
import BatterySurvivorSection from '@/components/battery-survivor-section';
import GreentechSection from '@/components/greentech-section';
import CanvaSection from '@/components/canva-section';
import Footer from '@/components/footer';
import { BackgroundCanvas } from '@/components/background-canvas';
import { GlobalBackground } from '@/components/global-background';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <GlobalBackground />
      <BackgroundCanvas />
      
      <div className="relative z-10">
        <HeroSection />
        <BatterySurvivorSection />
        <GreentechSection />
        <CanvaSection />
        <Footer />
      </div>
    </main>
  );
}

