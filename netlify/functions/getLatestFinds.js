const { connectToDatabase } = require('./utils/mongodb');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection('radio');
    
    // Find documents that have songs, sort by date descending, limit to 10
    const results = await collection
      .find({ songs: { $exists: true, $ne: [] } })
      .sort({ date: -1 })
      .limit(10)
      .toArray();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        results: results
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database Error' })
    };
  }
};
