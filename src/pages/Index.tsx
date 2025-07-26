import Navigation from '@/components/Navigation';
import PortalHero from '@/components/PortalHero';
import ClubsCellsConsole from '@/components/ClubsCellsConsole';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import EventsShowcase from '@/components/EventsShowcase';
import NewsSection from '@/components/NewsSection';
import Calendar from '@/components/Calendar';
import QuickLinks from '@/components/QuickLinks';
import FloatingHeadlines from '@/components/FloatingHeadlines';
import ChatGroq from '@/components/ChatGroq';
import VideoMeetings from '@/components/VideoMeetings';
import { Terminal } from '@/components/Terminal';
import { Button } from '@/components/ui/button';
import { Users, Linkedin, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div id="home" className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
    
  <FloatingHeadlines />

        <PortalHero />
        <ClubsCellsConsole />
        <ProjectsShowcase />
        <EventsShowcase />
        <NewsSection />
        <Calendar />
        <QuickLinks />
        {/* <VideoMeetings /> */}
        <ChatGroq />
        <Terminal />
      </div>

      

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              Contact Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get in touch with the SNTC team for any queries or collaborations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Technical Secretary Contact */}
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-8 hover:border-primary/50 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Aryan Singh</h3>
                <p className="text-primary font-semibold mb-4">Technical Secretary</p>
                <p className="text-muted-foreground mb-4 flex items-center justify-center">technical_secretary@students.iitmandi.ac.in</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => window.open('https://www.linkedin.com/in/aryan0singh/', '_blank')}
                  className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://www.instagram.com/skd.arya18/', '_blank')}
                  className="border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('mailto:technical_secretary@students.iitmandi.ac.in', '_blank')}
                  className="border-secondary/200 text-secondary/400 hover:bg-secondary hover:text-secondary-foreground"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>

            {/* Team Members Link */}
            <div className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-lg p-8 hover:border-accent/50 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Meet Our Team</h3>
                <p className="text-muted-foreground mb-6">Explore the complete core team and their profiles</p>
              </div>
              
              <Link to="/team">
                <Button className="w-full bg-accent text-accent-foreground hover:opacity-90 transition-opacity">
                  <Users className="w-4 h-4 mr-2" />
                  View All Team Members
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
