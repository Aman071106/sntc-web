import Navigation from '@/components/Navigation';
import PortalHero from '@/components/PortalHero';
import ClubsOrbit from '@/components/ClubsOrbit';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PortalHero />
      <ClubsOrbit />
      
      {/* Additional Features Section */}
      <section className="py-20 px-4">
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
    </div>
  );
};

export default Index;
