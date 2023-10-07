import { useState } from "react";
import DateInput from "./components/DateInput";
import { fetchSongsForDate } from "./api";
import SongList from "./components/SongList";

function App() {

  const channels = {
    2562: 'P2 Musik',
    207: 'P4 Malmöhus',
    211: 'P4 Kristianstad',
    164: 'P3',
    163: 'P2',
    132: 'P1'
  }

  const [songs, setSongs] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const cleanDuplicates = (songs) => {
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

  const filterForSelected = (songs) => {
    const goodStrings = ['Daniel Hansson', 'Daniel (Sv) (1) Hansson', 'Akademiska Kören (Malmö)', 'Malmö Högskola', 'Akademiska Kören & Orkestern (Malmö)', 'Akademiska Orkestern (Malmö)']

    return songs.filter(song => {
      return goodStrings.some(str => {
        return song.title.includes(str) || song.artist.includes(str);
      });
    });
  }

  const addChannelName = (songs, channel) => {
    return songs.map(song => {
      return {
        ...song,
        channel: channels[channel]
      }
    })
  }

  const searchSongs = () => {
    let songCollection = [];
    const fetchData = async (channelId, day) => {
      try {
        const songsData = await fetchSongsForDate(channelId, day);
        songCollection = [...songCollection, ...addChannelName(songsData, channelId)];
        setSongs(filterForSelected(cleanDuplicates(songCollection)))
      } catch (error) {
      }
    };

    Object.keys(channels).forEach(channel => fetchData(channel, date))

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
