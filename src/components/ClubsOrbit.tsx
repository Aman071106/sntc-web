import ClubCard from './ClubCard';
import clubsDataJson from '@/assets/clubs_data.json';
import cellsDataJson from '@/assets/cells_data.json';

// Dynamically import all images from assets
const imageModules = import.meta.glob('@/assets/club_cells_images/*', { eager: true, import: 'default' });

const getImage = (img: string) => {
  const entry = Object.entries(imageModules).find(([key]) => key.endsWith(`/${img}`));
  return entry ? entry[1] : '';
};

const ClubsOrbit = () => {
  const clubs = (clubsDataJson as any[]).map(club => ({
    ...club,
    image: getImage(club.image),   // ✅ Fix: set actual image path
  }));

  const cells = (cellsDataJson as any[]).map(cell => ({
    ...cell,
    image: getImage(cell.image),   // ✅ Fix: set actual image path
  }));

  const allItems = [...clubs, ...cells]; // ✅ Merge both

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Tech Clusters
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Eight specialized clubs orbiting around innovation, each contributing to the technological ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allItems.map((club, index) => (
            <div 
              key={club.id}
              className="transform transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ClubCard {...club} image={club.image} /> {/* ✅ Pass correct image */}
            </div>
          ))}
        </div>

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
