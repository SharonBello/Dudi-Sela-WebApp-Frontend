import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ScheduleDay } from './schedule-day.jsx'
import { getCurrentDate, weekDayInHebrew } from './schedule-helper.js'
import SecondarySideDrawer from "./secondary-side-drawer.jsx"
import PrimarySideDrawer from "./primary-side-drawer.jsx"
import { signout, setUserUid } from '../..//store/actions/user.actions.js'
import { UsersPermission } from '../club-manager/users-permission.jsx'
import { ClubClasses } from '../club-manager/club-classes.jsx'
import { AboutClub } from '../club-manager/about-club.jsx'
import { ClubSettings } from '../club-manager/club-settings.jsx'
import { ClubHours } from '../club-manager/club-hours.jsx'
import { PunchCards } from '../club-manager/punch-cards.jsx'
import { CourtsManager } from '../club-manager/courts-manager.jsx'
import { SalesDetails } from '../club-manager/sales-details.jsx'
import { Homepage } from '../homepage/homepage.jsx'

export const ClubManager = () => {
  const [date, setDate] = useState(getCurrentDate())
  const [notFormattedDate, setNotFormattedDate] = useState(new Date())
  const [weekDay, setWeekDay] = useState(dayjs().format('dddd'))
  const [showScheduleManager, setShowScheduleManager] = useState(true)
  const [showPrimaryDrawer, setShowPrimaryDrawer] = useState(false)
  const [showSecondaryDrawer, setShowSecondaryDrawer] = useState(false)
  const [showClubClasses, setShowClubClasses] = useState(false)
  const [, setShowSalesDetails] = useState(false)
  const [, setShowAboutClub] = useState(false)
  const [, setShowClubSetting] = useState(false)
  const [, setShowClubHours] = useState(false)
  const [, setShowCourtsManager] = useState(false)
  const [, setShowMembersCard] = useState(false)
  const [, setShowUserPermissions] = useState(false)
  // const [isHebrewLang, setIsHebrewLang] = useState(true)
  // const [showClubInfo, setShowClubInfo] = useState(false)
  // const [clubInfoIdx, setClubInfoIdx] = useState()
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

  const toggleDrawers = (isShowPrimary, isShowSecondary) => {
    setShowPrimaryDrawer(isShowPrimary)
    setShowSecondaryDrawer(isShowSecondary)
  }

  const openSecondaryDrawer = (e) => {
    e.stopPropagation()
    setShowSecondaryDrawer(true)
    setShowPrimaryDrawer(!showPrimaryDrawer)
    // toggleDrawers(false, true)
  }

  const openScheduleManager = (e) => {
    e.stopPropagation()
    setShowScheduleManager(true)
    toggleDrawers(false, false)
    return (<ScheduleDay />)
  }

  const openClubClasses = (e) => {
    e.stopPropagation()
    setShowClubClasses(true)
    toggleDrawers(false, true)
    if (showClubClasses) return (<ClubClasses />)
  }

  const openSalesDetails = (e) => {
    e.stopPropagation()
    console.log('openSalesDetails - e.target.value', e.target)
    setShowSalesDetails(true)
    toggleDrawers(false, false)
    if (e.target.value === 'salesDetails') return (<SalesDetails />)
  }

  const logout = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(setUserUid(null))
    dispatch(signout())
    navigate('/')
    toggleDrawers(false, false)
  }
  const mainFuncs = [openCalendar, openClubData, openClubClasses, openLocalization, openSalesDetails, logout]
  const renderClubSideDrawer = () => {
    if (showClubDetails) {
      return <ClubSideDrawer clubOptions={clubOptions} optionFuncs={optionFuncs} optionIcons={optionIcons} showClubDetails={showClubDetails} setShowClubDetails={setShowClubDetails} />
    }

    console.warn(`No component found for className: ${className}`);
  }

  // const openDrawerComponent = (e, className, component) => {
  //   e.stopPropagation()
  //   console.log('openSalesDetails - e.target', e.target)
  //   console.log('openSalesDetails - e.target.value', e.target.value)
  //   console.log("🚀 ~ file: club-manager.jsx:71 ~ openDrawerComponent ~ className:", className)
  //   console.log("🚀 ~ file: club-manager.jsx:71 ~ openDrawerComponent ~ component:", component)
  // }

  const openDrawerComponent = (className) => {
    const primaryDrawerItem = primaryDrawerList.find((item) => item.className === className);

    if (primaryDrawerItem) {
      // Render the corresponding component based on the matching className
      return primaryDrawerItem.onClick();
    }

    console.warn(`No component found for className: ${className}`);
  }

  const renderClubInfo = () => {
    if (showClubInfo) {
      switch (clubInfoIdx) {
        case PAGES_IDX.AboutClub:
          // TODO render the component page for club details
          return <ClubDetails />
        case PAGES_IDX.ClubSettings:
          return <ClubSettings />
        case PAGES_IDX.ClubHours:
          return <ClubHours />
        case PAGES_IDX.CourtsManager:
          return <CourtsManager />
        case PAGES_IDX.SalesDetails:
          return <SalesDetails />
        case PAGES_IDX.PunchCards:
          return <PunchCards />
        case PAGES_IDX.UsersPerimssion:
          return <UsersPermission />
        case PAGES_IDX.ClubClasses:
          return <ClubClasses />
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
          <Typography component="h1" variant="h5" style={{ width: "100%", textAlign: "center" }}>האקדמיה לטניס דודי סלע</Typography>
          <ul className="flex align-center justify-between clean-list schedule-header" style={{ marginBlock: "2rem", width: "100%", flex: 1 }}>
            <li style={{ width: "20%" }}><Typography>{weekDayInHebrew[weekDay]} {date}</Typography></li>
            <li>
              <ul className='clean-list flex align-center justify-center' style={{ gap: "1rem" }}>
                <li className="schedule-daily-btn"><button onClick={openPreviousDaySchedule}/>אתמול</li>
                <li className="schedule-daily-btn"><button onClick={openTodaysSchedule}/>היום</li>
                <li className="schedule-daily-btn"><button onClick={openNextDaySchedule}/>מחר</li>
              </ul>
            </li>
            <li className="flex" style={{ width: "20%", justifyContent: "end" }}>
              <img src="https://res.cloudinary.com/primap/image/upload/v1677420672/General/Dudi%20Sela/DudiLogo_wdbxir.svg" className="app-logo"
                alt="logo" />
            </li>
          </ul>
          <ScheduleDay mDate={date} dayOfWeek={weekDay} />
        </>
      )
    }
  }

  return (
    <div className="flex-column align-center container schedule-container">
      <article className="side-drawer flex">
        {renderSecondarySideDrawer()}
        <PrimarySideDrawer primaryDrawerList={primaryDrawerList} setShowPrimaryDrawer={setShowPrimaryDrawer} openDrawerComponent={openDrawerComponent} />
      </article>
      {renderScheduleManager()}
      {/* {renderClubInfo()} */}
    </div>
  )
}