import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ScheduleDay } from './schedule-day.jsx'
import { getCurrentDate, weekDayInHebrew } from './schedule-helper.js'
import ClubSideDrawer from "./club-side-drawer.jsx"
import MainSideDrawer from "./main-side-drawer.jsx"
import { signout, setUserUid } from '../..//store/actions/user.actions.js'
import { UsersPermission } from '../club-manager/users-permission.jsx'
import { ClubClasses } from '../club-manager/club-classes.jsx'
import { ClubDetails } from '../club-manager/club-details.jsx'
import { ClubSettings } from '../club-manager/club-settings.jsx'
import { ClubHours } from '../club-manager/club-hours.jsx'
import { PunchCards } from '../club-manager/punch-cards.jsx'
import { CourtsManager } from '../club-manager/courts-manager.jsx'
import { SalesDetails } from '../club-manager/sales-details.jsx'

export const ClubManager = () => {
  const [date, setDate] = useState(getCurrentDate())
  const [notFormattedDate, setNotFormattedDate] = useState(new Date())
  const [weekDay, setWeekDay] = useState(dayjs().format('dddd'))
  const [showClubDetails, setShowClubDetails] = useState(false)
  const [isHebrewLang, setIsHebrewLang] = useState(true)
  const [showScheduleManager, setShowScheduleManager] = useState(true)
  const [showClubInfo, setShowClubInfo] = useState(false)
  const [clubInfoIdx, setClubInfoIdx] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
  const openClubDetails = (e, title) => {
    setClubInfoIdx(title)
    toggleScheduleVsClubInfo(false, true)
  }
  const openClubSettings = (e, title) => {
    setClubInfoIdx(title)
    toggleScheduleVsClubInfo(false, true)
  }
  const openClubHours = (e, title) => {
    setClubInfoIdx(title)
    toggleScheduleVsClubInfo(false, true)
  }
  const openCourtsManager = (e, title) => {
    setClubInfoIdx(title)
    toggleScheduleVsClubInfo(false, true)
  }
  const openMembersCard = (e, title) => {
    setClubInfoIdx(title)
    toggleScheduleVsClubInfo(false, true)
  }
  const openUsersPerimission = (e, title) => {
    setClubInfoIdx(title)
    toggleScheduleVsClubInfo(false, true)
  }
  const openSalesDetails = (e, title) => {
    setClubInfoIdx(title)
    toggleScheduleVsClubInfo(false, true)
  }
  const openClubClasses = (e, title) => {
    setClubInfoIdx(title)
    toggleScheduleVsClubInfo(false, true)
  }
  //ניהול מגרשים אופציה שנייה - https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/court-management_lj7jqo.svg
  const clubOptions = ['על המועדון', 'הגדרות מועדון', 'שעות פעילות', 'ניהול מגרשים', 'נתוני מכירות', 'כרטיסיות', 'משתמשים והרשאות', 'חוגים'];
  const optionIcons = ['https://res.cloudinary.com/primap/image/upload/v1679990471/General/Dudi%20Sela/Icons/tennis_a5iwfs.svg',
    'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/club-setting_kpkhkk.svg',
    'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/hours_d6kik7.svg',
    'https://res.cloudinary.com/primap/image/upload/v1679990470/General/Dudi%20Sela/Icons/court-management2_fm4mkt.svg',
    'https://res.cloudinary.com/primap/image/upload/v1679990470/General/Dudi%20Sela/Icons/sales-data_hulrat.svg',
    'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/punch-card_pfrcqo.svg', 'https://res.cloudinary.com/primap/image/upload/v1679990471/General/Dudi%20Sela/Icons/user-perm_qhbx53.svg', 'https://res.cloudinary.com/primap/image/upload/v1679990471/General/Dudi%20Sela/Icons/user-perm_qhbx53.svg']
  const optionFuncs = [openClubDetails, openClubSettings, openClubHours, openCourtsManager, openSalesDetails, openMembersCard, openUsersPerimission, openClubClasses];
  const mainOptions = ['מנהל ההזמנות', 'המועדון', 'נתוני מכירות', 'יציאה']

  const openCalendar = (e, index) => {
    setShowScheduleManager(true)
    setShowClubInfo(false)
  }
  const openClubData = (e, index) => {
    setShowClubDetails(true)
  }
  const logout = (e, index) => {
    console.log(index);
    dispatch(setUserUid(null))
    dispatch(signout())
    navigate('/')
  }
  const mainFuncs = [openCalendar, openClubData, openSalesDetails, logout]
  const renderClubSideDrawer = () => {
    if (showClubDetails) {
      return <ClubSideDrawer clubOptions={clubOptions} optionFuncs={optionFuncs} optionIcons={optionIcons} showClubDetails={showClubDetails} setShowClubDetails={setShowClubDetails} />
    }
  }

  const renderClubInfo = () => {
    if (showClubInfo) {
      switch (clubInfoIdx) {
        case 'על המועדון':
          // TODO render the component page for club details
          return <ClubDetails />
        case 'הגדרות מועדון':
          return <ClubSettings />
        case 'שעות פעילות':
          return <ClubHours />
        case 'ניהול מגרשים':
          return <CourtsManager />
        case 'נתוני מכירות':
          return <SalesDetails />
        case 'כרטיסיות':
          return <PunchCards />
        case 'משתמשים והרשאות':
          return <UsersPermission />
        case 'חוגים':
          return <ClubClasses />
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
            }}>
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
    <div className="flex-column align-center container schedule-container">
      <article className="side-drawer flex">
        {renderClubSideDrawer()}
        <MainSideDrawer mainOptions={mainOptions} mainFuncs={mainFuncs} />
      </article>
      {renderScheduleManager()}
      {renderClubInfo()}
    </div>

  )
}