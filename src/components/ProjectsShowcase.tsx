import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink, Users, DollarSign, Mail, ArrowRight, Rocket, Car, Bot, Satellite, Terminal } from 'lucide-react';
import projectsData from '@/assets/projects_data.json';
const projectImages = import.meta.glob('@/assets/project_images/*', { eager: true, import: 'default' });

interface Project {
  id: number;
  title: string;
  description: string;
  teamLead: string;
  teamCoLead?: string;
  members: string[];
  budget: string;
  email: string;
  image: string;
  icon: string;
  category: string;
}

// Icon mapping
const iconMap: Record<string, JSX.Element> = {
  rocket: <Rocket className="w-6 h-6" />,
  car: <Car className="w-6 h-6" />,
  bot: <Bot className="w-6 h-6" />,
  satellite: <Satellite className="w-6 h-6" />
};

const getImage = (fileName: string) => {
  const match = Object.entries(projectImages).find(([path]) => path.endsWith(fileName));
  return match ? match[1] : '';
};

const ProjectsShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Load projects with resolved images + icons
  const projects = (projectsData as Project[]).map(p => ({
    ...p,
    image: getImage(p.image),
    icon: iconMap[p.icon] || <Rocket className="w-6 h-6" />
  }));

  return (
    <section id="projects" className="py-20 px-4 pb-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Mission Control
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cutting-edge projects pushing the boundaries of technology and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={project.id} className="transform transition-all duration-500" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 cursor-pointer h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg p-2">
                    {project.icon}
                  </div>
                  <div className="absolute top-4 right-4 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-lg px-2 py-1">
                    <span className="text-xs font-mono text-accent">{project.category}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex justify-between items-center mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{project.members.length + 1}+ members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      <span>{project.budget}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => setSelectedProject(project)}>
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                    <Button variant="ghost" size="sm" className="border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground" onClick={() => window.open(`mailto:${project.email}`, '_blank')}>
                      <Mail className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-2 border-primary/30">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <p className="text-muted-foreground leading-relaxed">{selectedProject.description}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsShowcase;
