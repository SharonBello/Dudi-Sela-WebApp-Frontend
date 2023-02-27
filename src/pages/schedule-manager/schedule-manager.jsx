import dayjs from 'dayjs';
import * as React from 'react';
import { useState } from 'react';
import { ScheduleDay } from './schedule-day.jsx';

export const ScheduleManager = () => {

  const getCurrentDate = () => {
    return dayjs(new Date()).format('YYYY-MM-DD')
  }

  const [date, setDate] = useState(getCurrentDate())

  const openTodaysSchedule = () => {
    console.log("today")
    setDate(dayjs(new Date()).format('YYYY-MM-DD'))
  }
  const openNextDaySchedule = () => {
    console.log("next day")
    let _date =  new Date()
    _date.setDate(dayjs(date).toDate().getDate() + 1)
    setDate(dayjs(_date).format('YYYY-MM-DD'))
  }
  const openPreviousDaySchedule = () => {
    console.log("previous day")
    let _date =  new Date()
    _date.setDate(dayjs(date).toDate().getDate() - 1)
    setDate(dayjs(_date).format('YYYY-MM-DD'))
  }
  return (
    <>
      <button style={{"marginTop": "200px"}} onClick={openTodaysSchedule}>היום</button>
      <button onClick={openNextDaySchedule}>next day</button>
      <button onClick={openPreviousDaySchedule}>previous day</button>

      <ScheduleDay mDate={date} dayOfWeek="יום שני" />
    </>

  );
}