import { IEpisode, IProgram, ISong } from "./models/interfaces";

export const fetchSongsForDate = async (channelId: number, day: string): Promise<ISong[]> => {
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

export const fetchProgramList = async (channelId: number, day: string): Promise<IProgram[]> => {
  try {
    const response = await fetch(`https://api.sr.se/api/v2/scheduledepisodes?channelid=${channelId}&date=${day}&format=json&size=1000&indent=true`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
      return jsonData.schedule;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};

export const fetchEpisodes = async (programId: number, day: string): Promise<IEpisode[]> => {
  try {
    const response = await fetch(`https://api.sr.se/api/v2/episodes/index?programid=${programId}&fromdate=${day}&format=json&size=100&indent=true`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
      return jsonData.episodes;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};
