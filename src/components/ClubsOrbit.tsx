import ClubCard from './ClubCard';
import robotIcon from '@/assets/robot-icon.jpg';
import hackerTerminal from '@/assets/hacker-terminal.jpg';
import spaceTelescope from '@/assets/space-telescope.jpg';
import marsRover from '@/assets/mars-rover.jpg';

const ClubsOrbit = () => {
  const clubs = [
    {
      name: "Robotronics Club",
      description: "Robotics + Electronics = Robotronics. Building robots and developing practical skills in circuit design and automation.",
      icon: robotIcon,
      theme: 'robot' as const,
      website: "http://robotronics.iitmandi.co.in/",
      memberCount: 150,
      events: 12
    },
    {
      name: "SAIC",
      description: "System Administration and Infosec Cell. Cyber security enthusiasts excelling in CTF competitions and penetration testing.",
      icon: hackerTerminal,
      theme: 'hacker' as const,
      website: "https://saic.iitmandi.co.in/",
      memberCount: 80,
      events: 8
    },
    {
      name: "STAC",
      description: "Space Technology and Astronomy Cell. Exploring the cosmos with telescopes, space projects, and astronomical research.",
      icon: spaceTelescope,
      theme: 'space' as const,
      website: "http://stac.iitmandi.co.in/",
      memberCount: 120,
      events: 15
    },
    {
      name: "SAE",
      description: "Society of Automotive Engineers. Passionate team working with gears, engines, and automotive innovation.",
      icon: marsRover,
      theme: 'automotive' as const,
      website: "https://clubsae.iitmandi.co.in/",
      memberCount: 100,
      events: 10
    },
    {
      name: "Programming Club",
      description: "KamandPrompt - Hub for coding enthusiasts. Programming competitions, workshops, and ACM chapter activities.",
      icon: hackerTerminal,
      theme: 'programming' as const,
      website: "http://pc.iitmandi.co.in/",
      memberCount: 200,
      events: 20
    },
    {
      name: "KBG",
      description: "Kamand Bioengineering Group. Exploring the intersection of biology and engineering with cutting-edge research.",
      icon: spaceTelescope,
      theme: 'bio' as const,
      website: "https://www.instagram.com/kbg_iitmandi/",
      memberCount: 90,
      events: 8
    },
    {
      name: "Yantrik Club",
      description: "Mechanical engineering excellence. Focus on green energy methods and innovative mechanical solutions.",
      icon: marsRover,
      theme: 'energy' as const,
      website: "https://yantrik.iitmandi.co.in/",
      memberCount: 110,
      events: 12
    },
    {
      name: "Nirmaan Club",
      description: "Civil engineering awareness through practical projects, workshops, and infrastructure innovation.",
      icon: robotIcon,
      theme: 'civil' as const,
      website: "https://www.facebook.com/groups/802179339895110/",
      memberCount: 85,
      events: 6
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Tech Clusters
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Eight specialized clubs orbiting around innovation, each contributing to the technological ecosystem
          </p>
        </div>

        {/* Clubs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {clubs.map((club, index) => (
            <div 
              key={club.name}
              className="transform transition-all duration-500"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <ClubCard {...club} />
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105">
            Explore All Activities
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClubsOrbit;