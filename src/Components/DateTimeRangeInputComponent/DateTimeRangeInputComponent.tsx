import React from "react";
import { useEffect, useState } from "react";
import "./DateTimeRangeInput.scss";
import InputCalenderPopUp from "./InputCalenderPopUp";
import { get365DaysAgo, getMinMaxDate } from "./Utils";


const DateTimeRangeInputComponent = ({dateRangeValue, callBackDateRange}:any) => {
  const [dateRange, setDateRange] = useState({
    startDate: dateRangeValue.startDate,
    endDate: dateRangeValue.endDate
  });

  // useEffect(() => {
  //   setDateRange((prev) => ({
  //     ...prev,
  //     endDate: dateRangeValue.endDate
  //   }))
  // }, [dateRangeValue]);

  const [startDate, setStartDate] = useState(dateRangeValue.startDate);

  const updateDateRange = (state:string, value:any) => {
    let selectedDate = new Date(value);
    selectedDate.setHours(selectedDate.getHours() - 5);
    selectedDate.setMinutes(selectedDate.getMinutes() - 30);
    if(state === "startDate") {
      setStartDate(() => selectedDate);
      setDateRange(() => ({startDate: value, endDate: "" }));
    }else setDateRange(prevDateRange => ({...prevDateRange, [state]: value}));
    callBackDateRange(state, selectedDate.getTime());
  }

  return (
    <div className="dateTimeInputContainer">
      <InputCalenderPopUp updateStartDate={updateDateRange} value={dateRange.startDate} keyName={"startDate"} minDate={`1996-01-01T00:00`} maxDate={getMinMaxDate("")}  />
      <InputCalenderPopUp updateStartDate={updateDateRange} value={dateRange.endDate} keyName={"endDate"} minDate={getMinMaxDate(startDate)} maxDate={getMinMaxDate("")}  />
    </div>
  );
};

export default DateTimeRangeInputComponent;

