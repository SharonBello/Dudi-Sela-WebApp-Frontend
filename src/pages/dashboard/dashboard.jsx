import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { instructorService } from '../../services/instructor.service.js';
import { reservationService } from '../../services/reservation.service.js';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import { getCurrentDate, getRows, hoursDataArr, columnsData, weekDayInHebrew, getTbColumns, fillEventSlots } from '../club-manager/club-manager/club-components/schedule-day/schedule-helper.js';
import { FrequencyTypes } from '../club-manager/club-manager/club-helper.jsx'
import { courtService } from '../../services/court.service.js';

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
  const [clubClasses, setClubClasses] = useState([])

  const getReservationsByDate = async (_rows, date) => {
    const reservations = await reservationService.queryByDate(date)
    events.current.push(...reservations)
    reservations.forEach(reservation => {
      fillEventSlots(_rows, reservation, START_HOUR_DAY)
    });
    setRows(_rows)
  }

  const setTodaysEvents = async (mDate, dayOfWeek, _rows) => {
    let reservations = await reservationService.queryByDayofweek(dayOfWeek.toLowerCase())
    events.current.push(...reservations)
    reservations.forEach(reservation => {
      if (reservation.startDate === mDate || reservation.frequencyType === FrequencyTypes[1]) { // show single day by date or weekly event
        fillEventSlots(_rows, reservation, START_HOUR_DAY)
      }
    });
    getReservationsByDate(_rows, mDate)
  }

  const getClubClasses = useCallback(async () => {
    let res = await courtService.getClubClasses()
    setClubClasses(res.data.club_classes)
  }, []);

  const getInstructors = useCallback(async () => {
    let instructors = await instructorService.getInstructors()
    setTennisInstructors(instructors)
  }, [setTennisInstructors])

  const getColumns = useCallback(() => {
    const _columns = getTbColumns(columnsData, clubClasses, tennisInstructors);
    setColumns(_columns);
  }, [tennisInstructors, clubClasses])

  const initSchedule = async () => {
    const res = await courtService.getClubCourts()
    return getRows(res.data.club_courts)
  }

  const updateScheduleView = useCallback(async (date, dayOfWeek)=> {
    const _rows = await initSchedule()
    getInstructors()
    getClubClasses()
    setTodaysEvents(date, dayOfWeek, _rows)
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