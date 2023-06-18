import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useWindowDimensions } from '../../hooks/useWindowDimensions.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { reservationService } from '../../services/reservation.service'
import { courtService } from '../../services/court.service.js'
import { MenuItem, Select } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Loader } from '../../components/loader.jsx';
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service';
import { DateFormat } from '../club-manager/club-manager/club-helper.jsx'
import { AvailablePunchCards } from './available-punch-cards.jsx';
import Button from '@mui/material/Button';

export const NewReservation = () => {
  const START_HOUR_DAY = 6
  const navigate = useNavigate()
  const [startHour, setStartHour] = useState()
  const [endHour, setEndHour] = useState()
  const [durationInHrs, setDurationInHrs] = useState(1)
  const [courtNumber, setCourtNumber] = useState()
  const [date, setDate] = useState(() => new Date());
  const [courtsData, setCourtsData] = useState()
  const [initialCourtNumbers, setInitialCourtNumbers] = useState([])
  const { width } = useWindowDimensions()
  const todaysDate = dayjs().format('DD-MM-YYYY')
  const shownDate = dayjs().format('YYYY-MM-DD')
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [showFailureAlert, setShowFailureAlert] = useState(false)
  const [showMessageAlert, setShowMessageAlert] = useState(false)
  const [messageAlert, setMessageAlert] = useState()
  const [warningMessage, setWarningMessage] = useState(false)
  const [, setOpenAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showDuration, setShowDuration] = useState(false)
  const [selectedStartHour, setSelectedStartHour] = useState();
  const [reservationsByDate, setReservationsByDate] = useState([])
  const [clubCourts, setClubCourts] = useState([])
  const [punchCards, setPunchCards] = useState([])
  const [showPunchCards, setShowPunchCards] = useState(false)

  const hoursData = ["6 בבוקר", "7 בבוקר", "8 בבוקר", "9 בבוקר", "10 בבוקר", "11 בבוקר", "12 בצהריים", "1 בצהריים", "2 בצהריים", "3 בצהריים", "4 בצהריים", "5 בערב", "6 בערב", "7 בערב", "8 בערב", "9 בערב", "10 בערב", "11 בערב"]
  const hoursVals = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
  const durationTime = [1, 2, 3, 4]
  let uid = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).uid
  const email = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).email
  let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)

  const getSaturdayDate = () => {
    return dayjs().day(6)
  }

  const saturdayDate = getSaturdayDate()

  const getPunchCards = useCallback(async () => {
      let res = await courtService.getPunchCards()
      return res.data.punch_cards
    }, [])

  useEffect(() => {
    if (punchCards.length === 0) {
        getPunchCards().then(res => {
        setPunchCards(res)
        })
    }
  }, [getPunchCards])

  const handleCourtsData = useCallback(async (date) => {
    setIsLoading(true)
    try {
      let res = await courtService.getClubCourts()
      const courtsData = {
        start_time: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        end_time: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        court_numbers: res.data.club_courts.map( court => court.name)
      }
      setCourtsData(courtsData);
      if (initialCourtNumbers.length === 0) setInitialCourtNumbers(res.data.club_courts.map( court => court.name))
      let _date
      if (!date) {
        date = new Date()
      }
      _date = dayjs(date).format(DateFormat)
      setSelectedStartHour()
      setDurationInHrs(1)
      handleDateChange(_date, courtsData)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    handleCourtsData()
    }, [])

  const theme = createTheme({
    direction: 'rtl',
  })

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
  })

  const isIntersected = (reservation, _startHour, _endHour) => {
    return (_startHour > reservation.startHour && _endHour < reservation.endHour) || // intersect within
    (_startHour === reservation.startHour && _endHour === reservation.endHour) || // exact equal
      (_startHour < reservation.startHour && _endHour > reservation.endHour) || // overlap right and left
      (_startHour > reservation.startHour && _startHour < reservation.endHour && _endHour > reservation.endHour) || // intersect right
      (_startHour < reservation.startHour && _endHour > reservation.startHour && _endHour < reservation.endHour) || // intersect left
      (_startHour === reservation.startHour) ||
      (_endHour === reservation.endHour)
  }

  const handleCourtsSet= (courtsSet, reservation, hour) => {
    const _reservation = JSON.parse(JSON.stringify(reservation))
    _reservation.startHour = Number(reservation.startHour.split(":")[0])
    _reservation.endHour = Number(reservation.endHour.split(":")[0])
    if (hour>=_reservation.startHour && hour<=_reservation.endHour) {
      courtsSet.add(_reservation.courtNumber)
    }
  }
  const handleDateChange = async (_date, mCourtsData) => {
    if (!mCourtsData) {
      mCourtsData = courtsData
    }
    let _courtsData = JSON.parse(JSON.stringify(mCourtsData))
    const reservations = await reservationService.queryByDate(_date)
    setReservationsByDate(reservations)
    const dayOfWeek = dayjs(_date).format('dddd').toLowerCase()
    const reservations2 = await reservationService.queryByDayofweek(dayOfWeek) // query club events
    const _start_time = []
    hoursVals.forEach(hour => {
      const courtsSet = new Set()
      reservations.forEach(reservation => {
        handleCourtsSet(courtsSet, reservation, hour)
      });
      reservations2.forEach(reservation => {
        handleCourtsSet(courtsSet, reservation, hour)
      });
      if (courtsSet.size !== _courtsData.court_numbers.length) {// if all courts are not reserved
        _start_time.push(hour)
      }
    })
    _courtsData.start_time = _start_time
    setCourtsData(_courtsData);
    setIsLoading(false)
  }

  const filterCourtNumbers = async (_startHour, _endHour, _date) => {
    let _courtsData = {}
    _courtsData = JSON.parse(JSON.stringify(courtsData))
    _courtsData['court_numbers'] = JSON.parse(JSON.stringify(initialCourtNumbers));
    let reservations = await reservationService.queryByDate(_date) // query user reservations
    reservations.forEach(reservation => {
      const _reservation = JSON.parse(JSON.stringify(reservation))
      _reservation.startHour = Number(reservation.startHour.split(":")[0])
      _reservation.endHour = Number(reservation.endHour.split(":")[0])
      if (isIntersected(_reservation, _startHour, _endHour)) {
        const index = _courtsData.court_numbers.indexOf(reservation.courtNumber)
        if (index!==-1) {
          _courtsData.court_numbers.splice(index, 1);
        }
      }
    });
    const dayOfWeek = dayjs(_date).format('dddd').toLowerCase()
    reservations = await reservationService.queryByDayofweek(dayOfWeek) // query club events
    reservations.forEach(reservation => {
      const _reservation = JSON.parse(JSON.stringify(reservation))
      _reservation.startHour = Number(reservation.startHour.split(":")[0])
      _reservation.endHour = Number(reservation.endHour.split(":")[0])
      if (reservation.dayOfWeek === dayOfWeek && isIntersected(_reservation, _startHour, _endHour)) {
        const index = _courtsData.court_numbers.indexOf(reservation.courtNumber)
        if (index!==-1) {
          _courtsData.court_numbers.splice(index, 1);
        }
      }
    });
    setCourtsData(_courtsData);
  }

  const addReservation = async () => {
    const _date = dayjs(date).format(DateFormat)
    const _startHour = startHour.toString()+":00"
    const _endHour = endHour.toString()+":00"
    const payload = {
      startHour: _startHour,
      endHour: _endHour,
      courtNumber:courtNumber,
      date: _date,
      username: email,
      uid
    }
    if (!loggedUser) {
      navigate('/signin')
    }
    else if (loggedUser || uid) {
      try {
        // TODO: await reservationService.isReservationExists(uid, payload)
        let resExists = false
        if (!resExists) { //!resExists.data.isExists
          let _userCredit = await reservationService.getCredit(uid)
          const creditNum = payload.endHour.split(":")[0] - payload.startHour.split(":")[0]
          let _successMessage = ""
          // use credit if exists
          if ((_userCredit - creditNum) >= 0) {
            const resCredit = await reservationService.changeCredit(uid, { "userCredit": -creditNum, "mail": loggedUser.email, "date": todaysDate })
            if (resCredit.data.result === 0) {
              _successMessage += "ההזמנה זוכתה מהכרטיסיה - "
            }
          }
          let res = await reservationService.addNewReservation(payload)
          payload["refResId"] = res.data.id
          let resUser = await reservationService.addNewReservationToUser(payload)
          if (res.data.result === 0 && resUser.data.result === 0) { //&& resByDate.data.result === 0
            _successMessage += "המגרש הוזמן בהצלחה"
            setSuccessMessage(_successMessage)
            setShowSuccessAlert(true)
          } else {
            setShowSuccessAlert(false)
          }
        } else {
          setMessageAlert("המגרש כבר לא פנוי להזמנה")
          setShowMessageAlert(true)
        }
      }
      catch (err) {
        setShowFailureAlert(true)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleStartHourSelect = (e, index) => {
    e.stopPropagation()
    e.preventDefault()
    setSelectedStartHour(index)
    setIsLoading(true)
    const startHour = parseInt(e.currentTarget.value)
    setStartHour(startHour)
    setEndHour(startHour + 1)
    setDurationInHrs(1)
    const _date = dayjs(date).format(DateFormat)
    filterCourtNumbers(startHour, startHour + 1, _date)
    setCourtNumber()
    setIsLoading(false)
    setShowDuration(true)
  }

  const handleDurationChange = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsLoading(true)
    setDurationInHrs(e.target.value)
    setEndHour(e.target.value + startHour)
    const _date = dayjs(date).format(DateFormat)
    filterCourtNumbers(startHour, e.target.value + startHour, _date)
    setCourtNumber()
    setIsLoading(false)
  }

  const handleCourtNumberChange = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setCourtNumber(+e.target.innerHTML)
  }

  const validateForm = (e) => {
    // if  (!(startHour && courtNumber)) {
    //   return "נא למלא את כל השדות"
    // }
    if (startHour >= endHour) {
      return "שעת הסיום חייבת להיות מאוחרת משעת ההתחלה"
    }
    return true
  }

  const handleSubmit = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (validateForm() === true) {
      setIsLoading(true)
      addReservation()
    } else {
      setMessageAlert(validateForm())
      setShowMessageAlert(true)
    }
  }

  const renderStartHourSelect = () => {
    if (courtsData && !isLoading) {
      // let reservations = [] // await reservationService.queryByDate(_date)
      const currentHour = dayjs().hour()
      const _date = dayjs(date).format(DateFormat)
      if (_date === shownDate) {
        return (
          <>
            <div className="start-hour-container flex">
              {courtsData.start_time.map((val, index) => {
                if (val > currentHour) {
                  const valText = hoursData[val - START_HOUR_DAY]
                  return (
                    <button key={val} value={val} className={(selectedStartHour === index) ? ("start-hour-btn flex active") : ("start-hour-btn flex")}
                      onClick={(e) => handleStartHourSelect(e, index)}>{valText}</button>
                  )
                }
              })}
            </div>
          </>
        )
      } else {
        return (
          <>
            <div className="start-hour-container flex">
              {courtsData.start_time.map((val, index) => {
                const valText = hoursData[val - START_HOUR_DAY]
                return (
                  <button key={val} value={val} className={(selectedStartHour === index) ? ("start-hour-btn flex active") : ("start-hour-btn flex")}
                    onClick={(e) => handleStartHourSelect(e, index)}>{valText}</button>
                )
              })}
            </div>
          </>
        )
      }
    }
  }

  const handleDurationSelect = () => {
    if (showDuration) {
      return (
        <FormControl sx={{ m: 3, minWidth: 150 }}>
          <InputLabel>משך שעות</InputLabel>
          <Select
            label="משך שעות"
            labelId="durationHours"
            defaultValue={durationInHrs}
            value={durationInHrs}
            onChange={(e) => handleDurationChange(e)}
            required
          >
            {durationTime.map(option => {
              return (
                <MenuItem
                disabled={isLoading}
                  key={option}
                  value={option}>
                  {option}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      )
    }
  }

  const renderCourtNumberSelect = () => {
    if (courtsData && !isLoading) {
      return (
        <>
          <label>מספר מגרש</label>
          <div className="court-number-container flex">
            {courtsData.court_numbers.map(option => {
              return (
                <button className="court-number-btn flex" onClick={(e) => handleCourtNumberChange(e)}>{option}</button>
              )
            })}
          </div>
        </>
      )
    }
  }

  const handleSelectDate = (newValue) => {
    if (validDate(newValue)) {
      setDate(newValue)
      const _date = dayjs(newValue).format(DateFormat)
      setStartHour()
      setEndHour()
      setCourtNumber()
      setDurationInHrs(1)
      handleCourtsData(_date)
    } else {
      setWarningMessage(true)
      setMessageAlert("לא ניתן להזמין מגרש אחרי שבת הקרובה")
      setShowMessageAlert(true)
    }
  }

  const validDate = (newValue) => {
    const selectedDate = new Date(newValue)
    return selectedDate <= saturdayDate.toDate()
  }

  const handleCloseAlert = (event, reason) => {
    setShowSuccessAlert(false)
    setShowFailureAlert(false)
    setShowMessageAlert(false)
    setShowPunchCards(false)
    if (warningMessage) {
      setWarningMessage(false)
      return
    }
    // if (reason === 'clickaway') {
    //   navigate('/user-reservations')
    //   return;
    // }
    setOpenAlert(false);
    // navigate('/user-reservations')
  }

  const alertAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="#F2F6F7"
        onClick={handleCloseAlert}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  const renderSuccessAlert = () => {
    if (showSuccessAlert) {
      return (
        <Snackbar
          open={true}
          autoHideDuration={60000}
          onClose={handleCloseAlert}
          action={alertAction}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            severity="success"
            onClose={handleCloseAlert}
            sx={{
              minWidth: '100%',
              color: '#1d1d1d',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#C9DB39'
            }}
            spacing={5}
            variant="filled"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            {successMessage}</Alert>
        </Snackbar>
      )
    }
  }

  const renderFailureAlert = () => {
    if (showFailureAlert) {
      return (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          action={alertAction}
        >
          <Alert
            severity="error"
            onClose={handleCloseAlert}
            sx={{ minWidth: '100%', color: '#1d1d1d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}
            spacing={5}
            variant="filled"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            הזמנת המגרש נכשלה</Alert>
        </Snackbar>
      )
    }
  }

  const renderMessageAlert = () => {
    if (showMessageAlert) {
      return (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          action={alertAction}
        >
          <Alert
            severity="info"
            onClose={handleCloseAlert}
            sx={{
              minWidth: '100%',
              color: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#dc0000'
            }}
            spacing={5}
            variant="filled"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            {messageAlert}</Alert>
        </Snackbar>
      )
    }
  }

  const renderIsLoading = () => {
    if (isLoading) {
      return (
        <Loader />
      )
    }
  }

  const handleSelectDisounts = () => {
    return (
      setShowPunchCards(true)
    )
  }

  const closePunchCards = () => {
    setShowPunchCards(false)
  }

  const selectPunchCard = async (e, card) => {
    let _userCredit = await reservationService.getCredit(uid)
    const resCredit = await reservationService.changeCredit(uid, { "userCredit": Number(card.creditAmount), "mail": loggedUser.email, "date": todaysDate })
    if (resCredit.data.result === 0) {
      let _message = `${card.creditAmount} זיכויים הוספו לכרטיסייה (ראה אזור אישי)`
      setShowSuccessAlert(true)
      setSuccessMessage(_message)
    }
  }

  const renderPunchCards = () => {
    if (showPunchCards) {
      return (
        <AvailablePunchCards punchCards={punchCards} showPunchCards={showPunchCards} closePunchCards={closePunchCards} selectPunchCard={selectPunchCard}/>
      )
    }
  }
  return (
    <>
      {renderSuccessAlert()}
      {renderFailureAlert()}
      {renderMessageAlert()}
      {renderPunchCards()}
      <form dir="rtl" className="container flex-column form-container" onSubmit={handleSubmit}>
        {renderIsLoading()}
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <Stack spacing={4} sx={{ display: "flex-column", alignItems: "center", justifyContent: "justify-between", gap: "1.5rem" }}>
              <section className="date-container flex-row">
                <LocalizationProvider dateAdapter={AdapterDayjs} locale="en-gb">
                    <DatePicker
                        label="תאריך"
                        format="DD-MM-YYYY"
                        defaultValue={dayjs(shownDate)}
                        onChange={handleSelectDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Button className="punch-card" onClick={handleSelectDisounts}>כרטיסיות</Button>
              </section>

              <section className="hours-container flex-column align-center justify-between">
                {renderStartHourSelect()}
                {handleDurationSelect()}
              </section>
              <section className="court-number-section flex-column">
                {renderCourtNumberSelect()}
              </section>
              <input
                className='submit-button'
                type='submit'
                disabled={isLoading}
                value='הזמנת מגרש'
              />
            </Stack>

          </ThemeProvider>
        </CacheProvider>
      </form >
    </>
  )
}
