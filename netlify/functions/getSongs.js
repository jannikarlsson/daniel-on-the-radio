const { connectToDatabase } = require('./utils/mongodb');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const date = event.queryStringParameters.date;
    if (!date) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Date parameter is required' })
      };
    }

    const db = await connectToDatabase();
    const collection = db.collection('radio');
    
    const result = await collection.findOne({ date });
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        songs: result ? result.songs : null
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database Error' })
    };
  }
};
