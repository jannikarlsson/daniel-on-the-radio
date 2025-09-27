import Song from "./Song";
import { useSongs } from "../contexts/SongContext";

function SongList() {
    const { songs } = useSongs();
    const renderSongs = songs.map((song, index) => <Song song={song} key={index} />)
    
    return (
        <div className="song-list is-centered">
            {renderSongs.length ? renderSongs : <div className="has-text-warning-light has-text-centered">Nej.</div>}
        </div>
    )
}

export default SongList;