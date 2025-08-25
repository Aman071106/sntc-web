import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ExternalLink, Users, Calendar, Mail, Monitor } from 'lucide-react';

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

const clubCellImages = import.meta.glob('@/assets/club_cells_images/*', { eager: true, import: 'default' });
const getImage = (fileName: string) => {
  const match = Object.entries(clubCellImages).find(([path]) => path.endsWith(fileName));
  return match ? (match[1] as string) : '';
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ClubsCellsConsole = () => {
  const [allData, setAllData] = useState<ClubCell[]>([]);
  const [selectedItem, setSelectedItem] = useState<ClubCell | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [particles, setParticles] = useState<{id:number;x:number;y:number;size:number;opacity:number;speed:number}[]>([]);
  const [mousePos, setMousePos] = useState({x:50,y:50});
  const [loading, setLoading] = useState(true); // ✅ new
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const [clubsRes, cellsRes] = await Promise.all([
          fetch(`${BASE_URL}/api/clubs`),
          fetch(`${BASE_URL}/api/cells`),
        ]);
        const clubs = await clubsRes.json() as ClubCell[];
        const cells = await cellsRes.json() as ClubCell[];
        setAllData([
          ...clubs.map(c => ({...c, type:'club' as const})),
          ...cells.map(c => ({...c, type:'cell' as const}))
        ]);
      } catch(e){ 
        console.error(e); 
      } finally {
        setLoading(false); // ✅ stop loader
      }
    };
    init();
  }, []);

  useEffect(() => {
    // floating particles like hero
    setParticles(Array.from({length:24},(_,i)=>({
      id:i, x:Math.random()*100, y:Math.random()*100,
      size:2+Math.random()*3, opacity:.2+.5*Math.random(), speed:2+Math.random()*2
    })));
    const onMove = (e:MouseEvent) => {
      setMousePos({ x:(e.clientX/window.innerWidth)*100, y:(e.clientY/window.innerHeight)*100 });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    if(!isAutoRotating) return;
    const tick = () => {
      setRotationAngle(prev => (prev + 0.4) % 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if(rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isAutoRotating]);

  const radius = 220;

  return (
    <section id="clubs-cells" className="relative min-h-screen py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      {/* Dynamic grid background */}
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
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59,130,246,0.18) 0%, transparent 45%)`
        }}
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="text-blue-400">Network Nodes</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">Explore the interconnected ecosystem of technical clubs and specialized cells</p>
        </div>

        {/* Console */}
        <div className="relative flex justify-center items-center h-[480px] mb-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-400"></div>
              <p className="text-slate-400 mt-4 font-mono">Loading network data...</p>
            </div>
          ) : (
            <>
              {/* central portal */}
              <div className="relative w-36 h-36 rounded-full border-4 border-cyan-400/50 shadow-2xl shadow-cyan-500/30 bg-slate-900/60 backdrop-blur-md neon-frame">
                <div className="absolute inset-[-18px] rounded-full border border-purple-400/30 animate-spin-slow" />
                <div className="absolute inset-[-36px] rounded-full border border-blue-400/20 animate-reverse-spin" />
                <div className="absolute inset-0 rounded-full rim-conic opacity-20 animate-spin-slow" />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div>
                    <Monitor className="w-8 h-8 text-cyan-300 mx-auto mb-2" />
                    <div className="text-xs font-mono text-cyan-300">SNTC</div>
                    <div className="text-xs font-mono text-slate-400">HUB</div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg shadow-white/50 animate-blink" />
              </div>

              {/* orbiting items */}
              <div
                className="absolute inset-0"
                onMouseEnter={()=>setIsAutoRotating(false)}
                onMouseLeave={()=>setIsAutoRotating(true)}
              >
                {allData.map((item, index) => {
                  const angle = (index * (360 / Math.max(1, allData.length)) + rotationAngle) * (Math.PI/180);
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const z = Math.sin(angle*2) * 50;
                  const scale = 1 + Math.sin(angle)*0.08;

                  return (
                    <div
                      key={item._id}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                      style={{ transform:`translate(${x}px, ${y}px) translateZ(${z}px) scale(${scale})`, zIndex: Math.round(z+100) }}
                    >
                      <Card
                        onClick={()=>setSelectedItem(item)}
                        className="w-24 h-24 cursor-pointer bg-slate-900/60 backdrop-blur-sm border-2 border-cyan-400/30 hover:border-cyan-300/80 hover:shadow-cyan-500/30 hover:shadow-2xl rounded-xl neon-frame scanlines transition-all duration-300"
                      >
                        <div className="p-3 text-center">
                          <div className="w-9 h-9 mx-auto mb-1 rounded overflow-hidden">
                            <img src={getImage(item.image)} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="text-[11px] font-mono text-slate-100 truncate">{item.shortName}</div>
                          <div className="text-[10px] font-mono text-slate-400">{item.type?.toUpperCase()}</div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-900/60 backdrop-blur-sm border border-slate-700 rounded-lg p-4 text-center">
                <div className="h-6 w-12 bg-slate-700 animate-pulse mx-auto mb-2 rounded"></div>
                <div className="h-4 w-16 bg-slate-700 animate-pulse mx-auto rounded"></div>
              </div>
            ))
          ) : (
            <>
              <div className="bg-slate-900/60 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-300">{allData.filter(i=>i.type==='club').length}</div>
                <div className="text-sm text-slate-400">Clubs</div>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-sm border border-purple-400/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-300">{allData.filter(i=>i.type==='cell').length}</div>
                <div className="text-sm text-slate-400">Cells</div>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-sm border border-blue-400/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-300">{allData.reduce((s,i)=>s+i.memberCount,0)}+</div>
                <div className="text-sm text-slate-400">Members</div>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-300">{allData.reduce((s,i)=>s+i.events,0)}+</div>
                <div className="text-sm text-slate-400">Events</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p=>(
          <div key={p.id}
               className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-float"
               style={{left:`${p.x}%`, top:`${p.y}%`, width:`${p.size}px`, height:`${p.size}px`, opacity:p.opacity, animationDuration:`${p.speed+2}s`, filter:'blur(.5px)'}}/>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={!!selectedItem} onOpenChange={()=>setSelectedItem(null)}>
        <DialogContent className="w-[98vw] max-w-5xl bg-slate-950/80 backdrop-blur-xl border-2 border-cyan-500/30 p-0 h-auto max-h-[92vh] mt-2 scanlines">
          {selectedItem && (
            <div className="p-4 sm:p-6 overflow-y-auto">
              <div className="bg-slate-900/50 border-b border-cyan-500/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-cyan-400/30">
                      <img src={getImage(selectedItem.image)} alt={selectedItem.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-100">{selectedItem.fullName}</h2>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                        <span className="font-mono">{selectedItem.category}</span>
                        <span className="font-mono">•</span>
                        <span className="font-mono">{selectedItem.type?.toUpperCase()}</span>
                        <span className="font-mono">•</span>
                        <span className="font-mono">{selectedItem.memberCount}+ members</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-8">
                <div>
                  <h3 className="text-sm font-mono text-slate-400 mb-3">// MISSION OVERVIEW</h3>
                  <div className="bg-slate-900/60 p-6 rounded-lg border-l-4 border-cyan-400">
                    <p className="text-slate-200 leading-relaxed text-lg">{selectedItem.description}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-mono text-slate-400 mb-3">// SYSTEM STATS</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-900/60 p-6 rounded-lg border border-cyan-400/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="w-5 h-5 text-cyan-300" />
                        <span className="text-xs font-mono text-slate-400">ACTIVE MEMBERS</span>
                      </div>
                      <div className="text-3xl font-bold text-cyan-300">{selectedItem.memberCount}+</div>
                    </div>
                    <div className="bg-slate-900/60 p-6 rounded-lg border border-purple-400/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-purple-300" />
                        <span className="text-xs font-mono text-slate-400">EVENTS THIS YEAR</span>
                      </div>
                      <div className="text-3xl font-bold text-purple-300">{selectedItem.events}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 hover:bg-cyan-500/30"
                    onClick={() => window.open(selectedItem.website, '_blank')}
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Visit Website
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-400/40 text-purple-200 hover:bg-purple-500/20"
                    onClick={() => window.open(`mailto:${selectedItem.email}`, '_blank')}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Team
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ClubsCellsConsole;
