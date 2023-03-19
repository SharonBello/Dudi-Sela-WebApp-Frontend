import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';

export const EventTime = ({theme, cacheRtl }) => {
  const { width } = useWindowDimensions()
  const [date, setDate] = useState(() => new Date());
  const [startHour, setStartHour] = useState()
  const [endHour, setEndHour] = useState()
  const todaysDate = dayjs().format('DD/MM/YYYY')

  const validDate = (newValue) => {
    const selectedDate = new Date(newValue)
    return selectedDate
  }

  const handleDateChange = (dateChanged) => {
    if (validDate(dateChanged)) {
        setDate(dateChanged)
    }
  }

  return (
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
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                    : <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="תאריך"
                        inputFormat="DD/MM/YYYY"
                        // value={date}
                        placeholder={todaysDate}
                        onChange={handleDateChange}
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
  )
}