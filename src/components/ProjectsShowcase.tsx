import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users, Mail, ArrowRight, Rocket, Car, Bot, Satellite, Terminal, Zap, Shield, Globe, Loader2 } from 'lucide-react';

const projectImages = import.meta.glob('@/assets/project_images/*', { eager: true, import: 'default' });

interface Project {
  _id: string;
  title: string;
  description: string;
  teamLead: string;
  teamCoLead?: string;
  members: string[];
  email: string;
  image: string; // filename coming from backend
  icon: string;
  category: string;
}

// Icon mapping
const iconMap: Record<string, JSX.Element> = {
  rocket: <Rocket className="w-6 h-6" />,
  car: <Car className="w-6 h-6" />,
  bot: <Bot className="w-6 h-6" />,
  satellite: <Satellite className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  globe: <Globe className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />
};

// Resolve static image imports
const getImage = (fileName: string) => {
  const match = Object.entries(projectImages).find(([path]) => path.endsWith(fileName));
  return match ? match[1] : '/api/placeholder/400/300';
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectsShowcase = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/projects`);
        const data: Project[] = await response.json();

        const projectsWithAssets = data.map(p => ({
          ...p,
          image: getImage(p.image),
          icon: iconMap[p.icon] || <Rocket className="w-6 h-6" />
        }));

        setProjects(projectsWithAssets);
        setTimeout(() => setIsVisible(true), 400);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="relative py-20 px-4 pb-32 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-900 min-h-screen">
      
      {/* Title */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">
            Mission Control
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge projects pushing the boundaries of <span className="text-cyan-400">technology</span> and <span className="text-purple-400">innovation</span>
          </p>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project._id}
                className={`transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${(index * 0.15) + 0.5}s` }}
              >
                <Card className="relative overflow-hidden bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400/60 hover:scale-105 transition-all duration-500 cursor-pointer h-full rounded-2xl">
                  
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    
                    {/* Icon */}
                    <div className="absolute top-4 left-4 bg-cyan-500/20 border border-cyan-400/40 rounded-lg p-2">
                      {project.icon}
                    </div>
                    
                    {/* Category */}
                    <div className="absolute top-4 right-4 bg-slate-800/80 border border-purple-400/40 rounded-lg px-3 py-1">
                      <span className="text-xs font-mono text-purple-400 tracking-wider">{project.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Team */}
                    <div className="flex justify-between items-center mb-4 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        <span className="font-mono">{project.members.length + (project.teamCoLead ? 2 : 1)} MEMBERS</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-2 border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/20"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Terminal className="w-3 h-3 mr-2" /> ACCESS <ArrowRight className="w-3 h-3 ml-2" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="border-2 border-purple-500/40 text-purple-400 hover:bg-purple-500/20"
                        onClick={() => window.open(`mailto:${project.email}`, '_blank')}
                      >
                        <Mail className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900/95 border-2 border-cyan-500/50 rounded-2xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-mono">
                  {selectedProject.title}
                </DialogTitle>
                <div className="text-sm text-slate-500 font-mono mt-2">
                  CLASSIFICATION: {selectedProject.category} | STATUS: ACTIVE
                </div>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative h-64 rounded-xl overflow-hidden border border-cyan-500/30">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
                <p className="text-slate-300 leading-relaxed">{selectedProject.description}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsShowcase;
