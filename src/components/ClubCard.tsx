import { Card } from '@/components/ui/card';
import { ExternalLink, Users, Calendar } from 'lucide-react';

interface ClubCardProps {
  name: string;
  description: string;
  image?: string;      // ✅ prefer actual image
  icon?: string;       // optional string icon path as fallback
  theme?: 'robot' | 'hacker' | 'space' | 'energy' | 'bio' | 'automotive' | 'civil' | 'programming' | string;
  website?: string;
  memberCount?: number;
  events?: number;
}

const themeFrame: Record<string, string> = {
  robot: 'border-cyan-400/40 hover:border-cyan-300/80',
  hacker: 'border-purple-400/40 hover:border-purple-300/80',
  space: 'border-blue-400/40 hover:border-blue-300/80',
  energy: 'border-teal-400/40 hover:border-teal-300/80',
  bio: 'border-emerald-400/40 hover:border-emerald-300/80',
  automotive: 'border-amber-400/40 hover:border-amber-300/80',
  civil: 'border-slate-400/40 hover:border-slate-300/80',
  programming: 'border-cyan-400/40 hover:border-cyan-300/80'
};

const ClubCard = ({
  name,
  description,
  image,
  icon,
  theme = 'programming',
  website,
  memberCount,
  events
}: ClubCardProps) => {
  const frame = themeFrame[theme] || themeFrame['programming'];
  const mediaSrc = image || icon;

  return (
    <Card
      className={`
        group relative overflow-hidden rounded-2xl
        bg-slate-900/60 backdrop-blur-md border-2 ${frame} neon-frame
        transition-all duration-500 hover:scale-[1.03] cursor-pointer scanlines
      `}
    >
      {/* conic rim shimmer */}
      <div className="absolute -inset-[1px] rounded-2xl rim-conic opacity-10 pointer-events-none animate-spin-slow" />

      <div className="p-6 relative z-10">
        {/* Hologram media */}
        {mediaSrc && (
          <div className="mb-4 relative w-16 h-16 rounded-xl mx-auto border border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_22px_rgba(56,189,248,.45)]">
            <img src={mediaSrc} alt={`${name} icon`} className="w-full h-full object-cover rounded-xl" />
            <div className="absolute inset-0 rounded-xl pointer-events-none animate-float" />
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-100 mb-2 text-center">
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {name}
          </span>
        </h3>

        {/* Description */}
        <p className="text-slate-300/90 text-sm leading-relaxed mb-4 line-clamp-3 text-center">
          {description}
        </p>

        {/* Stats */}
        {(memberCount || events) && (
          <div className="flex justify-center gap-6 mb-4 text-xs text-slate-400">
            {typeof memberCount === 'number' && (
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{memberCount}+</span>
              </div>
            )}
            {typeof events === 'number' && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{events} events</span>
              </div>
            )}
          </div>
        )}

        {/* Website */}
        {website && (
          <div className="flex justify-center">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
              onClick={(e)=>e.stopPropagation()}
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Hover beam */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
    </Card>
  );
};

export default ClubCard;
