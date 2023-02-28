import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { CustomTypeEditComponent } from '../../data/scheduleData.js';
import { instructorService } from '../../services/instructor.service.js';
import { reservationService } from '../../services/reservation.service.js';
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service';

CustomTypeEditComponent.propTypes = {
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};


export const ScheduleDay = ({mDate, dayOfWeek}) => {
  const [instructors, setInstructors] = useState([])
  let uid = JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGED_USER)).uid

  const getRows = () => {
    const _rows = [];
    for (let i = 1; i < 7; i++) {
      _rows.push({
        id: i,
        courtNumber: i,
        sixAM: "",
        sevenAM: "",
        eightAM: "",
        nineAM: "",
        tenAM: "",
        elevenAM: "",
        twelveAM: "",
        onePM: "",
        twoPM: "",
        threePM: "",
        fourPM: "",
        fivePM: "",
        sixPM: "",
        sevenPM: "",
        eightPM: "",
        ninePM: "",
        tenPM: "",
        elevenPM: ""
      })
    }
    _rows.push({
      id: 7,
      courtNumber: "כחול מוזל",
      sixAM: "",
      sevenAM: "",
      eightAM: "",
      nineAM: "",
      tenAM: "",
      elevenAM: "",
      twelveAM: "",
      onePM: "",
      twoPM: "",
      threePM: "",
      fourPM: "",
      fivePM: "",
      sixPM: "",
      sevenPM: "",
      eightPM: "",
      ninePM: "",
      tenPM: "",
      elevenPM: ""
    })
    _rows.push({
      id: 8,
      courtNumber: "אדום מוזל",
      sixAM: "",
      sevenAM: "",
      eightAM: "",
      nineAM: "",
      tenAM: "",
      elevenAM: "",
      twelveAM: "",
      onePM: "",
      twoPM: "",
      threePM: "",
      fourPM: "",
      fivePM: "",
      sixPM: "",
      sevenPM: "",
      eightPM: "",
      ninePM: "",
      tenPM: "",
      elevenPM: ""
    })
    _rows.push({
      id: 9,
      courtNumber: "ירוק מוזל",
      sixAM: "",
      sevenAM: "",
      eightAM: "",
      nineAM: "",
      tenAM: "",
      elevenAM: "",
      twelveAM: "",
      onePM: "",
      twoPM: "",
      threePM: "",
      fourPM: "",
      fivePM: "",
      sixPM: "",
      sevenPM: "",
      eightPM: "",
      ninePM: "",
      tenPM: "",
      elevenPM: ""
    })
    return _rows;
  }
  const [rows, setRows] = useState(getRows())
  const hoursData = {sixAM:6, sevenAM: 7, eightAM: 8, nineAM:9, tenAM:10, elevenAM:11, twelveAM:12, onePM: 13, twoPM: 14, threePM: 15, fourPM: 16, fivePM: 17, sixPM: 18, sevenPM: 19, eightPM: 20, ninePM: 21, tenPM: 22, elevenPM: 23};
  const hoursDataArr = ['sixAM', 'sevenAM', 'eightAM', 'nineAM', 'tenAM', 'elevenAM', 'twelveAM', 'onePM', 'twoPM', 'threePM', 'fourPM', 'fivePM', 'sixPM', 'sevenPM', 'eightPM', 'ninePM', 'tenPM', 'elevenPM']
  const columnsData = [{hour: 'courtNumber', headerName:'מספר מגרש'},{hour: 'sixAM', headerName:'6:00'},{hour: 'sevenAM', headerName:'7:00'},{hour: 'eightAM', headerName:'8:00'},
  {hour: 'nineAM', headerName:'9:00'},{hour: 'tenAM', headerName:'10:00'},{hour: 'elevenAM', headerName:'1:00'},{hour: 'twelveAM', headerName:'12:00'},{hour: 'onePM', headerName:'13:00'},
  {hour: 'twoPM', headerName:'14:00'},{hour: 'threePM', headerName:'15:00'},{hour: 'fourPM', headerName:'16:00'},{hour: 'fivePM', headerName:'17:00'},{hour: 'sixPM', headerName:'18:00'},
  {hour: 'sevenPM', headerName:'19:00'},{hour: 'eightPM', headerName:'20:00'},{hour: 'ninePM', headerName:'21:00'},{hour: 'tenPM', headerName:'22:00'},{hour: 'elevenPM', headerName:'23:00'}]
  const getColumns = () => {
    const _columns = [];
    columnsData.forEach(col => {
      _columns.push({
        field: col.hour,
        headerName: col.headerName,
        type: 'singleSelect',
        valueOptions: instructors,
        width: 100,
        editable: true,
        renderEditCell: (params) => <CustomTypeEditComponent {...params} handleValueChange={handleValueChange} />,
        cellClassName: (params) => {
          if (instructors.includes(params.value)) {
            return 'reservation-set';
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
    getInstructors()
    getToadysReservations()
  }, [])

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

  const getToadysReservations = async () => {
    let reservations = await reservationService.queryByDate(mDate)
    reservations.forEach(reservation => {
       let _rows = [...rows]
       const startHourTxt = hoursDataArr[reservation.startHour-6]
      _rows[reservation.courtNumber-1][startHourTxt] = reservation.username
      setRows(_rows)
    });
  }
  const handleSubmit = async () => {
    const weeklyRerservations = []
    rows.forEach(row => {
      Object.keys(row).forEach(key => {
        if (key !== "id" && key !== "courtNumber" && row[key] !== "") {
          const hour = hoursData[key]
          weeklyRerservations.push({ username: row[key], startHour: hour, endHour: hour + 1, courtNumber: row["courtNumber"], date: mDate })
        }
      })
    })
    for (let i = 0; i < weeklyRerservations.length; i++) {
      const payload = weeklyRerservations[i];
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
        />
      </Box>
      <button
        className='submit-button'
        type='submit'
        onClick={handleSubmit}
      >שמירה</button>
    </>

  );
}