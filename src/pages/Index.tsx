import Navigation from '@/components/Navigation';
import PortalHero from '@/components/PortalHero';
import ClubsCellsConsole from '@/components/ClubsCellsConsole';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import EventsShowcase from '@/components/EventsShowcase';
import { Terminal } from '@/components/Terminal';

const Index = () => {
  return (
    <div id="home" className="min-h-screen bg-background">
      <Navigation />
      <PortalHero />
      <ClubsCellsConsole />
      <ProjectsShowcase />
      <EventsShowcase />

      {/* News Section */}
      <section id="news" className="py-20 px-4 pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              Tech News
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Latest updates from the world of technology and innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Latest Tech News */}
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4">Latest in AI</h3>
              <p className="text-muted-foreground mb-4">Discover the newest breakthroughs in artificial intelligence and machine learning</p>
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Read More
              </button>
            </div>

            {/* Innovation Updates */}
            <div className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-lg p-6 hover:border-accent/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4">Innovation Hub</h3>
              <p className="text-muted-foreground mb-4">Explore cutting-edge innovations and breakthrough technologies</p>
              <button className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Explore
              </button>
            </div>

            {/* Research Highlights */}
            <div className="bg-card/50 backdrop-blur-sm border border-secondary/20 rounded-lg p-6 hover:border-secondary/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4">Research Highlights</h3>
              <p className="text-muted-foreground mb-4">Stay updated with the latest research papers and academic breakthroughs</p>
              <button className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                View Papers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 px-4 pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              Resources
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access curated learning materials, tools, and development resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Learning Materials */}
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4">Learning Hub</h3>
              <p className="text-muted-foreground mb-4">Access comprehensive tutorials, courses, and learning materials</p>
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Start Learning
              </button>
            </div>

            {/* Development Tools */}
            <div className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-lg p-6 hover:border-accent/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4">Dev Tools</h3>
              <p className="text-muted-foreground mb-4">Explore essential development tools and software resources</p>
              <button className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Browse Tools
              </button>
            </div>

            {/* Open Source */}
            <div className="bg-card/50 backdrop-blur-sm border border-secondary/20 rounded-lg p-6 hover:border-secondary/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4">Open Source</h3>
              <p className="text-muted-foreground mb-4">Discover and contribute to amazing open source projects</p>
              <button className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Explore Projects
              </button>
            </div>
          </div>
        </div>
      </section>

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* General Contact */}
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4">General Inquiries</h3>
              <p className="text-muted-foreground mb-4">Contact us for general questions about SNTC and our activities</p>
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </div>

            {/* Technical Support */}
            <div className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-lg p-6 hover:border-accent/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4">Technical Support</h3>
              <p className="text-muted-foreground mb-4">Get help with technical issues and platform support</p>
              <button className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Get Support
              </button>
            </div>

            {/* Collaboration */}
            <div className="bg-card/50 backdrop-blur-sm border border-secondary/20 rounded-lg p-6 hover:border-secondary/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4">Collaborations</h3>
              <p className="text-muted-foreground mb-4">Partner with us for events, projects, and initiatives</p>
              <button className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Hub Section */}
      <section className="py-20 px-4 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              Digital Hub
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access cutting-edge tools and resources for the tech community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Assistant */}
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4">AI Assistant</h3>
              <p className="text-muted-foreground mb-4">Get instant help with coding, projects, and technical queries</p>
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Launch AI Chat
              </button>
            </div>

            {/* Video Meetings */}
            <div className="bg-card/50 backdrop-blur-sm border border-secondary/20 rounded-lg p-6 hover:border-secondary/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4">Video Meetings</h3>
              <p className="text-muted-foreground mb-4">Host and join club meetings, workshops, and collaborations</p>
              <button className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Start Meeting
              </button>
            </div>

            {/* Tech News */}
            <div className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-lg p-6 hover:border-accent/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4">Tech Headlines</h3>
              <p className="text-muted-foreground mb-4">Stay updated with latest technology news and trends</p>
              <button className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                View News Feed
              </button>
            </div>

            {/* Email System */}
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4">Email Hub</h3>
              <p className="text-muted-foreground mb-4">Send announcements and communicate with club members</p>
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Open Email
              </button>
            </div>

            {/* Open Source Resources */}
            <div className="bg-card/50 backdrop-blur-sm border border-secondary/20 rounded-lg p-6 hover:border-secondary/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4">Open Source</h3>
              <p className="text-muted-foreground mb-4">Explore curated repositories and contribute to projects</p>
              <button className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Browse Resources
              </button>
            </div>

            {/* Technical Fun */}
            <div className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-lg p-6 hover:border-accent/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4">Tech Games</h3>
              <p className="text-muted-foreground mb-4">Coding challenges, quizzes, and interactive learning</p>
              <button className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Start Playing
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Terminal Component */}
      <Terminal />
    </div>
  );
};

export default Index;
