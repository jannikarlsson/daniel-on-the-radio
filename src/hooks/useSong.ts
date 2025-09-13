import { useEffect, useState, useCallback } from "react";
import { fetchEpisodes, fetchProgramList } from "../services/SongService";
import { ISong, IProgram, IEpisode } from "../models/interfaces";
import { extractDateTime, getDate } from "../utils/utils";

interface UseSongResult {
    program: IProgram | null;
    episode: IEpisode | null;
    startTime: number;
    selectedDate: string | null;
    isLoading: boolean;
    error: string | null;
}

export const useSong = (song: ISong): UseSongResult => {
    const [program, setProgram] = useState<IProgram|null>(null);
    const [episode, setEpisode] = useState<IEpisode|null>(null);
    const [startTime, setStartTime] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const selectedDate: string | null = getDate(song.starttimeutc);

    const getPrograms = useCallback(async () => {
        if (!song.channelId || !selectedDate) return;
        
        setError(null);
        setIsLoading(true);
        try {
            const result: IProgram[] = await fetchProgramList(song.channelId, selectedDate);
            const songStart = extractDateTime(song.starttimeutc);
            result.forEach((program: IProgram) => {
                const start = extractDateTime(program.starttimeutc);
                const end = extractDateTime(program.endtimeutc);
                if (songStart > start && songStart < end) {
                    setProgram(program);
                }
            });
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to fetch program list");
            setProgram(null);
        } finally {
            setIsLoading(false);
        }
    }, [song.channelId, selectedDate, song.starttimeutc]);

    const getSound = useCallback(async () => {
        if (!program?.program.id || !song.starttimeutc || !selectedDate) return;
        
        setError(null);
        setIsLoading(true);
        try {
            const episodeList: IEpisode[] = await fetchEpisodes(program.program.id, selectedDate);
            const episode = episodeList.find(episode => episode.id === program.episodeid);
            if (episode) {
                setEpisode(episode);
            } else {
                setError("Episode not found");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to fetch episode");
            setEpisode(null);
        } finally {
            setIsLoading(false);
        }
    }, [program?.program.id, program?.episodeid, selectedDate, song.starttimeutc]);

    const calculateStartTime = useCallback(() => {
        if (episode) {
            const songStart = extractDateTime(song.starttimeutc);
            const episodeStart = extractDateTime(episode.broadcasttime.starttimeutc);
            const offsetInSeconds = (songStart - episodeStart)/1000;
            setStartTime(offsetInSeconds);
        }
    }, [episode, song.starttimeutc]);

    useEffect(() => {
        getPrograms();
    }, [getPrograms]);

    useEffect(() => {
        if (program) {
            getSound();
        }
    }, [program, getSound]);

    useEffect(() => {
        calculateStartTime();
    }, [calculateStartTime]);

    return {
        program,
        episode,
        startTime,
        selectedDate,
        isLoading,
        error
    };
}