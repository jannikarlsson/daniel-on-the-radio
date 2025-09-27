const { connectToDatabase } = require('./utils/mongodb');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { date, songs } = JSON.parse(event.body);
    
    if (!date) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Date parameter is required' })
      };
    }

    const db = await connectToDatabase();
    const collection = db.collection('radio');
    
    // Upsert the songs for the given date
    await collection.updateOne(
      { date },
      { $set: { songs, updatedAt: new Date() } },
      { upsert: true }
    );
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database Error' })
    };
  }
};
