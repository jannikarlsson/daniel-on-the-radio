import type { Handler } from '@netlify/functions';
import { getRadioCollection, jsonResponse, errorResponse } from './utils/dbUtils';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return errorResponse(405, 'Method Not Allowed');
  }

  try {
    const count = parseInt(event.queryStringParameters?.count || '10');
    const collection = await getRadioCollection();
    const results = await collection
      .find({ songs: { $exists: true, $ne: [] } })
      .sort({ date: -1 })
      .limit(count)
      .toArray();

    return jsonResponse(200, { results });
  } catch (error) {
    return errorResponse(500, 'Database Error');
  }
};
