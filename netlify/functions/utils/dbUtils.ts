import { Db } from 'mongodb';
import { connectToDatabase } from './mongodb';

export async function getRadioCollection(): Promise<ReturnType<Db['collection']>> {
  const db = await connectToDatabase();
  return db.collection('radio');
}

export function jsonResponse(statusCode: number, data: unknown) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
}

export function errorResponse(statusCode: number, message: string) {
  return jsonResponse(statusCode, { error: message });
}
