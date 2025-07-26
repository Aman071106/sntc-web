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

// Import club and cell images
import programmingImg from '@/assets/club_cells_images/programming.png';
import stacImg from '@/assets/club_cells_images/stac.png';
import robotronicsImg from '@/assets/club_cells_images/robotronics.png';
import yantrikImg from '@/assets/club_cells_images/yantrik.png';
import kbgImg from '@/assets/club_cells_images/KBG.png';
import gdgImg from '@/assets/club_cells_images/gdg.png';
import saeImg from '@/assets/club_cells_images/Sae.jpeg';
import nirmaanImg from '@/assets/club_cells_images/nirmaan.png';
import saicImg from '@/assets/club_cells_images/saic.png';
import cg2dImg from '@/assets/club_cells_images/cg2d.png';
import ecellImg from '@/assets/club_cells_images/ecell.png';
import heuristicsImg from '@/assets/club_cells_images/hueristics.png';

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
  type: 'club' | 'cell';
}

const clubsData: ClubCell[] = [
  {
    id: 1,
    name: "Programming Club",
    shortName: "KP",
    fullName: "Programming Club (KamandPrompt)",
    description: "An enthusiastic coder ? Here is the club for you. It is a club dedicated to programming related activities. It keeps you updated with all the programming related activities and competitions. It also organizes several competitions and workshops to increase coding skills. The Association for Computing and Machinery(ACM) Chapter at IIT Mandi organizes various guest lectures and tutorials from time to time.",
    image: programmingImg,
    website: "http://pc.iitmandi.co.in/",
    email: "programming@iitmandi.ac.in",
    category: "Programming",
    icon: "code",
    color: "primary",
    memberCount: 200,
    events: 20,
    type: "club"
  },
  {
    id: 2,
    name: "STAC",
    shortName: "STAC",
    fullName: "Space Technology and Astronomy Cell",
    description: "STAC aims at making students familiar with everything related to Astronomy, Space and Open Source development in the field of Space Technology. The club has 2 telescopes, a 12\" telescope under construction, a pair of binoculars and organizes frequent star-gazing sessions and undertakes several interesting technical projects.",
    image: stacImg,
    website: "http://stac.iitmandi.co.in/",
    email: "stac@iitmandi.ac.in",
    category: "Space Technology",
    icon: "satellite",
    color: "secondary",
    memberCount: 120,
    events: 15,
    type: "club"
  },
  {
    id: 3,
    name: "Robotronics Club",
    shortName: "Robotronics",
    fullName: "Robotronics Club",
    description: "Robotics + Electronics = Robotronics. This club works in the field of both robotics and electronics. In electronics domain, it works on analog and digital electronics helping in developing practical skills in building and designing circuits. On the other hand in robotics it provides everything that students need to build robots : workspace , tools, supplies, money and experienced people to answer questions and help with projects.",
    image: robotronicsImg,
    website: "http://robotronics.iitmandi.co.in/",
    email: "robotronics@iitmandi.ac.in",
    category: "Robotics",
    icon: "bot",
    color: "primary",
    memberCount: 150,
    events: 12,
    type: "club"
  },
  {
    id: 4,
    name: "Yantrik Club",
    shortName: "Yantrik",
    fullName: "Yantrik Club",
    description: "As a part of the technical council of IIT Mandi, this club plays a cruical role in the field of mechanical engineering. It focuses on developing green and effective energy methods. It organizes activities like arCAD, MechFest.",
    image: yantrikImg,
    website: "https://yantrik.iitmandi.co.in/",
    email: "yantrik@iitmandi.ac.in",
    category: "Mechanical",
    icon: "settings",
    color: "accent",
    memberCount: 110,
    events: 12,
    type: "club"
  },
  {
    id: 5,
    name: "KBG",
    shortName: "KBG",
    fullName: "Kamand Bioengineering Group",
    description: "At the juncture of biology and engineering, KBG offers exposure to a multitude of outlooks and a broad variety of topics including computational biology, genetics, neuroscience, biomechanics, biotechnology, nanotechnology, biomimetics and other associated forks diverging from the interplay of nature's craft and the intellectual desire to grasp it.",
    image: kbgImg,
    website: "https://www.instagram.com/kbg_iitmandi/",
    email: "kbg@iitmandi.ac.in",
    category: "Bioengineering",
    icon: "dna",
    color: "secondary",
    memberCount: 90,
    events: 8,
    type: "club"
  },
  {
    id: 6,
    name: "GDG",
    shortName: "GDG",
    fullName: "Google Developers Group",
    description: "GDSC stands for Google Developer Student Clubs. Google DSCs are a program run by Google to support and empower students who are interested in technology. They provide resources and support for students to learn and apply their skills, including access to Google technologies, mentorship from Google experts, and opportunities to connect with other students and professionals in the tech industry.",
    image: gdgImg,
    website: "https://gdsc.community.dev/iit-mandi/",
    email: "gdg@iitmandi.ac.in",
    category: "Technology",
    icon: "code",
    color: "primary",
    memberCount: 180,
    events: 25,
    type: "club"
  },
  {
    id: 7,
    name: "SAE",
    shortName: "SAE",
    fullName: "Society of Automotive Engineers",
    description: "SAE IIT Mandi is a enthusiastic, motivated and passionate team of engineers whose interest resides in gears, suspensions, engines, brakes etc., talking in a nutshell an automobile.",
    image: saeImg,
    website: "https://clubsae.iitmandi.co.in/",
    email: "sae@iitmandi.ac.in",
    category: "Automotive",
    icon: "car",
    color: "accent",
    memberCount: 100,
    events: 10,
    type: "club"
  },
  {
    id: 8,
    name: "Nirmaan Club",
    shortName: "Nirmaan",
    fullName: "Nirmaan Club",
    description: "Nirmaan Club aims at creating a realization among students of the importance of Civil Engineering aspects in day to day which are often ignored by organizing events, workshops, quizzes, projects etc.",
    image: nirmaanImg,
    website: "https://www.facebook.com/groups/802179339895110/",
    email: "nirmaan@iitmandi.ac.in",
    category: "Civil Engineering",
    icon: "building",
    color: "secondary",
    memberCount: 85,
    events: 6,
    type: "club"
  },
  {
    id: 9,
    name: "SAIC",
    shortName: "SAIC",
    fullName: "System Administration and Infosec Cell",
    description: "Welcome to S.A.I.C (System Administration and Infosec Cell) at IIT Mandi! Our team of cyber enthusiasts excels in Capture The Flag (CTF) competitions and outsmarting hackers. We host and maintain secure websites with style and finesse. Passionate about penetration testing? We'll teach you how to spot vulnerabilities faster than campus Wi-Fi. Discover fun injections that challenge even the pros. Join us to help script a future where security breaches are history. At S.A.I.C, we're dedicated to making the digital world safer, one hack at a time!",
    image: saicImg,
    website: "https://saic.iitmandi.co.in/",
    email: "saic@iitmandi.ac.in",
    category: "Cybersecurity",
    icon: "shield",
    color: "accent",
    memberCount: 80,
    events: 8,
    type: "cell"
  },
  {
    id: 10,
    name: "CG2D",
    shortName: "CG2D",
    fullName: "Computer Graphics and Game Development",
    description: "The CG2D Club is a community for digital creativity and interactive entertainment. We offer workshops, projects, and seminars on 3D modeling, animation, game design, and real-time rendering. Our programs help members create stunning visuals and immersive games. Whether you're an experienced developer or a beginner, CG2D provides the resources and support to excel in computer graphics and game development.",
    image: cg2dImg,
    website: "https://cg2d.iitmandi.co.in/",
    email: "cg2d@iitmandi.ac.in",
    category: "Game Development",
    icon: "gamepad-2",
    color: "primary",
    memberCount: 95,
    events: 12,
    type: "cell"
  },
  {
    id: 11,
    name: "E-Cell",
    shortName: "E-Cell",
    fullName: "Entrepreneurship Cell",
    description: "E-Cell is a holographic abbreviation adopted by the entrepreneurship club of IIT Mandi. It's an alumnus initiation and currently is the stewardship of a team of five inter-disciplinary students with the mentorship of Dr. Satvasheel Powar, churning their ideas to reach the various aspects of what lies in this \"business\" of reaching the society. And as the name celebrates our crazy love for subjects related to business and its disciplinaries we always strive to give a glimpse of the potions of business by conducting multifarious of events.",
    image: ecellImg,
    website: "https://ecell.iitmandi.co.in/",
    email: "ecell@iitmandi.ac.in",
    category: "Entrepreneurship",
    icon: "trending-up",
    color: "secondary",
    memberCount: 72,
    events: 10,
    type: "cell"
  },
  {
    id: 12,
    name: "Heuristics Cell",
    shortName: "Heuristics",
    fullName: "Heuristics Cell",
    description: "At Heuristics we focus on enhancing the culture of Data Science, Machine Learning at IIT Mandi. It also expands to solve complex optimization problems. It underlies the whole field of Artificial Intelligence and the computer simulation of thinking, as they may be used in situations where there are no known algorithms. We organize regular events, challenges and workshops.",
    image: heuristicsImg,
    website: "https://heuristics.iitmandi.co.in/",
    email: "heuristics@iitmandi.ac.in",
    category: "AI/ML",
    icon: "brain",
    color: "primary",
    memberCount: 65,
    events: 15,
    type: "cell"
  }
];

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
            {clubsData.map((item, index) => {
              const angle = (index * (360 / clubsData.length) + rotationAngle) * (Math.PI / 180);
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
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="text-xs font-mono text-foreground truncate">
                        {item.shortName}
                      </div>
                      <div className="text-xs font-mono text-muted-foreground">
                        {item.type.toUpperCase()}
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
            <div className="text-2xl font-bold text-primary">{clubsData.filter(item => item.type === 'club').length}</div>
            <div className="text-sm text-muted-foreground">Clubs</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent">{clubsData.filter(item => item.type === 'cell').length}</div>
            <div className="text-sm text-muted-foreground">Cells</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-secondary/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{clubsData.reduce((sum, item) => sum + item.memberCount, 0)}+</div>
            <div className="text-sm text-muted-foreground">Members</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{clubsData.reduce((sum, item) => sum + item.events, 0)}+</div>
            <div className="text-sm text-muted-foreground">Events</div>
          </div>
        </div>
      </div>

      {/* IDE Style Details Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-card border-2 border-primary/30 p-0 z-50">
          {selectedItem && (
            <div className="flex flex-col h-full">
              {/* Console Header */}
              <div className="bg-muted/20 border-b border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-primary/30">
                      <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{selectedItem.fullName}</h2>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="font-mono">{selectedItem.category}</span>
                        <span className="font-mono">•</span>
                        <span className="font-mono">{selectedItem.type.toUpperCase()}</span>
                        <span className="font-mono">•</span>
                        <span className="font-mono">{selectedItem.memberCount}+ members</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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