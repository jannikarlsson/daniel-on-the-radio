import { ButtonOption } from '../models/interfaces';

interface TabButtonsProps {
    options: ButtonOption[];
    selectedValue: number | string | null;
    onChange: (value: number | string) => void;
}

function TabButtons({ options, selectedValue, onChange }: TabButtonsProps) {
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
