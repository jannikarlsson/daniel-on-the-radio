import { ButtonOption } from '../models/interfaces';

interface TabButtonsProps<T> {
    options: ButtonOption<T>[];
    selectedValue: T | null;
    onChange: (value: T) => void; // eslint-disable-line no-unused-vars
    accent?: boolean;
}

function TabButtons<T>({ options, selectedValue, onChange, accent = false }: TabButtonsProps<T>) {
    return (
        <div className={`segmented${accent ? ' is-accent' : ''}`}>
            {options.map((option) => (
                <button
                    key={String(option.value)}
                    type="button"
                    className={`segmented-option${selectedValue === option.value ? ' is-active' : ''}`}
                    aria-pressed={selectedValue === option.value}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

export default TabButtons;
