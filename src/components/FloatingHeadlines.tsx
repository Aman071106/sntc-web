import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
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

const FloatingHeadlines = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

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

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClick = () => {
    const headline = headlines[currentIndex];
    if (headline.link.startsWith('/')) {
      // Internal navigation
      const element = document.querySelector(headline.link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // External link
      window.open(headline.link, '_blank');
    }
  };

  if (!isVisible) return null;

  const currentHeadline = headlines[currentIndex];
  const priorityColors = {
    high: 'border-primary/50 bg-primary/10',
    medium: 'border-accent/50 bg-accent/10',
    low: 'border-secondary/50 bg-secondary/10'
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-[150] bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Headline Display */}
          <div 
            className="flex-1 flex items-center justify-center cursor-pointer group"
            onClick={handleClick}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative overflow-hidden">
              <div className={`text-sm font-medium text-foreground animate-sweep ${priorityColors[currentHeadline.priority]}`}>
                <span className="inline-block animate-typewriter">
                  {currentHeadline.text}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevious}
              className="h-8 w-8 p-0 hover:bg-primary/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex gap-1">
              {headlines.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary' 
                      : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleNext}
              className="h-8 w-8 p-0 hover:bg-primary/10"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingHeadlines; 