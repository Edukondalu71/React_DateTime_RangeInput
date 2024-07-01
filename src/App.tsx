import React, { useState } from 'react';
import './App.css';
import DateTimeRangeInput from './Components/DateTimeRangeInputComponent/DateTimeRangeInputComponent';

function App() {
  const [dateRange, setDateRange] = useState({ startDate: new Date(), endDate: new Date() });
  const updateDateRange = (key: any, value: Date | Number | String) => {
    setDateRange((prevDateRange: any) => ({
      ...prevDateRange,
      [key]: value
    }));
  }
  return (
    <DateTimeRangeInput
      dateRangeValue={dateRange}
      callBackDateRange={updateDateRange}
      styles={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}
      inputStyle={{ 
        border: '2px solid #000000', 
        width: '600px' 
      }}
      />
  )
}

export default App;
