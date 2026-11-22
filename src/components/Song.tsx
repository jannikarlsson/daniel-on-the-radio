import { ISongWithDetails } from "../models/interfaces";
import { getTime, getDate, thirtyDayDiff } from "../utils/utils";
import texts from "../config/texts";
import AudioPlayer from "./AudioPlayer";

interface SongProps {
    song: ISongWithDetails;
    showDate?: boolean;
}

function Song({ song, showDate = false }: SongProps) {
    const selectedDate = getDate(song.starttimeutc);

    const meta = [
        showDate ? selectedDate : null,
        song.channel,
        song.program?.title,
        getTime(song.starttimeutc)?.slice(0, 5)
    ].filter(Boolean).join(' · ');

    return (
        <article className="song">
            <div className="song-meta">{meta}</div>
            <div>
                <h2 className="song-title">{song.title}</h2>
                <p className="song-artist">{song.artist}</p>
            </div>
            {!thirtyDayDiff(selectedDate) && song.episode ? (
                <AudioPlayer src={song.episode.broadcast.broadcastfiles[0].url + "#t=" + (song.startTime ? song.startTime - 10 : 0)} />
            ) : (
                <p className="song-note">{texts.song.noAudio}</p>
            )}
        </article>
    )
}

export default Song;
