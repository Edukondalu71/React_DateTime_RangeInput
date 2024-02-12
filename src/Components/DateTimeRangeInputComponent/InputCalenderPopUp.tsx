import React, { useEffect, useState } from 'react';
import "./DateTimeRangeInput.scss";
import CalenderPopUpScreen from './CalenderPopUpScreen';
import { Modal } from 'react-bootstrap';
import { InputCalenderDataType } from './PropsTypes';
import { exptectedDateFormat } from './Utils';

const InputCalenderPopUp = ({ updateStartDate, value, keyName, minDate, maxDate }: InputCalenderDataType) => {
  const [popUpState, setPopUpState] = useState(false);
  const closeCalenderPopUpScreen = () => setPopUpState(false);
  const [inputValue, setInputValue] = useState<any>("");
  const [tempselectedDate, setTempSelectedDate] = useState<any>("");

  useEffect(() => {
    if(keyName === "endDate" && value === "") {
      setInputValue("");
      setTempSelectedDate("");
    }else {
      let selectedDate = new Date(value);
      let formattedDate = exptectedDateFormat(selectedDate.toLocaleString('en-US', { timeZone: 'UTC' }));
      selectedDate.setHours(selectedDate.getHours() - 5);
      selectedDate.setMinutes(selectedDate.getMinutes() - 30);
      setInputValue(() => formattedDate);
      setTempSelectedDate(() => selectedDate);
    }
  }, [value]);

  const updateInputValue = (e: any) => {
    let selectedDate = new Date(e);
    let formattedDate = exptectedDateFormat(selectedDate.toLocaleString('en-US', { timeZone: 'UTC' }));
    selectedDate.setHours(selectedDate.getHours() - 5);
    selectedDate.setMinutes(selectedDate.getMinutes() - 30);
    setTempSelectedDate(() => selectedDate);
    updateStartDate(keyName, e);
    setInputValue(() => formattedDate);
    closeCalenderPopUpScreen();
  }


  return (
    <div className='dateRangeModel'>
      <Modal show={popUpState} centered backdrop={"static"} className='dateSpecific'>
        <CalenderPopUpScreen keyName={keyName} selectedDate={tempselectedDate} min={minDate} max={maxDate} updateInput={updateInputValue} closePopUp={closeCalenderPopUpScreen} />
      </Modal>
      <input onClick={() => setPopUpState(true)} placeholder={` Select ${keyName === "startDate" ? "start date" : "end date"}`} className="current-date" value={inputValue} />
    </div>
  )
}

export default InputCalenderPopUp