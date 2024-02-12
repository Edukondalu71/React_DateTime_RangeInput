import React, { useState } from 'react';
import './App.css';
import DateTimeRangeInputComponent from './Components/DateTimeRangeInputComponent/DateTimeRangeInputComponent';

function App() {
  const [dateRange, setDateRange] = useState({startDate: new Date(), endDate: new Date()});
  const updateDateRange = (key:string, value:any) => {
    setDateRange((prevDateRange:any) => ({
      ...prevDateRange,
     [key] : value
    }));
  }
  return (
    <div className="App">
      <div className='inputDivContainer'>
      <DateTimeRangeInputComponent  dateRangeValue={dateRange} callBackDateRange={updateDateRange}/>
      </div>
    </div>
  );
}

export default App;
