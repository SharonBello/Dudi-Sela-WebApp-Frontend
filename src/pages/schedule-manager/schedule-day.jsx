import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { instructorService } from '../../services/instructor.service.js';
import { reservationService } from '../../services/reservation.service.js';
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service';
import { Loader } from '../../components/loader.jsx';
import { getRows, hoursData, hoursDataArr, columnsData } from './schedule-helper.js';
import { EditEventModal } from '../edit-event/edit-event.jsx';

export const ScheduleDay = ({ mDate, dayOfWeek }) => {
  const [instructors, setInstructors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [rows, setRows] = useState(getRows())
  const [openEditEvent, setOpenEditEvent] = useState(false)
  // const [selectedStartHour, setSelectedStartHour] = useState();
  const START_HOUR_DAY = 6

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
    getTodaysReservations()
  }, [mDate, getTodaysReservations])

  const initSchedule = () => {
    let _rows = getRows()
    setRows(_rows)
  }

  const closeEditEvent = () => {
    setOpenEditEvent(false)
  }

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
        <EditEventModal openEditEvent={openEditEvent} closeEditEvent={closeEditEvent} mDate={mDate} dayOfWeek={dayOfWeek} />
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