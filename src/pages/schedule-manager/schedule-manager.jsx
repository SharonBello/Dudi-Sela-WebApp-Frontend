import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { DataGrid, GridCellEditStopReasons } from '@mui/x-data-grid';
import { CustomTypeEditComponent } from '../../data/scheduleData.js';
import { instructorService } from '../../services/instructor.service.js';
import { reservationService } from '../../services/reservation.service.js';

CustomTypeEditComponent.propTypes = {
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};


export const ScheduleManager = () => {

  const [instructors, setInstructors] = useState([])
  const [rows, setRows] = useState( [
      {
        id: 1,
        hour: 6,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 2,
        hour: 7,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 3,
        hour: 8,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 4,
        hour: 9,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 5,
        hour: 10,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 6,
        hour: 11,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 7,
        hour: 12,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 8,
        hour: 13,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 9,
        hour: 14,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 10,
        hour: 15,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 11,
        hour: 16,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 12,
        hour: 17,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 13,
        hour: 18,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 14,
        hour: 19,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 15,
        hour: 20,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 16,
        hour: 21,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 17,
        hour: 22,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },
      {
        id: 18,
        hour: 23,
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      },

  ])
  const columns = [
    {
      field: 'hour',
      headerName: 'שעה',
      type: 'string',
      width: 160,
      editable: false
    },
    {
      field: 'sunday',
      headerName: 'ראשון',
      type: 'singleSelect',
      valueOptions: instructors,
      width: 120,
      editable: true,
      renderEditCell: (params) => <CustomTypeEditComponent {...params} handleValueChange={handleValueChange} />,
    },
    {
      field: 'monday',
      headerName: 'שני',
      type: 'singleSelect',
      valueOptions: instructors,
      width: 120,
      editable: true,
      renderEditCell: (params) => <CustomTypeEditComponent {...params} handleValueChange={handleValueChange} />,
    },
    {
      field: 'tuesday',
      headerName: 'שלישי',
      type: 'singleSelect',
      valueOptions: instructors,
      width: 120,
      editable: true,
      renderEditCell: (params) => <CustomTypeEditComponent {...params} handleValueChange={handleValueChange} />,
    },
    {
      field: 'wednesday',
      headerName: 'רביעי',
      type: 'singleSelect',
      valueOptions: instructors,
      width: 140,
      editable: true,
      renderEditCell: (params) => <CustomTypeEditComponent {...params} handleValueChange={handleValueChange} />,
    },
    {
      field: 'thursday',
      headerName: 'חמישי',
      type: 'singleSelect',
      valueOptions: instructors,
      width: 140,
      editable: true,
      renderEditCell: (params) => <CustomTypeEditComponent {...params} handleValueChange={handleValueChange} />,
    },
    {
      field: 'friday',
      headerName: 'שישי',
      type: 'singleSelect',
      valueOptions: instructors,
      width: 140,
      editable: true,
      renderEditCell: (params) => <CustomTypeEditComponent {...params} handleValueChange={handleValueChange} />,
    },
    {
      field: 'saturday',
      headerName: 'שבת',
      type: 'singleSelect',
      valueOptions: instructors,
      width: 140,
      editable: true,
      renderEditCell: (params) => <CustomTypeEditComponent {...params} handleValueChange={handleValueChange} />,
    }
  ];
  React.useEffect(() => {
    getInstructors()
  }, [])

  const handleValueChange = (value) => {
    const idx = rows.findIndex(row => row.hour === value.hour)
    let _rows = [...rows]
    _rows[idx] = value
    setRows(_rows)
  }

  const getInstructors = async () => {
    let instructors = await instructorService.getInstructors()
    setInstructors(instructors)
  }

  const handleSubmit = (e) => {
    console.log(rows)
    console.log(columns)
    addReservations()
  }

  const addReservations = async () => {

    // loop over reservations for the week, construct weekReservations
    // weekReservations array of objects, each object is { date: 'YYYY-MM-DD', reservations: [ {
    //   startHour,
    //   endHour,
    //   courtNumber,
    //   date
    // }, ... }
    const weekReservations = []
    rows.forEach(row => {
      Object.keys(row).forEach(key => {
        if (key !== "id" && key !== "hour" && row[key] !== "") {
          // a week day
          weekReservations.push({startHour: row["hour"], endHour:row["hour"]+1, courtNumber: 0, date: key})
        }
      })
    })
    for (let i = 0; i < weekReservations.length; i++) {
      const payload = weekReservations[i];
      console.log(payload)
      // let res = await reservationService.addNewReservation(adminUid, payload)
      // const _date = dayjs(date).format('YYYY-MM-DD')
      // let resByDate = await reservationService.addNewReservationByDate(_date, payload)

    }
    // if (res.data.result === 0 && resByDate.data.result === 0) {
    //   // setShowSuccessAlert(true)
    //   console.log("success")
    // } else {
    //   // setShowSuccessAlert(false)
    //   console.log("failure")
    // }

  }

  return (
    <>
    <Box className="schedule" sx={{ width: '100%', height: 300 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        experimentalFeatures={{ newEditingApi: true }}
        hideFooter={true}
        // onRowEditStop={(params, event) => {
        //   if (params.reason === GridCellEditStopReasons.cellFocusOut) {
        //     event.defaultMuiPrevented = true;
        //   }
          // console.log(event.target.innerText)
          // rows[]
          // setRows()
        // }}
      />
    </Box>
    <input
          className='submit-button'
          type='submit'
          value='שליחה'
          onClick={handleSubmit}
        />
    </>

  );
}