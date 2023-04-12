import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
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

export const NewReservation = () => {
  const START_HOUR_DAY = 6
  const COURTS_NUMBERS = [1, 2, 3, 4, 5, 6]
  const navigate = useNavigate()
  const [startHour, setStartHour] = useState()
  const [endHour, setEndHour] = useState()
  const [courtNumber, setCourtNumbers] = useState()
  const [date, setDate] = useState(() => new Date());
  const [courtsData, setCourtsData] = useState()
  const [initCourtsData, setInitCourtsData] = useState()
  const { width } = useWindowDimensions()
  const todaysDate = dayjs().format('DD/MM/YYYY')
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [showFailureAlert, setShowFailureAlert] = useState(false)
  const [showMessageAlert, setShowMessageAlert] = useState(false)
  const [messageAlert, setMessageAlert] = useState()
  const [warningMessage, setWarningMessage] = useState(false)
  const [, setOpenAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showDuration, setShowDuration] = useState(false)
  const [selectedStartHour, setSelectedStartHour] = useState();
  const [reservationsByDate, setReservationsByDate] = useState([])
  const hoursData = ["6 בבוקר", "7 בבוקר", "8 בבוקר", "9 בבוקר", "10 בבוקר", "11 בבוקר", "12 בצהריים", "1 בצהריים", "2 בצהריים", "3 בצהריים", "4 בצהריים", "5 בערב", "6 בערב", "7 בערב", "8 בערב", "9 בערב", "10 בערב", "11 בערב"]
  const hoursVals = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
  const durationTime = [1, 2, 3, 4]
  let uid = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).uid
  const email = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).email
  let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)
  let _courtsData = JSON.parse(JSON.stringify(initCourtsData))
  const _date = dayjs(date).format('YYYY-MM-DD')


  const getSaturdayDate = () => {
    return dayjs().day(6)
  }

  const saturdayDate = getSaturdayDate()
  useEffect(() => {
    getCourtsData().then(res => {
      setInitCourtsData(res)
      filterCourtsDataByCourtNumber(res)
    })
  })

  const theme = createTheme({
    direction: 'rtl',
  })

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
  })

  const getCourtsData = async () => {
    try {
      let res = await courtService.getCourts()
      return res.data
    } catch (error) {
      navigate('/')
    }
  }

  const isIntersected = (reservation, _startHour, _endHour) => {
    return (_startHour > reservation.startHour && _endHour < reservation.endHour) || // intersect within
      (_startHour === reservation.startHour && _endHour === reservation.endHour) || // exact equal
      (_startHour <= reservation.startHour && _endHour >= reservation.endHour) || // overlap right and left
      (_startHour > reservation.startHour && _startHour < reservation.endHour && _endHour > reservation.endHour) || // intersect right
      (_startHour < reservation.startHour && _endHour > reservation.startHour && _endHour < reservation.endHour) // intersect left
  }

  const filterCourtsDataByCourtNumber = async (res) => {
    // if for a given date and start time, all courts are reserved
    //    splice the start time from the courts data
    let _courtsData = JSON.parse(JSON.stringify(res))
    // Initialize court numbers
    _courtsData.court_numbers = JSON.parse(JSON.stringify(COURTS_NUMBERS))
    // Get reserved courts by date
    const _date = dayjs(date).format('YYYY-MM-DD')
    let reservations = await reservationService.queryByDate(_date)
    // Filter courts data by reserved courts
    // loop over each time, and find out for e.g. 6am all courts are reserved
    hoursVals.forEach(hour => {
      const setCourts = new Set()
      reservations.forEach(reservation => {
        if (reservation.startHour === hour) {
          setCourts.add(reservation.courtNumber)
        }
      });
      if (setCourts.size === 6) {// all courts are reserved
        // TODO splice the start time
        _courtsData.start_time.splice(hour - START_HOUR_DAY, 1)
      }
    })
    setCourtsData(_courtsData);
  }

  const filterCourtsDataByHour = async (_startHour, _endHour) => {
    let _courtsData = JSON.parse(JSON.stringify(initCourtsData))
    // Get reserved courts by date
    const _date = dayjs(date).format('YYYY-MM-DD')
    let reservations = await reservationService.queryByDate(_date)
    // Filter courts data by reserved courts
    reservations.forEach(reservation => {
      if (isIntersected(reservation, _startHour, _endHour)) {
        const index = _courtsData.court_numbers.indexOf(reservation.courtNumber)
        _courtsData.court_numbers.splice(index, 1);
      }
    });
    setCourtsData(_courtsData);
  }

  const filterCourtsDataByDate = async (_date) => {
    let _courtsData = JSON.parse(JSON.stringify(initCourtsData))
    // Get reserved courts by date
    let reservations = await reservationService.queryByDate(_date)
    setReservationsByDate(reservations)
    // Filter courts data by reserved courts
    reservations.forEach(reservation => {
      if (reservation.date === _date && reservation.startHour === startHour) {
        const index = _courtsData.court_numbers.indexOf(reservation.courtNumber)
        _courtsData.court_numbers.splice(index, 1);
      }
    });
    setCourtsData(_courtsData);
  }

  const addReservation = async () => {
    const _date = dayjs(date).format('YYYY-MM-DD')
    const payload = {
      startHour,
      endHour,
      courtNumber,
      date: _date,
      username: email
    }
    if (!loggedUser) {
      navigate('/signin')
    }
    else if (loggedUser || uid) {
      try {
        let resExists = await reservationService.isReservationExists(uid, payload)
        if (!resExists.data.isExists) {
          let _userCredit = await reservationService.getCredit(uid)
          const creditNum = payload.endHour - payload.startHour
          let _successMessage = ""
          // use credit if exists
          if ((_userCredit - creditNum) >= 0) {
            const resCredit = await reservationService.changeCredit(uid, { "userCredit": -creditNum })
            if (resCredit.data.result === 0) {
              _successMessage += "ההזמנה זוכתה מהכרטיסייה - "
            }
          }
          let res = await reservationService.addNewReservation(uid, payload)
          let resByDate = await reservationService.addNewReservationByDate(_date, payload)
          if (res.data.result === 0 && resByDate.data.result === 0) {
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
    filterCourtsDataByHour(startHour, startHour + 1)
    setCourtNumbers()
    setIsLoading(false)
    setShowDuration(true)
  }

  const handleDurationChange = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsLoading(true)
    setEndHour(e.target.value + startHour)
    filterCourtsDataByHour(startHour, e.target.value + startHour)
    setCourtNumbers()
    setIsLoading(false)
  }

  const handleCourtNumberChange = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setCourtNumbers(+e.target.innerHTML)
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

  const renderEndHourSelect = () => {
    // if courts available for startTime (valText), return button
    let _endHour
    courtsData.start_time.map(val => {
      const valText = hoursData[val - START_HOUR_DAY]
      if (!endHour) { _endHour = val + durationTime[0] }
      else { _endHour = endHour }
      if (areCourtsAvailable(val, _endHour, _courtsData, _date)) {
        return (
          <button key={val} value={val} className="start-hour-btn flex" onClick={(e) => handleStartHourSelect(e)}>{valText}</button>
        )
      }
      return null
    })
  }

  const renderStartHourSelect = () => {
    if (courtsData) {
      // let reservations = [] // await reservationService.queryByDate(_date)
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
            {renderEndHourSelect()}
          </div>
        </>
      )
    }
  }

  const areCourtsAvailable = (_startHour, _endHour, _courtsData, _date) => {
    reservationsByDate.forEach(reservation => {
      if (isIntersected(reservation, _startHour, _endHour)) {
        const index = _courtsData.court_numbers.indexOf(reservation.courtNumber)
        _courtsData.court_numbers.splice(index, 1);
      }
    });
    return (_courtsData.court_numbers.length > 0);
  }

  const handleDurationSelect = () => {
    if (showDuration && courtsData) {
      return (
        <FormControl sx={{ m: 3, minWidth: 150 }}>
          <InputLabel>משך שעות</InputLabel>
          <Select
            label="משך שעות"
            labelId="durationHours"
            defaultValue="1"
            onChange={(e) => handleDurationChange(e)}
            required
          >
            {durationTime.map(option => {
              return (
                <MenuItem
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
    if (courtsData) {
      return (
        <>
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

  const handleDateChange = (newValue) => {
    if (validDate(newValue)) {
      setDate(newValue)
      filterCourtsDataByDate(dayjs(newValue).format('YYYY-MM-DD'))
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
    if (warningMessage) {
      setWarningMessage(false)
      return
    }
    if (reason === 'clickaway') {
      navigate('/user-reservations')
      return;
    }
    setOpenAlert(false);
    navigate('/user-reservations')
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
            sx={{ minWidth: '100%', color: '#1d1d1d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}
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
            sx={{ minWidth: '100%', color: '#1d1d1d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}
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

  return (
    <>
      {renderSuccessAlert()}
      {renderFailureAlert()}
      {renderMessageAlert()}
      <form className="container flex-column" onSubmit={handleSubmit}>
        {renderIsLoading()}
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <div dir="rtl" className="form-container flex-column" >
              <Stack spacing={3}>
                <section className="hours-container flex">
                  {renderStartHourSelect()}
                  {handleDurationSelect()}
                </section>

                <section className="date-container flex">
                  {(width < 600) ? <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      label="תאריך"
                      inputFormat="DD/MM/YYYY"
                      // value={date}
                      placeholder={todaysDate}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    /></LocalizationProvider>
                    : <LocalizationProvider dateAdapter={AdapterDayjs}><DesktopDatePicker
                      label="תאריך"
                      inputFormat="DD/MM/YYYY"
                      // value={date}
                      placeholder={todaysDate}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>}
                </section>
                <section className="court-number-section flex-column">
                  <label>מספר מגרש</label>
                  {renderCourtNumberSelect()}
                </section>
              </Stack>
            </div>
          </ThemeProvider>
        </CacheProvider>
        <input
          className='submit-button'
          type='submit'
          disabled={isLoading}
          value='הזמנת מגרש'
        // onClick={handleSubmit}
        />
      </form >
    </>
  )
}
