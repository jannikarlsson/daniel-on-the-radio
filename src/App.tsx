import { useState } from "react";
import DateInput from "./components/DateInput";
import { fetchSongsForDate } from "./services/SongService";
import SongList from "./components/SongList";
import { ISong } from "./models/interfaces";
import { artist, channels } from "./config/filters";

function App() {

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

    return cleanedArray
  }

  const filterForSelected = (songs: ISong[]) => {
    const filteredSongs = songs.filter(song => {
      return artist.some(str => {
        return song.title.includes(str) || song.artist.includes(str);
      });
    });

    return filteredSongs;
  }

  const addChannelName = (songs: ISong[], channel: number) => {
    return songs.map(song => {
      return {
        ...song,
        channelId: channel,
        channel: channels[channel],
      }
    })
  }


  const searchSongs = () => {
    let songCollection: ISong[] = [];
    const fetchData = async (channelId: number, day: string) => {
      try {
        const songsData = await fetchSongsForDate(channelId, day);
        songCollection = [...songCollection, ...addChannelName(songsData, channelId)];
        songCollection = filterForSelected(cleanDuplicates(songCollection));
        setSongs(songCollection);
      } catch (error) {
      }
    };

    Object.keys(channels).forEach(channel => fetchData(+channel, date))

  }

  return (
    <div className="has-background-success-dark">
      <div className="is-size-6 has-text-centered has-text-success-dark p-4 has-background-success-light">Har Daniel Hansson varit på radio nu igen?</div>
      <div className="container is-fluid">
        <DateInput date={date} setDate={setDate} searchSongs={searchSongs} />
        <SongList songs={songs}/>
      </div>
    </div>
    
  );
}

export default App;
