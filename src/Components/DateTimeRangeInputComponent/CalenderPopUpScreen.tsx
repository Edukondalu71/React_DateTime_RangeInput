import React, { useEffect, useState } from 'react';
import "./DateTimeRangeInput.scss";
import { CurrentDate,months, renderHrsMns,checkIsToday, checkDisplayTime, renderCalendar, CheckNextBtnStatus, CheckPrevBtnStatus, convertedIntoTwoDecimalNumber, renderMns, findDurationBtnDays } from './Utils';
import { CalenderPopUpScreenDataTypes } from './PropsTypes';
import LeftIcon from './../Images/arrow-left.svg';
import RightIcon from './../Images/arrow-right.svg';

const CalenderPopUpScreen = ({selectedDate,keyName,closePopUp,updateInput, min, max}: CalenderPopUpScreenDataTypes) => {
  let checkSelectedDateIsEmpty = selectedDate === "" ? CurrentDate : selectedDate;
  const [currYear, setCurrYear] = useState(checkSelectedDateIsEmpty.getFullYear());
  const [currMonth, setCurrMonth] = useState(checkSelectedDateIsEmpty.getMonth());
  const [hours, setHours] = useState<any>([]);
  const [selectedDay, setSelectedDay] = useState(checkSelectedDateIsEmpty.getDate())
  const [days, setDays] = useState<number[] |any>([]);
  const [selectedDateTimeInput, setSelectedDateTimeInput] = useState(selectedDate === "" ? "" : `${checkSelectedDateIsEmpty.getDate()} ${months[checkSelectedDateIsEmpty.getMonth()]} ${checkSelectedDateIsEmpty.getFullYear()}`);
  const [previousBtnStatus, setPreviousBtnStatus] = useState(true);
  const [nextBtnStatus, setNextBtnStatus] = useState(true);
  const [state, setState] = useState(checkSelectedDateIsEmpty.getHours() <= 11 ? "AM" : "PM");
  const [minutes, setMinutes] = useState<any>([]);
  const [selectedHour, setSelectedHour] = useState<any>(12 < checkSelectedDateIsEmpty.getHours() ? checkSelectedDateIsEmpty.getHours()-12 : checkSelectedDateIsEmpty.getHours());
  const [selectedMin, setSelectedMin] = useState<any>(checkSelectedDateIsEmpty.getMinutes());
  const [calenderState , setCalenderState] = useState(false);
  const [durationCheck, setDurationCheck] = useState(false);
  const [errorMsg, setErrormsg] = useState<string>("");

  const renderTimePickerValues = () => {
    let hrsList =  renderHrsMns(currYear, currMonth, selectedDay, state);
    renderMinutes();
    setHours(hrsList);
  }

  const onClickChangeDropDown = () => {
    let checkToday = checkIsToday(currYear, currMonth, selectedDay);
    let checkAmState = new Date().getHours() <= 11;
    let stateChange = checkToday && checkAmState;
    if(stateChange) setState(() => "AM");
    else setState((state) => state === "AM" ? "PM" : "AM");
  }

  const onCheckChangeDropDown = () => {
    let checkToday = checkIsToday(currYear, currMonth, selectedDay);
    let checkAmState = new Date().getHours() < 12;
    let stateChange = checkToday && checkAmState;
    if(stateChange)  setState(() => "AM");
  }
  
  const renderDaysCalender = () => {
    let updatedDays:number[] | any = renderCalendar(currYear, currMonth , min);
    onCheckChangeDropDown();
    setDays(updatedDays);
  }

  const previousMonth = () => {
    setCurrMonth((current:any) => current === 0 ? 11 : current-1);
    setCurrYear((year:any) => currMonth === 0 ? year-1 : year);
  };

  const nextMonth = () => {
    setCurrMonth((current:any) => current === 11 ? 0 : current+1);
    setCurrYear((year:any) => currMonth === 11 ? year+1 : year);
  };

  const renderMinutes = () => {
    let list = renderMns(currYear, currMonth, selectedDay, selectedHour, state);
    setMinutes(list);
  }

  useEffect(() => renderTimePickerValues(),[selectedDay, state]);
  useEffect(() => onCheckChangeDropDown(),[selectedDay]);
  useEffect(() => renderMinutes(),[selectedHour]);

  useEffect(() => {
    renderDaysCalender();
    renderTimePickerValues();
    setNextBtnStatus(() => CheckNextBtnStatus(currYear, currMonth, max));
    setPreviousBtnStatus(() => CheckPrevBtnStatus(min, currYear, currMonth));
  }, [currMonth]);

  const updateErrorMsg = (duration:number) => {
    let msg = duration === 0 ? ("Start and end dates cannot be the same.") : duration < 0 ? "End date must be after start date." : 2678400 < duration ? "Cannot be greater than 31 days." : "" ; 
    setErrormsg(() => msg);
  }

  const checkDuration =(day:any) => {
    if(keyName === "endDate"){
      let dateFormat = `${currYear}-${convertedIntoTwoDecimalNumber(currMonth+1)}-${convertedIntoTwoDecimalNumber(day)}T${convertedIntoTwoDecimalNumber(state === "PM" ? (selectedHour === 0 ? 12 : selectedHour <= 11 ? (selectedHour+12) : selectedHour) : selectedHour==12 ? 0 : selectedHour)}:${convertedIntoTwoDecimalNumber(selectedMin)}:00Z`;
      let durationCheck = findDurationBtnDays(min, dateFormat);
      updateErrorMsg(durationCheck);
      if(durationCheck <= 0) setDurationCheck(() => true);
      else setDurationCheck(() =>    2678400 < durationCheck);
    }else setDurationCheck(() => false);
  }

  useEffect(() => {
    if(selectedDateTimeInput !== "") checkDuration(selectedDay)
  }, [selectedMin,selectedDateTimeInput, selectedHour, state]);

  const onChangeDate = (date:any) => {
    if(date !== ""){
      setSelectedDay(date);
      setSelectedDateTimeInput(() => `${date} ${months[currMonth]} ${currYear}`);
      checkDuration(date);
    }
  }
  
  const checkSlectedDateActive = (day:number) => selectedDateTimeInput === `${day} ${months[currMonth]} ${currYear}`
  const onChangeHr = (val:number) =>  {
    setSelectedHour(() => val);
    setSelectedMin(0);
  }
  const onChangeMin = (val:number) => setSelectedMin(() => val);

  const onSelectedDataTimeInput = () => {
    let date = `${currYear}-${convertedIntoTwoDecimalNumber(currMonth+1)}-${convertedIntoTwoDecimalNumber(selectedDay)}T${convertedIntoTwoDecimalNumber(state === "PM" ? (selectedHour === 0 ? 12 : selectedHour <= 11 ? (selectedHour+12) : selectedHour) : selectedHour==12 ? 0 : selectedHour)}:${convertedIntoTwoDecimalNumber(selectedMin)}:00Z`;
    updateInput(date);
    closePopUp();
  }

  return (
    <div className='dateTimedivContainer'>
    <div className='cardContainer'>
      <div className="iconsDivContainer">
        <div onClick={() => setCalenderState(false)} className={!calenderState ? 'selected' : 'notSelected'}>
          <button disabled={!previousBtnStatus} className={previousBtnStatus ? 'enable':'disable'} onClick={previousMonth}><img src={RightIcon} alt="icon" loading='lazy' /></button>
          <p>{months[currMonth]+" "+currYear}</p>
          <button disabled={!nextBtnStatus} className={nextBtnStatus ? 'enable' : 'disable'} onClick={nextMonth}><img src={LeftIcon} alt="icon" loading='lazy' /></button>
        </div>
        <div className={calenderState ? 'selected' : 'notSelected'}>
          <p onClick={() => setCalenderState(true)}>{convertedIntoTwoDecimalNumber(checkDisplayTime(selectedHour, state))+":"+convertedIntoTwoDecimalNumber(selectedMin)}</p>
          <button onClick={onClickChangeDropDown}>{state}</button>
        </div>
      </div>
      <div className="calenderContainer">
        {
          calenderState ?  
          <div className="timeSelector">
          <div className="timeHeader">
            <h5>Hrs</h5>
            <h5>Mins</h5>
          </div>
          <div className="timeRow">
            <div>{hours.map((el: number) =>  <p className={selectedHour === el ? "selected" : ""} onClick={() => onChangeHr(el)} key={el}>{convertedIntoTwoDecimalNumber(checkDisplayTime(el, state))}</p>)}</div>
            <div>{minutes.map((el:number) => <p className={selectedMin === el ? "selected" : ""} onClick={() => onChangeMin(el)} key={el}>{convertedIntoTwoDecimalNumber(el)}</p>)}</div>
          </div>
          </div> :   
        <div className={`calendar ${calenderState ? 'notSelected' : 'selected'}`} >
            <ul className="weeks">
              <li>Sun</li>
              <li>Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
            </ul>
            <ul className="days"> {days.map((day:any, index:number) => (
                <li key={index} onClick={() => day.active === "clickAble" ? onChangeDate(day.day) : null} className={`${checkSlectedDateActive(day.day) ? "active" : ""} ${day.active}`}>{day.day}</li>
              ))}
            </ul>
        </div>
      } 
      </div>
      <div className='warningText' style={{opacity : durationCheck ? 1 : 0 }}><p>{errorMsg}</p></div>
      <div className='buttonRowDiv'>
        <button onClick={closePopUp} className='cancelButton'>Cancel</button>
        <button disabled={durationCheck || selectedDateTimeInput === ""} onClick={onSelectedDataTimeInput} className={`applyButton ${durationCheck || selectedDateTimeInput === ""? 'disableButton' : ''}`}>Apply</button>
      </div>
    </div>
    </div>
  )
}

export default CalenderPopUpScreen