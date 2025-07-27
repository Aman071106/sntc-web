import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

// Load all event images
const eventImages = import.meta.glob('@/assets/events_images/*', { eager: true, import: 'default' });

interface Event {
  _id: string; // MongoDB ID
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

const EventsShowcase = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://3001-firebase-sntc-web-1753578749472.cluster-zkm2jrwbnbd4awuedc2alqxrpk.cloudworkstations.dev/api/events',{
          headers: {
            'Cookie': 'WorkstationJwtPartitioned=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiZmlyZWJhc2Utc250Yy13ZWItMTc1MzU3ODc0OTQ3Mi5jbHVzdGVyLXprbTJqcndibmJkNGF3dWVkYzJhbHF4cnBrLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTc1MzU4MTI2NSwiZXhwIjoxNzUzNjY3NjY1fQ.JjBIvt92prQQwud5hdez7nJCNM-T7xuFPYGukKPuVzfOIVOjqEHHiSh5EZ39s3pkjptUoi4FV-z3qK-Q8XVCb9qc3iPacz43t7h3xCvBAfBoyfP9gexSNbKY41Fga1w7dNTlWoa0bptQ2b9SoZv03ih1iavJDOqd0e7w9bslPihfBgsD96zFhILb-7EEEIWVN63bRrsd0V9i4cMcFLa65JaJ-F5iYAGVtS6lSlTw_vrZ7APu-p4PbRu0q1c2TGLJavjI89iVdhE6IIYcirZ36BtkNvx_xE-xgNPplmBVSD4BHh6DyoFsquTAzePspRZ1qB7z7Su72KAYCRc2f_9Lzw' // full token here
          },
          credentials: 'include'});
        const data: Event[] = await response.json();
        // Load images after fetching data
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

  const handleViewMore = (event: Event) => {
    if (event.hasDetailedPage) {
      window.open(`/events/${event.id}`, '_blank');
    } else {
      alert('Detailed page coming soon! Stay tuned for more information.');
    }
  };

  return (
    <section id="events" className="py-20 px-4 pb-32 relative overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Upcoming Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest tech events, workshops, and competitions
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card
              key={event._id} // Use MongoDB _id
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 h-full"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg px-3 py-1">
                  <span className="text-xs font-mono text-primary">{event.category}</span>
                </div>
                <div className="absolute top-4 right-4 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-lg px-3 py-1">
                  <span className="text-xs font-mono text-accent">{event.status}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {event.fullName}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{event.date}</span>
                </div>

                <Button
                  className="w-full bg-primary text-primary-foreground hover:opacity-90"
                  onClick={() => handleViewMore(event)}
                >
                  <span>View More</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsShowcase;
