import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  MapPin,
  Clock
} from 'lucide-react';

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: 'event' | 'deadline' | 'workshop';
  description: string;
  venue: string;
  time: string;
}

const events: CalendarEvent[] = [
  {
    id: 1,
    title: "Utkarsh Tech Fest",
    date: "2025-03-15",
    type: "event",
    description: "Annual intra-college tech fest",
    venue: "IIT Mandi Campus",
    time: "9:00 AM - 6:00 PM"
  },
  {
    id: 2,
    title: "Xpecto Registration Deadline",
    date: "2025-10-15",
    type: "deadline",
    description: "Last date to register for Xpecto",
    venue: "Online",
    time: "11:59 PM"
  },
  {
    id: 3,
    title: "Xpecto Premier Fest",
    date: "2025-10-20",
    type: "event",
    description: "Premier inter-college tech fest",
    venue: "IIT Mandi Campus",
    time: "9:00 AM - 8:00 PM"
  },
  {
    id: 4,
    title: "Inter-IIT Bootcamp",
    date: "2025-07-10",
    type: "workshop",
    description: "Intensive learning program",
    venue: "IIT Mandi Campus",
    time: "9:00 AM - 5:00 PM"
  },
  {
    id: 5,
    title: "Bootcamp Registration Deadline",
    date: "2025-07-05",
    type: "deadline",
    description: "Last date to register for bootcamp",
    venue: "Online",
    time: "11:59 PM"
  }
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'deadline':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'workshop':
        return 'bg-accent/20 text-accent border-accent/30';
      default:
        return 'bg-muted text-muted-foreground';
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

  return (
    <section id="calendar" className="py-20 px-4 pb-32 relative overflow-hidden">
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
            Event Calendar
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay organized with our comprehensive event calendar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPreviousMonth}
                    className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <h3 className="text-xl font-bold text-foreground">
                    {formatDate(currentDate)}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextMonth}
                    className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  onClick={goToToday}
                  className="border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  Today
                </Button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
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
                      className={`p-2 min-h-[80px] border border-border/50 rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted/50 ${
                        isToday ? 'bg-primary/10 border-primary/50' : ''
                      } ${isSelected ? 'bg-accent/10 border-accent/50' : ''} ${
                        !isCurrentMonth ? 'opacity-50' : ''
                      }`}
                      onClick={() => setSelectedDate(date)}
                    >
                      <div className="text-sm font-medium text-foreground mb-1">
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`w-full h-2 rounded-full ${getEventTypeColor(event.type)}`}
                            title={event.title}
                          />
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            {/* Selected Date Events */}
            {selectedDate && (
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                <div className="space-y-3">
                  {getEventsForDate(selectedDate).map(event => (
                    <div key={event.id} className="p-3 rounded-lg bg-muted/20 border border-border">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground">{event.title}</h4>
                        <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.venue}
                        </div>
                      </div>
                    </div>
                  ))}
                  {getEventsForDate(selectedDate).length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No events scheduled for this date
                    </p>
                  )}
                </div>
              </Card>
            )}

            {/* Upcoming Events */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-accent/20">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-accent" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {events
                  .filter(event => new Date(event.date) > new Date())
                  .slice(0, 5)
                  .map(event => (
                    <div key={event.id} className="p-3 rounded-lg bg-muted/20 border border-border">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground text-sm">{event.title}</h4>
                        <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarIcon className="w-3 h-3" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calendar; 