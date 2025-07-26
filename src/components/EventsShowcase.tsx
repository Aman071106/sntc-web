import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, Trophy, ArrowRight } from 'lucide-react';

// Import event images
import utkarshImg from '@/assets/events_images/utkarsh.png';
import xpectoImg from '@/assets/events_images/Xpecto.png';
import bootcampImg from '@/assets/events_images/Bootcamp.jpg';

interface Event {
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

const events: Event[] = [
  {
    id: 1,
    name: "Utkarsh",
    fullName: "Utkarsh - Annual Tech Fest",
    description: "Our annual intra-college tech fest, fostering innovation through a vibrant series of events from all SnTC clubs.",
    image: utkarshImg,
    date: "March 15, 2025",
    time: "9:00 AM - 6:00 PM",
    venue: "IIT Mandi Campus",
    category: "Tech Fest",
    organizer: "SnTC",
    prizePool: "INR 50,000+",
    participants: "500+",
    status: "upcoming",
    hasDetailedPage: true
  },
  {
    id: 2,
    name: "Xpecto",
    fullName: "Xpecto - Premier Tech Fest",
    description: "IIT Mandi's premier tech fest, celebrating innovation via electrifying competitions and cutting-edge workshops",
    image: xpectoImg,
    date: "October 20-22, 2025",
    time: "9:00 AM - 8:00 PM",
    venue: "IIT Mandi Campus",
    category: "Inter-College Fest",
    organizer: "SnTC",
    prizePool: "INR 2,00,000+",
    participants: "2000+",
    status: "upcoming",
    hasDetailedPage: true
  },
  {
    id: 3,
    name: "Inter-IIT Bootcamp",
    fullName: "Inter-IIT Bootcamp 2025",
    description: "Empower Your Skills, Expand Your Horizons!! Inter-IIT Bootcamp Awaits!",
    image: bootcampImg,
    date: "July 10-15, 2025",
    time: "9:00 AM - 5:00 PM",
    venue: "IIT Mandi Campus",
    category: "Bootcamp",
    organizer: "SnTC & IIT Network",
    prizePool: "Certificates & Opportunities",
    participants: "200",
    status: "upcoming",
    hasDetailedPage: false
  }
];

const EventsShowcase = () => {
  const handleViewMore = (event: Event) => {
    if (event.hasDetailedPage) {
      // Navigate to detailed event page
      window.open(`/events/${event.id}`, '_blank');
    } else {
      // Show coming soon message
      alert('Detailed page coming soon! Stay tuned for more information.');
    }
  };

  return (
    <section id="events" className="py-20 px-4 pb-32 relative overflow-hidden">
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
            Upcoming Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest tech events, workshops, and competitions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div 
              key={event.id}
              className="transform transition-all duration-500"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 h-full">
                {/* Event image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg px-3 py-1">
                    <span className="text-xs font-mono text-primary">{event.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-lg px-3 py-1">
                    <span className="text-xs font-mono text-accent">{event.status}</span>
                  </div>
                </div>

                {/* Event content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {event.fullName}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Event details */}
                  <div className="space-y-2 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  {/* Event stats */}
                  <div className="flex justify-between items-center mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{event.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      <span>{event.prizePool}</span>
                    </div>
                  </div>

                  {/* Action button */}
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300"
                    onClick={() => handleViewMore(event)}
                  >
                    <span>View More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Hover effect beam */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Card>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              Ready to participate in these exciting events?
            </p>
            <Button 
              className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>Register for Events</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsShowcase; 