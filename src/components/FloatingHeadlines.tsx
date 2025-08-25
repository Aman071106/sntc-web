import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Headline {
  _id: string;
  text: string;
  type: string;
  priority: string;
  link: string;
}
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const IntegratedHeadlines = () => {
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/headlines`);
        const data: Headline[] = await response.json();
        setHeadlines(data);
      } catch (error) {
        console.error('Error fetching headlines:', error);
      }
    };
    fetchHeadlines();
  }, []);

  useEffect(() => {
    if (isPaused || headlines.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, headlines.length]);

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
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(headline.link, '_blank');
    }
  };

  if (!headlines.length) return null;

  const currentHeadline = headlines[currentIndex];

  // Note: This function is defined but not used in the provided JSX.
  // You might want to use it for the priority indicator.
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-600 text-white';
      case 'medium':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-green-600 text-white';
    }
  };

  return (
    <div className="w-full bg-gray-900 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex items-center py-2 gap-4">
          {/* Scrolling Headline */}
          <div
            className="flex-1 overflow-hidden cursor-pointer"
            onClick={handleClick}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="whitespace-nowrap text-white text-sm md:text-base font-medium animate-scroll-left"
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              {currentHeadline.text}
            </div>
          </div>

          {/* Navigation */}
          {headlines.length > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <ChevronLeft className="w-3 h-3" />
              </Button>

              <div className="flex gap-1">
                {headlines.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition ${
                      index === currentIndex
                        ? 'bg-yellow-400'
                        : 'bg-gray-500 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Animations (No changes needed here) */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default IntegratedHeadlines;