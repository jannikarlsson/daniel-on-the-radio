import { ChangeEvent, useEffect } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useSongs } from '../contexts/SongContext';
import { isToday } from '../utils/utils';

type ArrowDirection = 'left' | 'right';

function DateInput() {
  const { date, setDate, searchSongs } = useSongs();

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  };

  const arrowNavigate = (direction: ArrowDirection) => {
    const currentDate = new Date(date);
    const offset = direction === 'left' ? -1 : 1;
    currentDate.setDate(currentDate.getDate() + offset);

    const formattedDate = currentDate.toISOString().split('T')[0];
    setDate(formattedDate);
  }

  const isDateToday = () => {
    return isToday(new Date(date).toLocaleDateString())
  }

  useEffect(() => {
    searchSongs();
  }, [searchSongs])

  return (
    <div className="date-row">
      <button
        type="button"
        className="round-button"
        aria-label="Föregående dag"
        onClick={() => arrowNavigate('left')}
      >
        <BiChevronLeft size={28} />
      </button>
      <input
        className="date-input"
        type="date"
        aria-label="Datum"
        value={date}
        onChange={handleDateChange}
      />
      <button
        type="button"
        className="round-button"
        aria-label="Nästa dag"
        disabled={isDateToday()}
        onClick={() => arrowNavigate('right')}
      >
        <BiChevronRight size={28} />
      </button>
    </div>
  );
}

export default DateInput;
