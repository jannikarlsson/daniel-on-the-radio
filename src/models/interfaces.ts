export interface ISong {
    title: string;
    starttimeutc: string;
    artist: string;
    channel?: string;
}

export interface IChannelMap {
    [key: number]: string;
}

export interface IDateInputProps {
    date: string;
    setDate: (date: string) => void;
    searchSongs: () => void;
  }