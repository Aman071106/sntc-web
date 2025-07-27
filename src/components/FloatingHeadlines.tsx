import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Headline {
  _id: string; // MongoDB ID
  text: string;
  type: string;
  priority: string;
  link: string;
}

const IntegratedHeadlines = () => {
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await fetch('https://3001-firebase-sntc-web-1753578749472.cluster-zkm2jrwbnbd4awuedc2alqxrpk.cloudworkstations.dev/api/headlines',{
          headers: {
            'Cookie': 'WorkstationJwtPartitioned=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiZmlyZWJhc2Utc250Yy13ZWItMTc1MzU3ODc0OTQ3Mi5jbHVzdGVyLXprbTJqcndibmJkNGF3dWVkYzJhbHF4cnBrLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTc1MzU4MTI2NSwiZXhwIjoxNzUzNjY3NjY1fQ.JjBIvt92prQQwud5hdez7nJCNM-T7xuFPYGukKPuVzfOIVOjqEHHiSh5EZ39s3pkjptUoi4FV-z3qK-Q8XVCb9qc3iPacz43t7h3xCvBAfBoyfP9gexSNbKY41Fga1w7dNTlWoa0bptQ2b9SoZv03ih1iavJDOqd0e7w9bslPihfBgsD96zFhILb-7EEEIWVN63bRrsd0V9i4cMcFLa65JaJ-F5iYAGVtS6lSlTw_vrZ7APu-p4PbRu0q1c2TGLJavjI89iVdhE6IIYcirZ36BtkNvx_xE-xgNPplmBVSD4BHh6DyoFsquTAzePspRZ1qB7z7Su72KAYCRc2f_9Lzw' // full token here
          },
          credentials: 'include'});
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
    }, 4000);

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