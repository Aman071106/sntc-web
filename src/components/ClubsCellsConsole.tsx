import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  ExternalLink, 
  Users, 
  Calendar, 
  Mail, 
  X, 
  Code, 
  Satellite, 
  Bot, 
  Settings, 
  Dna, 
  Car, 
  Building, 
  Shield, 
  Gamepad2, 
  TrendingUp, 
  Brain,
  Zap,
  Monitor,
  Terminal
} from 'lucide-react';
import clubsDataJson from '@/assets/clubs_data.json';
import cellsDataJson from '@/assets/cells_data.json';

interface ClubCell {
  id: number;
  name: string;
  shortName: string;
  fullName: string;
  description: string;
  image: string;
  website: string;
  email: string;
  category: string;
  icon: string;
  color: string;
  memberCount: number;
  events: number;
  type?: 'club' | 'cell';
}
const clubCellImages = import.meta.glob('@/assets/club_cells_images/*', { eager: true, import: 'default' });

const getImage = (fileName: string) => {
  const match = Object.entries(clubCellImages).find(([path]) => path.endsWith(fileName));
  return match ? match[1] : '';
};

const clubsData: ClubCell[] = (clubsDataJson as ClubCell[]).map(club => ({ ...club, type: 'club' }));
const cellsData: ClubCell[] = (cellsDataJson as ClubCell[]).map(cell => ({ ...cell, type: 'cell' }));
const allData: ClubCell[] = [...clubsData, ...cellsData];
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    code: <Code className="w-6 h-6" />,
    satellite: <Satellite className="w-6 h-6" />,
    bot: <Bot className="w-6 h-6" />,
    settings: <Settings className="w-6 h-6" />,
    dna: <Dna className="w-6 h-6" />,
    car: <Car className="w-6 h-6" />,
    building: <Building className="w-6 h-6" />,
    shield: <Shield className="w-6 h-6" />,
    "gamepad-2": <Gamepad2 className="w-6 h-6" />,
    "trending-up": <TrendingUp className="w-6 h-6" />,
    brain: <Brain className="w-6 h-6" />
  };
  return iconMap[iconName] || <Zap className="w-6 h-6" />;
};

