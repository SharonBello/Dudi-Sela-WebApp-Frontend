import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLoggedUser } from '../../store/actions/user.actions.js'
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers';

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
import { prefixer } from 'stylis'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
}));

export const NewReservation = ({ newReservationModal, closeModal }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [startHour, setStartHour] = useState()
  const [endHour, setEndHour] = useState()
  const [courtNumber, setCourtNumber] = useState()
  const [date, setDate] = useState(new Date())
  const [courtsData, setCourtsData] = useState()
  const { width } = useWindowDimensions()
  const classes = useStyles();
  const todaysDate = dayjs('2014-08-18T21:11:54');

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
    console.log('courts data', res.data)
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
      // uid = loggedUser.data.uid
      try {
        let res = await reservationService.addNewReservation(uid, payload)
        if (res.data.result === 0) {
          alert("המגרש הוזמן בהצלחה")
        } else {
          alert("לא ניתן להזמין מגרש ")
        }
      }
      catch (err) {
        alert("failed to add")
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
  }
  const handleSubmit = (e) => {
    addReservation()
    e.stopPropagation()
    e.preventDefault()
  }

  const renderStartHourSelect = () => {
    if (courtsData) {
      return (
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={startHour}
          onChange={(e) => handleStartHourChange(e)}
          label="שעת התחלה"
        >
          {courtsData.start_time.map(option => {
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            )
          })}
        </Select>
      )
    }
  }

  const renderEndHourSelect = () => {
    if (courtsData) {
      return (
        <Select
          label="שעת סיום"
          labelId="endHour"
          id="endHour"
          value={endHour}
          onChange={(e) => handleEndHourChange(e)}
        >
          {courtsData.end_time.map(option => {
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            )
          })}
        </Select>
      )
    }
  }

  const renderCourtNumberSelect = () => {
    if (courtsData) {
      return (
        <>
          <div className={classes.root}>
            {courtsData.court_numbers.map(option => {
              return (
                <Grid container key={option} value={option}>
                    {/* <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group"> */}
                      <Button onClick={(e) => handleCourtNumberChange(e)}>{option}</Button>
                    {/* </ButtonGroup> */}
                  </Grid>
              )
            })}
          </div>
        </>
      )
    }
  }

  const handleChange = (newValue) => {
    setDate(newValue)
  };

  return (
    <form className="container">
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div dir="rtl">
            <Stack spacing={2}>
              <label>שעת התחלה</label>

              {renderStartHourSelect()}
              <label>שעת סיום</label>
              {renderEndHourSelect()}


              {(width < 600) ? <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label="תאריך"
                  inputFormat="MM/DD/YYYY"
                  value={date}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                /></LocalizationProvider>
                : <LocalizationProvider dateAdapter={AdapterDayjs}><DesktopDatePicker
                  label="תאריך"
                  inputFormat="MM/DD/YYYY"
                  value={todaysDate}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>}
              <label>מספר מגרש</label>
              {renderCourtNumberSelect()}
            </Stack>
          </div>
        </ThemeProvider>
      </CacheProvider>
      <input
        className='submitButton'
        type='submit'
        value='הזמן מגרש'
        onClick={handleSubmit}
      />
    </form >
  )
}
