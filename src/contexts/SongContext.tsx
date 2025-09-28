import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ISong, ISongWithDetails, IProgram } from '../models/interfaces';
import { fetchSongsForDate, fetchProgramList, fetchEpisodes, saveSongsToDb, fetchSongsFromCache } from '../services/SongService';
import { artist, channels } from '../config/filters';
import { extractDateTime, getDate, thirtyDayDiff, isToday } from '../utils/utils';

interface SongContextType {
  songs: ISongWithDetails[];
  date: string;
  setDate: (date: string) => void; // eslint-disable-line no-unused-vars
  searchSongs: () => void;
  isLoading: boolean;
  error: string | null;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

export function SongProvider({ children }: { children: ReactNode }) {
  const [songs, setSongs] = useState<ISongWithDetails[]>([]);
  const [date, setDate] = useState<string>(new Date().toLocaleDateString());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cleanDuplicates = (songs: ISong[]) => {
    const uniqueKeys = new Set();
    const cleanedArray = songs.filter((item) => {
      const compositeKey = `${item.title}-${item.starttimeutc}`;
      if (uniqueKeys.has(compositeKey)) {
        return false;
      }
      uniqueKeys.add(compositeKey);
      return true;
    });
    return cleanedArray;
  };

  const filterForSelected = (songs: ISong[]): ISong[] => {
    return songs.filter(song => {
      const titleLower = song.title.toLowerCase();
      const artistLower = song.artist.toLowerCase();
      return artist.some(str => {
        const strLower = str.toLowerCase();
        return titleLower.includes(strLower) || artistLower.includes(strLower);
      });
    });
  };

  const addChannelName = (songs: ISong[], channel: number): ISong[] => {
      return songs.map(song => ({
          ...song,
          channelId: channel,
          channel: channels[channel],
      }));
  };

  const enrichSongWithDetails = async (song: ISong): Promise<ISongWithDetails> => {
    const selectedDate = getDate(song.starttimeutc);

    // If it has been more than 30 days since the song aired, skip fetching program/episode details as the sound will no longer be available
    if (!song.channelId || !selectedDate || thirtyDayDiff(selectedDate)) return song;

    try {
      // Fetch and find matching program
      const programs = await fetchProgramList(song.channelId, selectedDate);
      const songStart = extractDateTime(song.starttimeutc);
      let matchingProgram: IProgram | undefined;

      for (const program of programs) {
        const start = extractDateTime(program.starttimeutc);
        const end = extractDateTime(program.endtimeutc);
        if (songStart > start && songStart < end) {
          matchingProgram = program;
          break;
        }
      }

      if (!matchingProgram) return song;

      // Fetch and find matching episode
      const episodes = await fetchEpisodes(matchingProgram.program.id, selectedDate);
      const matchingEpisode = episodes.find(ep => ep.id === matchingProgram?.episodeid);

      if (!matchingEpisode) return { ...song, program: matchingProgram };

      // Calculate start time for playback
      const episodeStart = extractDateTime(matchingEpisode.broadcasttime.starttimeutc);
      const startTime = (songStart - episodeStart) / 1000;

      return {
        ...song,
        program: matchingProgram,
        episode: matchingEpisode,
        startTime
      };
    } catch (error) {
      console.error('Error enriching song with details:', error);
      return song;
    }
  };

  const searchSongs = useCallback(async () => {
    let allSongs: ISong[] = [];
    setIsLoading(true);
    setError(null);
    
    try {
      // If date is today there still might be new songs, so skip cache
      // If date is in the past, try to fetch from cache first before making new requests
      if (date && !isToday(date)) {
        const cachedSongs = await fetchSongsFromCache(date);
        if (cachedSongs) {
          setSongs(cachedSongs);
          setIsLoading(false);
          return;
        }
      }

      // If date is today or no cached songs found, fetch song lists from API by looping over the channels
      const fetchPromises = Object.keys(channels).map(async (channel) => {
        try {
          const channelId = Number(channel);
          const songsData = await fetchSongsForDate(channelId, date);
          return addChannelName(songsData, channelId);
        } catch (error) {
          console.error(`Error fetching songs for channel ${channel}:`, error);
          return [];
        }
      });

      const channelResults = await Promise.all(fetchPromises);
      
      // Combine all songs and remove duplicate and irrelevant finds
      allSongs = filterForSelected(cleanDuplicates(channelResults.flat()));
      
      // Add with program and episode details so the song can be played back
      const enrichedSongs = await Promise.all(allSongs.map(song => enrichSongWithDetails(song))) as ISongWithDetails[];
      setSongs(enrichedSongs);

      // Save the enriched songs to the database cache for future use
      try {
        await saveSongsToDb(date, enrichedSongs);
      } catch (error) {
        console.warn('Error saving to database:', error);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error fetching songs');
      setSongs(allSongs);
    } finally {
      setIsLoading(false);
    }
  }, [date]);

  return (
    <SongContext.Provider value={{ songs, date, setDate, searchSongs, isLoading, error }}>
      {children}
    </SongContext.Provider>
  );
}

export function useSongs() {
  const context = useContext(SongContext);
  if (context === undefined) {
    throw new Error('useSongs must be used within a SongProvider');
  }
  return context;
}

