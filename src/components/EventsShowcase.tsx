import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, MapPin, Users, Trophy } from 'lucide-react';

// Load all event images
const eventImages = import.meta.glob('@/assets/events_images/*', { eager: true, import: 'default' });

interface Event {
  _id: string;
  id: number;
  name: string;
  fullName: string;
  description: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  organizer: string;
  prizePool: string;
  participants: string;
  status: string;
  hasDetailedPage: boolean;
}

const getImage = (fileName: string) => {
  const match = Object.entries(eventImages).find(([path]) => path.endsWith(fileName));
  return match ? match[1] : '';
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EventsShowcase = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    // Initialize visibility animation
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.6 + 0.1,
      direction: Math.random() * 360,
    }));
    setParticles(newParticles);

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.offsetWidth) * 100,
        y: ((e.clientY - rect.top) / rect.offsetHeight) * 100,
      });
    };

    const section = document.getElementById('events-section');
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/events`);
        const data = await response.json();
        const eventsWithImages = data.map(event => ({
          ...event,
          image: getImage(event.image),
        }));
        setEvents(eventsWithImages);
      } catch (error) {
        console.error('Error fetching events:', error);
       
      }
    };

    fetchEvents();
  }, []);

  const handleViewMore = (event) => {
    if (event.hasDetailedPage) {
      window.open(`/events/${event.id}`, '_blank');
    } else {
      alert('Detailed page coming soon! Stay tuned for more information.');
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Festival': 'from-purple-500 to-pink-500',
      'Competition': 'from-blue-500 to-cyan-500',
      'Workshop': 'from-green-500 to-teal-500',
      'Seminar': 'from-orange-500 to-red-500',
      'default': 'from-gray-500 to-slate-500'
    };
    return colors[category] || colors.default;
  };

  const getStatusColor = (status) => {
    const colors = {
      'Upcoming': 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
      'Open': 'text-green-400 border-green-400/30 bg-green-400/10',
      'Registration Open': 'text-blue-400 border-blue-400/30 bg-blue-400/10',
      'Closed': 'text-red-400 border-red-400/30 bg-red-400/10',
      'default': 'text-gray-400 border-gray-400/30 bg-gray-400/10'
    };
    return colors[status] || colors.default;
  };

  return (
    <section 
      id="events" 
      className="relative min-h-screen py-20 px-4 pb-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900"
    >
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #3b82f6 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, #8b5cf6 1px, transparent 1px),
              linear-gradient(90deg, transparent 49px, rgba(59, 130, 246, 0.03) 50px, transparent 51px),
              linear-gradient(transparent 49px, rgba(139, 92, 246, 0.03) 50px, transparent 51px)
            `,
            backgroundSize: '50px 50px, 30px 30px, 50px 50px, 50px 50px',
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

      {/* Interactive Light Beams */}
      <div 
        className="absolute inset-0 opacity-20 transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 40%)`,
        }}
      />

      {/* Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
        <defs>
          <linearGradient id="eventLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {[...Array(6)].map((_, i) => (
          <line
            key={i}
            x1={`${10 + i * 15}%`}
            y1="0%"
            x2={`${20 + i * 12}%`}
            y2="100%"
            stroke="url(#eventLineGradient)"
            strokeWidth="1"
            className="animate-pulse"
            style={{
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </svg>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Enhanced Effects */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="relative inline-block mb-6">
            <h2 className="text-4xl md:text-6xl font-bold text-blue-500">
              Major Events
            </h2>
            {/* Floating tech icons around title */}
             </div>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Events hosted by SNTC are
            <span className="text-blue-400 font-semibold"> tech events</span>, 
            <span className="text-blue-400 font-semibold"> workshops</span>, and 
            <span className="text-blue-400 font-semibold"> competitions</span>
            <span className="inline-block w-1 h-6 bg-cyan-400 animate-blink ml-1" />
          </p>
        </div>

        {/* Events Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={event._id}
              className={`transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-12 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(event._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="">
                
                {/* Holographic Overlay */}
                <div className="" />
                
                {/* Enhanced Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Image Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-conic from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                 
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 backdrop-blur-sm border rounded-lg px-3 py-1 ${getStatusColor(event.status)}`}>
                    <span className="text-xs font-mono font-semibold">{event.status}</span>
                  </div>

                  {/* Floating Particles on Hover */}
                  {hoveredCard === event._id && (
                    <div className="absolute inset-0">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-cyan-1000 rounded-full animate-float opacity-60"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: `${2 + Math.random()}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Enhanced Content */}
                <div className="p-6 relative">
                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 rounded-b-lg border border-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {event.fullName}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 group-hover:text-slate-300 transition-colors duration-300">
                    {event.description}
                  </p>

                  {/* Event Details with Icons */}
                  <div className="space-y-2 mb-4 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-purple-400" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-blue-400" />
                        <span>{event.participants}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-3 h-3 text-yellow-400" />
                        <span>{event.prizePool}</span>
                      </div>
                    </div>
                  </div>

                  
                </div>
              </Card>
            </div>
          ))}
        </div>

        
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
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-gradient-shift { 
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        .animate-blink { animation: blink 1.5s infinite; }
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

export default EventsShowcase;