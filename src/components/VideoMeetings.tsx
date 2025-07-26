import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Video, Users, Eye, EyeOff, Crown, Clock } from 'lucide-react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { LiveKitRoom } from '@livekit/components-react';
import '@livekit/components-styles';

interface Meeting {
  name: string;
  participants: number;
  maxParticipants: number;
  startTime: string;
  isActive: boolean;
}

const VideoMeetings = () => {
  const [meetingName, setMeetingName] = useState('');
  const [meetingPassword, setMeetingPassword] = useState('');
  const [joinMeetingId, setJoinMeetingId] = useState('');
  const [joinPassword, setJoinPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeMeetings, setActiveMeetings] = useState<Meeting[]>([]);
  const [token, setToken] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('');

  // Environment setup
  const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL || 'wss://your-livekit-instance.livekit.cloud';
  const API_BASE =
    import.meta.env.MODE === 'production'
      ? '' // no backend in production demo mode
      : import.meta.env.VITE_API_BASE || 'http://localhost:3001';

  useEffect(() => {
    fetchMeetings();
    const interval = setInterval(fetchMeetings, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchMeetings = async () => {
    if (import.meta.env.MODE === 'production') {
      // ✅ Mock data for deployed version (UI-only)
      setActiveMeetings([
        {
          name: 'Demo Meeting',
          participants: 3,
          maxParticipants: 50,
          startTime: new Date().toISOString(),
          isActive: true,
        },
      ]);
      return;
    }

    try {
      const res = await axios.get(`${API_BASE}/rooms`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_LIVEKIT_API_KEY}`,
        },
      });
      const meetings = res.data.map((r: any) => ({
        name: r.name,
        participants: r.numParticipants,
        maxParticipants: r.maxParticipants || 50,
        startTime: r.creationTime,
        isActive: true,
      }));
      setActiveMeetings(meetings);
    } catch (err) {
      console.error('Error fetching meetings', err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async () => {
      if (import.meta.env.MODE === 'production') {
        alert('Live meetings are disabled in demo mode.');
        return;
      }
      await handleCreateMeeting();
    },
    onError: () => alert('Google login failed'),
  });

  const handleCreateMeeting = async () => {
    if (!meetingName || !meetingPassword) {
      alert('Please fill all fields');
      return;
    }

    setIsConnecting(true);
    try {
      const res = await axios.post(`${API_BASE}/get-token`, {
        roomName: meetingName,
        participantName: 'Host',
        isHost: true,
        password: meetingPassword,
      });

      if (res.data.token) {
        setToken(res.data.token);
        setCurrentRoom(meetingName);
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Error creating meeting', error);
      alert('Failed to create meeting');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleJoinMeeting = async () => {
    if (!joinMeetingId || !joinPassword) {
      alert('Please fill all fields');
      return;
    }

    if (import.meta.env.MODE === 'production') {
      alert('Live meetings are disabled in demo mode.');
      return;
    }

    setIsConnecting(true);
    try {
      const res = await axios.post(`${API_BASE}/get-token`, {
        roomName: joinMeetingId,
        participantName: `User-${Date.now()}`,
        isHost: false,
        password: joinPassword,
      });

      if (res.data.token) {
        setToken(res.data.token);
        setCurrentRoom(joinMeetingId);
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Error joining meeting', error);
      alert('Failed to join meeting. Check ID and password.');
    } finally {
      setIsConnecting(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (token && currentRoom) {
    return (
      <div style={{ height: '100vh' }}>
        <LiveKitRoom
          token={token}
          serverUrl={LIVEKIT_URL}
          connect={true}
          onDisconnected={() => {
            setToken('');
            setCurrentRoom('');
            fetchMeetings();
          }}
        >
          {/* Add your video conferencing UI here */}
        </LiveKitRoom>
      </div>
    );
  }

  return (
    <section className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-xl font-bold flex items-center gap-2"><Crown /> Host Meeting</h3>
          <div className="space-y-4">
            <div>
              <Label>Meeting Name</Label>
              <Input value={meetingName} onChange={(e) => setMeetingName(e.target.value)} placeholder="Enter meeting name" />
            </div>
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={meetingPassword}
                  onChange={(e) => setMeetingPassword(e.target.value)}
                  placeholder="Set a password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>
            {import.meta.env.MODE === 'production' ? (
              <p className="text-sm text-muted-foreground">Live meetings are disabled in demo mode.</p>
            ) : (
              <Button onClick={() => googleLogin()} className="w-full mt-2" disabled={isConnecting}>
                {isConnecting ? 'Starting...' : 'Start Meeting'}
              </Button>
            )}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-xl font-bold flex items-center gap-2"><Users /> Join Meeting</h3>
          <div className="space-y-4">
            <div>
              <Label>Meeting ID</Label>
              <Input value={joinMeetingId} onChange={(e) => setJoinMeetingId(e.target.value)} placeholder="Enter meeting ID" />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={joinPassword}
                onChange={(e) => setJoinPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            {import.meta.env.MODE === 'production' ? (
              <p className="text-sm text-muted-foreground">Joining meetings is disabled in demo mode.</p>
            ) : (
              <Button onClick={handleJoinMeeting} className="w-full mt-2" disabled={isConnecting}>
                {isConnecting ? 'Joining...' : 'Join Meeting'}
              </Button>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">Active Meetings</h3>
        {activeMeetings.length === 0 ? (
          <p className="text-muted-foreground">No active meetings</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {activeMeetings.map((m) => (
              <Card key={m.name} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Video size={18} className="text-primary" />
                  <h4 className="font-bold truncate">{m.name}</h4>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users size={16} className="text-muted-foreground" />
                  <span>{m.participants}/{m.maxParticipants} participants</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <Clock size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{formatDate(m.startTime)}</span>
                </div>
                <Badge variant={m.isActive ? 'default' : 'secondary'} className="mt-2">
                  {m.isActive ? 'Live' : 'Ended'}
                </Badge>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoMeetings;
