import { useState, useEffect } from 'react';
import { Menu, X, Zap, Code, Cpu, Network } from 'lucide-react';
import logo from '@/assets/logo-mid.jpg';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navItems = [
    { name: 'Home', href: '#home', icon: Zap },
    { name: 'Clubs', href: '#clubs-cells', icon: Network },
    { name: 'Projects', href: '#projects', icon: Code },
    { name: 'Events', href: '#events', icon: Cpu },
    { name: 'News', href: '#news', icon: Zap },
    { name: 'Calendar', href: '#calendar', icon: Network },
    { name: 'Contact', href: '#contact', icon: Code }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + window.innerHeight / 3;
      let current = 'home';
      navItems.forEach(item => {
        const element = document.querySelector(item.href);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            current = item.name.toLowerCase();
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Neural network background effect */}
      <div className="fixed top-0 left-0 right-0 z-[90] h-20 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% 10%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
          <defs>
            <linearGradient id="navLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {[...Array(4)].map((_, i) => (
            <line
              key={i}
              x1="0%"
              y1={`${20 + i * 10}%`}
              x2="100%"
              y2={`${20 + i * 10}%`}
              stroke="url(#navLineGradient)"
              strokeWidth="0.5"
              className="animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '3s',
              }}
            />
          ))}
        </svg>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-slate-900/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl shadow-cyan-500/10'
          : 'bg-slate-900/60 backdrop-blur-md border-b border-slate-700/50'
      }`}>
        {/* Holographic scan line */}
        <div className="absolute bottom-0 left-0 w-full h-px overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60">
            <div className="w-full h-full animate-scan-horizontal" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo + SnTC */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-cyan-400/50 flex items-center justify-center transition-all duration-300">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-blue-500 select-none">
                SnTC
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.name} className="relative group">
                    <a
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white transition-all duration-300 relative overflow-hidden rounded-lg group"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveSection(item.name.toLowerCase());
                        const element = document.querySelector(item.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                      <div className="relative z-10">
                        <IconComponent className="w-4 h-4 group-hover:text-cyan-400 transition-colors duration-300" />
                        <div className="absolute inset-0 bg-cyan-400 blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                      </div>
                      <span className="relative z-10 font-medium">{item.name}</span>
                      {activeSection === item.name.toLowerCase() && (
                        <div className="absolute bottom-0 left-1/2 w-6 h-0.5 bg-cyan-400 transform -translate-x-1/2 animate-pulse" />
                      )}
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white transition-colors duration-300 group"
              >
                {isOpen ? <X className="w-6 h-6 relative z-10" /> : <Menu className="w-6 h-6 relative z-10" />}
                <div className="absolute inset-0 bg-cyan-400 blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-slate-700/50 backdrop-blur-xl">
              <div className="flex flex-col space-y-2">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg group relative overflow-hidden"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        setActiveSection(item.name.toLowerCase());
                        const element = document.querySelector(item.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <IconComponent className="w-5 h-5 text-cyan-400 relative z-10" />
                      <span className="relative z-10 font-medium">{item.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      <style jsx>{`
        @keyframes scan-horizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-scan-horizontal { animation: scan-horizontal 3s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default Navigation;
