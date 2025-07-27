const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') }); // Load from .env.local

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: false,
});


async function migrateData() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('Cluster0'); // Replace with your database name if different

    // Data from JSON files
    const clubsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/assets/clubs_data.json'), 'utf-8'));
    const cellsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/assets/cells_data.json'), 'utf-8'));
    const headlinesData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/assets/headlines_data.json'), 'utf-8'));
    const projectsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/assets/projects_data.json'), 'utf-8'));
    const eventsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/assets/events_data.json'), 'utf-8'));
    const calendarData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/assets/calendar.json'), 'utf-8'));
    const coreteamData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/assets/coreteam_data.json'), 'utf-8'));

    // Migrate Clubs Data
    const clubsCollection = database.collection('clubs');
    await clubsCollection.deleteMany({}); // Clear existing data
    await clubsCollection.insertMany(clubsData);
    console.log('Clubs data migrated successfully');

    // Migrate Cells Data
    const cellsCollection = database.collection('cells');
    await cellsCollection.deleteMany({}); // Clear existing data
    await cellsCollection.insertMany(cellsData);
    console.log('Cells data migrated successfully');

    // Migrate Headlines Data
    const headlinesCollection = database.collection('headlines');
    await headlinesCollection.deleteMany({}); // Clear existing data
    await headlinesCollection.insertMany(headlinesData);
    console.log('Headlines data migrated successfully');

    // Migrate Projects Data
    const projectsCollection = database.collection('projects');
    await projectsCollection.deleteMany({}); // Clear existing data
    await projectsCollection.insertMany(projectsData);
    console.log('Projects data migrated successfully');

    // Migrate Events Data
    const eventsCollection = database.collection('events');
    await eventsCollection.deleteMany({}); // Clear existing data
    await eventsCollection.insertMany(eventsData);
    console.log('Events data migrated successfully');

    // Migrate Calendar Data
    const calendarCollection = database.collection('calendar');
    await calendarCollection.deleteMany({}); // Clear existing data
    await calendarCollection.insertMany(calendarData);
    console.log('Calendar data migrated successfully');

    // Migrate Core Team Data
    const coreteamsCollection = database.collection('coreteams');
    await coreteamsCollection.deleteMany({}); // Clear existing data
    // Core team data is an object with nested arrays, adjust insertion as needed
    // Here, assuming you want to insert the technical_secretary and core_members as separate documents or restructure
    // For simplicity, let's insert them as two documents for now. You might want to adjust this.
    const coreTeamDocuments = [];
    if (coreteamData.technical_secretary) {
        coreTeamDocuments.push(coreteamData.technical_secretary);
    }
    if (coreteamData.core_members && Array.isArray(coreteamData.core_members)) {
        coreTeamDocuments.push(...coreteamData.core_members);
    }
    if (coreTeamDocuments.length > 0) {
        await coreteamsCollection.insertMany(coreTeamDocuments);
        console.log('Core team data migrated successfully');
    } else {
        console.log('No core team data to migrate');
    }


  } finally {
    await client.close();
  }
}

migrateData().catch(console.error);
