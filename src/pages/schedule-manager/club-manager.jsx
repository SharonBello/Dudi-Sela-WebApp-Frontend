import * as React from 'react'
import { useState } from 'react'
import dayjs from 'dayjs'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ScheduleDay } from './schedule-day.jsx'
import { getCurrentDate, weekDayInHebrew } from './schedule-helper.js'
import ClubSideDrawer from "./club-side-drawer.jsx"
import MainSideDrawer from "./main-side-drawer.jsx"

export const ClubManager = () => {
  const [date, setDate] = useState(getCurrentDate())
  const [notFormattedDate, setNotFormattedDate] = useState(new Date())
  const [weekDay, setWeekDay] = useState(dayjs().format('dddd'))
  const [showClubDetails, setShowClubDetails] = useState(false)
  const [showScheduleManager, setShowScheduleManager] = useState(true)
  const [showClubInfo, setShowClubInfo] = useState(false)
  const [clubInfoIdx, setClubInfoIdx] = useState()

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
  const toggleScheduleVsClubInfo = (showManager, showClubInfo) => {
    setShowScheduleManager(showManager)
    setShowClubInfo(showClubInfo)
  }
  const openClubDetails = (e, index) => {
    setClubInfoIdx(index)
    toggleScheduleVsClubInfo(false, true)
  }
  const openClubSettings = (e, index) => {
    setClubInfoIdx(index)
    toggleScheduleVsClubInfo(false, true)
  }
  const openClubHours = (e, index) => {
    setClubInfoIdx(index)
    toggleScheduleVsClubInfo(false, true)
  }
  const openCourtsManager = (e, index) => {
    setClubInfoIdx(index)
    toggleScheduleVsClubInfo(false, true)
  }
  const openMembersCard = (e, index) => {
    setClubInfoIdx(index)
    toggleScheduleVsClubInfo(false, true)
  }
  const openUsersPerimission = (e, index) => {
    setClubInfoIdx(index)
    toggleScheduleVsClubInfo(false, true)
  }
  const openSalesDetails = (e, index) => {
    setClubInfoIdx(index)
    toggleScheduleVsClubInfo(false, true)
  }
  //ניהול מגרשים אופציה שנייה - https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/court-management_lj7jqo.svg
  const clubOptions = ['על המועדון', 'הגדרות מועדון', 'שעות פעילות', 'ניהול מגרשים', 'כרטיסיות', 'משתמשים והרשאות', 'נתוני מכירות'];
  const optionIcons = ['tennis', 'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/club-setting_kpkhkk.svg', 'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/hours_d6kik7.svg', 'https://res.cloudinary.com/primap/image/upload/v1679990470/General/Dudi%20Sela/Icons/court-management2_fm4mkt.svg', 'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/punch-card_pfrcqo.svg', 'https://res.cloudinary.com/primap/image/upload/v1679990471/General/Dudi%20Sela/Icons/user-perm_qhbx53.svg', 'https://res.cloudinary.com/primap/image/upload/v1679990470/General/Dudi%20Sela/Icons/sales-data_hulrat.svg']
  const optionFuncs = [ openClubDetails, openClubSettings, openClubHours, openCourtsManager, openMembersCard, openUsersPerimission, openSalesDetails ];
  const mainOptions = ['מנהל ההזמנות', 'מועדון', 'חוגים', 'נתוני מכירות', 'שפה', 'יציאה']
  const openCalendar = (e, index) => {
    console.log(index);
    setShowScheduleManager(true)
    setShowClubInfo(false)
  }
  const openClubData = (e, index) => {
    console.log(index);
    setShowClubDetails(true)
  }
  const openClubClasses = (e, index) => {
    console.log(index);
  }
  const openLocalization = (e, index) => {
    console.log(index);
  }
  const logout = (e, index) => {
    console.log(index);
  }
  const mainFuncs = [ openCalendar, openClubData, openClubClasses, openSalesDetails, openLocalization, logout]
  const renderClubSideDrawer = () => {
    if (showClubDetails) {
      return <ClubSideDrawer clubOptions={clubOptions} optionFuncs={optionFuncs} optionIcons={optionIcons} showClubDetails={showClubDetails} setShowClubDetails={setShowClubDetails} />
    }
  }
  const renderClubInfo = () => {
    if (showClubInfo) {
      switch (clubInfoIdx) {
        case 0:
          // TODO render the component page for club details
          return <div>על המועדון</div>
        case 1:
          return <div>הגדרות מועדון</div>
        case 2:
          return <div>שעות פעילות</div>
        case 3:
          return <div>ניהול מגרשים</div>
        case 4:
          return <div>כרטיסיות</div>
        case 5:
          return <div>משתמשים והרשאות</div>
        case 6:
          return <div>נתוני מכירות</div>
        default:
          break;
      }
    }
  }
  const renderScheduleManager = () => {
    if (showScheduleManager) {
      return (
        <>
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
        </>
      )
    }
  }
  return (
    <div className="flex-column align-center justify-between container schedule-container">
      <article className="side-drawer flex">
        {renderClubSideDrawer()}
        <MainSideDrawer mainOptions={mainOptions} mainFuncs={mainFuncs} />
      </article>
      {renderScheduleManager()}
      {renderClubInfo()}
    </div>

  )
}