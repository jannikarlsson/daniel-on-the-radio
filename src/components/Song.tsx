import { ISongWithDetails } from "../models/interfaces";
import { getTime, getDate } from "../utils/utils";

function Song({ song }: { song: ISongWithDetails }) {
    const selectedDate = getDate(song.starttimeutc);

    return (
        <div className="card has-background-warning-light">
            <div className="card-content">
                <div className="content has-text-warning-dark">
                    <div className="has-text-weight-bold">{song.channel}: {song.program?.title}</div>
                    <div className="is-size-6">{selectedDate}, {getTime(song.starttimeutc)}-{getTime(song.stoptimeutc)}</div>
                    <div>{song.title}</div>
                    <div>{song.artist}</div>
                    {song.episode ? (
                        <audio src={song.episode.broadcast.broadcastfiles[0].url + "#t=" + (song.startTime ? song.startTime - 10 : 0)} controls className="mt-4" >
                            <code>Your browser doesn't support audio tags</code>
                        </audio>
                    ) : (
                        <div className="is-italic mt-4">Det har gått längre tid än 30 dagar</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Song;