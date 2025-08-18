import { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Calendar, 
  User, 
  Newspaper,
  BookOpen,
  Zap,
  Globe,
  Brain
} from 'lucide-react';

const NewsSection = () => {
  const [techNews, setTechNews] = useState([]);
  const [researchPapers, setResearchPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tech');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  // Mock tech news
  const mockTechNews = [
    {
      id: '1',
      title: 'OpenAI Releases GPT-5 with Enhanced Reasoning Capabilities',
      description: 'The latest iteration of OpenAI\'s language model shows significant improvements in logical reasoning and problem-solving abilities.',
      publishedAt: '2025-01-15T10:30:00Z',
      author: 'Tech Reporter',
      source: 'TechCrunch',
      type: 'tech',
      category: 'AI'
    },
    {
      id: '2',
      title: 'Quantum Computing Breakthrough Achieved by Google',
      description: 'Google researchers have achieved quantum supremacy with their latest quantum processor, solving problems impossible for classical computers.',
      publishedAt: '2025-01-14T15:45:00Z',
      author: 'Science Writer',
      source: 'Nature',
      type: 'tech',
      category: 'Quantum'
    },
    {
      id: '3',
      title: 'Tesla Unveils Revolutionary Battery Technology',
      description: 'Tesla\'s new battery design promises 50% more range and faster charging times, potentially revolutionizing electric vehicles.',
      publishedAt: '2025-01-13T09:20:00Z',
      author: 'Auto Journalist',
      source: 'Wired',
      type: 'tech',
      category: 'Energy'
    },
    {
      id: '4',
      title: 'Neuralink Successfully Restores Vision to Blind Patients',
      description: 'Breakthrough brain-computer interface technology enables direct neural stimulation to restore sight.',
      publishedAt: '2025-01-12T14:15:00Z',
      author: 'BioTech News',
      source: 'MIT Review',
      type: 'tech',
      category: 'BioTech'
    }
  ];

  // Mock research papers
  const mockResearchPapers = [
    {
      id: '1',
      title: 'Attention Is All You Need: A Novel Neural Architecture',
      abstract: 'We propose a novel neural architecture for machine translation relying entirely on self-attention mechanisms, dispensing with recurrence and convolutions entirely.',
      authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar'],
      publishedDate: '2025-01-15',
      pdfUrl: 'https://arxiv.org/pdf/1706.03762.pdf',
      categories: ['cs.CL', 'cs.LG'],
      citations: 85420
    },
    {
      id: '2',
      title: 'Deep Learning for Computer Vision: A Comprehensive Survey',
      abstract: 'This paper provides a comprehensive survey of deep learning techniques applied to computer vision tasks, covering architectures and applications.',
      authors: ['Alex Krizhevsky', 'Ilya Sutskever', 'Geoffrey Hinton'],
      publishedDate: '2025-01-14',
      pdfUrl: 'https://arxiv.org/pdf/1409.0575.pdf',
      categories: ['cs.CV', 'cs.AI'],
      citations: 42150
    },
    {
      id: '3',
      title: 'Reinforcement Learning in Robotics: From Simulation to Reality',
      abstract: 'We explore challenges and solutions for transferring RL policies from simulation to real-world robotics applications.',
      authors: ['Pieter Abbeel', 'Sergey Levine'],
      publishedDate: '2025-01-13',
      pdfUrl: 'https://arxiv.org/pdf/1703.00420.pdf',
      categories: ['cs.RO', 'cs.LG'],
      citations: 18750
    },
    {
      id: '4',
      title: 'Quantum Machine Learning: Bridging Two Worlds',
      abstract: 'An exploration of quantum algorithms for machine learning tasks and their potential advantages over classical approaches.',
      authors: ['John Preskill', 'Seth Lloyd'],
      publishedDate: '2025-01-11',
      pdfUrl: 'https://arxiv.org/pdf/quantum-ml.pdf',
      categories: ['quant-ph', 'cs.LG'],
      citations: 9340
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
      setTechNews(mockTechNews);
      setResearchPapers(mockResearchPapers);
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
      default: return <Newspaper className="w-3 h-3" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'AI': return 'from-purple-500 to-pink-500';
      case 'Quantum': return 'from-blue-500 to-cyan-500';
      case 'Energy': return 'from-green-500 to-emerald-500';
      case 'BioTech': return 'from-orange-500 to-red-500';
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
  <div className="relative flex bg-slate-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-1 shadow-2xl shadow-cyan-500/10">
    {/* Sliding background */}
    <div 
      className={`absolute top-1 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg transition-all duration-300 ${
        activeTab === 'tech' ? 'left-1 w-32' : 'left-36 w-40'
      }`}
      style={{
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
      }}
    />
    
    <button
      onClick={() => setActiveTab('tech')}
      className="relative px-6 py-2 text-sm font-medium flex items-center gap-2 rounded-lg transition z-10"
    >
      <Newspaper className="w-4 h-4" />
      <span>Tech News</span>
    </button>
    <button
      onClick={() => setActiveTab('research')}
      className="relative px-6 py-2 text-sm font-medium flex items-center gap-2 rounded-lg transition z-10"
    >
      <BookOpen className="w-4 h-4" />
      <span>Research Papers</span>
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
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
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
                  
                  <button
                    onClick={() => window.open(paper.pdfUrl, '_blank')}
                    className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500 hover:to-pink-500 border border-purple-500/30 hover:border-transparent text-purple-300 hover:text-white text-xs rounded transition-all duration-200"
                  >
                    PDF
                    <ExternalLink className="w-3 h-3" />
                  </button>
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