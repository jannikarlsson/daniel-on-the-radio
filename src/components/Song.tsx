import { ISong } from "../models/interfaces"
import { getTime, thirtyDayDiff } from "../utils";
import { useSong } from "../hooks/useSong";

function Song({ song }: {song: ISong}) {
    const { program, episode, startTime, selectedDate } = useSong(song);

    return (
        <div className="notification is-success is-light">
            <div className="has-text-weight-bold">{song.channel}: {program?.title}</div>
            <div className="is-size-6">{selectedDate}, {getTime(song.starttimeutc)}-{getTime(song.stoptimeutc)}</div>
            <div>{song.title}</div>
            <div>{song.artist}</div>
            {episode && !thirtyDayDiff(selectedDate) && <audio src={episode?.broadcast.broadcastfiles[0].url + "#t=" + (startTime-10)} controls>
                <code> Your browser doesn't support audio tags</code>
            </audio>}
            {thirtyDayDiff(selectedDate) && <span className="is-italic">Det har gått längre tid än 30 dagar</span>}
        </div>
    )
}

export default Song;