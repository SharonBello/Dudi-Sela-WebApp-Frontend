import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { reservationService } from '../../../../../services/reservation.service.js';
import { STORAGE_KEY_LOGGED_USER } from '../../../../../services/user.service.js';
import { Loader } from '../../../../../components/loader.jsx';
import { getRows, hoursData, hoursDataArr, columnsData } from '../../../club-manager/club-components/schedule-day/schedule-helper.js';
import { EditEventModal } from '../../../../edit-event/edit-event.jsx';
import { instructorService } from '../../../../../services/instructor.service.js';

export const ScheduleDay = ({ mDate, dayOfWeek }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [rows, setRows] = useState(getRows())
  const [openEditEvent, setOpenEditEvent] = useState(false)
  const [selectedStartHour, setSelectedStartHour] = useState();
  const [selectedCourts, setSelectedCourts] = useState([]);
  const [selectedCourtNumber, setSelectedCourtNumber] = useState([]);
  const [tennisInstructors, setTennisInstructors] = useState([])

  const START_HOUR_DAY = 6

  const getInstructors = useCallback(async () => {
    let instructors = await instructorService.getInstructors()
    setTennisInstructors(instructors)
  }, [setTennisInstructors])

  const handleEditEvent = (e) => {
    if (e.row.courtNumber>0)
      setSelectedCourtNumber(e.row.courtNumber)
    else
      setSelectedCourtNumber(e.row.courtNumber.split("-")[0])
    setSelectedStartHour(e.field)
    setOpenEditEvent(true)
  }

  const getColumns = () => {
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
            return 'week-event';
          }
          return;
        },
        type: 'singleSelect',
        width: 140,
        editable: true,
        renderEditCell: { handleEditEvent },
      })
    });
    return _columns;
  }
  const columns = getColumns();
  const getReservationsByDate = async (_rows) => {
    let reservations = await reservationService.queryByDate(mDate)
    reservations.forEach(reservation => {
      const startHourTxt = hoursDataArr[reservation.startHour - START_HOUR_DAY]
      _rows[reservation.courtNumber - 1][startHourTxt] = reservation.username //.split("@")[0]
    });
    setRows(_rows)
  }
  const setTodaysEvents = async () => {
    let _rows = getRows()
    let reservations = await reservationService.queryByDayofweek(dayOfWeek.toLowerCase())
    reservations.forEach(reservation => {
      const hrStart = JSON.parse(reservation.hours).startHour.split(":")[0]
      const startHourTxt = hoursDataArr[hrStart - START_HOUR_DAY]
      _rows[reservation.courtNumber - 1][startHourTxt] = reservation.instructor //.split("@")[0]
    });
    getReservationsByDate(_rows)
  }
  useEffect(() => {
    getInstructors()
    initSchedule()
    setTodaysEvents()
  }, [mDate])

  const initSchedule = () => {
    let _rows = getRows()
    setRows(_rows)
  }

  const closeEditEvent = () => {
    setOpenEditEvent(false)
    setTodaysEvents()
  }

  const renderModal = () => {
    if (openEditEvent) {
      return (
        <EditEventModal tennisInstructors={tennisInstructors} selectedCourtNumber={selectedCourtNumber} openEditEvent={openEditEvent} closeEditEvent={closeEditEvent} mDate={mDate} dayOfWeek={dayOfWeek} selectedStartHour={selectedStartHour} selectedCourts={selectedCourts}/>
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
          onCellClick={(e) => handleEditEvent(e)}
          rows={rows}
          columns={columns}
          editMode="row"
          sx={{ m: 2 }}
          experimentalFeatures={{ newEditingApi: true }}
          hideFooter={true}
        />
        {renderIsLoading()}
      </Box>

    </>
  );
}
//  <div className='flex'>
//         <button
//           className='submit-button'
//           type='submit'
//           onClick={handleSubmit}
//           disabled={isLoading}
//         >עדכן</button>
//         <button
//           className='submit-button small-margin'
//           type='submit'
//           onClick={handleImport}
//           disabled={isLoading}
//         >יבוא תבנית הזמנות</button>
//         <button
//           className='submit-button small-margin'
//           type='submit'
//           onClick={handleExport}
//           disabled={isLoading}
//         >יצוא תבנית הזמנות</button>
//       </div>
// const handleSubmit = async () => {
//   setIsLoading(true)
//   let uid = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).uid
//   const weeklyReservations = []
//   rows.forEach(row => {
//     Object.keys(row).forEach(key => {
//       if (key !== "id" && key !== "courtNumber" && row[key] !== "") {
//         const hour = hoursData[key]
//         weeklyReservations.push({ username: row[key], startHour: hour, endHour: hour + 1, courtNumber: row["id"], date: mDate })
//       }
//     })
//   })
//   for (let i = 0; i < weeklyReservations.length; i++) {
//     const payload = weeklyReservations[i];
//     let resExists = await reservationService.isReservationExists(uid, payload)
//     if (!resExists.data.isExists) {
//       let res = await reservationService.addNewReservation(uid, payload)
//       let resByDate = await reservationService.addNewReservationByDate(mDate, payload)
//       if (res.data.result === 0 && resByDate.data.result === 0) {
//         console.log("success")
//       } else {
//         console.log("failure")
//       }
//     }
//   }
//   setIsLoading(false)
// }

// const handleImport = async () => {
//   // setIsLoading(true)
//   // let reservations = await reservationService.queryByDayofweek(dayOfWeek.toLowerCase())
//   // let _rows = [...rows]
//   // reservations.forEach(item => {
//   //   const startHourTxt = hoursDataArr[item.startHour - START_HOUR_DAY]
//   //   _rows[item.courtNumber - 1][startHourTxt] = item.username //.split("@")[0]
//   // });
//   // setRows(_rows)
//   // setIsLoading(false)
// }

// const handleExport = async () => {
//   setIsLoading(true)
//   // let scheduleData = JSON.parse(sessionStorage.getItem("dudi-sela-schedule"))
//   // scheduleData = scheduleData[dayOfWeek.toLowerCase()]
//   const scheduleData = []
//   rows.forEach(row => {
//     Object.keys(row).forEach(key => {
//       if (key !== "id" && key !== "courtNumber" && row[key] !== "") {
//         const hour = hoursData[key]
//         const username = row[key]
//         scheduleData.push({ startHour: hour, endHour: hour + 1, courtNumber: row["id"], date: mDate, username: username })
//       }
//     })
//   })
//   // const res = await reservationService.resetByWeekDay(dayOfWeek.toLowerCase())
//   // const res2 = await reservationService.postByWeekDay(dayOfWeek.toLowerCase(), scheduleData)
//   setIsLoading(false)
// }
