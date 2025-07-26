const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { AccessToken } = require('livekit-server-sdk');


dotenv.config();
const app = express();
app.use(cors({  origin: 'http://localhost:8080'}));
app.use(express.json());
// Express.js example
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});
const LIVEKIT_API_KEY = process.env.VITE_LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = process.env.VITE_LIVEKIT_API_SECRET;

app.post('/get-token', (req, res) => {
  const { roomName, participantName, isHost } = req.body;
  if (!roomName || !participantName) return res.status(400).json({ error: 'Missing params' });

  const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
    identity: participantName,
    ttl: '1h',
  });
  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
    ...(isHost && { roomAdmin: true }),
  });

  const token = at.toJwt();
  res.json({ token });
});

app.listen(3001, () => console.log('Server running on port 3001'));
