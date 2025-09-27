const { connectToDatabase } = require('./utils/mongodb');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection('radio');
    
    const count = parseInt(event.queryStringParameters?.count || '10');
    
    // Find documents that have songs, sort by date descending, limit to requested count
    const results = await collection
      .find({ songs: { $exists: true, $ne: [] } })
      .sort({ date: -1 })
      .limit(count)
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
