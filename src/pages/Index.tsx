import Navigation from '@/components/Navigation';
import PortalHero from '@/components/PortalHero';
import ClubsOrbit from '@/components/ClubsOrbit';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PortalHero />
      <ClubsOrbit />
    </div>
  );
};

export default Index;
