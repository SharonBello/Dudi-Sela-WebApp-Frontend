import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLoggedUser } from '../../store/actions/user.actions.js'

import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { useWindowDimensions } from '../../hooks/useWindowDimensions.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { reservationService } from '../../services/reservation.service'
import { courtService } from '../../services/court.service.js'
import { MenuItem, Select } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { prefixer } from 'stylis'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
}))

export const NewReservation = ({ newReservationModal, closeModal }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [startHour, setStartHour] = useState()
  const [endHour, setEndHour] = useState()
  const [courtNumber, setCourtNumber] = useState()
  const [date, setDate] = useState(new Date())
  const [courtsData, setCourtsData] = useState()
  const { width } = useWindowDimensions()
  const classes = useStyles()
  const todaysDate = dayjs().format('DD/MM/YYYY')
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showFailureAlert, setShowFailureAlert] = useState(false)
  const [showMessageAlert, setShowMessageAlert] = useState(false)
  const [messageAlert, setMessageAlert] = useState()
  const [OpenAlert, setOpenAlert] = useState(false)
  let uid = useSelector((storeState) => storeState.userModule.uid)
  let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)

  useEffect(() => {
    dispatch(setLoggedUser)
  }, [loggedUser])

  useEffect(() => {
    getCourtsData().then(res => {
      setCourtsData(res)
    })
  }, [])

  const theme = createTheme({
    direction: 'rtl',
  })

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  })

  const getCourtsData = async () => {
    let res = await courtService.getCourts()
    return res.data
  }

  const addReservation = async () => {
    const _date = dayjs(date).format('YYYY-MM-DD')
    const payload = {
      startHour,
      endHour,
      courtNumber,
      date: _date
    }
    if (!loggedUser) {
      navigate('/signin')
    }
    else if (loggedUser || uid) {
      try {
        let res = await reservationService.addNewReservation(uid, payload)
        if (res.data.result === 0) {
          setShowSuccessAlert(true)
        } else {
          setShowSuccessAlert(false)
        }
      }
      catch (err) {
        setShowFailureAlert(true)
      }
    }
  }

  const handleStartHourChange = (e) => {
    setStartHour(e.target.value)
  }

  const handleEndHourChange = (e) => {
    setEndHour(e.target.value)
  }

  const handleCourtNumberChange = (e) => {
    setCourtNumber(+e.target.innerHTML)
    e.stopPropagation()
    e.preventDefault()
  }

  const validateForm = (e) => {
    if (!startHour || !endHour || !courtNumber) {
      return "נא למלא את כל השדות"
    }
    if (startHour >= endHour) {
      return "שעת הסיום חייבת להיות מאוחרת משעת ההתחלה"
    }
    return true
  }
  const handleSubmit = (e) => {
    if (validateForm() === true) {
      addReservation()
    } else {
      setMessageAlert(validateForm())
      setShowMessageAlert(true)
    }

    e.stopPropagation()
    e.preventDefault()
  }

  const renderStartHourSelect = () => {
    if (courtsData) {
      return (
        <FormControl sx={{ m: 3, minWidth: 150 }}>
          <InputLabel id="startHour">שעת התחלה</InputLabel>

          <Select
            labelId="startHour"
            id="start-hour-select"
            value={startHour}
            onChange={(e) => handleStartHourChange(e)}
            label="שעת התחלה"
            required
          >
            {courtsData.start_time.map(option => {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      )
    }
  }

  const renderEndHourSelect = () => {
    if (courtsData) {
      return (
        <FormControl sx={{ m: 3, minWidth: 150 }}>
          <InputLabel id="endHour">שעת סיום</InputLabel>
          <Select
            label="שעת סיום"
            labelId="endHour"
            id="end-hour-select"
            value={endHour}
            onChange={(e) => handleEndHourChange(e)}
            required
          >
            {courtsData.end_time.map(option => {
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

  const handleChange = (newValue) => {
    setDate(newValue)
  }

  const handleCloseAlert = (event, reason) => {
    setShowSuccessAlert(false)
    setShowFailureAlert(false)
    setShowMessageAlert(false)
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
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
            // margin={5}
            // color="#C9DB39"
            // backgroundColor="#1d1d1d"
            variant="filled"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            ההזמנה נקלטה בהצלחה</Alert>
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
            // margin={5}
            variant="filled"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            ההזמנה נכשלה</Alert>
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
            // margin={5}
            variant="filled"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            {messageAlert}</Alert>
        </Snackbar>
      )
    }
  }
  return (
    <>
      {renderSuccessAlert()}
      {renderFailureAlert()}
      {renderMessageAlert()}
      <form className="container flex flex-column" onSubmit={handleSubmit}>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <div className="form-container flex flex-column" dir="rtl">
              <Stack spacing={3}>
                <section className="hours-container flex">
                  {renderStartHourSelect()}
                  {renderEndHourSelect()}
                </section>

                <section className="date-container flex">
                  {(width < 600) ? <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      label="תאריך"
                      inputFormat="DD/MM/YYYY"
                      value={date}
                      placeholder={todaysDate}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                      /></LocalizationProvider>
                      : <LocalizationProvider dateAdapter={AdapterDayjs}><DesktopDatePicker
                      label="תאריך"
                      inputFormat="DD/MM/YYYY"
                      value={date}
                      placeholder={todaysDate}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>}
                </section>
                <section className="court-number-section flex flex-column">
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
          value='הזמנת מגרש'
          // onClick={handleSubmit}
        />
      </form >
    </>
  )
}
