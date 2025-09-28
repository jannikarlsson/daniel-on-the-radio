import { ChangeEvent, useEffect } from 'react';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
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
      <div className="is-flex is-flex-direction-row mt-5 has-text-success-light is-align-items-center">
      <BiSolidLeftArrow className="is-flex mr-4 is-size-4 is-clickable" onClick={() => arrowNavigate('left')} />
      <input
        className={`input is-flex ${isDateToday() ? 'mr-4' : ''}`}
        type="date"
        value={date}
        onChange={handleDateChange}
      />
      {!isDateToday() && <BiSolidRightArrow className="is-flex ml-4 is-size-4 is-clickable" onClick={() => arrowNavigate('right')} />}
      </div>
  );
}

export default DateInput;
