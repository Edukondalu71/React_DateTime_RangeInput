type CalenderPopUpScreenDataTypes = {
    closePopUp:() => void;
    updateInput:(arg:any) => void;
    min:string;
    max:string;
    selectedDate:any
    keyName:string
}

type InputCalenderDataType = {
    value:string;
    minDate:string;
    maxDate:string;
    updateStartDate:(arg:string, value:string) => void;
    keyName:string
}



export type {CalenderPopUpScreenDataTypes, InputCalenderDataType}