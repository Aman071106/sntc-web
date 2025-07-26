import { Card } from '@/components/ui/card';
import { ExternalLink, Users, Calendar } from 'lucide-react';

interface ClubCardProps {
  name: string;
  description: string;
  icon: string;
  theme: 'robot' | 'hacker' | 'space' | 'energy' | 'bio' | 'automotive' | 'civil' | 'programming';
  website?: string;
  memberCount?: number;
  events?: number;
}

const ClubCard = ({ 
  name, 
  description, 
  icon, 
  theme, 
  website, 
  memberCount, 
  events 
}: ClubCardProps) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'robot':
        return 'border-robot-blue hover:shadow-[0_0_30px_hsl(220_100%_60%_/_0.3)] hover:border-robot-blue/50';
      case 'hacker':
        return 'border-terminal-green hover:shadow-[0_0_30px_hsl(120_85%_45%_/_0.3)] hover:border-terminal-green/50';
      case 'space':
        return 'border-neon-purple hover:shadow-[0_0_30px_hsl(270_100%_65%_/_0.3)] hover:border-neon-purple/50';
      case 'energy':
        return 'border-energy-orange hover:shadow-[0_0_30px_hsl(25_100%_55%_/_0.3)] hover:border-energy-orange/50';
      case 'bio':
        return 'border-neon-green hover:shadow-[0_0_30px_hsl(120_100%_50%_/_0.3)] hover:border-neon-green/50';
      case 'automotive':
        return 'border-space-gray hover:shadow-[0_0_30px_hsl(220_10%_30%_/_0.3)] hover:border-space-gray/50';
      case 'civil':
        return 'border-muted hover:shadow-[0_0_30px_hsl(220_15%_20%_/_0.3)] hover:border-muted/50';
      case 'programming':
        return 'border-neon-cyan hover:shadow-[0_0_30px_hsl(180_100%_50%_/_0.3)] hover:border-neon-cyan/50';
      default:
        return 'border-border hover:shadow-portal';
    }
  };

  const getIconGlow = () => {
    switch (theme) {
      case 'robot': return 'drop-shadow-[0_0_10px_hsl(220_100%_60%_/_0.5)]';
      case 'hacker': return 'drop-shadow-[0_0_10px_hsl(120_85%_45%_/_0.5)]';
      case 'space': return 'drop-shadow-[0_0_10px_hsl(270_100%_65%_/_0.5)]';
      case 'energy': return 'drop-shadow-[0_0_10px_hsl(25_100%_55%_/_0.5)]';
      case 'bio': return 'drop-shadow-[0_0_10px_hsl(120_100%_50%_/_0.5)]';
      case 'automotive': return 'drop-shadow-[0_0_10px_hsl(220_10%_30%_/_0.5)]';
      case 'civil': return 'drop-shadow-[0_0_10px_hsl(220_15%_20%_/_0.5)]';
      case 'programming': return 'drop-shadow-[0_0_10px_hsl(180_100%_50%_/_0.5)]';
      default: return '';
    }
  };

  return (
    <Card className={`
      group relative overflow-hidden bg-card/50 backdrop-blur-sm border-2 
      transition-all duration-500 hover:scale-105 cursor-pointer
      animate-float hover:animate-none
      ${getThemeClasses()}
    `}>
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className="absolute top-4 left-4 w-8 h-8 border border-current opacity-30" />
        <div className="absolute top-6 left-6 w-4 h-4 border border-current opacity-20" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border border-current opacity-25" />
      </div>

      <div className="p-6 relative z-10">
        {/* Club icon */}
        <div className="mb-4 relative">
          <img 
            src={icon} 
            alt={`${name} icon`}
            className={`w-16 h-16 object-cover rounded-lg ${getIconGlow()} group-hover:scale-110 transition-transform duration-300`}
          />
        </div>

        {/* Club name */}
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Stats */}
        <div className="flex justify-between items-center mb-4 text-xs text-muted-foreground">
          {memberCount && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{memberCount}+</span>
            </div>
          )}
          {events && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{events} events</span>
            </div>
          )}
        </div>

        {/* Website link */}
        {website && (
          <a 
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-300"
          >
            <span>Visit Website</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Hover effect beam */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </Card>
  );
};

export default ClubCard;