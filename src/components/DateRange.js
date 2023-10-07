import React from 'react';

function DateRange({ dateRange, setDateRange, searchSongs }) {
    
    const handleDateChange = (e, property) => {
        const value = e.target.value;
    
        if (property === 'from') {
            const fromDate = new Date(value);
            const toDate = new Date(dateRange.to);
    
            if (fromDate > toDate) {
                toDate.setFullYear(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
                setDateRange({ from: value, to: toDate.toLocaleDateString() });
            } else {
                toDate.setDate(fromDate.getDate() + 6);
                setDateRange({ from: value, to: toDate.toLocaleDateString() });
            }
        } else if (property === 'to') {
            const fromDate = new Date(dateRange.from);
            const toDate = new Date(value);
    
            if (toDate < fromDate) {
                fromDate.setFullYear(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
                setDateRange({ from: fromDate.toLocaleDateString(), to: value });
            } else {
                fromDate.setDate(toDate.getDate() - 6);
                setDateRange({ from: fromDate.toLocaleDateString(), to: value });
            }
        }
    };
    

  const handleSearch = () => {
    searchSongs();
  };

  return (
    <div className="columns date-range">
      <input
        className="input column"
        type="date"
        value={dateRange.from}
        onChange={(e) => handleDateChange(e, 'from')}
      />
      <input
        className="input column"
        type="date"
        value={dateRange.to}
        onChange={(e) => handleDateChange(e, 'to')}
      />
      <button onClick={handleSearch}>Sök</button>
    </div>
  );
}

export default DateRange;
