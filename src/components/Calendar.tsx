import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Zap,
  Settings,
  Users
} from 'lucide-react';

interface CalendarEvent {
  _id: string;
  title: string;
  date: string;
  type: 'event' | 'deadline' | 'workshop';
  description: string;
  venue: string;
  time: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      direction: Math.random() * 360,
    }));
    setParticles(newParticles);

    const handleMouseMove = (e) => {
      const rect = e.currentTarget?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const calendarSection = document.getElementById('futuristic-calendar');
    if (calendarSection) {
      calendarSection.addEventListener('mousemove', handleMouseMove);
      return () => calendarSection.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/calendar`);
        if (!response.ok) {
          throw new Error('Failed to fetch calendar data');
        }
        const data: CalendarEvent[] = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
        // Set empty events array on error to show calendar without events
        setEvents([]);
      }
    };

    fetchCalendarEvents();
  }, [BASE_URL]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const getEventsForDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
  
    return events.filter(event =>
      (event.date !== "TBA" && event.date === dateString)
    );
  };
  
  

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'from-blue-400 to-cyan-400';
      case 'deadline':
        return 'from-red-400 to-pink-400';
      case 'workshop':
        return 'from-purple-400 to-indigo-400';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  // Get upcoming events
const upcomingEvents = events
.filter(event => {
  if (event.date === "TBA") return false; // Skip TBA events for date filtering
  const [year, month, day] = event.date.split('-').map(Number);
  const eventDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
})
.sort((a, b) => {
  if (a.date === "TBA") return 1;
  if (b.date === "TBA") return -1;
  return new Date(a.date).getTime() - new Date(b.date).getTime();
})
.slice(0, 5);


  return (
    <section 
      id="calendar" 
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900"
    >
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

      {/* Floating Particles */}
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
      <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
        <defs>
          <linearGradient id="calendarLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {[...Array(6)].map((_, i) => (
          <g key={i}>
            <line
              x1={`${10 + i * 15}%`}
              y1="10%"
              x2={`${20 + i * 12}%`}
              y2="90%"
              stroke="url(#calendarLineGradient)"
              strokeWidth="0.5"
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
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="relative text-4xl md:text-6xl font-bold mb-6 group">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">
              Event Calendar
            </span>
            {/* Glitch overlay */}
            <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent opacity-0 group-hover:animate-glitch">
              Event Calendar
            </span>
          </h2>
        
        </div>

        {loading && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg">
              <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-cyan-400 font-mono">Initializing temporal matrix...</span>
            </div>
          </div>
        )}

        

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
          isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="relative p-6 bg-slate-900/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/10">
              {/* Energy rings around calendar */}
              <div className="absolute inset-0 -m-4">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute border rounded-xl ${
                      i % 2 === 0 ? 'animate-pulse' : 'animate-pulse'
                    }`}
                    style={{
                      width: `calc(100% + ${16 + i * 8}px)`,
                      height: `calc(100% + ${16 + i * 8}px)`,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderColor: i % 2 === 0 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
                      borderWidth: `${1}px`,
                      animationDuration: `${3 + i}s`,
                    }}
                  />
                ))}
              </div>

              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={goToPreviousMonth}
                    className="p-2 bg-slate-800/50 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-200 group"
                  >
                    <ChevronLeft className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                  </button>
                  <h3 className="text-xl font-bold text-slate-200 font-mono">
                    {formatDate(currentDate)}
                  </h3>
                  <button
                    onClick={goToNextMonth}
                    className="p-2 bg-slate-800/50 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-200 group"
                  >
                    <ChevronRight className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                  </button>
                </div>
                <button
                  onClick={goToToday}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 font-mono text-sm shadow-lg shadow-purple-500/25"
                >
                  Today
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-3 text-center text-sm font-bold text-cyan-400 font-mono">
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {days.map((date, index) => {
                  if (!date) {
                    return <div key={index} className="p-2" />;
                  }

                  const isToday = date.toDateString() === new Date().toDateString();
                  const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                  const dayEvents = getEventsForDate(date);
                  const isCurrentMonth = date.getMonth() === currentDate.getMonth();

                  return (
                    <div
                      key={index}
                      className={`p-2 min-h-[80px] border rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg relative group ${
                        isToday ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-400/50 shadow-cyan-400/25' : 
                        isSelected ? 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-purple-400/50 shadow-purple-400/25' : 
                        'bg-slate-800/30 border-slate-600/30 hover:bg-slate-700/40 hover:border-slate-500/50'
                      } ${!isCurrentMonth ? 'opacity-50' : ''}`}
                      onClick={() => setSelectedDate(date)}
                    >
                      {/* Holographic overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative z-10">
                        <div className={`text-sm font-bold mb-1 font-mono ${
                          isToday ? 'text-cyan-300' : 'text-slate-200'
                        }`}>
                          {date.getDate()}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map(event => (
                            <div
                              key={event._id}
                              className={`w-full h-2 rounded-full bg-gradient-to-r ${getEventTypeColor(event.type)} shadow-sm animate-pulse`}
                              title={event.title}
                              style={{
                                animationDuration: `${2 + Math.random()}s`
                              }}
                            />
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-cyan-400 font-mono animate-pulse">
                              +{dayEvents.length - 2}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Event Details Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Events */}
            {selectedDate && (
              <div className="relative p-6 bg-slate-900/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/10">
                <div className="absolute top-4 right-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
                
                <h3 className="text-lg font-bold text-slate-200 mb-4 font-mono">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                
                <div className="space-y-3">
                  {getEventsForDate(selectedDate).map(event => (
                    <div key={event._id} className="p-4 rounded-lg bg-slate-800/50 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200 group">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">{event.title}</h4>
                        <div className={`px-2 py-1 rounded-md text-xs font-mono bg-gradient-to-r ${getEventTypeColor(event.type)} text-white shadow-sm`}>
                          {event.type}
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
  <div className="flex items-center gap-1">
    <Clock className="w-3 h-3" />
    {event.time === "TBA" ? "TBA" : event.time}
  </div>
  <div className="flex items-center gap-1">
    <MapPin className="w-3 h-3" />
    {event.venue}
  </div>
</div>

                    </div>
                  ))}
                  {getEventsForDate(selectedDate).length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-700/50 flex items-center justify-center">
                        <CalendarIcon className="w-6 h-6 text-slate-500" />
                      </div>
                      <p className="text-sm text-slate-500 font-mono">
                        No events in this timeline
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Upcoming Events */}
            <div className="relative p-6 bg-slate-900/40 backdrop-blur-sm border border-purple-500/30 rounded-xl shadow-2xl shadow-purple-500/10">
              <div className="absolute top-4 right-4 flex gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
              
              <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2 font-mono">
                <CalendarIcon className="w-5 h-5 text-purple-400" />
                Upcoming Events
              </h3>
              
              <div className="space-y-3">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, index) => (
                    <div key={event._id} className="p-3 rounded-lg bg-slate-800/50 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200 group animate-fade-in"
                         style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-slate-200 text-sm group-hover:text-purple-300 transition-colors">{event.title}</h4>
                        <div className={`px-2 py-1 rounded-md text-xs font-mono bg-gradient-to-r ${getEventTypeColor(event.type)} text-white`}>
                          {event.type}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
  <CalendarIcon className="w-3 h-3" />
  {event.date === "TBA"
    ? "Date TBA"
    : new Date(event.date).toLocaleDateString()}
</div>

                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-700/50 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-slate-500" />
                    </div>
                    <p className="text-sm text-slate-500 font-mono">
                      No active Events
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
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
        @keyframes glitch {
          0% { opacity: 0; transform: translateX(0); }
          10% { opacity: 1; transform: translateX(-1px); }
          20% { opacity: 0; transform: translateX(1px); }
          30% { opacity: 1; transform: translateX(-1px); }
          40% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-gradient-shift { 
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        .animate-glitch { animation: glitch 0.5s; }
        .animate-fade-in { animation: fade-in 1s ease-out; }
      `}</style>
    </section>
  );
};

export default Calendar;