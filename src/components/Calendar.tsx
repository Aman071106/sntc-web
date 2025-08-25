import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Zap,
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

// FIX #1: Reliable helper function to parse YYYY-MM-DD strings as local dates
const parseLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  // This creates a date in the user's local timezone at midnight
  return new Date(year, month - 1, day);
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<any[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
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

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      if (target) {
        const rect = target.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const calendarSection = document.getElementById('calendar');
    if (calendarSection) {
      calendarSection.addEventListener('mousemove', handleMouseMove as EventListener);
      return () => calendarSection.removeEventListener('mousemove', handleMouseMove as EventListener);
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
        // LOGGING #1: Log fetched data
        console.log("✅ Events fetched successfully:", data);
        setEvents(data);
      } catch (err: any) {
        // LOGGING #2: Log any errors during fetch
        console.error("🔥 Error fetching events:", err);
        setError(err.message);
        setEvents([]);
      } finally {
        setLoading(false);
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
  
    return events.filter(event => event.date !== "TBA" && event.date === dateString);
  };
  
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'from-blue-400 to-cyan-400';
      case 'deadline': return 'from-red-400 to-pink-400';
      case 'workshop': return 'from-purple-400 to-indigo-400';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      // LOGGING #3: Log month changes
      console.log("⬅️ Changing to previous month:", newDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }));
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      // LOGGING #4: Log month changes
      console.log("➡️ Changing to next month:", newDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }));
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
  const days: (Date | null)[] = [];

  for (let i = 0; i < startingDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  // FIX #2: Use the reliable parseLocalDate function here
  const upcomingEvents = events
    .filter(event => {
      if (event.date === "TBA") return false;
      const eventDate = parseLocalDate(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .sort((a, b) => {
      if (a.date === "TBA") return 1;
      if (b.date === "TBA") return -1;
      return parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime();
    })
    .slice(0, 5);

  return (
    <section 
      id="calendar" 
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900"
    >
      {/* Backgrounds and other effects */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, #8b5cf6 1px, transparent 1px),
              linear-gradient(90deg, transparent 24px, rgba(59, 130, 246, 0.03) 25px, rgba(59, 130, 246, 0.03) 26px, transparent 27px),
              linear-gradient(transparent 24px, rgba(139, 92, 246, 0.03) 25px, rgba(139, 92, 246, 0.03) 26px, transparent 27px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
      <div className="absolute inset-0">
        {particles.map((p) => <div key={p.id} className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-float" style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, opacity: p.opacity, animationDelay: `${p.id * 0.1}s`, animationDuration: `${p.speed + 2}s` }} />)}
      </div>
      <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)` }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="relative text-4xl md:text-6xl font-bold mb-6 group">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">Event Calendar</span>
            <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent opacity-0 group-hover:animate-glitch">Event Calendar</span>
          </h2>
        </div>

        {loading && (
          <div className="text-center mb-8"><div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg"><div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div><span className="text-cyan-400 font-mono">Initializing temporal matrix...</span></div></div>
        )}

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="relative p-6 bg-slate-900/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/10">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <button onClick={goToPreviousMonth} className="p-2 bg-slate-800/50 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all group"><ChevronLeft className="w-5 h-5 text-blue-400" /></button>
                  <h3 className="text-xl font-bold text-slate-200 font-mono">{formatDate(currentDate)}</h3>
                  <button onClick={goToNextMonth} className="p-2 bg-slate-800/50 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all group"><ChevronRight className="w-5 h-5 text-blue-400" /></button>
                </div>
                <button onClick={goToToday} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 transition-all font-mono text-sm shadow-lg">Today</button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="p-3 text-center text-sm font-bold text-cyan-400 font-mono">{day}</div>)}

                {days.map((date, index) => {
                  if (!date) return <div key={`empty-${index}`} />;

                  const isToday = date.toDateString() === new Date().toDateString();
                  const isSelected = selectedDate?.toDateString() === date.toDateString();
                  const dayEvents = getEventsForDate(date);
                  
                  return (
                    <div
                      key={date.toISOString()}
                      className={`p-2 min-h-[80px] border rounded-lg cursor-pointer transition-all hover:scale-105 relative group ${
                        isToday ? 'bg-cyan-500/20 border-cyan-400/50' : 
                        isSelected ? 'bg-purple-500/20 border-purple-400/50' : 
                        'bg-slate-800/30 border-slate-600/30 hover:border-slate-500/50'
                      }`}
                      onClick={() => {
                        // LOGGING #5: Log date clicks and events found
                        console.log(`--- Date Clicked: ${date.toDateString()} ---`);
                        const foundEvents = getEventsForDate(date);
                        console.log(`Found ${foundEvents.length} events for this date:`, foundEvents);
                        setSelectedDate(date);
                      }}
                    >
                      <div className="relative z-10">
                        <div className={`text-sm font-bold mb-1 font-mono ${isToday ? 'text-cyan-300' : 'text-slate-200'}`}>{date.getDate()}</div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map(event => <div key={event._id} className={`w-1 h-1 rounded-full bg-gradient-to-r ${getEventTypeColor(event.type)}`} title={event.title} />)}
                          {dayEvents.length > 2 && <div className="text-xs text-cyan-400 font-mono">+ {dayEvents.length - 2}</div>}
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
            {selectedDate && (
              <div className="relative p-6 bg-slate-900/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl">
                <h3 className="text-lg font-bold text-slate-200 mb-4 font-mono">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                <div className="space-y-3">
                  {getEventsForDate(selectedDate).map(event => (
                    <div key={event._id} className="p-4 rounded-lg bg-slate-800/50 border border-slate-600/30">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-slate-200">{event.title}</h4>
                        <div className={`px-2 py-1 rounded-md text-xs font-mono bg-gradient-to-r ${getEventTypeColor(event.type)} text-white`}>{event.type}</div>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{event.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                        <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.time}</div>
                        <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.venue}</div>
                      </div>
                    </div>
                  ))}
                  {getEventsForDate(selectedDate).length === 0 && <div className="text-center py-8"><div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-700/50 flex items-center justify-center"><CalendarIcon className="w-6 h-6 text-slate-500" /></div><p className="text-sm text-slate-500 font-mono">No events in this timeline</p></div>}
                </div>
              </div>
            )}
            <div className="relative p-6 bg-slate-900/40 backdrop-blur-sm border border-purple-500/30 rounded-xl">
              <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2 font-mono"><CalendarIcon className="w-5 h-5 text-purple-400" />Upcoming Events</h3>
              <div className="space-y-3">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, index) => (
                    <div key={event._id} className="p-3 rounded-lg bg-slate-800/50 border border-slate-600/30 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-slate-200 text-sm">{event.title}</h4>
                        <div className={`px-2 py-1 rounded-md text-xs font-mono bg-gradient-to-r ${getEventTypeColor(event.type)} text-white`}>{event.type}</div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                        <CalendarIcon className="w-3 h-3" />
                        {/* FIX #3: Use reliable helper function here too */}
                        {event.date === "TBA" ? "Date TBA" : parseLocalDate(event.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                ) : (<div className="text-center py-8"><div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-700/50 flex items-center justify-center"><Zap className="w-6 h-6 text-slate-500" /></div><p className="text-sm text-slate-500 font-mono">No active Events</p></div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes glitch { 0% { opacity: 0; } 10% { opacity: 1; transform: translateX(-1px); } 20% { opacity: 0; transform: translateX(1px); } 30% { opacity: 1; transform: translateX(-1px); } 40% { opacity: 0; } 100% { opacity: 0; } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-gradient-shift { background-size: 200% 200%; animation: gradient-shift 3s ease infinite; }
        .animate-glitch { animation: glitch 0.5s; }
        .animate-fade-in { animation: fade-in 1s ease-out both; }
      `}</style>
    </section>
  );
};

export default Calendar;
// example
// {
//   "_id": "ObjectId('64c8a5f1b1b2c3d4e5f6a7b8')",
//   "title": "Project Alpha Deadline",
//   "description": "Final submission for the Project Alpha milestone.",
//   "type": "deadline",
//   "date": "2025-09-15",
//   "time": "11:59 PM",
//   "venue": "Online Portal"
// }