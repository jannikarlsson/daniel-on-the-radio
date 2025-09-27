import type { Handler } from '@netlify/functions';
import { getRadioCollection, jsonResponse, errorResponse } from './utils/dbUtils';
export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return errorResponse(405, 'Method Not Allowed');
  }

  try {
    const date = event.queryStringParameters?.date;
    if (!date) {
      return errorResponse(400, 'Date parameter is required');
    }

    const collection = await getRadioCollection();
    const result = await collection.findOne({ date });

    return jsonResponse(200, { songs: result ? result.songs : null });
  } catch (error) {
    return errorResponse(500, 'Database Error');
  }
};
