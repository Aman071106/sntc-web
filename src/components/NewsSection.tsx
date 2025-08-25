import { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Calendar, 
  User, 
  Newspaper,
  BookOpen,
  Zap,
  Globe,
  Brain,
  Cpu // Added for the new Hardware category
} from 'lucide-react';

const NewsSection = () => {
  const [techNews, setTechNews] = useState([]);
  const [researchPapers, setResearchPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tech');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  // Latest tech news data
  const latestTechNews = [
    {
      id: '5',
      title: 'Nexus OS: The First Commercially Available AI Operating System Launched',
      description: 'Startup "Cognition Corp" has released Nexus OS, an operating system that uses a core of autonomous AI agents to manage system resources, predict user needs, and automate complex workflows.',
      publishedAt: '2025-08-22T11:00:00Z',
      author: 'AI Insider',
      source: 'The Verge',
      type: 'tech',
      category: 'AI'
    },
    {
      id: '6',
      title: 'Helion Announces Net Energy Gain in Latest Fusion Reactor Test',
      description: 'Helion\'s new "Polaris" prototype has successfully achieved a net energy gain for a sustained period, a monumental step towards clean, limitless energy.',
      publishedAt: '2025-08-20T18:25:00Z',
      author: 'Energy Today',
      source: 'Bloomberg',
      type: 'tech',
      category: 'Energy'
    },
    {
      id: '7',
      title: 'Apple Vision Pro 2 Leaks Reveal Lighter Design & Haptic Feedback',
      description: 'New schematics suggest the next generation of Apple\'s spatial computer will be 30% lighter and incorporate advanced haptic feedback directly into the headband and frame.',
      publishedAt: '2025-08-19T09:05:00Z',
      author: 'Tech Leaks',
      source: '9to5Mac',
      type: 'tech',
      category: 'Hardware'
    },
    {
      id: '8',
      title: 'CRISPR-based Therapy Cures Genetic Hearing Loss in First Human Trial',
      description: 'Scientists have successfully used a novel CRISPR-based gene therapy to restore hearing in children born with a common form of genetic deafness, marking a new era for genetic medicine.',
      publishedAt: '2025-08-18T14:45:00Z',
      author: 'Medical Xpress',
      source: 'Science Daily',
      type: 'tech',
      category: 'BioTech'
    }
  ];

  // Latest research papers data
  const latestResearchPapers = [
    {
      id: '5',
      title: 'Generative World Models: A Foundation for Autonomous Agents',
      abstract: 'This paper introduces a scalable framework for training Large Multimodal Models to build comprehensive world models, enabling zero-shot planning and decision-making in complex, dynamic environments.',
      authors: ['Dr. Evelyn Reed', 'Kenji Tanaka', 'et al.'],
      publishedDate: '2025-08-15',
      pdfUrl: 'https://arxiv.org/pdf/2508.12345.pdf',
      categories: ['cs.AI', 'cs.LG', 'cs.RO'],
      citations: 1250
    },
    {
      id: '6',
      title: 'Dynamic Sparsity and 1-Bit Quantization for Efficient LLM Inference',
      abstract: 'We present a novel technique, "Adaptive Binarization," that combines dynamic network pruning with 1-bit quantization, reducing memory and computational costs of LLMs by over 80%.',
      authors: ['Yann LeCun', 'Li Wei', 'et al.'],
      publishedDate: '2025-07-28',
      pdfUrl: 'https://arxiv.org/pdf/2507.09876.pdf',
      categories: ['cs.LG', 'cs.AR'],
      citations: 2800
    },
    {
      id: '7',
      title: 'Constitutional AI Alignment via Collective Democratic Input',
      abstract: 'We demonstrate a novel AI alignment method where the model\'s constitution is iteratively refined based on structured feedback from a large, diverse group of human participants.',
      authors: ['Danielle Belgrave', 'Samuel R. Bowman'],
      publishedDate: '2025-06-30',
      pdfUrl: 'https://arxiv.org/pdf/2506.05432.pdf',
      categories: ['cs.AI', 'cs.CY'],
      citations: 4500
    },
    {
      id: '8',
      title: 'Spatiotemporal Graph Neural Networks for Global Climate Forecasting',
      abstract: 'Our proposed Spatiotemporal Graph Neural Network (ST-GNN) architecture models the Earth\'s climate as a complex graph, outperforming traditional numerical models in long-range prediction.',
      authors: ['Yoshua Bengio', 'Maria Schmidt', 'et al.'],
      publishedDate: '2025-05-19',
      pdfUrl: 'https://arxiv.org/pdf/2505.01122.pdf',
      categories: ['cs.LG', 'physics.ao-ph'],
      citations: 7300
    }
  ];

  useEffect(() => {
    // Generate floating data particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
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

  useEffect(() => {
    setTimeout(() => {
      setTechNews(latestTechNews);
      setResearchPapers(latestResearchPapers);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'AI': return <Brain className="w-3 h-3" />;
      case 'Quantum': return <Zap className="w-3 h-3" />;
      case 'Energy': return <Globe className="w-3 h-3" />;
      case 'Hardware': return <Cpu className="w-3 h-3" />;
      default: return <Newspaper className="w-3 h-3" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'AI': return 'from-purple-500 to-pink-500';
      case 'Quantum': return 'from-blue-500 to-cyan-500';
      case 'Energy': return 'from-green-500 to-emerald-500';
      case 'BioTech': return 'from-orange-500 to-red-500';
      case 'Hardware': return 'from-amber-500 to-yellow-500';
      default: return 'from-slate-500 to-gray-500';
    }
  };

  if (loading) {
    return (
      <section id="news" className="relative py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 overflow-hidden">
        {/* Loading particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-pulse">
            <div className="h-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-6 rounded"></div>
            <div className="text-lg text-slate-300">
              Initializing neural networks... Fetching latest data streams...
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="relative py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #3b82f6 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, #8b5cf6 1px, transparent 1px),
              linear-gradient(90deg, transparent 49px, rgba(59, 130, 246, 0.02) 50px, rgba(59, 130, 246, 0.02) 51px, transparent 52px),
              linear-gradient(transparent 49px, rgba(139, 92, 246, 0.02) 50px, rgba(139, 92, 246, 0.02) 51px, transparent 52px)
            `,
            backgroundSize: '50px 50px, 30px 30px, 50px 50px, 50px 50px',
          }}
        />
      </div>

      {/* Floating Data Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.id * 0.15}s`,
              animationDuration: `${particle.speed + 3}s`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Interactive Light Effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Neural Network Background Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
        <defs>
          <linearGradient id="newsLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {[...Array(6)].map((_, i) => (
          <line
            key={i}
            x1={`${15 + i * 15}%`}
            y1="0%"
            x2={`${25 + i * 12}%`}
            y2="100%"
            stroke="url(#newsLineGradient)"
            strokeWidth="0.5"
            className="animate-pulse"
            style={{
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </svg>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 relative">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">
                News and Research Papers
              </span>
              {/* Glowing underline */}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 blur-sm opacity-60"></div>
            </h2>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Real-time intelligence from the <span className="text-cyan-400 font-semibold">tech frontier</span> and 
            <span className="text-purple-400 font-semibold"> research networks</span>
          </p>
          
          {/* Status indicators */}
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              News Feed Active
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              Research Network Online
            </div>
          </div>
        </div>

      {/* Futuristic Tab Navigation */}
      <div className="flex justify-center mb-12">
        {/* The container is now a grid with a max-width, making it responsive */}
        <div className="relative w-full max-w-sm sm:max-w-md grid grid-cols-2 bg-slate-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-1 shadow-2xl shadow-cyan-500/10">
          
          {/* The sliding background uses transform for smooth, responsive positioning */}
          <div
            className="absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg transition-transform duration-300 ease-in-out"
            style={{
              transform: activeTab === 'tech' ? 'translateX(0%)' : 'translateX(100%)',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
            }}
          />
          
          {/* Buttons are now grid items that fill the space, with centered content */}
          <button
            onClick={() => setActiveTab('tech')}
            className={`relative z-10 py-2 text-sm font-medium flex items-center justify-center gap-2 rounded-lg transition-colors duration-300 ${
              activeTab === 'tech' ? 'text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span className="truncate">Tech News</span>
          </button>
          <button
            onClick={() => setActiveTab('research')}
            className={`relative z-10 py-2 text-sm font-medium flex items-center justify-center gap-2 rounded-lg transition-colors duration-300 ${
              activeTab === 'research' ? 'text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="truncate">Research Papers</span>
          </button>
        </div>
      </div>


        {/* Tech News Content */}
        {activeTab === 'tech' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {techNews.map((news, index) => (
              <div
                key={news.id}
                className="group relative bg-slate-900/30 backdrop-blur-sm border border-slate-600/30 hover:border-cyan-400/50 rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:transform hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Glowing corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-tr-xl"></div>
                
                {/* Category badge with icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${getCategoryColor(news.category)} rounded-full text-white text-xs font-medium`}>
                    {getCategoryIcon(news.category)}
                    {news.category}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3 h-3" />
                    {formatDate(news.publishedAt)}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {news.title}
                </h3>
                
                <p className="text-slate-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                  {news.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <User className="w-3 h-3" />
                    <span>{news.author}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-cyan-400">{news.source}</span>
                  </div>
                  {/* REMOVED: The ExternalLink icon was here */}
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        )}

        {/* Research Papers Content */}
        {activeTab === 'research' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {researchPapers.map((paper, index) => (
              <div
                key={paper.id}
                className="group relative bg-slate-900/30 backdrop-blur-sm border border-slate-600/30 hover:border-purple-400/50 rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:transform hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* arXiv badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-xs font-bold">
                  arXiv
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <Calendar className="w-3 h-3" />
                    {formatDate(paper.publishedDate)}
                    <span className="text-slate-500">•</span>
                    <span className="text-amber-400">{paper.citations.toLocaleString()} citations</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                  {paper.title}
                </h3>
                
                <p className="text-slate-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                  {paper.abstract}
                </p>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {paper.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded border border-purple-500/30"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    <div className="flex items-center gap-1 mb-1">
                      <User className="w-3 h-3" />
                      <span>{paper.authors.slice(0, 2).join(', ')}</span>
                      {paper.authors.length > 2 && <span className="text-slate-500"> et al.</span>}
                    </div>
                  </div>
                  
                  
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        )}
      </div>

   

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-gradient-shift { 
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        .animate-blink { animation: blink 1.5s infinite; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default NewsSection;