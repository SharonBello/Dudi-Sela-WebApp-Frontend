import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { instructorService } from '../../services/instructor.service.js';
import { reservationService } from '../../services/reservation.service.js';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import { getCurrentDate, getRows, hoursDataArr, columnsData, weekDayInHebrew } from '../club-manager/club-manager/club-components/schedule-day/schedule-helper.js';
import { FrequencyTypes } from '../club-manager/club-manager/club-helper.jsx'

export const Dashboard = () => {
  const [date] = useState(getCurrentDate())
  const [tennisInstructors, setTennisInstructors] = useState([])
  const [rows, setRows] = useState(getRows())
  const START_HOUR_DAY = 6
  const events = useRef([])
  const [columns, setColumns] = useState([])
  const [weekDay] = useState(dayjs().format('dddd'))
  const [dayOfWeek] = useState(weekDay.toLowerCase())
  const [dayInHebrew] = useState(weekDayInHebrew[weekDay])

  const fillEventSlots = (_rows, reservation) => {
    const hrStart = reservation.startHour.split(":")[0]
    const minStart = reservation.startHour.split(":")[1] === "30" ? 0.5 : 0
    const hrEnd = reservation.endHour.split(":")[0]
    const minEnd = reservation.endHour.split(":")[1] === "30" ? 0.5 : 0
    let startHourTxt
    let numTimeSlots = (Number(hrEnd)+Number(minEnd)) - (Number(hrStart) + Number(minStart))
    numTimeSlots*=2
    for (let i = 0; i < numTimeSlots; i++) {
      startHourTxt = hoursDataArr[(Number(hrStart) + Number(minStart))*2 - START_HOUR_DAY*2 +i]
      if (reservation.instructor) {
        _rows[reservation.courtNumber - 1][startHourTxt] = reservation.instructor
      } else if (reservation.username) {
        _rows[reservation.courtNumber - 1][startHourTxt] = reservation.username
      } else {
        _rows[reservation.courtNumber - 1][startHourTxt] = reservation.title
      }
    }
  }

  const getReservationsByDate = async (_rows, date) => {
    const reservations = await reservationService.queryByDate(date)
    events.current.push(...reservations)
    reservations.forEach(reservation => {
      fillEventSlots(_rows, reservation)
    });
    setRows(_rows)
  }

  const setTodaysEvents = async (date, dayOfWeek) => {
    let _rows = getRows()
    let reservations = await reservationService.queryByDayofweek(dayOfWeek.toLowerCase())
    events.current.push(...reservations)
    const _date = getCurrentDate()
    reservations.forEach(reservation => {
      if (reservation.startDate === _date || reservation.frequencyType === FrequencyTypes[1]) { // show single day by date or weekly event
        fillEventSlots(_rows, reservation)
      }
    });
    getReservationsByDate(_rows, date)
  }

  const getInstructors = useCallback(async () => {
    let instructors = await instructorService.getInstructors()
    setTennisInstructors(instructors)
  }, [setTennisInstructors])

  const getColumns = useCallback(() => {
    const _columns = [];
    columnsData.forEach(col => {
      _columns.push({
        field: col.hour,
        headerName: col.headerName,
        cellClassName: (params) => {
          if(!tennisInstructors.includes(params.value) && params.value !== "" && col.headerName !== "מספר מגרש") {
            return 'single-event';
          }
          if (params.value.length > 0 && col.headerName !== "מספר מגרש") {
            return 'weekly-event';
          }
          return;
        },
        type: 'singleSelect',
        width: 140,
      })
    });
    setColumns(_columns);
  }, [tennisInstructors])

  const initSchedule = () => {
    let _rows = getRows()
    setRows(_rows)
  }

  const updateScheduleView = useCallback((date, dayOfWeek)=> {
    initSchedule()
    getInstructors()
    setTodaysEvents(date, dayOfWeek)
    getColumns()
  }, [])

  useEffect(() => {
    updateScheduleView(date, dayOfWeek)
  }, [date, dayOfWeek])


  return (
    <div className='flex-column align-center justify-center container-block dashboard-container'>
      <Typography component="h1" variant="h5">האקדמיה לטניס דודי סלע</Typography>
      <Typography>{dayInHebrew} {date}</Typography>

      <Box className="dashboard" sx={{ width: '100%', height: 500 }}>
      <DataGrid
          isCellEditable={false}
          columnDefs={{editable: false}}
          rows={rows}
          columns={columns}
          sx={{ m: 2 }}
          experimentalFeatures={{ newEditingApi: true }}
          hideFooter={true}
        />
      </Box>
    </div>

  );
}