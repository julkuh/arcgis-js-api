/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","./jsonMap"],(function(t,e){"use strict";const a={"short-date":"(datePattern: 'M/d/y', selector: 'date')","short-date-short-time":"(datePattern: 'M/d/y', timePattern: 'h:mm a', selector: 'date and time')","short-date-short-time-24":"(datePattern: 'M/d/y', timePattern: 'H:mm', selector: 'date and time')","short-date-long-time":"(datePattern: 'M/d/y', timePattern: 'h:mm:ss a', selector: 'date and time')","short-date-long-time-24":"(datePattern: 'M/d/y', timePattern: 'H:mm:ss', selector: 'date and time')","short-date-le":"(datePattern: 'd/M/y', selector: 'date')","short-date-le-short-time":"(datePattern: 'd/M/y', timePattern: 'h:mm a', selector: 'date and time')","short-date-le-short-time-24":"(datePattern: 'd/M/y', timePattern: 'H:mm', selector: 'date and time')","short-date-le-long-time":"(datePattern: 'd/M/y', timePattern: 'h:mm:ss a', selector: 'date and time')","short-date-le-long-time-24":"(datePattern: 'd/M/y', timePattern: 'H:mm:ss', selector: 'date and time')","long-month-day-year":"(datePattern: 'MMMM d, y', selector: 'date')","long-month-day-year-short-time":"(datePattern: 'MMMM d, y', timePattern: 'h:mm a', selector: 'date and time')","long-month-day-year-short-time-24":"(datePattern: 'MMMM d, y', timePattern: 'H:mm', selector: 'date and time')","long-month-day-year-long-time":"(datePattern: 'MMMM d, y', timePattern: 'h:mm:ss a', selector: 'date and time')","long-month-day-year-long-time-24":"(datePattern: 'MMMM d, y', timePattern: 'H:mm:ss', selector: 'date and time')","day-short-month-year":"(datePattern: 'd MMM y', selector: 'date')","day-short-month-year-short-time":"(datePattern: 'd MMM y', timePattern: 'h:mm a', selector: 'date and time')","day-short-month-year-short-time-24":"(datePattern: 'd MMM y', timePattern: 'H:mm', selector: 'date and time')","day-short-month-year-long-time":"(datePattern: 'd MMM y', timePattern: 'h:mm:ss a', selector: 'date and time')","day-short-month-year-long-time-24":"(datePattern: 'd MMM y', timePattern: 'H:mm:ss', selector: 'date and time')","long-date":"(datePattern: 'EEEE, MMMM d, y', selector: 'date')","long-date-short-time":"(datePattern: 'EEEE, MMMM d, y', timePattern: 'h:mm a', selector: 'date and time')","long-date-short-time-24":"(datePattern: 'EEEE, MMMM d, y', timePattern: 'H:mm', selector: 'date and time')","long-date-long-time":"(datePattern: 'EEEE, MMMM d, y', timePattern: 'h:mm:ss a', selector: 'date and time')","long-date-long-time-24":"(datePattern: 'EEEE, MMMM d, y', timePattern: 'H:mm:ss', selector: 'date and time')","long-month-year":"(datePattern: 'MMMM y', selector: 'date')","short-month-year":"(datePattern: 'MMM y', selector: 'date')",year:"(datePattern: 'y', selector: 'date')"},o=e.strict()({shortDate:"short-date",shortDateShortTime:"short-date-short-time",shortDateShortTime24:"short-date-short-time-24",shortDateLongTime:"short-date-long-time",shortDateLongTime24:"short-date-long-time-24",shortDateLE:"short-date-le",shortDateLEShortTime:"short-date-le-short-time",shortDateLEShortTime24:"short-date-le-short-time-24",shortDateLELongTime:"short-date-le-long-time",shortDateLELongTime24:"short-date-le-long-time-24",longMonthDayYear:"long-month-day-year",longMonthDayYearShortTime:"long-month-day-year-short-time",longMonthDayYearShortTime24:"long-month-day-year-short-time-24",longMonthDayYearLongTime:"long-month-day-year-long-time",longMonthDayYearLongTime24:"long-month-day-year-long-time-24",dayShortMonthYear:"day-short-month-year",dayShortMonthYearShortTime:"day-short-month-year-short-time",dayShortMonthYearShortTime24:"day-short-month-year-short-time-24",dayShortMonthYearLongTime:"day-short-month-year-long-time",dayShortMonthYearLongTime24:"day-short-month-year-long-time-24",longDate:"long-date",longDateShortTime:"long-date-short-time",longDateShortTime24:"long-date-short-time-24",longDateLongTime:"long-date-long-time",longDateLongTime24:"long-date-long-time-24",longMonthYear:"long-month-year",shortMonthYear:"short-month-year",year:"year"}),r=o.toJSON.bind(o),n=o.fromJSON.bind(o);function m(t){return a[t]}t.dictionary=o,t.formats=a,t.fromJSON=n,t.getFormat=m,t.toJSON=r,Object.defineProperty(t,"__esModule",{value:!0})}));
