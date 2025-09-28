import { useState, useEffect } from 'react';
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
    const [selectedCount, setSelectedCount] = useState<CountOption>(10);
    const countOptions: CountOption[] = [10, 25, 50, 100];

    const loadHistory = async (count: CountOption) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchLatestFinds(count);
            setHistory(data);
        } catch (_error) { // eslint-disable-line no-unused-vars
            setError(texts.history.errorTitle);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadHistory(selectedCount);
    }, [selectedCount]);

    if (error) {
        return (
            <div className="notification is-danger is-light mt-4">
                <div className="has-text-weight-bold">{texts.history.errorTitle}</div>
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
                        label: count.toString()
                    }))}
                    selectedValue={selectedCount}
                    onChange={value => setSelectedCount(value)}
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
