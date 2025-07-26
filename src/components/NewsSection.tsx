import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  Calendar, 
  User, 
  ArrowRight,
  Newspaper,
  BookOpen,
  TrendingUp
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  source: string;
  type: 'tech' | 'research';
}

interface ArxivItem {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  publishedDate: string;
  pdfUrl: string;
  categories: string[];
}

const NewsSection = () => {
  const [techNews, setTechNews] = useState<NewsItem[]>([]);
  const [researchPapers, setResearchPapers] = useState<ArxivItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'tech' | 'research'>('tech');

  // Mock data for tech news (since we don't have API key)
  const mockTechNews: NewsItem[] = [
    {
      id: '1',
      title: 'OpenAI Releases GPT-5 with Enhanced Reasoning Capabilities',
      description: 'The latest iteration of OpenAI\'s language model shows significant improvements in logical reasoning and problem-solving abilities.',
      publishedAt: '2025-01-15T10:30:00Z',
      author: 'Tech Reporter',
      source: 'TechCrunch',
      type: 'tech'
    },
    {
      id: '2',
      title: 'Quantum Computing Breakthrough Achieved by Google',
      description: 'Google researchers have achieved quantum supremacy with their latest quantum processor, solving problems impossible for classical computers.',
      publishedAt: '2025-01-14T15:45:00Z',
      author: 'Science Writer',
      source: 'Nature',
      type: 'tech'
    },
    {
      id: '3',
      title: 'Tesla Unveils Revolutionary Battery Technology',
      description: 'Tesla\'s new battery design promises 50% more range and faster charging times, potentially revolutionizing electric vehicles.',
      publishedAt: '2025-01-13T09:20:00Z',
      author: 'Auto Journalist',
      source: 'Wired',
      type: 'tech'
    }
  ];

  // Mock data for research papers
  const mockResearchPapers: ArxivItem[] = [
    {
      id: '1',
      title: 'Attention Is All You Need: A Novel Neural Architecture for Machine Translation',
      abstract: 'We propose a novel neural architecture for machine translation that relies entirely on self-attention mechanisms, dispensing with recurrence and convolutions entirely.',
      authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar'],
      publishedDate: '2025-01-15',
      pdfUrl: 'https://arxiv.org/pdf/1706.03762.pdf',
      categories: ['cs.CL', 'cs.LG']
    },
    {
      id: '2',
      title: 'Deep Learning for Computer Vision: A Comprehensive Survey',
      abstract: 'This paper provides a comprehensive survey of deep learning techniques applied to computer vision tasks, covering recent advances and future directions.',
      authors: ['Alex Krizhevsky', 'Ilya Sutskever', 'Geoffrey Hinton'],
      publishedDate: '2025-01-14',
      pdfUrl: 'https://arxiv.org/pdf/1409.0575.pdf',
      categories: ['cs.CV', 'cs.AI']
    },
    {
      id: '3',
      title: 'Reinforcement Learning in Robotics: From Simulation to Reality',
      abstract: 'We explore the challenges and solutions for transferring reinforcement learning policies from simulation to real-world robotic applications.',
      authors: ['Pieter Abbeel', 'Sergey Levine'],
      publishedDate: '2025-01-13',
      pdfUrl: 'https://arxiv.org/pdf/1703.00420.pdf',
      categories: ['cs.RO', 'cs.LG']
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTechNews(mockTechNews);
      setResearchPapers(mockResearchPapers);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatArxivDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="news" className="py-20 px-4 pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              Tech News & Research
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Latest updates from the world of technology and academic research
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-20 px-4 pb-32 relative overflow-hidden">
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
            Tech News & Research
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Latest updates from the world of technology and academic research
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-6 py-3 rounded-md transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'tech'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              Tech News
            </button>
            <button
              onClick={() => setActiveTab('research')}
              className={`px-6 py-3 rounded-md transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'research'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Research Papers
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'tech' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techNews.map((news, index) => (
              <Card 
                key={news.id}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 h-full"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {news.source}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {formatDate(news.publishedAt)}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {news.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {news.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      {news.author}
                    </div>
                  </div>
                </div>

                {/* Hover effect beam */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'research' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchPapers.map((paper, index) => (
              <Card 
                key={paper.id}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-accent/20 hover:border-accent/50 transition-all duration-500 hover:scale-105 h-full"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs bg-accent/20 text-accent">
                      arXiv
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {formatArxivDate(paper.publishedDate)}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                    {paper.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {paper.abstract}
                  </p>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {paper.categories.map((category, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        {paper.authors.slice(0, 2).join(', ')}
                        {paper.authors.length > 2 && ' et al.'}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground"
                        onClick={() => window.open(paper.pdfUrl, '_blank')}
                      >
                        <span>View PDF</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Hover effect beam */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Card>
            ))}
          </div>
        )}


      </div>
    </section>
  );
};

export default NewsSection; 