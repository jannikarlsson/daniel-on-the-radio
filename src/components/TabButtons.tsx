import { ButtonOption, Tab } from '../models/interfaces';

interface TabButtonsProps<T> {
    options: ButtonOption<T>[];
    selectedValue: T | null;
    onChange: (value: T) => void;
}

function TabButtons<T>({ options, selectedValue, onChange }: TabButtonsProps<T>) {
    return (
        <div className="buttons has-addons is-centered">
            {options.map((option) => (
                <button 
                    key={String(option.value)}
                    className={`button ${selectedValue === option.value ? 'is-warning' : 'is-warning is-light'}`}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

export default TabButtons;
