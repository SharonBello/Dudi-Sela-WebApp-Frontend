import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Loader } from '../../components/loader.jsx';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

export const EditEventModal = ({openEditEvent, closeEditEvent, mDate, dayOfWeek}) => {

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
  const [onceAMonth, setOnceAMonth] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  const renderIsLoading = () => {
    if (isLoading) {
      return (
        <Loader />
      )
    }
  }

  return (
    <>
        {renderIsLoading()}
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
    </>
  );
}
