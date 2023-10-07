import { useEffect, useState } from "react";
import DateRange from "./components/DateRange";
import { fetchSongsForDate } from "./api";
import SongList from "./components/SongList";

function App() {

  const [songs, setSongs] = useState([]);

  const [dateRange, setDateRange] = useState({
    from: new Date().toLocaleDateString(), 
    to: new Date().toLocaleDateString()
  });

  const dates = () => {
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    return Array.from({ length: (toDate - fromDate) / (24 * 60 * 60 * 1000) + 1 }, (_, index) =>
    new Date(fromDate.getTime() + index * 24 * 60 * 60 * 1000).toLocaleDateString())
  };

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
    const goodStrings = ['Daniel Hansson', 'Daniel (Sv) (1) Hansson', 'Akademiska Kören (Malmö)', 'Malmö Högskola', 'Akademiska Kören & Orkestern (Malmö)']

    return songs.filter(song => {
      return goodStrings.some(str => {
        return song.title.includes(str) || song.artist.includes(str);
      });
    });
  }

  const searchSongs = () => {
    const channels = [2562, 207, 211, 164, 163, 132];
    let songCollection = [...songs];
    const fetchData = async (channelId, day) => {
      try {
        const songsData = await fetchSongsForDate(channelId, day);
        songCollection = [...songCollection, ...songsData];
        setSongs(filterForSelected(cleanDuplicates(songCollection)))
      } catch (error) {
      }
    };

    dates().forEach(day => {
      channels.forEach(channel => fetchData(channel, day))
    })

  }

  useEffect(() => {
    console.log(songs)
  }, [songs])

  return (
    <div className="container">
      <DateRange dateRange={dateRange} setDateRange={setDateRange} searchSongs={searchSongs}/>
      <SongList songs={songs}/>
    </div>
  );
}

export default App;
