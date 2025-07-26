import { useEffect, useState } from 'react';
import portalImage from '@/assets/portal-central.jpg';

const PortalHero = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
      </div>

      {/* Central portal */}
      <div className="relative z-10 text-center">
        <div 
          className={`relative transition-all duration-1000 ${
            isAnimating ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        >
          {/* Portal energy rings */}
          <div className="absolute inset-0 -m-8">
            <div className="w-96 h-96 border-2 border-primary rounded-full animate-spin opacity-50" />
            <div className="absolute top-4 left-4 w-80 h-80 border border-secondary rounded-full animate-spin opacity-30" style={{animationDirection: 'reverse'}} />
          </div>
          
          {/* Portal image */}
          <div className="relative w-80 h-80 mx-auto mb-8">
            <img 
              src={portalImage} 
              alt="Central Portal" 
              className="w-full h-full object-cover rounded-full animate-pulse"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20" />
          </div>
        </div>

        {/* Title */}
        <div className={`transition-all duration-1000 delay-500 ${
          isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            SnTC
          </h1>
          <h2 className="text-2xl md:text-4xl font-light text-foreground mb-6">
            Science & Technology Council
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            IIT Mandi's Technical Society where innovation meets the cosmos. 
            Enter the portal to explore our tech clubs revolving around the galaxy of possibilities.
          </p>
        </div>

        {/* Floating action buttons */}
        <div className={`mt-12 transition-all duration-1000 delay-1000 ${
          isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                const clubsSection = document.querySelector('[data-section="clubs-cells"]');
                if (clubsSection) {
                  clubsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Explore Clubs
            </button>
            <button 
              className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                const projectsSection = document.querySelector('[data-section="projects"]');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              View Projects
            </button>
          </div>
        </div>
      </div>

      {/* Terminal cursor */}
      <div className="absolute bottom-24 left-4 sm:bottom-8 sm:left-8 text-accent text-sm font-mono">
  <span>{'>'} sntc.init()...</span>
  <span className="animate-pulse">_</span>
</div>


    </div>
  );
};

export default PortalHero;