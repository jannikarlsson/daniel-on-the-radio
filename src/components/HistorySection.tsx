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
        return <div className="error" role="alert">{texts.history.errorTitle}</div>;
    }

    return (
        <>
            <TabButtons<CountOption>
                accent
                options={countOptions.map(count => ({
                    value: count,
                    label: count.toString()
                }))}
                selectedValue={selectedCount}
                onChange={value => setSelectedCount(value)}
            />

            {isLoading ? (
                <Loader />
            ) : history.length > 0 ? (
                <SongList songs={history.flatMap(entry => entry.songs)} showDate />
            ) : (
                <p className="empty-small" role="status">{texts.history.empty}</p>
            )}
        </>
    );
}

export default HistorySection;
