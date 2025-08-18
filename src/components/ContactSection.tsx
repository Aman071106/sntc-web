import { useState, useEffect } from "react";
import { Users, Linkedin, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Contact {
  id: number;
  name: string;
  role?: string;
  email?: string;
  linkedin?: string;
  instagram?: string;
  category?: string; // For styling, e.g., "primary", "accent"
  link?: string;
}

const contactData: Contact[] = [
  {
    id: 1,
    name: "Aryan Singh",
    role: "Technical Secretary",
    email: "technical_secretary@students.iitmandi.ac.in",
    linkedin: "https://www.linkedin.com/in/aryan0singh/",
    instagram: "https://www.instagram.com/skd.arya18/",
    category: "primary",
  },
  {
    id: 2,
    name: "Meet Our Team",
    role: "Core Team",
    category: "accent",
    link: "/team",
  },
];

const categoryStyles: Record<string, { bg: string; border: string; text: string }> = {
  primary: { bg: "bg-primary", border: "border-primary", text: "text-primary" },
  accent: { bg: "bg-accent", border: "border-accent", text: "text-accent" },
  secondary: { bg: "bg-secondary", border: "border-secondary", text: "text-secondary" },
};

const ContactSection = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.2,
    }));
    setParticles(newParticles);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="contact"
      className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900"
    >
      {/* Particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-float"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: `${p.id * 0.1}s`,
              animationDuration: `${p.speed + 3}s`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* Interactive Light Beam */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59,130,246,0.15) 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isAnimating ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">
            Contact Us
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Reach out to the <span className="text-cyan-400 font-semibold">SNTC</span> team for queries,
            collaborations, or connections.
          </p>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contactData.map((contact) => {
            const style = categoryStyles[contact.category || "primary"];

            return (
              <div
                key={contact.id}
                className={`bg-card/50 backdrop-blur-sm border ${style.border}/20 rounded-lg p-8 hover:${style.border}/50 transition-all duration-300`}
              >
                <div className="text-center mb-6">
                  <div
                    className={`${style.bg}/20 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center`}
                  >
                    <Users className={`w-10 h-10 ${style.text}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{contact.name}</h3>
                  {contact.role && <p className={`${style.text} font-semibold mb-4`}>{contact.role}</p>}
                  {contact.email && (
                    <p className="text-muted-foreground mb-4 flex items-center justify-center">{contact.email}</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-2">
                  {contact.linkedin && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(contact.linkedin, "_blank")}
                      className={`border ${style.border}/30 ${style.text} hover:${style.bg} hover:text-foreground`}
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  )}
                  {contact.instagram && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(contact.instagram, "_blank")}
                      className={`border ${style.border}/30 ${style.text} hover:${style.bg} hover:text-foreground`}
                    >
                      <Instagram className="w-4 h-4 mr-2" />
                      Instagram
                    </Button>
                  )}
                  {contact.email && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(`mailto:${contact.email}`, "_blank")}
                      className={`border ${style.border}/30 ${style.text} hover:${style.bg} hover:text-foreground`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  )}

                  {/* Team link button */}
                  {contact.link && (
                    <Link to={contact.link} className="w-full">
                      <Button
                        className={`w-full ${style.bg} text-foreground hover:opacity-90 transition-opacity mt-2`}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        View All Team Members
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-gradient-shift { 
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
