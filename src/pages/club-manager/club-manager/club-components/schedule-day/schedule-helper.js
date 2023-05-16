import dayjs from "dayjs"
import { DateFormat } from '../../club-helper'

export const getCurrentDate = () => {
    return dayjs(new Date()).format(DateFormat)
}

export const getRows = () => {
    const _rows = []
    for (let i = 1; i < 7; i++) {
      _rows.push({
        id: i,
        courtNumber: i,
        sixAM: "",
        sevenAM: "",
        eightAM: "",
        nineAM: "",
        tenAM: "",
        elevenAM: "",
        twelveAM: "",
        onePM: "",
        twoPM: "",
        threePM: "",
        fourPM: "",
        fivePM: "",
        sixPM: "",
        sevenPM: "",
        eightPM: "",
        ninePM: "",
        tenPM: "",
        elevenPM: ""
      })
    }
    _rows.push({
      id: 7,
      courtNumber: "7-כחול מוזל",
      sixAM: "",
      sevenAM: "",
      eightAM: "",
      nineAM: "",
      tenAM: "",
      elevenAM: "",
      twelveAM: "",
      onePM: "",
      twoPM: "",
      threePM: "",
      fourPM: "",
      fivePM: "",
      sixPM: "",
      sevenPM: "",
      eightPM: "",
      ninePM: "",
      tenPM: "",
      elevenPM: ""
    })
    _rows.push({
      id: 8,
      courtNumber: "8-אדום מוזל",
      sixAM: "",
      sevenAM: "",
      eightAM: "",
      nineAM: "",
      tenAM: "",
      elevenAM: "",
      twelveAM: "",
      onePM: "",
      twoPM: "",
      threePM: "",
      fourPM: "",
      fivePM: "",
      sixPM: "",
      sevenPM: "",
      eightPM: "",
      ninePM: "",
      tenPM: "",
      elevenPM: ""
    })
    _rows.push({
      id: 9,
      courtNumber: "9-ירוק מוזל",
      sixAM: "",
      sevenAM: "",
      eightAM: "",
      nineAM: "",
      tenAM: "",
      elevenAM: "",
      twelveAM: "",
      onePM: "",
      twoPM: "",
      threePM: "",
      fourPM: "",
      fivePM: "",
      sixPM: "",
      sevenPM: "",
      eightPM: "",
      ninePM: "",
      tenPM: "",
      elevenPM: ""
    })
    return _rows;
}

export const hoursData = {sixAM:6, sevenAM: 7, eightAM: 8, nineAM:9, tenAM:10, elevenAM:11, twelveAM:12, onePM: 13, twoPM: 14, threePM: 15, fourPM: 16, fivePM: 17, sixPM: 18, sevenPM: 19, eightPM: 20, ninePM: 21, tenPM: 22, elevenPM: 23};
export const hoursDataArr = ['sixAM', 'sevenAM', 'eightAM', 'nineAM', 'tenAM', 'elevenAM', 'twelveAM', 'onePM', 'twoPM', 'threePM', 'fourPM', 'fivePM', 'sixPM', 'sevenPM', 'eightPM', 'ninePM', 'tenPM', 'elevenPM']
export const columnsData = [{hour: 'courtNumber', headerName:'מספר מגרש'},{hour: 'sixAM', headerName:'6:00'},{hour: 'sevenAM', headerName:'7:00'},{hour: 'eightAM', headerName:'8:00'},
  {hour: 'nineAM', headerName:'9:00'},{hour: 'tenAM', headerName:'10:00'},{hour: 'elevenAM', headerName:'1:00'},{hour: 'twelveAM', headerName:'12:00'},{hour: 'onePM', headerName:'13:00'},
  {hour: 'twoPM', headerName:'14:00'},{hour: 'threePM', headerName:'15:00'},{hour: 'fourPM', headerName:'16:00'},{hour: 'fivePM', headerName:'17:00'},{hour: 'sixPM', headerName:'18:00'},
  {hour: 'sevenPM', headerName:'19:00'},{hour: 'eightPM', headerName:'20:00'},{hour: 'ninePM', headerName:'21:00'},{hour: 'tenPM', headerName:'22:00'},{hour: 'elevenPM', headerName:'23:00'}]
export const weekDayInHebrew = {'Sunday':"יום ראשון",'Monday':"יום שני",'Tuesday':"יום שלישי",'Wednesday':"יום רביעי",'Thursday':"יום חמישי",'Friday':"יום שישי",'Saturday':"יום שבת"}

const mockScheduleDay = []
for (let courtNumber = 1; courtNumber < 7; courtNumber++) {
  for (let startHour = 8; startHour < 22; startHour++) {
    mockScheduleDay.push({
        "courtNumber": courtNumber,
        "startHour": startHour,
        "endHour": startHour+1,
        "username": "אקדמיה"
    })
  }
}

const scheduleData = {
  "sunday": mockScheduleDay,
  "monday": mockScheduleDay,
  "tuesday": mockScheduleDay,
  "wednesday": mockScheduleDay,
  "thursday": mockScheduleDay,
  "friday": mockScheduleDay,
  "saturday":mockScheduleDay
}

if (sessionStorage.getItem(process.env.REACT_APP_GOOGLE_CLIENT_ID)) {
  sessionStorage.setItem("dudi-sela-schedule", JSON.stringify(scheduleData))
}
