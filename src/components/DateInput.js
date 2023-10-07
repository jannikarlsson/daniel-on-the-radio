import React, { useEffect } from 'react';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

function DateInput({ date, setDate, searchSongs }) {

  const handleDateChange = (e) => {
    setDate(e.target.value)
  };

  const arrowNavigate = (direction) => {
    const currentDate = new Date(date); 
    if (direction === 'left') {
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setDate(currentDate.toLocaleDateString());
  }

  useEffect(() => {
    searchSongs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  return (
      <div className="is-flex is-flex-direction-row mt-5 has-text-success-light is-align-items-center">
      <BiSolidLeftArrow className="is-flex mr-4 is-size-4" onClick={() => arrowNavigate('left')} />
      <input
        className="input is-flex"
        type="date"
        value={date}
        onChange={handleDateChange}
      />
      <BiSolidRightArrow className="is-flex ml-4 is-size-4" onClick={() => arrowNavigate('right')} />
      </div>
  );
}

export default DateInput;
