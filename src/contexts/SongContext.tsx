import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ISong } from '../models/interfaces';
import { fetchSongsForDate } from '../services/SongService';
import { artist, channels } from '../config/filters';

interface SongContextType {
  songs: ISong[];
  date: string;
  setDate: (date: string) => void;
  searchSongs: () => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

export function SongProvider({ children }: { children: ReactNode }) {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [date, setDate] = useState<string>(new Date().toLocaleDateString());

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
            return artist.some(str => {
                return song.title.includes(str) || song.artist.includes(str);
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

  const searchSongs = useCallback(async () => {
    let songCollection: ISong[] = [];
    const fetchData = async (channelId: number, day: string) => {
      try {
        const songsData = await fetchSongsForDate(channelId, day);
        songCollection = [...songCollection, ...addChannelName(songsData, channelId)];
        songCollection = filterForSelected(cleanDuplicates(songCollection));
        setSongs(songCollection);
      } catch (error) {
        console.error('Error fetching songs:', error);
        setSongs(songCollection);
      }
    };

    const promises = Object.keys(channels).map(channel => fetchData(+channel, date));
    await Promise.all(promises);
  }, [date]);

  return (
    <SongContext.Provider value={{ songs, date, setDate, searchSongs }}>
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
