import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Users, Music, GraduationCap } from 'lucide-react';
import quickLinksData from '@/assets/quicklinks_data.json';

interface QuickLink {
  id: number;
  name: string;
  description: string;
  url: string;
  icon: string;
  category: string;
}

const QuickLinks = () => {
  const quickLinks: QuickLink[] = quickLinksData;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="w-6 h-6" />;
      case 'music':
        return <Music className="w-6 h-6" />;
      case 'graduation-cap':
        return <GraduationCap className="w-6 h-6" />;
      default:
        return <ExternalLink className="w-6 h-6" />;
    }
  };

  return (
    <section id="quicklinks" className="py-20 px-4 pb-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Quick Links
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access important IIT Mandi resources and portals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quickLinks.map((link, index) => (
            <div 
              key={link.id}
              className="transform transition-all duration-500"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 h-full">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                      {getIcon(link.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {link.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {link.category}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {link.description}
                  </p>

                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300"
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    <span>Visit Site</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Hover effect beam */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks; 