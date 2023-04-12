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

  const openClubSetting = (e) => {
    e.stopPropagation()
    setShowClubSetting(true)
    toggleDrawers(false, false)
    return (<ClubSettings />)
  }

  const openAboutClub = (e) => {
    e.stopPropagation()
    setShowAboutClub(true)
    toggleDrawers(false, false)
    return (<AboutClub />)
  }

  const openClubHours = (e) => {
    e.stopPropagation()
    setShowClubHours(true)
    toggleDrawers(false, false)
    return (<ClubHours />)
  }

  const openCourtsManager = (e) => {
    e.stopPropagation()
    setShowCourtsManager(true)
    toggleDrawers(false, false)
    return (<CourtsManager />)
  }

  const openMembersCard = (e) => {
    e.stopPropagation()
    setShowMembersCard(true)
    toggleDrawers(false, false)
    return (<PunchCards />)
  }

  const openUserPermissions = (e) => {
    e.stopPropagation()
    setShowUserPermissions(true)
    toggleDrawers(false, false)
    return (<UsersPermission />)
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

  const primaryDrawerList = [
    {
      text: 'מנהל ההזמנות',
      className: 'schedule-manager',
      icon: 'https://res.cloudinary.com/primap/image/upload/v1679990470/General/Dudi%20Sela/Icons/court-management2_fm4mkt.svg',
      onClick: openScheduleManager,
      component: <ScheduleDay />,
    },
    {
      text: 'המועדון',
      className: 'secondary-drawer',
      icon: 'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/tennis_a5iwfs.svg',
      onClick: openSecondaryDrawer,
      component: <secondaryDrawerList />,
    },
    {
      text: 'חוגים',
      className: 'club-classes',
      icon: 'https://res.cloudinary.com/primap/image/upload/v1681245209/classes-icon_lje2ds.svg',
      onClick: openClubClasses,
      component: <ClubClasses />,
    },
    {
      text: 'נתוני מכירות',
      className: 'sales-details',
      icon: 'https://res.cloudinary.com/primap/image/upload/v1679990470/General/Dudi%20Sela/Icons/sales-data_hulrat.svg',
      onClick: openSalesDetails,
      component: <SalesDetails />,
    },
    {
      text: 'יציאה',
      className: 'log-out',
      icon: 'https://res.cloudinary.com/primap/image/upload/v1681245384/sign-out-icon_negt9b.svg',
      onClick: logout,
      component: <Homepage />,
    }
  ]

  const secondaryDrawerList = [
    {
      text: 'על המועדון',
      icon: 'https://res.cloudinary.com/primap/image/upload/v1679990471/General/Dudi%20Sela/Icons/tennis_a5iwfs.svg',
      onClick: openAboutClub,
    },
    {
      text: 'הגדרות מועדון',
      icon: 'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/club-setting_kpkhkk.svg',
      onClick: openClubSetting,
    },
    {
      text: 'שעות פעילות',
      icon: 'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/hours_d6kik7.svg',
      onClick: openClubHours,
    },
    {
      text: 'ניהול מגרשים',
      icon: 'https://res.cloudinary.com/primap/image/upload/v1679990470/General/Dudi%20Sela/Icons/court-management2_fm4mkt.svg',
      onClick: openCourtsManager,
    },
    {
      text: 'נתוני מכירות',
      icon: 'https://res.cloudinary.com/primap/image/upload/v1679990470/General/Dudi%20Sela/Icons/sales-data_hulrat.svg',
      onClick: openSalesDetails,
    },
    {
      text: 'כרטיסיות',
      icon: 'https://res.cloudinary.com/primap/image/upload/v1679990469/General/Dudi%20Sela/Icons/punch-card_pfrcqo.svg',
      onClick: openMembersCard,
    },
    {
      text: 'משתמשים והרשאות',
      icon: 'https://res.cloudinary.com/primap/image/upload/v1679990471/General/Dudi%20Sela/Icons/user-perm_qhbx53.svg',
      onClick: openUserPermissions,
    }
  ]

  const renderSecondarySideDrawer = () => {
    if (showSecondaryDrawer) {
      return <SecondarySideDrawer
        secondaryDrawerList={secondaryDrawerList}
        showSecondaryDrawer={showSecondaryDrawer}
        setShowSecondaryDrawer={setShowSecondaryDrawer}
      />
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
        {renderSecondarySideDrawer()}
        <PrimarySideDrawer primaryDrawerList={primaryDrawerList} setShowPrimaryDrawer={setShowPrimaryDrawer} openDrawerComponent={openDrawerComponent} />
      </article>
      {renderScheduleManager()}
      {/* {renderClubInfo()} */}
    </div>
  )
}