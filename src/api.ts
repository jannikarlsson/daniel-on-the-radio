export const fetchSongsForDate = async (channelId: number, day: string) => {
    try {
      const response = await fetch(`https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${channelId}&startdatetime=${day}&format=json&size=1000&indent=true`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
        return jsonData.song;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  };