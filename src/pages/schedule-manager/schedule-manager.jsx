import * as React from 'react'
import { useState } from 'react'
import dayjs from 'dayjs'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ScheduleDay } from './schedule-day.jsx'
import { getCurrentDate, weekDayInHebrew } from './schedule-helper.js'

export const ScheduleManager = () => {
  const weekDay = dayjs().format('dddd')

  const [date, setDate] = useState(getCurrentDate())
  const [notFormattedDate, setNotFormattedDate] = useState(new Date())

  const openTodaysSchedule = () => {
    setDate(dayjs(notFormattedDate).format('YYYY-MM-DD'))
    setNotFormattedDate(new Date())
  }
  const openNextDaySchedule = () => {
    let _date = notFormattedDate
    _date.setDate(_date.getDate() + 1)
    setNotFormattedDate(_date)
    setDate(dayjs(_date).format('YYYY-MM-DD'))
  }
  const openPreviousDaySchedule = () => {
    let _date = notFormattedDate
    _date.setDate(_date.getDate() - 1)
    setNotFormattedDate(_date)
    setDate(dayjs(_date).format('YYYY-MM-DD'))
  }
  return (
    <div className="flex-column align-center justify-between container schedule-container">
      <Typography component="h1" variant="h5">האקדמיה לטניס דודי סלע</Typography>
      <Box
        className="flex align-center justify-between schedule-header"
        sx={{
          marginBlock: 5,
        }}
      >
        <Typography>{weekDayInHebrew[weekDay]} {date}</Typography>
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
        <Typography component="h6" variant="h6">
          <img src="https://res.cloudinary.com/primap/image/upload/v1677420672/General/Dudi%20Sela/DudiLogo_wdbxir.svg" className="app-logo"
              alt="logo" />
        </Typography>
      </Box>
      <ScheduleDay mDate={date} dayOfWeek={weekDay} />
    </div>

  )
}