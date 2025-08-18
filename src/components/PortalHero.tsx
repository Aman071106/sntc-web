import { useEffect, useState } from 'react';
import portalImage from '@/assets/portal_central_1.jpg';

const PortalHero = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
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

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, #8b5cf6 1px, transparent 1px),
              linear-gradient(90deg, transparent 24px, rgba(59, 130, 246, 0.03) 25px, rgba(59, 130, 246, 0.03) 26px, transparent 27px),
              linear-gradient(transparent 24px, rgba(139, 92, 246, 0.03) 25px, rgba(139, 92, 246, 0.03) 26px, transparent 27px)
            `,
            backgroundSize: '50px 50px, 30px 30px, 25px 25px, 25px 25px',
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
              animationDuration: `${particle.speed + 2}s`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden="true">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {[...Array(8)].map((_, i) => (
          <g key={i}>
            <line
              x1={`${10 + i * 12}%`}
              y1="10%"
              x2={`${20 + i * 10}%`}
              y2="90%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              filter="url(#glow)"
              className="animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + Math.random()}s`,
              }}
            />
            <line
              x1={`${90 - i * 8}%`}
              y1="20%"
              x2={`${10 + i * 8}%`}
              y2="80%"
              stroke="url(#lineGradient)"
              strokeWidth="0.5"
              filter="url(#glow)"
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
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)`,
        }}
      />

      {/* Holographic Scan Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
            style={{
              top: `${20 + i * 30}%`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            <div className="w-full h-full animate-scan" />
          </div>
        ))}
      </div>

      {/* Central Portal with Enhanced Effects */}
      <div className="relative z-10 text-center">
        <div 
          className={`relative transition-all duration-1000 ${
            isAnimating ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        >
          {/* Multi-layered Energy Rings */}
          <div className="absolute inset-0 -m-16">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`absolute border rounded-full ${
                  i % 2 === 0 ? 'animate-spin' : 'animate-reverse-spin'
                }`}
                style={{
                  width: `${320 + i * 40}px`,
                  height: `${320 + i * 40}px`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderColor: i % 2 === 0 ? 'rgba(59, 130, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)',
                  borderWidth: `${2 - i * 0.3}px`,
                  animationDuration: `${8 + i * 2}s`,
                  filter: 'blur(0.5px)',
                }}
              />
            ))}
          </div>
          
          {/* Portal image with enhanced glow */}
          <div className="relative w-80 h-80 mx-auto mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
            <img 
              src={portalImage} 
              alt="Central Portal" 
              className="relative w-full h-full object-cover rounded-full border-4 border-cyan-400/50 shadow-2xl shadow-blue-500/50"
            />
            <div className="absolute inset-0 bg-gradient-conic from-blue-400 via-purple-500 to-cyan-400 rounded-full opacity-20 animate-spin-slow" />
            
            {/* Portal Core Glow */}
            <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50" />
          </div>

          {/* Floating Tech Icons */}
          <div className="absolute inset-0">
            {['⚡', '🔬', '⚙️', '💻', '🔮'].map((icon, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-float opacity-60 hover:opacity-100 transition-opacity"
                style={{
                  left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 200}px`,
                  top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 200}px`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${4 + Math.random() * 2}s`,
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Title with Glitch Effect */}
        <div className={`transition-all duration-1000 delay-500 ${
          isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 className="relative text-6xl md:text-8xl font-bold mb-4 group">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">
              SnTC
            </span>
            {/* Glitch overlay */}
            <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent opacity-0 group-hover:animate-glitch">
              SnTC
            </span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-light text-slate-200 mb-6 animate-fade-in">
            Science & Technology Council
          </h2>
          <div className="relative">
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              <span className="text-cyan-400 font-semibold">IIT Mandi's</span> premier technical society where 
              <span className="text-purple-400 font-semibold"> innovation transcends boundaries</span>. 
              Navigate through our constellation of tech clubs and discover infinite possibilities.
            </p>
            {/* Typing cursor effect */}
            <span className="inline-block w-1 h-6 bg-cyan-400 animate-blink ml-1" />
          </div>
        </div>

        
      </div>

      {/* Enhanced Terminal Interface - Desktop Only */}
<div className="hidden lg:absolute lg:bottom-14 lg:left-8 lg:block bg-slate-900/80 backdrop-blur-sm border border-cyan-500/50 rounded-lg p-4 font-mono text-sm shadow-2xl shadow-cyan-500/25">
  <div className="flex items-center gap-2 mb-2">
    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
  </div>
  <div className="text-green-400">
    <div>$ sntc.initialize()</div>
    <div>{'>'} Loading tech protocols...</div>
    <div>{'>'} <span className="text-cyan-400">Club networks online</span></div>
    <div>{'>'} <span className="text-purple-400">Innovation matrix activated</span></div>
    <div>{'>'} Ready for exploration<span className="animate-pulse">_</span></div>
  </div>
</div>


     

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
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
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-reverse-spin { animation: reverse-spin 10s linear infinite; }
        .animate-scan { animation: scan 2s ease-in-out infinite; }
        .animate-gradient-shift { 
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        .animate-glitch { animation: glitch 0.5s; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-blink { animation: blink 1.5s infinite; }
        .animate-fade-in { animation: fade-in 1s ease-out; }
      `}</style>
    </div>
  );
};

export default PortalHero;