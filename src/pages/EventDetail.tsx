import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  Star
} from 'lucide-react';

interface EventDetail {
  _id: string; // MongoDB ID
  id: number;
  name: string;
  fullName: string;
  description: string;
  longDescription: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  organizer: string;
  registrationDeadline: string;
  prizePool: string;
  participants: string;
  status: string;
  hasDetailedPage: boolean;
  registrationLink: string;
  calendarLink: string;
  highlights: string[];
  schedule: { time: string; event: string; }[];
}

const eventImages = import.meta.glob('@/assets/events_images/*', { eager: true, import: 'default' });

const getImage = (fileName: string) => {
  const match = Object.entries(eventImages).find(([path]) => path.endsWith(fileName));
  return match ? match[1] : '';
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://3001-firebase-sntc-web-1753578749472.cluster-zkm2jrwbnbd4awuedc2alqxrpk.cloudworkstations.dev/api/events/${id}`,{
          headers: {
            'Cookie': 'WorkstationJwtPartitioned=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiZmlyZWJhc2Utc250Yy13ZWItMTc1MzU3ODc0OTQ3Mi5jbHVzdGVyLXprbTJqcndibmJkNGF3dWVkYzJhbHF4cnBrLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTc1MzU4MTI2NSwiZXhwIjoxNzUzNjY3NjY1fQ.JjBIvt92prQQwud5hdez7nJCNM-T7xuFPYGukKPuVzfOIVOjqEHHiSh5EZ39s3pkjptUoi4FV-z3qK-Q8XVCb9qc3iPacz43t7h3xCvBAfBoyfP9gexSNbKY41Fga1w7dNTlWoa0bptQ2b9SoZv03ih1iavJDOqd0e7w9bslPihfBgsD96zFhILb-7EEEIWVN63bRrsd0V9i4cMcFLa65JaJ-F5iYAGVtS6lSlTw_vrZ7APu-p4PbRu0q1c2TGLJavjI89iVdhE6IIYcirZ36BtkNvx_xE-xgNPplmBVSD4BHh6DyoFsquTAzePspRZ1qB7z7Su72KAYCRc2f_9Lzw' // full token here
          },
          credentials: 'include'});
        if (!response.ok) {
          throw new Error('Event not found');
        }
        const data: EventDetail = await response.json();
        setEvent({ ...data, image: getImage(data.image) });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-8">The event you're looking for doesn't exist.</p>
          <Link to="/">
            <Button className="bg-primary text-primary-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 sm:h-96 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-6 sm:pb-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
              <Link to="/">
                <Button variant="outline" className="bg-black/20 border-white/20 text-white hover:bg-black/40 text-xs sm:text-sm px-3 py-1">
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Back
                </Button>
              </Link>
              <div className="bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg px-2 sm:px-3 py-0.5">
                <span className="text-xs sm:text-sm font-mono text-primary">{event.category}</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight">
              {event.fullName}
            </h1>
            <p className="text-sm sm:text-lg text-white/80 max-w-2xl">
              {event.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <Card className="p-4 sm:p-8 bg-card/50 backdrop-blur-sm border border-primary/20">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">About the Event</h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                {event.longDescription}
              </p>
            </Card>

            <Card className="p-4 sm:p-8 bg-card/50 backdrop-blur-sm border border-primary/20">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">Event Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {event.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <span className="text-sm sm:text-base text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 sm:p-8 bg-card/50 backdrop-blur-sm border border-primary/20">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">Event Schedule</h2>
              <div className="space-y-3 sm:space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-muted/20 rounded-lg">
                    <div className="bg-primary/20 rounded-lg px-2 py-1 sm:px-3 sm:py-2 min-w-[90px] sm:min-w-[120px] text-center">
                      <span className="text-xs sm:text-sm font-mono text-primary">{item.time}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm sm:text-base text-foreground font-medium">{item.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm border border-primary/20">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Event Details</h3>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="text-foreground font-medium">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Time</p>
                    <p className="text-foreground font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Venue</p>
                    <p className="text-foreground font-medium">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Expected Participants</p>
                    <p className="text-foreground font-medium">{event.participants}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Prize Pool</p>
                    <p className="text-foreground font-medium">{event.prizePool}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm border border-accent/20">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Registration</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-accent/10 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Registration Deadline</p>
                  <p className="text-accent font-medium text-sm sm:text-base">{event.registrationDeadline}</p>
                </div>
                <Button
                  className="w-full bg-accent text-accent-foreground hover:opacity-90"
                  onClick={() => window.open(event.registrationLink, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Register Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => window.open(event.calendarLink, '_blank')}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm border border-secondary/20">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Organized By</h3>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-base sm:text-lg">
                    {event.organizer.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm sm:text-base">{event.organizer}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Event Organizer</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
