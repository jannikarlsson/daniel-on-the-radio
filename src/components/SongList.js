import Song from "./Song";

function SongList({ songs }) {
    const renderSongs = songs.map((song, index) => <Song song={song} key={index} />)
    
    return (
        <div className="song-list is-centered">
            {renderSongs}
        </div>
    )
}

export default SongList;