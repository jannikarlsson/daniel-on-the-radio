import Song from "./Song";
import { ISongWithDetails } from "../models/interfaces";

interface SongListProps {
    songs: ISongWithDetails[];
    showDate?: boolean;
}

function SongList({ songs, showDate = false }: SongListProps) {
    return (
        <ul className="song-list">
            {songs.map((song, index) => (
                <li key={index}>
                    <Song song={song} showDate={showDate} />
                </li>
            ))}
        </ul>
    );
}

export default SongList;
