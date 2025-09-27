import { useState } from 'react';
import { IHistoryEntry, fetchLatestFinds } from '../services/SongService';
import Loader from './Loader';
import TabButtons from './TabButtons';
import texts from '../config/texts';
import SongList from './SongList';

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
                <TabButtons<CountOption> 
                    options={countOptions.map(count => ({
                        value: count,
                        label: texts.history.button(count)
                    }))}
                    selectedValue={selectedCount}
                    onChange={value => loadHistory(value)}
                />
            )}
            
            {!isLoading && (
                <div className="content mt-4">
                    {history.length > 0 ? (
                        <SongList songs={history.flatMap(entry => entry.songs)} />
                    ) : selectedCount ? (
                        <div className="has-text-warning-light has-text-centered mt-4">
                            {texts.history.empty}
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}

export default HistorySection;
