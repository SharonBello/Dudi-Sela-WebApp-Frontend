import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { instructorService } from '../../services/instructor.service.js';
import { reservationService } from '../../services/reservation.service.js';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import { getCurrentDate, getRows } from '../schedule-manager/schedule-helper.js';

export const Dashboard = () => {
  const weekDay = dayjs().format('dddd');
  const [date, _] = useState(getCurrentDate())

  const [instructors, setInstructors] = useState([])

  const [rows, setRows] = useState(getRows())
  const hoursDataArr = ['sixAM', 'sevenAM', 'eightAM', 'nineAM', 'tenAM', 'elevenAM', 'twelveAM', 'onePM', 'twoPM', 'threePM', 'fourPM', 'fivePM', 'sixPM', 'sevenPM', 'eightPM', 'ninePM', 'tenPM', 'elevenPM']
  const columnsData = [{hour: 'courtNumber', headerName:'מספר מגרש'},{hour: 'sixAM', headerName:'6:00'},{hour: 'sevenAM', headerName:'7:00'},{hour: 'eightAM', headerName:'8:00'},
  {hour: 'nineAM', headerName:'9:00'},{hour: 'tenAM', headerName:'10:00'},{hour: 'elevenAM', headerName:'1:00'},{hour: 'twelveAM', headerName:'12:00'},{hour: 'onePM', headerName:'13:00'},
  {hour: 'twoPM', headerName:'14:00'},{hour: 'threePM', headerName:'15:00'},{hour: 'fourPM', headerName:'16:00'},{hour: 'fivePM', headerName:'17:00'},{hour: 'sixPM', headerName:'18:00'},
  {hour: 'sevenPM', headerName:'19:00'},{hour: 'eightPM', headerName:'20:00'},{hour: 'ninePM', headerName:'21:00'},{hour: 'tenPM', headerName:'22:00'},{hour: 'elevenPM', headerName:'23:00'}]
  const START_HOUR_DAY = 6
  const weekDayInHebrew = {'Sunday':"יום ראשון",'Monday':"יום שני",'Tuesday':"יום שלישי",'Wednesday':"יום רביעי",'Thursday':"יום חמישי",'Friday':"יום שישי",'Saturday':"יום שבת"};


  const getColumns = () => {
    const _columns = [];
    columnsData.forEach(col => {
      _columns.push({
        field: col.hour,
        headerName: col.headerName,
        type: 'singleSelect',
        width: 140,
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
    getInstructors()
    getTodaysReservations()
  }, [])

  const getInstructors = async () => {
    let instructors = await instructorService.getInstructors()
    setInstructors(instructors)
  }

  const getTodaysReservations = async () => {
    let reservations = await reservationService.queryByDate(date)
    let _rows = [...rows]
    reservations.forEach(reservation => {
       const startHourTxt = hoursDataArr[reservation.startHour-START_HOUR_DAY]
      _rows[reservation.courtNumber-1][startHourTxt] = reservation.username.split("@")[0]
    });
    setRows(_rows)
  }


  return (
    <div className='flex-column align-center justify-center container-block dashboard-container'>
    <Typography component="h1" variant="h5">האקדמיה לטניס דודי סלע</Typography>
      <Typography>{weekDayInHebrew[weekDay]} {date}</Typography>

      <Box className="dashboard" sx={{ width: '100%', height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          experimentalFeatures={{ newEditingApi: true }}
          hideFooter={true}
        />
      </Box>
    </div>

  );
}