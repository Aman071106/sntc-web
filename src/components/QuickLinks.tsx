import { useState, useEffect } from 'react';
import { ExternalLink, Users, Music, GraduationCap, Cpu, Zap, Database } from 'lucide-react';

interface QuickLink {
  id: number;
  name: string;
  description: string;
  url: string;
  icon: string;
  category: string;
}

const QuickLinks = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Sample data - replace with your actual data
  const quickLinks: QuickLink[] = [
    {
      id: 1,
      name: "Student Portal",
      description: "Access your academic records, course materials, and student services",
      url: "https://iitmandi.samarth.edu.in/",
      icon: "users",
      category: "Academic"
    },
    
    {
      id: 2,
      name: "Digital Library",
      description: "Access vast collection of academic journals and research papers",
      url: "https://library.iitmandi.ac.in/",
      icon: "database",
      category: "Library"
    },
    
    {
      id: 3,
      name: "Cultural Council",
      description: "Access cultural council website",
      url: "https://iitmandi.co.in/cultural.html",
      icon: "cultural",
      category: "cultural"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.2,
      direction: Math.random() * 360,
    }));
    setParticles(newParticles);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getIcon = (iconName: string) => {
    const iconClass = "w-6 h-6";
    switch (iconName) {
      case 'users':
        return <Users className={iconClass} />;
      case 'music':
        return <Music className={iconClass} />;
      case 'graduation-cap':
        return <GraduationCap className={iconClass} />;
      case 'cpu':
        return <Cpu className={iconClass} />;
      case 'zap':
        return <Zap className={iconClass} />;
      case 'database':
        return <Database className={iconClass} />;
      default:
        return <ExternalLink className={iconClass} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic':
        return 'from-blue-400 to-cyan-400';
      case 'Entertainment':
        return 'from-purple-400 to-pink-400';
      case 'Research':
        return 'from-green-400 to-emerald-400';
      case 'Innovation':
        return 'from-yellow-400 to-orange-400';
      case 'Library':
        return 'from-indigo-400 to-purple-400';
      default:
        return 'from-cyan-400 to-blue-400';
    }
  };

  return (
    <section id="quicklinks" className="py-20 px-4 pb-32 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, #3b82f6 2px, transparent 2px),
              radial-gradient(circle at 80% 20%, #8b5cf6 1px, transparent 1px),
              linear-gradient(90deg, transparent 24px, rgba(59, 130, 246, 0.03) 25px, rgba(59, 130, 246, 0.03) 26px, transparent 27px),
              linear-gradient(transparent 24px, rgba(139, 92, 246, 0.03) 25px, rgba(139, 92, 246, 0.03) 26px, transparent 27px)
            `,
            backgroundSize: '60px 60px, 40px 40px, 25px 25px, 25px 25px',
          }}
        />
      </div>

      {/* Floating Energy Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.id * 0.1}s`,
              animationDuration: `${particle.speed + 3}s`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
        <defs>
          <linearGradient id="quickLinksGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>
          <filter id="quickLinksGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {[...Array(6)].map((_, i) => (
          <g key={i}>
            <line
              x1={`${15 + i * 15}%`}
              y1="20%"
              x2={`${25 + i * 12}%`}
              y2="80%"
              stroke="url(#quickLinksGradient)"
              strokeWidth="1"
              filter="url(#quickLinksGlow)"
              className="animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${4 + Math.random()}s`,
              }}
            />
          </g>
        ))}
      </svg>

      {/* Interactive Light Beams */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Holographic Scan Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40"
            style={{
              top: `${30 + i * 40}%`,
              animationDelay: `${i * 1.2}s`,
            }}
          >
            <div className="w-full h-full animate-scan" />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header with enhanced effects */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="relative inline-block">
            {/* Title with glitch effect */}
            <h2 className="relative text-4xl md:text-6xl font-bold mb-6 group">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">
                Quick Links
              </span>
              {/* Glitch overlay */}
              <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-yellow-500 bg-clip-text text-transparent opacity-0 group-hover:animate-glitch">
                Quick Links
              </span>
            </h2>
            
            {/* Energy rings around title */}
            <div className="absolute inset-0 -m-8">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute border rounded-full ${
                    i % 2 === 0 ? 'animate-spin' : 'animate-reverse-spin'
                  }`}
                  style={{
                    width: `${200 + i * 30}px`,
                    height: `${200 + i * 30}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderColor: i % 2 === 0 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)',
                    borderWidth: `${1.5 - i * 0.3}px`,
                    animationDuration: `${12 + i * 3}s`,
                    filter: 'blur(0.5px)',
                  }}
                />
              ))}
            </div>
          </div>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto animate-fade-in">
            Access <span className="text-cyan-400 font-semibold">IIT Mandi's</span> essential resources and 
            <span className="text-purple-400 font-semibold"> digital portals</span> in one place
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickLinks.map((link, index) => (
            <div 
              key={link.id}
              className={`transform transition-all duration-700 ${
                isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
              }`}
              style={{
                animationDelay: `${index * 0.15 + 0.8}s`
              }}
              onMouseEnter={() => setHoveredCard(link.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card with futuristic styling */}
              <div className="group relative overflow-hidden bg-slate-800/40 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/60 transition-all duration-500 hover:scale-105 h-full rounded-xl">
                
                {/* Holographic overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Energy border animation */}
                <div className="absolute inset-0 rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500" />
                </div>

                <div className="relative p-6 z-10">
                  {/* Icon and header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-r ${getCategoryColor(link.category)} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                      hoveredCard === link.id ? 'animate-pulse' : ''
                    }`}>
                      {getIcon(link.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-1">
                        {link.name}
                      </h3>
                      <span className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(link.category)} bg-opacity-20 text-cyan-300 border border-cyan-400/30`}>
                        {link.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 group-hover:text-slate-200 transition-colors duration-300">
                    {link.description}
                  </p>

                  {/* CTA Button */}
                  <a
  href={link.url}
  target="_blank"
  rel="noopener noreferrer"
  className={`w-full bg-gradient-to-r ${getCategoryColor(link.category)} text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:translate-y-[-2px] group-hover:scale-105`}
>
  <span>Access Portal</span>
  <ExternalLink className="w-4 h-4" />
</a>

                </div>

                {/* Floating tech icons around card */}
                {hoveredCard === link.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    {['⚡', '🔗', '💫'].map((icon, i) => (
                      <div
                        key={i}
                        className="absolute text-lg animate-float opacity-60"
                        style={{
                          left: `${20 + Math.cos(i * 120 * Math.PI / 180) * 80}px`,
                          top: `${20 + Math.sin(i * 120 * Math.PI / 180) * 80}px`,
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: `${3 + Math.random()}s`,
                        }}
                      >
                        {icon}
                      </div>
                    ))}
                  </div>
                )}

                {/* Hover scan effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>

          
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        @keyframes reverse-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glitch {
          0% { opacity: 0; transform: translateX(0); }
          10% { opacity: 1; transform: translateX(-2px); }
          20% { opacity: 0; transform: translateX(2px); }
          30% { opacity: 1; transform: translateX(-2px); }
          40% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-reverse-spin { animation: reverse-spin 15s linear infinite; }
        .animate-scan { animation: scan 3s ease-in-out infinite; }
        .animate-gradient-shift { 
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        .animate-glitch { animation: glitch 0.6s; }
        .animate-fade-in { animation: fade-in 1s ease-out; }
      `}</style>
    </section>
  );
};

export default QuickLinks;