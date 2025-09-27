import Song from "./Song";
import { ISongWithDetails } from "../models/interfaces";

interface SongListProps {
    songs: ISongWithDetails[];
}

function SongList({ songs }: SongListProps) {
    return (
        <div className="song-list is-centered">
            {songs.map((song, index) => (
                <div key={index} className="mb-4">
                    <Song song={song} />
                </div>
            ))}
        </div>
    );
}

export default SongList;