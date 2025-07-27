import ClubCard from './ClubCard';
import { useState, useEffect } from 'react';

interface ClubCell {
  _id: string; // MongoDB ID
  name: string;
  shortName: string;
  fullName: string;
  description: string;
  image: string;
  website: string;
  email: string;
  category: string;
  icon: string;
  color: string;
  memberCount: number;
  events: number;
  type?: 'club' | 'cell';
}

// Dynamically import all images from assets
const imageModules = import.meta.glob('@/assets/club_cells_images/*', { eager: true, import: 'default' });

const getImage = (img: string) => {
  const entry = Object.entries(imageModules).find(([key]) => key.endsWith(`/${img}`));
  return entry ? entry[1] : '';
};
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ClubsOrbit = () => {
  const [allItems, setAllItems] = useState<ClubCell[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clubsResponse, cellsResponse] = await Promise.all([
          fetch(`${BASE_URL}/api/clubs`),
          fetch(`${BASE_URL}/api/cells`,{
          headers: {
            'Cookie': 'WorkstationJwtPartitioned=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiZmlyZWJhc2Utc250Yy13ZWItMTc1MzU3ODc0OTQ3Mi5jbHVzdGVyLXprbTJqcndibmJkNGF3dWVkYzJhbHF4cnBrLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTc1MzU4MTI2NSwiZXhwIjoxNzUzNjY3NjY1fQ.JjBIvt92prQQwud5hdez7nJCNM-T7xuFPYGukKPuVzfOIVOjqEHHiSh5EZ39s3pkjptUoi4FV-z3qK-Q8XVCb9qc3iPacz43t7h3xCvBAfBoyfP9gexSNbKY41Fga1w7dNTlWoa0bptQ2b9SoZv03ih1iavJDOqd0e7w9bslPihfBgsD96zFhILb-7EEEIWVN63bRrsd0V9i4cMcFLa65JaJ-F5iYAGVtS6lSlTw_vrZ7APu-p4PbRu0q1c2TGLJavjI89iVdhE6IIYcirZ36BtkNvx_xE-xgNPplmBVSD4BHh6DyoFsquTAzePspRZ1qB7z7Su72KAYCRc2f_9Lzw' // full token here
          },
          credentials: 'include'}),
        ]);
        const clubsData: ClubCell[] = await clubsResponse.json();
        const cellsData: ClubCell[] = await cellsResponse.json();
        setAllItems([...clubsData.map(club => ({...club, type: 'club'})), ...cellsData.map(cell => ({...cell, type: 'cell'}))]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
              key={club._id} // Use MongoDB _id
              className="transform transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ClubCard {...club} image={getImage(club.image)} /> {/* ✅ Pass correct image */}
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
