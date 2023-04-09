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
import { PAGES_IDX } from './pages-idx.jsx'
import { ChooseLanguage } from './choose-language.jsx'

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
  const clubOptions = [ 'על המועדון', 'הגדרות מועדון', 'שעות פעילות', 'ניהול מגרשים', 'נתוני מכירות',  'כרטיסיות', 'משתמשים והרשאות'];
  const optionIcons = [ 'https://res.cloudinary.com/primap/image/upload/v1679990471/General/Dudi%20Sela/Icons/tennis_a5iwfs.svg',
                        'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/club-setting_kpkhkk.svg',
                        'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/hours_d6kik7.svg',
                        'https://res.cloudinary.com/primap/image/upload/v1679990470/General/Dudi%20Sela/Icons/court-management2_fm4mkt.svg',
                        'https://res.cloudinary.com/primap/image/upload/v1679990470/General/Dudi%20Sela/Icons/sales-data_hulrat.svg',
                        'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/punch-card_pfrcqo.svg', 'https://res.cloudinary.com/primap/image/upload/v1679990471/General/Dudi%20Sela/Icons/user-perm_qhbx53.svg']
  const optionFuncs = [ openClubDetails, openClubSettings, openClubHours, openCourtsManager, openSalesDetails, openMembersCard, openUsersPerimission ];
  const mainOptions = ['מנהל ההזמנות', 'המועדון', 'חוגים', 'שפה', 'נתוני מכירות', 'יציאה']

  const openCalendar = (e, index) => {
    setShowScheduleManager(true)
    setShowClubInfo(false)
  }
  const openClubData = (e, index) => {
    setShowClubDetails(true)
  }
  const openClubClasses = (e, index) => {
    setClubInfoIdx(7)
    toggleScheduleVsClubInfo(false, true)
  }
  const openLocalization = (e, index) => {
    setClubInfoIdx(8)
    toggleScheduleVsClubInfo(false, true)
  }
  const logout = (e, index) => {
    console.log(index);
    dispatch(setUserUid(null))
    dispatch(signout())
    navigate('/')
  }
  const mainFuncs = [ openCalendar, openClubData, openClubClasses, openLocalization, openSalesDetails, logout]
  const renderClubSideDrawer = () => {
    if (showClubDetails) {
      return <ClubSideDrawer clubOptions={clubOptions} optionFuncs={optionFuncs} optionIcons={optionIcons} showClubDetails={showClubDetails} setShowClubDetails={setShowClubDetails} />
    }
  }
  const closeChooseLang = () => {
    toggleScheduleVsClubInfo(true, false)
  }

  const renderClubInfo = () => {
    if (showClubInfo) {
      switch (clubInfoIdx) {
        case PAGES_IDX.AboutClub:
          // TODO render the component page for club details
          return <div>על המועדון</div>
        case PAGES_IDX.ClubSettings:
          return <div>הגדרות מועדון</div>
        case PAGES_IDX.ClubHours:
          return <div>שעות פעילות</div>
        case PAGES_IDX.CourtsManager:
          return <div>ניהול מגרשים</div>
        case PAGES_IDX.SalesDetails:
          return <div>נתוני מכירות</div>
        case PAGES_IDX.PunchCards:
          return <div>כרטיסיות</div>
        case PAGES_IDX.UsersPerimssion:
          return <div>משתמשים והרשאות</div>
        case PAGES_IDX.ClubClasses:
          return <div>חוגים</div>
        case PAGES_IDX.ChooseLanguage:
          return <ChooseLanguage isHebrewLang={isHebrewLang} setIsHebrewLang={setIsHebrewLang} closeChooseLang={closeChooseLang} />
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