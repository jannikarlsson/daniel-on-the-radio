import { useState } from 'react';
import { IHistoryEntry, fetchLatestFinds } from '../services/SongService';
import Song from './Song';
import Loader from './Loader';
import TabButtons from './TabButtons';

type CountOption = 10 | 25 | 50 | 100;

function HistorySection() {
    const [history, setHistory] = useState<IHistoryEntry[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedCount, setSelectedCount] = useState<CountOption | null>(null);
    const countOptions: CountOption[] = [10, 25, 50, 100];

    const loadHistory = async (count: CountOption) => {
        setIsLoading(true);
        setError(null);
        setSelectedCount(count);
        try {
            const data = await fetchLatestFinds(count);
            setHistory(data);
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
            {isLoading ? (
                <Loader />
            ) : (
                <TabButtons 
                    options={countOptions.map(count => ({
                        value: count,
                        label: `Visa ${count} senaste`
                    }))}
                    selectedValue={selectedCount}
                    onChange={loadHistory}
                />
            )}
            
            {history.length > 0 && (
                <div className="content mt-4">
                    <h3 className="has-text-warning-light has-text-centered">Senaste fynd</h3>
                    <div className="song-list">
                        {history.map((entry, entryIndex) => (
                            <div key={entry.date} className="mb-5">
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

            {!isLoading && selectedCount && history.length === 0 && (
                <div className="has-text-warning-light has-text-centered mt-4">
                    Inga tidigare fynd hittades.
                </div>
            )}
        </div>
    );
}

export default HistorySection;
