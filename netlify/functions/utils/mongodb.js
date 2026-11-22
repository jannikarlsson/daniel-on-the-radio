const { MongoClient } = require('mongodb');
const dns = require('dns');

// Local dev only: some networks return bad answers to the SRV DNS lookups that
// mongodb+srv:// URIs need (querySrv EBADRESP). Use public DNS for those lookups.
if (process.env.NETLIFY_DEV === 'true') {
  dns.setServers(['1.1.1.1', '8.8.8.8']);
}

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'radio';

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Add it to a local .env file or link the Netlify site.');
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);
  cachedDb = db;
  return db;
}

module.exports = { connectToDatabase };