const ClubsCellsConsole = () => {
  const [selectedItem, setSelectedItem] = useState<ClubCell | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId: number;
    
    if (isAutoRotating) {
      const animate = () => {
        setRotationAngle(prev => (prev + 0.5) % 360);
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isAutoRotating]);

  const handleItemClick = (item: ClubCell) => {
    setSelectedItem(item);
    setIsAutoRotating(false);
  };

  const handleMouseEnter = () => {
    setIsAutoRotating(false);
  };

  const handleMouseLeave = () => {
    setIsAutoRotating(true);
  };

  return (
    <section id="clubs-cells" className="py-20 px-4 pb-32 relative overflow-hidden min-h-screen" data-section="clubs-cells">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 relative z-20">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Network Nodes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the interconnected ecosystem of technical clubs and specialized cells
          </p>
        </div>

        {/* 3D Rotating Console */}
        <div className="relative flex justify-center items-center h-96 mb-16 z-10">
          {/* Central Console */}
          <div className="relative z-10">
            <div className="w-32 h-32 bg-card/80 backdrop-blur-sm border-2 border-primary/50 rounded-lg flex items-center justify-center shadow-2xl">
              <div className="text-center">
                <Monitor className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-xs font-mono text-primary">SNTC</div>
                <div className="text-xs font-mono text-muted-foreground">HUB</div>
              </div>
            </div>
          </div>

          {/* Orbiting Items */}
          <div 
            ref={containerRef}
            className="absolute inset-0 z-10"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {allData.map((item, index) => {
              const angle = (index * (360 / allData.length) + rotationAngle) * (Math.PI / 180);
              const radius = 200;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const z = Math.sin(angle * 2) * 50;
              const scale = 1 + Math.sin(angle) * 0.1;

              return (
                <div
                  key={item.id}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                  style={{
                    transform: `translate(${x}px, ${y}px) translateZ(${z}px) scale(${scale})`,
                    zIndex: Math.round(z + 100)
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  <Card className={`
                    w-24 h-24 bg-card/60 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-110 z-20
                    ${item.color === 'primary' ? 'border-primary/50 hover:border-primary' : ''}
                    ${item.color === 'secondary' ? 'border-secondary/50 hover:border-secondary' : ''}
                    ${item.color === 'accent' ? 'border-accent/50 hover:border-accent' : ''}
                  `}>
                    <div className="p-3 text-center">
                      <div className="w-8 h-8 mx-auto mb-1">
                        <img 
                          src={getImage(item.image)} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="text-xs font-mono text-foreground truncate">
                        {item.shortName}
                      </div>
                      <div className="text-xs font-mono text-muted-foreground">
                        {item.type?.toUpperCase()}
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
            {clubsData.map((_, index) => {
              const angle = (index * (360 / clubsData.length) + rotationAngle) * (Math.PI / 180);
              const radius = 200;
              const x = Math.cos(angle) * radius + 50;
              const y = Math.sin(angle) * radius + 50;
              
              return (
                <line
                  key={index}
                  x1="50%"
                  y1="50%"
                  x2={`${x}px`}
                  y2={`${y}px`}
                  stroke="hsl(var(--primary) / 0.3)"
                  strokeWidth="1"
                  className="animate-pulse"
                />
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="text-center mb-8 relative z-10" style={{ marginTop: '110px' }}>
          <div className="inline-flex gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Clubs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-muted-foreground">Cells</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-20">
          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{allData.filter(item => item.type === 'club').length}</div>
            <div className="text-sm text-muted-foreground">Clubs</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent">{allData.filter(item => item.type === 'cell').length}</div>
            <div className="text-sm text-muted-foreground">Cells</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-secondary/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{allData.reduce((sum, item) => sum + item.memberCount, 0)}+</div>
            <div className="text-sm text-muted-foreground">Members</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{allData.reduce((sum, item) => sum + item.events, 0)}+</div>
            <div className="text-sm text-muted-foreground">Events</div>
          </div>
        </div>
      </div>

      {/* IDE Style Details Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
      <DialogContent 
  className="w-[98vw] max-w-none bg-card border-2 border-primary/30 p-0 z-50 h-auto max-h-[95vh] mt-1 sm:mt-3"
>      {selectedItem && (
        <div className="p-3 sm:p-6 overflow-y-auto">
        {/* Console Header */}
              <div className="bg-muted/20 border-b border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-primary/30">
                      <img src={getImage(selectedItem.image)} alt={selectedItem.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{selectedItem.fullName}</h2>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="font-mono">{selectedItem.category}</span>
                        <span className="font-mono">•</span>
                        <span className="font-mono">{selectedItem.type?.toUpperCase()}</span>
                        <span className="font-mono">•</span>
                        <span className="font-mono">{selectedItem.memberCount}+ members</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 hidden sm:flex">
  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
</div>
                </div>
              </div>

              {/* Console Content */}
              <div className="flex-1 p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-mono text-muted-foreground mb-3">// MISSION OVERVIEW</h3>
                    <div className="bg-muted/20 p-6 rounded-lg border-l-4 border-primary">
                      <p className="text-foreground leading-relaxed text-lg">
                        {selectedItem.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div>
                    <h3 className="text-sm font-mono text-muted-foreground mb-3">// SYSTEM STATS</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-muted/20 p-6 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-3 mb-3">
                          <Users className="w-6 h-6 text-primary" />
                          <span className="text-sm font-mono text-muted-foreground">ACTIVE MEMBERS</span>
                        </div>
                        <div className="text-3xl font-bold text-primary">{selectedItem.memberCount}+</div>
                      </div>
                      <div className="bg-muted/20 p-6 rounded-lg border border-accent/20">
                        <div className="flex items-center gap-3 mb-3">
                          <Calendar className="w-6 h-6 text-accent" />
                          <span className="text-sm font-mono text-muted-foreground">EVENTS THIS YEAR</span>
                        </div>
                        <div className="text-3xl font-bold text-accent">{selectedItem.events}</div>
                      </div>
                      
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-sm font-mono text-muted-foreground mb-3">// QUICK ACTIONS</h3>
                    <div className="flex gap-4">
                      <Button 
                        size="lg"
                        className="bg-primary text-primary-foreground hover:opacity-90 px-8"
                        onClick={() => window.open(selectedItem.website, '_blank')}
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Visit Website
                      </Button>
                      <Button 
                        size="lg"
                        variant="outline" 
                        className="border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground px-8"
                        onClick={() => window.open(`mailto:${selectedItem.email}`, '_blank')}
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Contact Team
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ClubsCellsConsole; 