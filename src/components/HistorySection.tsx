import { useState } from 'react';
import { IHistoryEntry, fetchLatestFinds } from '../services/SongService';
import Song from './Song';
import Loader from './Loader';

function HistorySection() {
    const [history, setHistory] = useState<IHistoryEntry[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const loadHistory = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchLatestFinds();
            setHistory(data);
            setIsExpanded(true);
        } catch (error) {
            setError('Failed to fetch history');
        } finally {
            setIsLoading(false);
        }
    };

    if (error) {
        return (
            <div className="notification is-danger is-light mt-4">
                <div className="has-text-weight-bold">Error</div>
                <div>{error}</div>
            </div>
        );
    }

    return (
        <div className="mt-5">
            {!isExpanded && (
                <button 
                    className="button is-success is-light is-fullwidth"
                    onClick={loadHistory}
                    disabled={isLoading}
                >
                    {isLoading ? <Loader /> : 'Visa de 10 senaste fynden'}
                </button>
            )}
            
            {isExpanded && history.length > 0 && (
                <div className="content">
                    <h3 className="has-text-success-light has-text-centered">Senaste fynd</h3>
                    <div className="song-list">
                        {history.map((entry, entryIndex) => (
                            <div key={entry.date} className="mb-5">
                                <div className="has-text-success-light mb-2">Datum: {entry.date}</div>
                                {entry.songs.map((song, songIndex) => (
                                    <Song 
                                        key={`${entryIndex}-${songIndex}`}
                                        song={song} 
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isExpanded && history.length === 0 && (
                <div className="has-text-success-light has-text-centered">
                    Inga tidigare fynd hittades.
                </div>
            )}
        </div>
    );
}

export default HistorySection;
