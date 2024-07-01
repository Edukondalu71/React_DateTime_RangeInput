const CurrentDate =  new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CheckNextBtnStatus = (currYear:number, currMonth:number, maxdate:any) => {
    let maxDate = new Date(maxdate);
    let year = currYear <= maxDate.getFullYear();
    let month = currYear === maxDate.getFullYear() ? currMonth < maxDate.getMonth() : true;
    return year && month
}

const CheckPrevBtnStatus = (min:any, currYear:number, currMonth:any) => {
    let minDate = new Date(min);
    let year = minDate.getFullYear() <= currYear;
    let month = currYear === minDate.getFullYear() ? (minDate.getMonth() < currMonth ? true : false) : true
    return year && month
}

const checkIsToday = (year:number, month:number, day:number) => {
    const today = new Date();
    const selectedDate = new Date(year, month, day);
    return (
      today.getFullYear() === selectedDate.getFullYear() &&
      today.getMonth() === selectedDate.getMonth() &&
      today.getDate() === selectedDate.getDate()
    );
};

const convertIntoDateObject =(dateString:any, state:any) => {
      const selectedDate = new Date(dateString);
      selectedDate.setHours(selectedDate.getHours() + 5);
      selectedDate.setMinutes(selectedDate.getMinutes() + 30);
      return new Date(selectedDate);
  }

const getMinMaxDate = (date:String| Date | any) => {
    let inputDate = date === "" ? new Date() : new Date(date);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
    const hours = String(inputDate.getHours()).padStart(2, "0");
    const minutes = String(inputDate.getMinutes()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    return formattedDate;
}

const get365DaysAgo = () => {
    var inputDate = new Date();
    inputDate.setDate(inputDate.getDate() - 365);  // Subtract 365 days
    const year = new Date(inputDate).getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
    const hours = String(inputDate.getHours()).padStart(2, "0");
    const minutes = String(inputDate.getMinutes()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    return formattedDate;
};

const renderCalendar = (currYear:number, currMonth:number, min:any) => {
    let maxDate = new Date(min);
    let isSelectedMonth = maxDate.getFullYear() === currYear && maxDate.getMonth() === currMonth;
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let newDays:any = [];
    let isCheckPastDaysState = false;

    for (let i = firstDayofMonth; i > 0; i--) newDays.push({day:'', active:"notClickable"});

    if(isSelectedMonth) for (let i = 1; i <= maxDate.getDate()-1; i++) newDays.push({day:i, active:"notClickable"});
    
    for (let i = isSelectedMonth ? maxDate.getDate() : 1; i <= lastDateofMonth; i++) {
      const isToday = i === CurrentDate.getDate() && currMonth === CurrentDate.getMonth() && currYear === CurrentDate.getFullYear();
      newDays.push({day:i, active:isCheckPastDaysState ?"notClickable" : "clickAble"});
      if (isToday) isCheckPastDaysState = true; 
    }
    return newDays;
}

const renderHrsMns = (currYear:number, currMonth:number, selectedDay:number, state:String) => {
    let checkDate = checkIsToday(currYear, currMonth, selectedDay);
    let hrsList = [0];
    let currentHour = checkDate ? (state==="AM" ? (11 < new Date().getHours() ? 11 : new Date().getHours()) :  new Date().getHours()-12) : 11;
    for (let j = 1; j <= currentHour; j++)  hrsList.push(j);
    return  hrsList;
}

const checkActualDateTime = (hour:number, state:String) => {
   let actualHour = state === "PM" ? (hour < 12 ? (hour === 12 ? hour + 1 : hour + 12) : hour) : hour ;
   return actualHour;
}

const renderMns = (currYear:number, currMonth:number, selectedDay:number,selectedHour:number, state:String) => {
    let checkDate = checkIsToday(currYear, currMonth, selectedDay);
    let currentMins = checkDate ? (checkActualDateTime(selectedHour, state) === new Date().getHours() ? new Date().getMinutes() : 59) : 59 
    let minsList = [];
    for (let i = 0; i <= currentMins; i++)  minsList.push(i);
    return minsList;
}

const convertedIntoTwoDecimalNumber = (value:any) => {
    if(typeof value === 'number') return String(value).padStart(2, '0');
    else return value
}

const checkDisplayTime = (day:number, state:String) => {
    return day === 0 ?  12 : day ;
}

const exptectedDateFormat = (date:any) => {
    var originalDate = new Date(date);
    var day = originalDate.getDate();  // Extract date components
    var month = originalDate.getMonth() + 1; // Months are zero-based
    var year = originalDate.getFullYear();  // Extract date components
    var hour = originalDate.getHours();  // Extract date components
    var minute = originalDate.getMinutes();  // Extract date components
    var period = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    var formattedDate = `${convertedIntoTwoDecimalNumber(day)}-${convertedIntoTwoDecimalNumber(month)}-${year} ${convertedIntoTwoDecimalNumber(hour)}:${convertedIntoTwoDecimalNumber(minute)} ${period}`;  // Create the formatted date string
    return formattedDate
}

const findDurationBtnDays = (startDate:any, selectedDate:any) => {
   let givenDate = new Date(startDate).getTime()/1000;
   let currentDate = new Date(selectedDate).getTime()/1000; // Current date
   let timeDifference = (currentDate - givenDate) - 19800; //19800 for substract 5 hrs 30 mins Calculate the difference in milliseconds
  // let daysDifference = timeDifference / (60 * 60 * 24); // Convert milliseconds to days
   return timeDifference //31 days converted into seconds # 26,78,400
}

export {CurrentDate,checkDisplayTime,findDurationBtnDays,convertIntoDateObject, exptectedDateFormat,renderMns, months,convertedIntoTwoDecimalNumber,get365DaysAgo, getMinMaxDate, CheckNextBtnStatus, CheckPrevBtnStatus, checkIsToday, renderCalendar, renderHrsMns}
