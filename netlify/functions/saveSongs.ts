import type { Handler } from '@netlify/functions';
import { getRadioCollection, jsonResponse, errorResponse } from './utils/dbUtils';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return errorResponse(405, 'Method Not Allowed');
  }

  try {
    const { date, songs } = JSON.parse(event.body || '{}');
    if (!date) {
      return errorResponse(400, 'Date parameter is required');
    }

    const collection = await getRadioCollection();
    await collection.updateOne(
      { date },
      { $set: { songs, updatedAt: new Date() } },
      { upsert: true }
    );

    return jsonResponse(200, { success: true });
  } catch (error) {
    return errorResponse(500, 'Database Error');
  }
};
