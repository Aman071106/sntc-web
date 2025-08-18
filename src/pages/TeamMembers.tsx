import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Crown, Mail, Linkedin, Instagram, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  email?: string;
  linkedin?: string;
  instagram?: string;
  image?: string;
}

const TeamMembers = () => {
  const technical_secretary: TeamMember = {
    _id: '1',
    name: 'Technical Secretary',
    position: 'Technical Secretary',
    email: "technical_secretary@students.iitmandi.ac.in",
    linkedin: "https://www.linkedin.com/in/aryan0singh/",
    instagram: "https://www.instagram.com/skd.arya18/",
    image: 'https://via.placeholder.com/150'
  };

  const core_members: TeamMember[] = [
    { _id: '2', name: 'Aman Gupta', position: 'Core Member', image: 'https://via.placeholder.com/150' },
    { _id: '3', name: 'Chinmay Gupta', position: 'Core Member', image: 'https://via.placeholder.com/150' },
    { _id: '4', name: 'Saksham Setia', position: 'Core Member', image: 'https://via.placeholder.com/150' },
    { _id: '5', name: 'Dishant Jha', position: 'Core Member', image: 'https://via.placeholder.com/150' },
    { _id: '6', name: 'Vidhi Chandak', position: 'Core Member', image: 'https://via.placeholder.com/150' },
    { _id: '7', name: 'Krupal Butala', position: 'Core Member', image: 'https://via.placeholder.com/150' },
    { _id: '8', name: 'Osheen Mahajan', position: 'Core Member', image: 'https://via.placeholder.com/150' },
    { _id: '9', name: 'Mihir Singh', position: 'Core Member', image: 'https://via.placeholder.com/150' },
    { _id: '10', name: 'Krishna Gupta', position: 'Core Member', image: 'https://via.placeholder.com/150' },
    { _id: '11', name: 'Ansuman Panda', position: 'Core Member', image: 'https://via.placeholder.com/150' },
    { _id: '12', name: 'Vallamreddy Sree Pranathi', position: 'Core Member', image: 'https://via.placeholder.com/150' },
    { _id: '13', name: 'Harshit Anand', position: 'Core Member', image: 'https://via.placeholder.com/150' },
    { _id: '14', name: 'Paridhi Mittal', position: 'Core Member', image: 'https://via.placeholder.com/150' },
    { _id: '15', name: 'Khushbu Sharma', position: 'Core Member', image: 'https://via.placeholder.com/150' },
    { _id: '16', name: 'Shubham Khandelwal', position: 'Core Member', image: 'https://via.placeholder.com/150' }
  ];

  // State to track image load errors
  const [techImageError, setTechImageError] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<{[key: string]: boolean}>({});

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/40 to-purple-900/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Link to="/">
              <Button variant="outline" className="mb-4 bg-slate-900/50 backdrop-blur-sm border-cyan-500/30">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Core Team
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              Meet the dedicated team behind SnTC's success
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Technical Secretary */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Crown className="w-8 h-8 text-cyan-400" />
              Technical Secretary
            </h2>
            <p className="text-slate-400">Leading the technical initiatives</p>
          </div>

          <div className="flex justify-center">
            <Card className="w-80 p-6 bg-slate-800/50 backdrop-blur-sm border-2 border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105">
              <div className="text-center">
                <div className="w-40 h-40 bg-slate-700/30 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {!techImageError && technical_secretary.image ? (
                    <img
                      src={technical_secretary.image}
                      onError={() => setTechImageError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-slate-400" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{technical_secretary.name}</h3>
                <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-400/30">
                  {technical_secretary.position}
                </Badge>
                <p className="text-sm text-slate-300 mb-4">{technical_secretary.email}</p>
                <div className="flex justify-center gap-3">
                  {technical_secretary.linkedin && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(technical_secretary.linkedin, '_blank')}
                      className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  )}
                  {technical_secretary.instagram && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(technical_secretary.instagram, '_blank')}
                      className="border-purple-400/30 text-purple-400 hover:bg-purple-400 hover:text-slate-900"
                    >
                      <Instagram className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Core Members */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Users className="w-8 h-8 text-purple-400" />
              Core Members
            </h2>
            <p className="text-slate-400">Dedicated team members driving innovation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {core_members.map((member) => (
              <Card
                key={member._id}
                className="p-6 bg-slate-800/50 backdrop-blur-sm border-2 border-purple-500/20 hover:border-purple-400/50 transition-all duration-500 hover:scale-105"
              >
                <div className="text-center">
                  <div className="w-40 h-40 bg-purple-800/30 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    {!imageErrorMap[member._id] && member.image ? (
                      <img
                        src={member.image}
                        onError={() => setImageErrorMap(prev => ({ ...prev, [member._id]: true }))}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-purple-400" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold mb-2">{member.name}</h3>
                  <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-400/30">
                    {member.position}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-slate-700">
          <p className="text-sm text-slate-400">
            Copyright © 2025 All Rights Reserved by SnTC, IIT Mandi
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Developed by Aman Gupta
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
