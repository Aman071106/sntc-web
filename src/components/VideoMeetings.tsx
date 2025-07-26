import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Users, 
  Lock, 
  Eye, 
  EyeOff,
  Crown,
  User,
  Settings,
  Calendar,
  Clock
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Meeting {
  id: string;
  name: string;
  host: string;
  password: string;
  participants: number;
  maxParticipants: number;
  isActive: boolean;
  startTime: string;
  endTime?: string;
}

const VideoMeetings = () => {
  const [meetingName, setMeetingName] = useState('');
  const [meetingPassword, setMeetingPassword] = useState('');
  const [joinMeetingId, setJoinMeetingId] = useState('');
  const [joinPassword, setJoinPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [activeMeetings, setActiveMeetings] = useState<Meeting[]>([
    {
      id: 'meeting-001',
      name: 'SnTC Weekly Standup',
      host: 'Aryan Singh',
      password: 'sntc2025',
      participants: 8,
      maxParticipants: 20,
      isActive: true,
      startTime: '2025-01-20T10:00:00Z'
    },
    {
      id: 'meeting-002',
      name: 'Project Review Session',
      host: 'Aryan Singh',
      password: 'review2025',
      participants: 5,
      maxParticipants: 15,
      isActive: true,
      startTime: '2025-01-20T14:00:00Z'
    }
  ]);

  const LIVEKIT_URL = 'wss://sntc-web-1f6p9n7e.livekit.cloud';
  const LIVEKIT_API_KEY = 'APIfxehydGXqvTY';
  const LIVEKIT_API_SECRET = 'EuMOFZcK2iTPvTvCwMCWO6PezcwAW6RZ3DmLBpmFtyd';

  const handleCreateMeeting = () => {
    if (!meetingName || !meetingPassword) {
      alert('Please fill in all fields');
      return;
    }

    const newMeeting: Meeting = {
      id: `meeting-${Date.now()}`,
      name: meetingName,
      host: 'Aryan Singh', // Only tech secretary can host
      password: meetingPassword,
      participants: 1,
      maxParticipants: 50,
      isActive: true,
      startTime: new Date().toISOString()
    };

    setActiveMeetings(prev => [...prev, newMeeting]);
    setMeetingName('');
    setMeetingPassword('');
    setIsHost(false);
  };

  const handleJoinMeeting = () => {
    if (!joinMeetingId || !joinPassword) {
      alert('Please fill in all fields');
      return;
    }

    const meeting = activeMeetings.find(m => m.id === joinMeetingId);
    if (!meeting) {
      alert('Meeting not found');
      return;
    }

    if (meeting.password !== joinPassword) {
      alert('Incorrect password');
      return;
    }

    // Simulate joining meeting
    alert(`Joining meeting: ${meeting.name}`);
    setJoinMeetingId('');
    setJoinPassword('');
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section id="video-meetings" className="py-20 px-4 pb-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Video Meetings
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Host and join secure video meetings with LiveKit integration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Host Meeting */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Host Meeting</h3>
                <p className="text-sm text-muted-foreground">Create a new meeting (Tech Secretary only)</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="meeting-name">Meeting Name</Label>
                <Input
                  id="meeting-name"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                  placeholder="Enter meeting name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="meeting-password">Meeting Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="meeting-password"
                    type={showPassword ? 'text' : 'password'}
                    value={meetingPassword}
                    onChange={(e) => setMeetingPassword(e.target.value)}
                    placeholder="Enter meeting password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                onClick={handleCreateMeeting}
                className="w-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                disabled={!meetingName || !meetingPassword}
              >
                <Video className="w-4 h-4 mr-2" />
                Create Meeting
              </Button>
            </div>
          </Card>

          {/* Join Meeting */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-accent/20 hover:border-accent/50 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Join Meeting</h3>
                <p className="text-sm text-muted-foreground">Join an existing meeting with password</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="join-meeting-id">Meeting ID</Label>
                <Input
                  id="join-meeting-id"
                  value={joinMeetingId}
                  onChange={(e) => setJoinMeetingId(e.target.value)}
                  placeholder="Enter meeting ID"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="join-password">Meeting Password</Label>
                <Input
                  id="join-password"
                  type="password"
                  value={joinPassword}
                  onChange={(e) => setJoinPassword(e.target.value)}
                  placeholder="Enter meeting password"
                  className="mt-1"
                />
              </div>

              <Button 
                onClick={handleJoinMeeting}
                className="w-full bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
                disabled={!joinMeetingId || !joinPassword}
              >
                <Users className="w-4 h-4 mr-2" />
                Join Meeting
              </Button>
            </div>
          </Card>
        </div>

        {/* Active Meetings */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Active Meetings</h3>
            <p className="text-muted-foreground">Currently running meetings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeMeetings.map((meeting) => (
              <Card 
                key={meeting.id}
                className="p-6 bg-card/50 backdrop-blur-sm border-2 border-secondary/20 hover:border-secondary/50 transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{meeting.name}</h4>
                    <p className="text-sm text-muted-foreground">Host: {meeting.host}</p>
                  </div>
                  <Badge className={meeting.isActive ? 'bg-green-500' : 'bg-gray-500'}>
                    {meeting.isActive ? 'Live' : 'Ended'}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(meeting.startTime)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{meeting.participants}/{meeting.maxParticipants} participants</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>Password: {meeting.password}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setJoinMeetingId(meeting.id);
                      setJoinPassword(meeting.password);
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Join
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    onClick={() => alert(`Meeting ID: ${meeting.id}\nPassword: ${meeting.password}`)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Info
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* LiveKit Info */}
        <div className="mt-16 text-center">
          <Card className="p-6 bg-card/30 backdrop-blur-sm border border-primary/20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Video className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold text-foreground">LiveKit Integration</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Powered by LiveKit for secure, high-quality video meetings
            </p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <span>URL: {LIVEKIT_URL}</span>
              <span>API Key: {LIVEKIT_API_KEY}</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VideoMeetings; 