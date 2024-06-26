import { ISong } from "../models/interfaces";
import Song from "./Song";

function SongList({ songs }: {songs: ISong[]}) {
    const renderSongs = songs.map((song, index) => <Song song={song} key={index} />)
    
    return (
        <div className="song-list is-centered">
            {renderSongs.length ? renderSongs : <div className="has-text-success-light has-text-centered">Nej.</div>}
        </div>
    )
}

export default SongList;