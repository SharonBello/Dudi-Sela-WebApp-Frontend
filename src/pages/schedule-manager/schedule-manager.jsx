import * as React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ScheduleDay } from './schedule-day.jsx';

export const ScheduleManager = () => {
  const weekDay = dayjs().format('dddd');
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
    let _date = new Date()
    _date.setDate(dayjs(date).toDate().getDate() + 1)
    setDate(dayjs(_date).format('YYYY-MM-DD'))
  }
  const openPreviousDaySchedule = () => {
    console.log("previous day")
    let _date = new Date()
    _date.setDate(dayjs(date).toDate().getDate() - 1)
    setDate(dayjs(_date).format('YYYY-MM-DD'))
  }
  return (
    <div className="flex-column align-center justify-between container schedule-container">
      <Typography component="h1" variant="h5">מנהל הזמנות</Typography>
      <Box
        className="flex align-center justify-between schedule-header"
        sx={{
          marginBlock: 5,
        }}
      >
        <Typography>{weekDay} {date}</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <button onClick={openPreviousDaySchedule} className="schedule-daily-btn">previous day</button>
          <button onClick={openTodaysSchedule} className="schedule-daily-btn">היום</button>
          <button onClick={openNextDaySchedule} className="schedule-daily-btn">next day</button>
        </Box>
        <Typography component="h1" variant="h5">logo</Typography>
      </Box>
      <ScheduleDay mDate={date} dayOfWeek={weekDay} />
    </div>

  );
}