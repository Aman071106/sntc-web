import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink, Users, DollarSign, Mail, ArrowRight, Rocket, Car, Bot, Satellite } from 'lucide-react';

// Import project images
import marsRoverImg from '@/assets/project_images/Mars_rover.png';
import saeEfficycleImg from '@/assets/project_images/Sae-efficycle.jpeg';
import wallClimberImg from '@/assets/project_images/Wall_climber.jpg';
import saeBharatImg from '@/assets/project_images/SAE_bharat.jpg';
import cansatImg from '@/assets/project_images/Cansat.jpeg';

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
  icon: React.ReactNode;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Team Deimos - Mars Rover Project",
    description: "Designing and building mars rover capable of traversing uneven terrain and performing variety of manipulations, for participating in University Rover Challenge (URC)",
    teamLead: "Bhuvan Narula",
    members: ["Sumit Kumar Sahu", "Aritra Boral", "Harshvardhan Singh"],
    budget: "INR 2,01,000",
    email: "robotronics@iitmandi.ac.in",
    image: marsRoverImg,
    icon: <Rocket className="w-6 h-6" />,
    category: "Space Robotics"
  },
  {
    id: 2,
    title: "SAE Efficycle '24",
    description: "Efficycle is a versatile vehicle powered by both manual pedaling and battery-based electric power. Users can pedal manually without battery backup and even charge the vehicle while pedaling, making Efficycle environmentally friendly and less labor-intensive than traditional bicycles. Its unique tadpole configuration, featuring two front wheels and one rear wheel, provides enhanced stability on mountainous terrains compared to the conventional delta configuration.",
    teamLead: "Keshav Verma",
    members: ["Hemank Soni", "Satwik Jaiswal", "Bhavya Somani", "Pranjal Vats", "Vaibhav Jain", "Khushal Sharma", "Ishan Sinha", "Sarthak Goel", "Sumit Sahu", "Sushil Kumar", "Ashmit Ojha", "Mohammed Sufiyan"],
    budget: "INR 2,47,000",
    email: "sae@iitmandi.ac.in",
    image: saeEfficycleImg,
    icon: <Car className="w-6 h-6" />,
    category: "Automotive"
  },
  {
    id: 3,
    title: "Wall Climber Robot",
    description: "Wall Climber Robot is a robotic system designed to navigate vertical surfaces and ceilings using vacuum technology and suction cups to adhere securely to various surfaces. They are primarily used for inspection and maintenance in industrial facilities and infrastructure, such as tanks, bridges, and high-rise buildings. In construction, they assist with facade inspection, painting, and cleaning. Additionally, they serve surveillance and security purposes for military, law enforcement, and search and rescue operations. These robots enhance safety and efficiency, providing access to areas that are difficult or hazardous for human workers, driven by advancements in robotics and suction technology.",
    teamLead: "Vaibhav Kesharwani",
    teamCoLead: "Aritra Boral",
    members: ["Sumit Kumar Sahu", "Suraj Raj", "Rishabh Shrival", "Aditya Sharma", "Anmol Kumar", "Gyan Ratan", "Manjeet Rai", "Tarun Singh", "Avirup Ghosh", "Molik Tyagi"],
    budget: "INR 35,000",
    email: "sntc@iitmandi.ac.in",
    image: wallClimberImg,
    icon: <Bot className="w-6 h-6" />,
    category: "Robotics"
  },
  {
    id: 4,
    title: "Formula Bharat",
    description: "Our project aims to design, fabricate, and compete with a Formula E race car at Formula Bharat 2026. Raptor Racing, a team of 27 dedicated IIT Mandi engineering students, guided by Dr. Sarthak Nag and experienced mentors, focuses on innovative design, hands-on learning, and interdisciplinary collaboration across mechanical, electrical, and documentation tasks. The competition allows us to apply theoretical knowledge to real-world challenges, enhancing our skills in CAD, CAM, FEA, CFD, and more. Our vehicle will feature advanced technologies in battery management, regenerative braking, and thermal management, reflecting our commitment to sustainability and efficiency.",
    teamLead: "Vaibhav Jain",
    teamCoLead: "Sarthak Goel",
    members: ["Bhavya Somani", "Pranjal Vats", "Khushal Sharma", "Shivam Anand", "Vani", "Tanishi Gupta", "Arendra", "Vishal Kumar", "Aaryan Tyagi", "Aditya", "Badal Gupta", "Harnoor Singh", "Harsh Verma", "Pujan Purohit", "Hrishikesh Kulkarni", "Samdeep", "Vasudev", "Shashwat Saha", "Bhavya", "Shanti Devi", "Rijvana bano", "Akash Goel", "Veedhee Channey", "Sathvika", "Aarushi"],
    budget: "INR 7,97,990",
    email: "sae@iitmandi.ac.in",
    image: saeBharatImg,
    icon: <Car className="w-6 h-6" />,
    category: "Formula Racing"
  },
  {
    id: 5,
    title: "IN-SPACE CANSAT",
    description: "Our team is participating in the IN-SPACe CANSAT India Student Competition, organized by the Astronautical Society of India and ISRO. We will design, develop, and launch a CAN-sized satellite weighing 1 kg to an altitude of 1000 meters. This project involves: Design and Component Selection: Preliminary and final designs, component research, and budget planning. Subsystem Development: Building and integrating various subsystems. Testing: Comprehensive testing and flight readiness review. Launch: Execute the launch and conduct post-flight review.",
    teamLead: "Saransh Duharia",
    members: ["Satyam Patil", "Bhumesh Gaur", "Vishal Kumar", "Nakul Gupta", "Deepansha Deora", "Sania Jain", "Meghana Sannapareddy"],
    budget: "INR 70,000",
    email: "stac@iitmandi.ac.in",
    image: cansatImg,
    icon: <Satellite className="w-6 h-6" />,
    category: "Space Technology"
  }
];

const ProjectsShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-20 px-4 relative overflow-hidden" data-section="projects">
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
            Mission Control
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cutting-edge projects pushing the boundaries of technology and innovation
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="transform transition-all duration-500"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 cursor-pointer h-full">
                {/* Project image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg p-2">
                    {project.icon}
                  </div>
                  <div className="absolute top-4 right-4 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-lg px-2 py-1">
                    <span className="text-xs font-mono text-accent">{project.category}</span>
                  </div>
                </div>

                {/* Project content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Project stats */}
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

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => setSelectedProject(project)}
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground"
                      onClick={() => window.open(`mailto:${project.email}`, '_blank')}
                    >
                      <Mail className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Hover effect beam */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Card>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-16">
          <Button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105">
            Explore All Missions
          </Button>
        </div>
      </div>

      {/* Project Details Modal */}
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
                {/* Project image */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg p-3">
                    {selectedProject.icon}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-lg px-3 py-2">
                    <span className="text-sm font-mono text-accent">{selectedProject.category}</span>
                  </div>
                </div>

                {/* Project description */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Mission Overview</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Team information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Command Structure</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-mono text-sm">TEAM_LEAD:</span>
                        <span className="text-foreground">{selectedProject.teamLead}</span>
                      </div>
                      {selectedProject.teamCoLead && (
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-mono text-sm">CO_LEAD:</span>
                          <span className="text-foreground">{selectedProject.teamCoLead}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Mission Stats</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-foreground">{selectedProject.members.length + 1} Team Members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <span className="text-foreground">{selectedProject.budget}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team members */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">Crew Members</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedProject.members.map((member, index) => (
                      <div key={index} className="bg-muted/30 rounded-lg px-3 py-2 text-sm">
                        {member}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="flex gap-4 pt-4 border-t border-border">
                  <Button 
                    className="flex-1 bg-primary text-primary-foreground hover:opacity-90"
                    onClick={() => window.open(`mailto:${selectedProject.email}`, '_blank')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Team
                  </Button>
                  <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsShowcase; 