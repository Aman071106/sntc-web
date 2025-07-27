const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');

dotenv.config();
const app = express();
app.use(cors({  origin: '*'}));
app.use(express.json());
// Express.js example
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});
const LIVEKIT_API_KEY = process.env.VITE_LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = process.env.VITE_LIVEKIT_API_SECRET;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error('Error connecting to MongoDB:', e);
  }
}

connectToMongo();

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

app.get('/api/clubs', async (req, res) => {
  try {
    const database = client.db('Cluster0');
    const clubsCollection = database.collection('clubs');
    const clubs = await clubsCollection.find({}).toArray();
    res.json(clubs);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ message: 'Error fetching clubs' });
  }
});

app.get('/api/cells', async (req, res) => {
  try {
    const database = client.db('Cluster0');
    const cellsCollection = database.collection('cells');
    const cells = await cellsCollection.find({}).toArray();
    res.json(cells);
  } catch (error) {
    console.error('Error fetching cells:', error);
    res.status(500).json({ message: 'Error fetching cells' });
  }
});

app.get('/api/headlines', async (req, res) => {
  try {
    const database = client.db('Cluster0');
    const headlinesCollection = database.collection('headlines');
    const headlines = await headlinesCollection.find({}).toArray();
    res.json(headlines);
  } catch (error) {
    console.error('Error fetching headlines:', error);
    res.status(500).json({ message: 'Error fetching headlines' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const database = client.db('Cluster0');
    const projectsCollection = database.collection('projects');
    const projects = await projectsCollection.find({}).toArray();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const database = client.db('Cluster0');
    const eventsCollection = database.collection('events');
    const events = await eventsCollection.find({}).toArray();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

app.get('/api/events/:id', async (req, res) => {
  try {
    const database = client.db('Cluster0');
    const eventsCollection = database.collection('events');
    // Assuming 'id' in JSON corresponds to a numerical ID in MongoDB
    const event = await eventsCollection.findOne({ id: parseInt(req.params.id) });
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).json({ message: 'Error fetching event details' });
  }
});

app.get('/api/calendar', async (req, res) => {
  try {
    const database = client.db('Cluster0');
    const calendarCollection = database.collection('calendar');
    const calendarItems = await calendarCollection.find({}).toArray();
    res.json(calendarItems);
  } catch (error) {
    console.error('Error fetching calendar items:', error);
    res.status(500).json({ message: 'Error fetching calendar items' });
  }
});

app.get('/api/coreteams', async (req, res) => {
  try {
    const database = client.db('Cluster0');
    const coreteamsCollection = database.collection('coreteams');
    const coreteams = await coreteamsCollection.find({}).toArray();
    res.json(coreteams);
  } catch (error) {
    console.error('Error fetching core teams:', error);
    res.status(500).json({ message: 'Error fetching core teams' });
  }
});


app.listen(3001, () => console.log('Server running on port 3001'));