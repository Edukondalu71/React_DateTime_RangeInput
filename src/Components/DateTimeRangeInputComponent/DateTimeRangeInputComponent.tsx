import React, { CSSProperties } from "react";
import { useEffect, useState } from "react";
import "./DateTimeRangeInput.scss";
import InputCalenderPopUp from "./InputCalenderPopUp";
import { getMinMaxDate } from "./Utils";

interface Props {
  dateRangeValue: {
    startDate: Date | String,
    endDate:Date | String
  },
  callBackDateRange:(arg:String, arg2:number) => void,
  styles:CSSProperties,
  inputStyle:CSSProperties
}

interface DateType {
  startDate: Date | String,
  endDate:Date | String
}


const DateTimeRangeInput = ({dateRangeValue, callBackDateRange, styles, inputStyle}:Props) => {
  const [dateRange, setDateRange] = useState<DateType>({
    startDate: dateRangeValue.startDate,
    endDate: dateRangeValue.endDate
  });

  const [startDate, setStartDate] = useState(dateRangeValue.startDate);

  const updateDateRange = (state:any, value:any) => {
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
    <div className="dateTimeInputContainer" style={styles}>
      <InputCalenderPopUp inputStyle={inputStyle} updateStartDate={updateDateRange} value={dateRange.startDate} keyName={"startDate"} minDate={`1996-01-01T00:00`} maxDate={getMinMaxDate("")}  />
      <InputCalenderPopUp inputStyle ={inputStyle} updateStartDate={updateDateRange} value={dateRange.endDate} keyName={"endDate"} minDate={getMinMaxDate(startDate)} maxDate={getMinMaxDate("")}  />
    </div>
  );
};

export default DateTimeRangeInput;

