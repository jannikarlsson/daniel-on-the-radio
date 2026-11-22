import { ChangeEvent, CSSProperties, useEffect, useRef, useState } from 'react';
import { BiPause, BiPlay } from 'react-icons/bi';
import texts from '../config/texts';

// Only one player at a time: starting a new one pauses the previous.
let activeAudio: HTMLAudioElement | null = null;

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = String(total % 60).padStart(2, '0');
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${secs}`
    : `${minutes}:${secs}`;
};

interface AudioPlayerProps {
  src: string;
}

function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio && activeAudio === audio) {
        activeAudio = null;
      }
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (audio.paused) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  };

  const handlePlay = () => {
    const audio = audioRef.current;
    if (audio && activeAudio && activeAudio !== audio) {
      activeAudio.pause();
    }
    activeAudio = audio;
    setIsPlaying(true);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const time = Number(e.target.value);
    if (audio) {
      audio.currentTime = time;
    }
    setCurrentTime(time);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="player">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={handlePlay}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onDurationChange={() => setDuration(audioRef.current?.duration ?? 0)}
      />
      <button
        type="button"
        className="player-button"
        aria-label={isPlaying ? texts.song.pause : texts.song.play}
        onClick={togglePlay}
      >
        {isPlaying ? <BiPause size={26} /> : <BiPlay size={26} />}
      </button>
      <input
        type="range"
        className="player-seek"
        aria-label={texts.song.seek}
        aria-valuetext={`${formatTime(currentTime)} / ${formatTime(duration)}`}
        min={0}
        max={duration || 0}
        step={1}
        value={Math.min(currentTime, duration || 0)}
        onChange={handleSeek}
        style={{ '--progress': `${progress}%` } as CSSProperties}
      />
      <div className="player-time">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
}

export default AudioPlayer;
