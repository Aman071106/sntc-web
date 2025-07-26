import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import headlinesData from '@/assets/headlines_data.json';

interface Headline {
  id: number;
  text: string;
  type: string;
  priority: string;
  link: string;
}

const headlines: Headline[] = headlinesData;

const IntegratedHeadlines = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || headlines.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + headlines.length) % headlines.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % headlines.length);
  };

  const handleClick = () => {
    const headline = headlines[currentIndex];
    if (headline.link.startsWith('/')) {
      const element = document.querySelector(headline.link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(headline.link, '_blank');
    }
  };

  if (!headlines.length) return null;

  const currentHeadline = headlines[currentIndex];
  
  const getPriorityColors = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'from-red-600 via-orange-500 to-yellow-500';
      case 'medium':
        return 'from-blue-600 via-purple-500 to-pink-500';
      default:
        return 'from-green-600 via-teal-500 to-cyan-500';
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-y border-gray-700/50 relative overflow-hidden">
      {/* Animated Background Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 w-full h-full">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute h-0.5 w-full bg-gradient-to-r ${getPriorityColors(currentHeadline.priority)} opacity-30 animate-slide-right`}
              style={{
                top: `${20 + i * 30}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="flex items-center py-2">
          {/* Breaking News Label */}
          <div className="flex-shrink-0 mr-4">
            <div className={`flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${getPriorityColors(currentHeadline.priority)} rounded text-white text-sm font-bold`}>
              {currentHeadline.priority === 'high' && <Zap className="w-3 h-3" />}
              <span>
                {currentHeadline.priority === 'high' ? 'BREAKING' : 
                 currentHeadline.priority === 'medium' ? 'NEWS' : 'UPDATE'}
              </span>
            </div>
          </div>

          {/* Scrolling Text Container */}
          <div 
            className="flex-1 overflow-hidden cursor-pointer group"
            onClick={handleClick}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              className={`whitespace-nowrap text-white font-medium text-base transition-transform duration-1000 ease-linear ${
                isPaused ? '' : 'animate-scroll-left'
              } group-hover:text-yellow-300`}
            >
              {currentHeadline.text}
            </div>
          </div>

          {/* Navigation Controls */}
          {headlines.length > 1 && (
            <div className="flex items-center gap-1 ml-4 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                className="h-7 w-7 p-0 hover:bg-white/10 text-white/70 hover:text-white"
              >
                <ChevronLeft className="w-3 h-3" />
              </Button>
              
              <div className="flex gap-1">
                {headlines.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-yellow-400' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                className="h-7 w-7 p-0 hover:bg-white/10 text-white/70 hover:text-white"
              >
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-right {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateX(100vw);
            opacity: 0;
          }
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(10%);
          }
          100% {
            transform: translateX(-10%);
          }
        }
        
        .animate-slide-right {
          animation: slide-right linear infinite;
        }
        
        .animate-scroll-left {
          animation: scroll-left 8s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default IntegratedHeadlines;