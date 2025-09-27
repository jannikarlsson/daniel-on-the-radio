export interface ISong {
    title: string;
    starttimeutc: string;
    stoptimeutc: string;
    artist: string;
    channelId?: number;
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

export interface IProgram {
    episodeid: number;
    title: string;
    starttimeutc: string;
    endtimeutc: string;
    program: {
        id: number;
    }
}

export interface IEpisode {
    id: number;
    broadcasttime: {
        starttimeutc: string;
    };
    broadcast: {
        broadcastfiles: [
            {
                url: string
            }
        ]
    }
}

export interface ISongWithDetails extends ISong {
    program?: IProgram;
    episode?: IEpisode;
    startTime?: number;
}

export type Tab = 'search' | 'history';

export interface ButtonOption {
    value: number | string;
    label: string;
}