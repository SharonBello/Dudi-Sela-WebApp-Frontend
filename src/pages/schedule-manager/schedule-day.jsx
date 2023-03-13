import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import { CustomTypeEditComponent } from '../../data/scheduleData.js';
import { instructorService } from '../../services/instructor.service.js';
import { reservationService } from '../../services/reservation.service.js';
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service';
import { Loader } from '../../components/loader.jsx';
import { getRows, hoursData, hoursDataArr, columnsData } from './schedule-helper.js';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

CustomTypeEditComponent.propTypes = {
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export const ScheduleDay = ({ mDate, dayOfWeek }) => {
  const [instructors, setInstructors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [rows, setRows] = useState(getRows())
  const [openEditEvent, setOpenEditEvent] = useState(false)
  const START_HOUR_DAY = 6
  const [scheduleType, setScheduleType] = React.useState('schedule');

  const handleScheduleType = (e, newScheduleType) => {
    if (newScheduleType !== null) setScheduleType(newScheduleType);
  };

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

  const handleEditEvent = () => {
    setOpenEditEvent(true)
  }

  const closeEditEvent = () => {
    setOpenEditEvent(false)
  }

  const getInstructors = async () => {
    let instructors = await instructorService.getInstructors()
    setInstructors(instructors)
  }

  const getTodaysReservations = async () => {
    let reservations = await reservationService.queryByDate(mDate)
    let _rows = getRows()
    reservations.forEach(reservation => {
      const startHourTxt = hoursDataArr[reservation.startHour - START_HOUR_DAY]
      _rows[reservation.courtNumber - 1][startHourTxt] = reservation.username //.split("@")[0]
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
    const res = await reservationService.resetByWeekDay(dayOfWeek.toLowerCase())
    const res2 = await reservationService.postByWeekDay(dayOfWeek.toLowerCase(), scheduleData)
    setIsLoading(false)
  }

  const renderModal = () => {
    if (openEditEvent) {
      return (
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
                <Typography className="modal-body-text">
                  בחר הזמנה
                </Typography>
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
              </Box>
            </Container>
          </Box>
        </Modal>
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
          onCellClick={handleEditEvent}
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