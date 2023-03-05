import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { CustomTypeEditComponent } from '../../data/scheduleData.js';
import { instructorService } from '../../services/instructor.service.js';
import { reservationService } from '../../services/reservation.service.js';
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service';
import { Loader } from '../../components/loader.jsx';
import { getRows, hoursData, hoursDataArr, columnsData } from './schedule-helper.js';

CustomTypeEditComponent.propTypes = {
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};


export const ScheduleDay = ({mDate, dayOfWeek}) => {
  const [instructors, setInstructors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [rows, setRows] = useState(getRows())
  const START_HOUR_DAY = 6

  const getColumns = () => {
    const _columns = [];
    columnsData.forEach(col => {
      _columns.push({
        field: col.hour,
        headerName: col.headerName,
        type: 'singleSelect',
        valueOptions: instructors,
        width: 140,
        editable: true,
        renderEditCell: (params) => <CustomTypeEditComponent {...params} handleValueChange={handleValueChange} />,
        cellClassName: (params) => {
          if (instructors.includes(params.value)) {
            return 'reservation-by-instructor';
          } else if (params.value !== "" && col.headerName !== "מספר מגרש") {
            return 'reservation-by-user';
          } else {
            return '';
          }
        },
      })
    });
    return _columns;
  }
  const columns = getColumns();

  React.useEffect(() => {
    initSchedule()
    getInstructors()
    getTodaysReservations()
  }, [mDate])

  const initSchedule = () => {
    let _rows = getRows()
    setRows(_rows)
  }

  const handleValueChange = (value) => {
    const idx = rows.findIndex(row => (row.hour === value.hour && row.courtNumber === value.courtNumber))
    let _rows = [...rows]
    _rows[idx] = value
    setRows(_rows)
  }

  const getInstructors = async () => {
    let instructors = await instructorService.getInstructors()
    setInstructors(instructors)
  }

  const getTodaysReservations = async () => {
    let reservations = await reservationService.queryByDate(mDate)
    let _rows = getRows()
    reservations.forEach(reservation => {
       const startHourTxt = hoursDataArr[reservation.startHour-START_HOUR_DAY]
      _rows[reservation.courtNumber-1][startHourTxt] = reservation.username //.split("@")[0]
    });
    setRows(_rows)
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
      let resExists = await reservationService.isReservetionExists(uid, payload)
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
       const startHourTxt = hoursDataArr[item.startHour-START_HOUR_DAY]
      _rows[item.courtNumber-1][startHourTxt] = item.username //.split("@")[0]
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
          scheduleData.push({ startHour: hour, endHour: hour + 1, courtNumber: row["id"], date: mDate, username: username})
        }
      })
    })
    const res = await reservationService.resetByWeekDay(dayOfWeek.toLowerCase())
    const res2 = await reservationService.postByWeekDay(dayOfWeek.toLowerCase(), scheduleData)
    setIsLoading(false)
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
      <Box className="schedule" sx={{ width: '100%', height: 500 }}>
        <DataGrid
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
      >שמירה</button>
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