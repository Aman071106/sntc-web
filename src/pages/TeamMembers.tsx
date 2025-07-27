import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Linkedin,
  Instagram,
  Mail,
  ArrowLeft,
  Users,
  Crown
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface TeamMember {
  _id: string; // MongoDB ID
  name: string;
  position: string;
  email?: string;
  linkedin?: string;
  instagram?: string;
  image: string;
}

interface CoreTeamData {
  technical_secretary: TeamMember;
  core_members: TeamMember[];
}

const TeamMembers = () => {
  const [coreTeam, setCoreTeam] = useState<CoreTeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoreTeam = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://3001-firebase-sntc-web-1753578749472.cluster-zkm2jrwbnbd4awuedc2alqxrpk.cloudworkstations.dev/api/coreteams',{
          headers: {
            'Cookie': 'WorkstationJwtPartitioned=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiZmlyZWJhc2Utc250Yy13ZWItMTc1MzU3ODc0OTQ3Mi5jbHVzdGVyLXprbTJqcndibmJkNGF3dWVkYzJhbHF4cnBrLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTc1MzU4MTI2NSwiZXhwIjoxNzUzNjY3NjY1fQ.JjBIvt92prQQwud5hdez7nJCNM-T7xuFPYGukKPuVzfOIVOjqEHHiSh5EZ39s3pkjptUoi4FV-z3qK-Q8XVCb9qc3iPacz43t7h3xCvBAfBoyfP9gexSNbKY41Fga1w7dNTlWoa0bptQ2b9SoZv03ih1iavJDOqd0e7w9bslPihfBgsD96zFhILb-7EEEIWVN63bRrsd0V9i4cMcFLa65JaJ-F5iYAGVtS6lSlTw_vrZ7APu-p4PbRu0q1c2TGLJavjI89iVdhE6IIYcirZ36BtkNvx_xE-xgNPplmBVSD4BHh6DyoFsquTAzePspRZ1qB7z7Su72KAYCRc2f_9Lzw' // full token here
          },
          credentials: 'include'});
        if (!response.ok) {
          throw new Error('Failed to fetch core team data');
        }
        const data: TeamMember[] = await response.json();

        // Assuming the first member in the fetched array is the technical secretary
        // This might need adjustment based on how the data is structured in MongoDB
        const technical_secretary = data.find(member => member.position === 'Technical Secretary') || data[0];
        const core_members = data.filter(member => member.position !== 'Technical Secretary');

        setCoreTeam({ technical_secretary, core_members });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoreTeam();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading team members...</p>
        </div>
      </div>
    );
  }

  if (error || !coreTeam) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Error</h1>
          <p className="text-destructive mb-8">{error || 'Failed to load core team data'}</p>
          <Link to="/">
            <Button className="bg-primary text-primary-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { technical_secretary, core_members } = coreTeam;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Link to="/">
              <Button variant="outline" className="mb-4 bg-background/80 backdrop-blur-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Core Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the dedicated team behind SnTC's success
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Technical Secretary */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Crown className="w-8 h-8 text-primary" />
              Technical Secretary
            </h2>
            <p className="text-muted-foreground">Leading the technical initiatives</p>
          </div>

          <div className="flex justify-center">
            <Card className="w-80 p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105">
              <div className="text-center">
              <div className="w-40 h-40 bg-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src="{technical_secretary.image}"
                  alt={technical_secretary.name}
                  className="w-full h-full object-cover"
                />
              </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{technical_secretary.name}</h3>
                <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                  {technical_secretary.position}
                </Badge>
                <p className="text-sm text-muted-foreground mb-4">{technical_secretary.email}</p>

                <div className="flex justify-center gap-3">
                  {technical_secretary.linkedin && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(technical_secretary.linkedin, '_blank')}
                      className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  )}
                  {technical_secretary.instagram && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(technical_secretary.instagram, '_blank')}
                      className="border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      <Instagram className="w-4 h-4" />
                    </Button>
                  )}
                  {technical_secretary.email && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`mailto:${technical_secretary.email}`, '_blank')}
                      className="border-secondary/400 text-secondary/1000 hover:bg-secondary hover:text-secondary-foreground"
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
          
        

        {/* Core Members */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Users className="w-8 h-8 text-accent" />
              Core Members
            </h2>
            <p className="text-muted-foreground">Dedicated team members driving innovation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {core_members.map((member) => (
              <Card
                key={member._id} // Use MongoDB _id
                className="p-6 bg-card/50 backdrop-blur-sm border-2 border-accent/20 hover:border-accent/50 transition-all duration-500 hover:scale-105"
              >
                <div className="text-center">
                <div className="w-40 h-40 bg-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={member.image} // Assuming image path is in the data
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>


                  <h3 className="text-lg font-bold text-foreground mb-2">{member.name}</h3>
                  <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
                    {member.position}
                  </Badge>

                  <div className="flex justify-center gap-2">
                    {member.linkedin && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(member.linkedin, '_blank')}
                        className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Linkedin className="w-3 h-3" />
                      </Button>
                    )}
                    {member.instagram && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(member.instagram, '_blank')}
                        className="border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground"
                      >
                        <Instagram className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Copyright © 2025 All Rights Reserved by SnTC, IIT Mandi
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default TeamMembers;
