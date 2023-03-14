import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
// import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { useWindowDimensions } from '../../hooks/useWindowDimensions.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { CustomTypeEditComponent } from '../../data/scheduleData.js';
// import { instructorService } from '../../services/instructor.service.js';
import { reservationService } from '../../services/reservation.service.js';
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service';
import { Loader } from '../../components/loader.jsx';
import { getRows, hoursData, hoursDataArr, columnsData } from './schedule-helper.js';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

CustomTypeEditComponent.propTypes = {
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export const ScheduleDay = ({ mDate, dayOfWeek }) => {
  // const [instructors, setInstructors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [rows, setRows] = useState(getRows())
  const [openEditEvent, setOpenEditEvent] = useState(false)
  const [startHour, setStartHour] = useState()
  const [endHour, setEndHour] = useState()
  // const [selectedStartHour, setSelectedStartHour] = useState();
  const START_HOUR_DAY = 6
  const [scheduleType, setScheduleType] = useState('schedule');
  const { width } = useWindowDimensions()
  const [date, setDate] = useState(() => new Date());
  const todaysDate = dayjs().format('DD/MM/YYYY')
  const [checked, setChecked] = useState(true);
  const [once, setOnce] = useState('');
  const [onceAWeek, setOnceAWeek] = useState('');
  const [onceAMonth, setOnceAMonth] = useState('');

  const handleOccurrence = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (e.target.value === 'once') setOnce(e.target.value);
    if (e.target.value === 'onceAWeek') setOnceAWeek(e.target.value);
    if (e.target.value === 'onceAMonth') setOnceAMonth(e.target.value);
  };

  const handleScheduleType = (e, newScheduleType) => {
    e.stopPropagation()
    e.preventDefault()
    if (newScheduleType !== null) setScheduleType(newScheduleType);
  };

  const handleCheckedClass = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setChecked(e.target.checked);
  };

  const theme = createTheme({
    direction: 'rtl',
  })

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
  })

  const validDate = (newValue) => {
    const selectedDate = new Date(newValue)
    return selectedDate
  }

  const handleDateChange = (e, newValue) => {
    e.stopPropagation()
    e.preventDefault()
    if (validDate(newValue)) {
      setDate(newValue)
    }
  }

  const handleEditEvent = () => {
    setOpenEditEvent(true)
  }

  const getColumns = () => {
    const _columns = [];
    columnsData.forEach(col => {
      _columns.push({
        field: col.hour,
        headerName: col.headerName,
        type: 'singleSelect',
        // valueOptions: instructors,
        width: 140,
        editable: true,
        renderEditCell: { handleEditEvent },
        // renderEditCell: (params) => <CustomTypeEditComponent {...params} handleValueChange={handleValueChange} />,
        // cellClassName: (params) => {
        //   if (instructors.includes(params.value)) {
        //     return 'reservation-by-instructor';
        //   } else if (params.value !== "" && col.headerName !== "מספר מגרש") {
        //     return 'reservation-by-user';
        //   } else {
        //     return '';
        //   }
        // },
      })
    });
    return _columns;
  }
  const columns = getColumns();

  const getTodaysReservations = useCallback(async () => {
    let reservations = await reservationService.queryByDate(mDate)
    let _rows = getRows()
    reservations.forEach(reservation => {
      const startHourTxt = hoursDataArr[reservation.startHour - START_HOUR_DAY]
      _rows[reservation.courtNumber - 1][startHourTxt] = reservation.username //.split("@")[0]
    });
    setRows(_rows)
  }, [mDate])

  useEffect(() => {
    initSchedule()
    // getInstructors()
    getTodaysReservations()
  }, [mDate, getTodaysReservations])

  const initSchedule = () => {
    let _rows = getRows()
    setRows(_rows)
  }

  // const handleValueChange = (value) => {
  //   const idx = rows.findIndex(row => (row.hour === value.hour && row.courtNumber === value.courtNumber))
  //   let _rows = [...rows]
  //   _rows[idx] = value
  //   setRows(_rows)
  // }

  const closeEditEvent = () => {
    setOpenEditEvent(false)
  }

  // const getInstructors = async () => {
  //   let instructors = await instructorService.getInstructors()
  //   setInstructors(instructors)
  // }

  const handleSubmit = async () => {
    setIsLoading(true)
    let uid = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).uid
    const weeklyReservations = []
    rows.forEach(row => {
      Object.keys(row).forEach(key => {
        if (key !== "id" && key !== "courtNumber" && row[key] !== "") {
          const hour = hoursData[key]
          weeklyReservations.push({ username: row[key], startHour: hour, endHour: hour + 1, courtNumber: row["id"], date: mDate })
        }
      })
    })
    for (let i = 0; i < weeklyReservations.length; i++) {
      const payload = weeklyReservations[i];
      let resExists = await reservationService.isReservationExists(uid, payload)
      if (!resExists.data.isExists) {
        let res = await reservationService.addNewReservation(uid, payload)
        let resByDate = await reservationService.addNewReservationByDate(mDate, payload)
        if (res.data.result === 0 && resByDate.data.result === 0) {
          console.log("success")
        } else {
          console.log("failure")
        }
      }
    }
    setIsLoading(false)
  }

  const handleImport = async () => {
    setIsLoading(true)
    let reservations = await reservationService.queryByWeekDay(dayOfWeek.toLowerCase())
    let _rows = [...rows]
    reservations.forEach(item => {
      const startHourTxt = hoursDataArr[item.startHour - START_HOUR_DAY]
      _rows[item.courtNumber - 1][startHourTxt] = item.username //.split("@")[0]
    });
    setRows(_rows)
    setIsLoading(false)
  }

  const handleExport = async () => {
    setIsLoading(true)

    // let scheduleData = JSON.parse(sessionStorage.getItem("dudi-sela-schedule"))
    // scheduleData = scheduleData[dayOfWeek.toLowerCase()]
    const scheduleData = []
    rows.forEach(row => {
      Object.keys(row).forEach(key => {
        if (key !== "id" && key !== "courtNumber" && row[key] !== "") {
          const hour = hoursData[key]
          const username = row[key]
          scheduleData.push({ startHour: hour, endHour: hour + 1, courtNumber: row["id"], date: mDate, username: username })
        }
      })
    })
    // const res = await reservationService.resetByWeekDay(dayOfWeek.toLowerCase())
    // const res2 = await reservationService.postByWeekDay(dayOfWeek.toLowerCase(), scheduleData)
    setIsLoading(false)
  }

  const renderModal = () => {
    if (openEditEvent) {
      return (
        <Modal
          open={openEditEvent}
          onClose={closeEditEvent}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-overlay"
        >
          <Box className="modal-box">
            <Container className="modal-content">
              <Box className="modal-header">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  הזמנה חדשה
                </Typography>
              </Box>

              <Box className="modal-body">
                <Box className="schedule-type-container flex-column">
                  <Typography className="modal-body-text">
                    בחירת סוג הזמנה
                  </Typography>
                  <Box className="toggle-form-container flex align-center justify-between">
                    <ToggleButtonGroup
                      value={scheduleType}
                      exclusive
                      onChange={handleScheduleType}
                      className="flex align-center toggle-schedule-type"
                    >
                      <ToggleButton value="schedule">
                        <Box className="flex align-center justify-between">
                          <CalendarMonthIcon />
                          <Typography>
                            הזמנה
                          </Typography>
                        </Box>
                      </ToggleButton>
                      <ToggleButton value="internal-schedule">
                        <Box className="flex align-center">
                          <PermContactCalendarIcon />
                          <Typography>
                            הזמנה פנימית
                          </Typography>
                        </Box>
                      </ToggleButton>
                      <ToggleButton value="unavailable">
                        <Box className="flex align-center">
                          <EventBusyIcon />
                          <Typography>
                            לא זמין
                          </Typography>
                        </Box>
                      </ToggleButton>
                    </ToggleButtonGroup>

                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox
                          checked={checked}
                          onChange={(e) => handleCheckedClass(e)}
                          inputProps={{ 'aria-label': 'controlled' }}
                          sx={{
                            color: "#C9DB39",
                            '&.Mui-checked': {
                              color: "#C9DB39",
                            },
                          }}
                        />}
                        label="צרף לחוג" />
                    </FormGroup>
                  </Box>
                </Box>

                <CacheProvider value={cacheRtl}>
                  <ThemeProvider theme={theme}>
                    <div dir="rtl" className="form-container flex align-center" >
                      <Box className="date-time-container flex-column">
                        <Typography className="modal-body-text">
                          בחירת זמן רצוי
                        </Typography>
                        <Box className="date-time-select flex align-center">
                          <section className="date-container flex justify-between align-center">
                            {(width < 600) ?
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                  label="תאריך"
                                  inputFormat="DD/MM/YYYY"
                                  // value={date}
                                  placeholder={todaysDate}
                                  onChange={(e) => handleDateChange(e)}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </LocalizationProvider>
                              : <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                  label="תאריך"
                                  inputFormat="DD/MM/YYYY"
                                  // value={date}
                                  placeholder={todaysDate}
                                  onChange={(e) => handleDateChange(e)}
                                // renderInput={(params) => <TextField {...params} />}
                                />
                              </LocalizationProvider>}
                          </section>
                          <section className="hours-container flex align-center justify-between">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <Container>
                                <TimeField
                                  label='שעת התחלה'
                                  value={startHour}
                                  placeholder={startHour}
                                  onChange={(newValue) => setStartHour(newValue)}
                                />
                                <TimeField
                                  label='שעת סיום'
                                  value={endHour}
                                  placeholder={endHour}
                                  onChange={(newValue) => setEndHour(newValue)}
                                />
                              </Container>
                            </LocalizationProvider>
                          </section>
                        </Box>
                      </Box>
                    </div>
                  </ThemeProvider>
                </CacheProvider>

                <CacheProvider value={cacheRtl}>
                  <ThemeProvider theme={theme}>
                    <div dir="rtl" className="occurrence-container flex align-center" >
                      <Box className="schedule-occurrence-container flex-column">
                        <Typography className="modal-body-text">
                          בחירת תדירות
                        </Typography>
                        <Box style={{ maxWidth: "10rem" }} className="select-occurrence-container">
                          <FormControl fullWidth>
                            <InputLabel id="select-occurrence-label">תדירות</InputLabel>
                            <Select
                              labelId="select-occurrence-label"
                              className="select-occurrence"
                              value={once}
                              label="אירוע חד פעמי"
                              onChange={(e) => handleOccurrence(e)}
                            >
                              <MenuItem value={once} className="select-occurrence-item">אירוע חד פעמי</MenuItem>
                              <MenuItem value={onceAWeek} className="select-occurrence-item">שבועי</MenuItem>
                              <MenuItem value={onceAMonth} className="select-occurrence-item">חודשי</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                    </div>
                  </ThemeProvider>
                </CacheProvider>

              </Box>
            </Container>
          </Box>
        </Modal>
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
      {renderModal()}
      <Box className="schedule" sx={{ width: '100%', height: 500 }}>
        <DataGrid
          onCellClick={() => handleEditEvent()}
          rows={rows}
          columns={columns}
          editMode="row"
          experimentalFeatures={{ newEditingApi: true }}
          hideFooter={true}
        // autoHeight
        />
        {renderIsLoading()}
      </Box>
      <div className='flex'>
        <button
          className='submit-button'
          type='submit'
          onClick={handleSubmit}
          disabled={isLoading}
        >עדכן</button>
        <button
          className='submit-button small-margin'
          type='submit'
          onClick={handleImport}
          disabled={isLoading}
        >יבוא תבנית הזמנות</button>
        <button
          className='submit-button small-margin'
          type='submit'
          onClick={handleExport}
          disabled={isLoading}
        >יצוא תבנית הזמנות</button>
      </div>
    </>
  );
}