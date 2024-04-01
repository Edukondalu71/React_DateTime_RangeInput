# React DateTime Range Input

[![npm version ](https://img.shields.io/npm/v/react-datetimerangeinput.svg)](https://www.npmjs.com/package/react-datetimerangeinput)
[![license](https://img.shields.io/npm/l/react-datetimerangeinput.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/react-datetimerangeinput.svg)](https://www.npmjs.com/package/react-datetimerangeinput)

A customizable and user-friendly React component for selecting date and time ranges.

## Features

- **Flexible Date and Time Range Selection**: Allow users to easily select both start and end dates along with specific time ranges.
- **Customizable Appearance**: Tailor the appearance of the input to match your application's design.
- **Responsive Design**: Ensure a seamless user experience across various screen sizes and devices.
- **Easy Integration**: Quickly integrate the component into your React projects.

## Installation

Install the package using npm:

```bash
  npm i react-datetimerangeinput
```

<!-- Embedding a Gist -->
## NOTE : for pop styles you need to use bootstrap


```javascript
  import DateTimeRangeInputComponent from react-datetimerangeinput;
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
```

<!-- ```markdown
![View Sample Code](/src/App.tsx);
![View Sample Code](/src/Components/Images/SampleImage.png);
``` -->





