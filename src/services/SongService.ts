import { IEpisode, IProgram, ISong, ISongWithDetails } from "../models/interfaces";

const BASE_URL = 'https://api.sr.se/api/v2';
const DEFAULT_PARAMS = 'format=json&indent=true';

type ApiParams = {
  [key: string]: string | number;
}

interface ISongParams extends ApiParams {
  id: number;
  startdatetime: string;
  size: number;
}

interface IProgramParams extends ApiParams {
  channelid: number;
  date: string;
  size: number;
}

interface IEpisodeParams extends ApiParams {
  programid: number;
  fromdate: string;
  size: number;
}

async function fetchApi<T, P extends ApiParams>(endpoint: string, params: P): Promise<T> {
  try {
    const queryParams = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    
    const url = `${BASE_URL}/${endpoint}?${queryParams}&${DEFAULT_PARAMS}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}

export const fetchSongsFromCache = async (day: string): Promise<ISong[] | null> => {
  try {
    const cachedResponse = await fetch(`/.netlify/functions/getSongs?date=${day}`);
    const cachedData = await cachedResponse.json();
    
    if (cachedData.songs) {
      return cachedData.songs;
    }
  } catch (error) {
    console.warn('Error fetching from cache:', error);
  }
  return null;
};

export const fetchSongsForDate = async (channelId: number, day: string): Promise<ISong[]> => {
  const params: ISongParams = {
    id: channelId,
    startdatetime: day,
    size: 1000
  };
  const data = await fetchApi<{ song: ISong[] }, ISongParams>('playlists/getplaylistbychannelid', params);
  return data.song;
};

export const fetchProgramList = async (channelId: number, day: string): Promise<IProgram[]> => {
  const params: IProgramParams = {
    channelid: channelId,
    date: day,
    size: 1000
  };
  const data = await fetchApi<{ schedule: IProgram[] }, IProgramParams>('scheduledepisodes', params);
  return data.schedule;
};

export const fetchEpisodes = async (programId: number, day: string): Promise<IEpisode[]> => {
  const params: IEpisodeParams = {
    programid: programId,
    fromdate: day,
    size: 100
  };
  const data = await fetchApi<{ episodes: IEpisode[] }, IEpisodeParams>('episodes/index', params);
  return data.episodes;
};

export const saveSongsToDb = async (date: string, songs: ISongWithDetails[]): Promise<void> => {
  try {
    await fetch('/.netlify/functions/saveSongs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        songs
      })
    });
  } catch (error) {
    console.warn('Error saving to database:', error);
    throw error;
  }
};

export interface IHistoryEntry {
  date: string;
  songs: ISongWithDetails[];
}

export const fetchLatestFinds = async (count: number = 10): Promise<IHistoryEntry[]> => {
  try {
    const response = await fetch(`/.netlify/functions/getLatestFinds?count=${count}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.warn('Error fetching latest finds:', error);
    throw error;
  }
};
