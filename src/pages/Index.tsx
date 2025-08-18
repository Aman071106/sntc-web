import Navigation from '@/components/Navigation';
import PortalHero from '@/components/PortalHero';
import ClubsCellsConsole from '@/components/ClubsCellsConsole';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import EventsShowcase from '@/components/EventsShowcase';
import NewsSection from '@/components/NewsSection';
import Calendar from '@/components/Calendar';
import QuickLinks from '@/components/QuickLinks';
import FloatingHeadlines from '@/components/FloatingHeadlines';
import ContactSection from '@/components/ContactSection';
import { Terminal } from '@/components/Terminal';
import { Button } from '@/components/ui/button';
import { Users, Linkedin, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const contactData: Contact[] = [
  {
    id: 1,
    name: "Aryan Singh",
    role: "Technical Secretary",
    email: "technical_secretary@students.iitmandi.ac.in",
    linkedin: "https://www.linkedin.com/in/aryan0singh/",
    instagram: "https://www.instagram.com/skd.arya18/",
    category: "primary",
  },
  {
    id: 2,
    name: "Meet Our Team",
    role: "Core Team",
    category: "accent",
    link: "/team",  // ← add the link here
  },
  // Add more dynamically if needed
];


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
        {/* <ChatGroq /> */}
        <Terminal />
      </div>

      

      {/* Contact Section */}
      <ContactSection />


    </div>
  );
};

export default Index;
