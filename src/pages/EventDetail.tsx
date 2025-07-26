import { useParams, Link } from 'react-router-dom';
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

// Import event images
import utkarshImg from '@/assets/events_images/utkarsh.png';
import xpectoImg from '@/assets/events_images/Xpecto.png';
import bootcampImg from '@/assets/events_images/Bootcamp.jpg';

interface EventDetail {
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
  schedule: { time: string; event: string }[];
}

const eventsData: EventDetail[] = [
  {
    id: 1,
    name: "Utkarsh",
    fullName: "Utkarsh - Annual Tech Fest",
    description: "Our annual intra-college tech fest, fostering innovation through a vibrant series of events from all SnTC clubs.",
    longDescription: "Utkarsh is IIT Mandi's flagship intra-college technical festival that brings together students from all branches to showcase their technical prowess and innovative thinking. The event features a diverse range of competitions, workshops, and exhibitions organized by various SnTC clubs including Robotronics, Programming, STAC, and more. From coding competitions to robotics challenges, from space technology workshops to automotive engineering exhibitions, Utkarsh provides a platform for students to learn, compete, and grow together.",
    image: utkarshImg,
    date: "March 15, 2025",
    time: "9:00 AM - 6:00 PM",
    venue: "IIT Mandi Campus",
    category: "Tech Fest",
    organizer: "SnTC",
    registrationDeadline: "March 10, 2025",
    prizePool: "INR 50,000+",
    participants: "500+",
    status: "upcoming",
    hasDetailedPage: true,
    registrationLink: "https://sntc.iitmandi.co.in/events/utkarsh",
    calendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Utkarsh%20Tech%20Fest&dates=20250315T090000/20250315T180000&details=Our%20annual%20intra-college%20tech%20fest%20at%20IIT%20Mandi&location=IIT%20Mandi%20Campus",
    highlights: [
      "Coding Competitions",
      "Robotics Challenges", 
      "Space Technology Workshops",
      "Automotive Engineering Exhibitions",
      "Innovation Showcase",
      "Networking Sessions"
    ],
    schedule: [
      { time: "9:00 AM", event: "Opening Ceremony" },
      { time: "10:00 AM", event: "Coding Competition" },
      { time: "2:00 PM", event: "Robotics Challenge" },
      { time: "4:00 PM", event: "Innovation Showcase" },
      { time: "6:00 PM", event: "Closing Ceremony" }
    ]
  },
  {
    id: 2,
    name: "Xpecto",
    fullName: "Xpecto - Premier Tech Fest",
    description: "IIT Mandi's premier tech fest, celebrating innovation via electrifying competitions and cutting-edge workshops",
    longDescription: "Xpecto is IIT Mandi's premier inter-college technical festival that attracts participants from across the country. This prestigious event celebrates innovation, creativity, and technical excellence through a series of electrifying competitions, cutting-edge workshops, and inspiring talks by industry leaders. Xpecto serves as a platform for students to showcase their skills, learn from experts, and network with peers from different institutions.",
    image: xpectoImg,
    date: "October 20-22, 2025",
    time: "9:00 AM - 8:00 PM",
    venue: "IIT Mandi Campus",
    category: "Inter-College Fest",
    organizer: "SnTC",
    registrationDeadline: "October 15, 2025",
    prizePool: "INR 2,00,000+",
    participants: "2000+",
    status: "upcoming",
    hasDetailedPage: true,
    registrationLink: "https://sntc.iitmandi.co.in/events/xpecto",
    calendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Xpecto%20Premier%20Tech%20Fest&dates=20251020T090000/20251022T200000&details=IIT%20Mandi%27s%20premier%20tech%20fest%20with%20national%20level%20competitions&location=IIT%20Mandi%20Campus",
    highlights: [
      "National Level Competitions",
      "Industry Expert Talks",
      "Innovation Summit",
      "Startup Showcase",
      "Cultural Events",
      "Networking Mixer"
    ],
    schedule: [
      { time: "Day 1 - 9:00 AM", event: "Inauguration Ceremony" },
      { time: "Day 1 - 11:00 AM", event: "Technical Competitions" },
      { time: "Day 2 - 10:00 AM", event: "Workshops & Talks" },
      { time: "Day 2 - 3:00 PM", event: "Innovation Summit" },
      { time: "Day 3 - 2:00 PM", event: "Grand Finale" }
    ]
  }
];

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id || '1');
  const event = eventsData.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Event Not Found</h1>
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
      <div className="relative h-96 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/">
                <Button variant="outline" className="bg-black/20 border-white/20 text-white hover:bg-black/40">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Events
                </Button>
              </Link>
              <div className="bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg px-3 py-1">
                <span className="text-sm font-mono text-primary">{event.category}</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {event.fullName}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl">
              {event.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card className="p-8 bg-card/50 backdrop-blur-sm border border-primary/20">
              <h2 className="text-3xl font-bold text-foreground mb-6">About the Event</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {event.longDescription}
              </p>
            </Card>

            {/* Highlights Section */}
            <Card className="p-8 bg-card/50 backdrop-blur-sm border border-primary/20">
              <h2 className="text-3xl font-bold text-foreground mb-6">Event Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Schedule Section */}
            <Card className="p-8 bg-card/50 backdrop-blur-sm border border-primary/20">
              <h2 className="text-3xl font-bold text-foreground mb-6">Event Schedule</h2>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg">
                    <div className="bg-primary/20 rounded-lg px-3 py-2 min-w-[120px]">
                      <span className="text-sm font-mono text-primary">{item.time}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-foreground font-medium">{item.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20">
              <h3 className="text-xl font-bold text-foreground mb-4">Event Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="text-foreground font-medium">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="text-foreground font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Venue</p>
                    <p className="text-foreground font-medium">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Participants</p>
                    <p className="text-foreground font-medium">{event.participants}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Prize Pool</p>
                    <p className="text-foreground font-medium">{event.prizePool}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Registration Card */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-accent/20">
              <h3 className="text-xl font-bold text-foreground mb-4">Registration</h3>
              <div className="space-y-4">
                <div className="bg-accent/10 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Registration Deadline</p>
                  <p className="text-accent font-medium">{event.registrationDeadline}</p>
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

            {/* Organizer Card */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-secondary/20">
              <h3 className="text-xl font-bold text-foreground mb-4">Organized By</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">S</span>
                </div>
                <div>
                  <p className="text-foreground font-medium">{event.organizer}</p>
                  <p className="text-sm text-muted-foreground">Event Organizer</p>
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