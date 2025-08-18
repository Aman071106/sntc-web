import { useState, useEffect } from 'react';
import ClubCard from './ClubCard';

interface ClubCell {
  _id: string;
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

const imageModules = import.meta.glob('@/assets/club_cells_images/*', { eager: true, import: 'default' });
const getImage = (img: string) => {
  const entry = Object.entries(imageModules).find(([key]) => key.endsWith(`/${img}`));
  return entry ? (entry[1] as string) : '';
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ClubsOrbit = () => {
  const [allItems, setAllItems] = useState<ClubCell[]>([]);
  const [particles, setParticles] = useState<{id:number;x:number;y:number;size:number;opacity:number;speed:number}[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clubsResponse, cellsResponse] = await Promise.all([
          fetch(`${BASE_URL}/api/clubs`),
          fetch(`${BASE_URL}/api/cells`),
        ]);
        const clubs = await clubsResponse.json() as ClubCell[];
        const cells = await cellsResponse.json() as ClubCell[];
        setAllItems([
          ...clubs.map(c => ({...c, type:'club' as const})),
          ...cells.map(c => ({...c, type:'cell' as const}))
        ]);
      } catch (error) { console.error('Error fetching data:', error); }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setParticles(Array.from({length:18},(_,i)=>({
      id:i, x:Math.random()*100, y:Math.random()*100,
      size:2+Math.random()*3, opacity:.25+.45*Math.random(), speed:2+Math.random()*2
    })));
  }, []);

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      {/* background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, #8b5cf6 1px, transparent 1px),
              linear-gradient(90deg, transparent 24px, rgba(59,130,246,0.03) 25px, rgba(59,130,246,0.03) 26px, transparent 27px),
              linear-gradient(transparent 24px, rgba(139,92,246,0.03) 25px, rgba(139,92,246,0.03) 26px, transparent 27px)
            `,
            backgroundSize: '50px 50px, 30px 30px, 25px 25px, 25px 25px'
          }}
        />
      </div>

      {/* decorative rotating rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative w-[720px] h-[720px] hidden xl:block">
          <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-spin-slow" />
          <div className="absolute inset-12 rounded-full border border-purple-400/25 animate-reverse-spin" />
          <div className="absolute inset-24 rounded-full border border-blue-400/20 animate-spin-slow" />
          <div className="absolute inset-0 rounded-full rim-conic opacity-20 animate-spin-slow" />
        </div>
      </div>

      {/* scanlines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(2)].map((_,i)=>(
          <div key={i} className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" style={{top:`${30 + i*30}%`}}>
            <div className="w-full h-full animate-scan" />
          </div>
        ))}
      </div>

      {/* floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p=>(
          <div key={p.id}
               className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-float"
               style={{left:`${p.x}%`, top:`${p.y}%`, width:`${p.size}px`, height:`${p.size}px`, opacity:p.opacity, animationDuration:`${p.speed+2}s`, filter:'blur(.5px)'}}/>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">
              Tech Clusters
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Eight specialized clubs orbiting around innovation, each contributing to the technological ecosystem
          </p>
        </div>

        {/* grid remains (fast + accessible) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allItems.map((club, index) => (
            <div key={club._id} className="transform transition-all duration-500 animate-fade-in" style={{animationDelay:`${index * 40}ms` as any}}>
              <ClubCard
                name={club.name}
                description={club.description}
                image={getImage(club.image)}
                website={club.website}
                memberCount={club.memberCount}
                events={club.events}
                theme={(club.category?.toLowerCase() as any) || 'programming'}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 rounded-xl font-semibold hover:bg-cyan-500/30 hover:shadow-cyan-500/20 hover:shadow-2xl transition-all duration-300">
            Explore All Activities
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClubsOrbit;
