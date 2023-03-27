import * as React from 'react'
import { useState } from 'react'
import dayjs from 'dayjs'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ScheduleDay } from './schedule-day.jsx'
import { getCurrentDate, weekDayInHebrew } from './schedule-helper.js'
import SideDrawer from "./side-drawer.jsx"


export const ScheduleManager = () => {
  const [date, setDate] = useState(getCurrentDate())
  const [notFormattedDate, setNotFormattedDate] = useState(new Date())
  const [weekDay, setWeekDay] = useState(dayjs().format('dddd'))
  const openTodaysSchedule = () => {
    setDate(dayjs(notFormattedDate).format('YYYY-MM-DD'))
    setNotFormattedDate(new Date())
  }
  const openNextDaySchedule = () => {
    let _date = notFormattedDate
    _date.setDate(_date.getDate() + 1)
    setNotFormattedDate(_date)
    setDate(dayjs(_date).format('YYYY-MM-DD'))
    setWeekDay(dayjs(_date).format('dddd'))
  }
  const openPreviousDaySchedule = () => {
    let _date = notFormattedDate
    _date.setDate(_date.getDate() - 1)
    setNotFormattedDate(_date)
    setDate(dayjs(_date).format('YYYY-MM-DD'))
    setWeekDay(dayjs(_date).format('dddd'))
  }
  const openClubDetails = (e, index) => {
    console.log(index);
  }
  const openClubSettings = (e, index) => {
    console.log(index);
  }
  const openClubHours = (e, index) => {
    console.log(index);
  }
  const openMembersCard = (e, index) => {
    console.log(index);
  }
  const openUsersPerimission = (e, index) => {
    console.log(index);
  }
  const openSalesDetails = (e, index) => {
    console.log(index);
  }
  const clubOptions = ['מועדון', 'הגדרות מועדון', 'שעות פעילות', 'ניהול מגרשים', 'כרטיסיות', 'משתמשים והרשאות', 'נתוני מכירות'];
  const optionFuncs = [ openClubDetails, openClubSettings, openClubHours, openMembersCard, openUsersPerimission, openSalesDetails ];

  return (
    <div className="flex-column align-center justify-between container schedule-container">
      <article className="side-drawer flex">
        <SideDrawer clubOptions={clubOptions} optionFuncs={optionFuncs} openClubDetails={openClubDetails} openClubSettings={openClubSettings} openClubHours={openClubHours} openMembersCard={openMembersCard} openUsersPerimission={openUsersPerimission} openSalesDetails={openSalesDetails} />
      </article>
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