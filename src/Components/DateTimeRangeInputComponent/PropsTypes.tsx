import { CSSProperties } from "react";

type CalenderPopUpScreenDataTypes = {
    closePopUp:() => void;
    updateInput:(arg:any) => void;
    min:String;
    max:String;
    selectedDate:any
    keyName:String
}

type InputCalenderDataType = {
    value:String | Date | any;
    minDate:String;
    maxDate:String;
    updateStartDate:(arg:String, value:String) => void;
    keyName:String;
    inputStyle: CSSProperties
}



export type {CalenderPopUpScreenDataTypes, InputCalenderDataType}