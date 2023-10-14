import { useEffect, useState } from "react";
import { fetchEpisodes, fetchProgramList } from "../api";
import { ISong, IProgram, IEpisode } from "../models/interfaces"
import { extractDateTime, getTime, getDate, thirtyDayDiff } from "../utils";

function Song({ song }: {song: ISong}) {

    const [program, setProgram] = useState<IProgram|null>(null);
    const [episode, setEpisode] = useState<IEpisode|null>(null);
    const [startTime, setStartTime] = useState<number>(0);
    const selectedDate: string | null = getDate(song.starttimeutc);

    const getPrograms = async () => {
        if (song.channelId && selectedDate) {
            try {
                const result: IProgram[] = await fetchProgramList(song.channelId, selectedDate);
                const songStart = extractDateTime(song.starttimeutc);
                result.forEach((program: IProgram) => {
                    const start = extractDateTime(program.starttimeutc);
                    const end = extractDateTime(program.endtimeutc);
                    if (songStart > start && songStart < end) {
                        setProgram(program)
                    }
                });
                
            } catch (error) {
                console.error("Error fetching program list:", error);
            }
        }
    }

    const getSound = async () => {
        if (program?.program.id && song.starttimeutc) {
            try {
                if (selectedDate) {
                    const episodeList: IEpisode[] = await fetchEpisodes(program.program.id, selectedDate);
                    const episode = episodeList.find(episode => episode.id === program.episodeid);
                    if (episode) setEpisode(episode);
                }
                
            } catch (error) {
                console.error("Error fetching program list:", error);
            }
        }
    }

    useEffect(() => {
        getPrograms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (program) getSound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [program])

    useEffect(() => {
        if (episode) {
            const songStart = extractDateTime(song.starttimeutc);
            const episodeStart = extractDateTime(episode?.broadcasttime.starttimeutc);
            const offsetInSeconds = (songStart - episodeStart)/1000;
            setStartTime(offsetInSeconds);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [episode])

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