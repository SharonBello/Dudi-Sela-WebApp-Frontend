import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import { Loader } from '../../components/loader.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import createCache from '@emotion/cache'
import { EventFrequency } from './event-frequency.jsx'
import { EventTime } from './event-time.jsx'
import { EventType } from './event-type.jsx'
import { SelectCourt } from './select-court.jsx'
import { CourtPrice } from './court-price.jsx'
import { EventTitle } from './event-title.jsx'
import Divider from '@mui/material/Divider';
import { ParticipantsList } from './participants-lists.jsx';
import { InstructorsList } from './instructors-list.jsx'
import { EventDescription } from './event-description.jsx';
import { EVENT, FREQUENCY_TYPES, SCHEDULE_TYPE, PAID_STATUS } from './event';
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service';
import { eventService } from '../../services/event.service'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert'
import dayjs from 'dayjs'

export const EditEventModal = ({ openEditEvent, closeEditEvent, mDate, dayOfWeek }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [price, setPrice] = useState('');
  const [paidStatus, setPaidStatus] = useState(PAID_STATUS.Paid)
  const [description, setDescription] = useState("")
  const [frequency, setFrequency] = useState(FREQUENCY_TYPES.OnceAWeek)
  const [startHour, setStartHour] = useState(null)
  const [endHour, setEndHour] = useState(null)
  const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [title, setTitle] = useState("")
  const [scheduleType, setScheduleType] = useState(SCHEDULE_TYPE.Schedule);
  const [shouldJoinClass, setShouldJoinClass] = useState(false);
  const [instructorIndices, setInstructorIndices] = React.useState([]);
  const [participantIndices, setPartipantIndices] = React.useState([]);
  const [courtNumbers, setCourtNumbers] = useState([]);
  const [messageAlert, setMessageAlert] = useState()
  const [showMessageAlert, setShowMessageAlert] = useState(false)

  let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)
  let uid = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).uid

  const initEvent = () => {
    return {
      price,
      paidStatus,
      description,
      frequency,
      startHour,
      endHour,
      date,
      title,
      scheduleType,
      shouldJoinClass,
      instructorIndices,
      participantIndices,
      courtNumbers
    }
  }
  const editEventObj: EVENT = useRef(initEvent())
  const navigate = useNavigate()


  useEffect(() => {
    editEventObj.current = {
      price,
      paidStatus,
      description,
      frequency,
      startHour,
      endHour,
      date,
      title,
      scheduleType,
      shouldJoinClass,
      instructorIndices,
      participantIndices,
      courtNumbers
    }
  }, [price, paidStatus, description, frequency, startHour, endHour, date, title, scheduleType, shouldJoinClass, instructorIndices, participantIndices, courtNumbers])

  const theme = createTheme({
    direction: 'rtl',
  })

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
  })

  const validateEvent = () => {
    // TODO: date should be in 2023-02-28 format, before saving
    // required fields, startHour, endHour, instructorIndices at least one instructor,
    if (!startHour) {
      setMessageAlert("יש למלא שעת התחלה")
      return false
    }
    if (!endHour) {
      setMessageAlert("יש למלא שעת סיום")
      return false
    }
    if (title.trim() === "") {
      setMessageAlert("יש למלא כותרת ארוע")
      return false
    }
    if (instructorIndices.length < 1) {
      setMessageAlert("יש לבחור מדריך אחד לפחות")
      return false
    }
    return true
  }

  const saveEvent = async () => {
    const payload = editEventObj.current
    if (!loggedUser) {
      navigate('/signin')
    }
    else if (loggedUser || uid) {
      try {
          // validate that event of same date/time doesnt exist
          // let resExists = await eventService.isEventExists(uid, payload)
          // if (!resExists.data.isExists) {
          let res = await eventService.addNewEvent(payload)
          console.log(res.data.result)
          // if (res.data.result === 0) {
          //   _successMessage += "הארוע נשמר בהצלחה"
          //   setSuccessMessage(_successMessage)
          //   setShowSuccessAlert(true)
          // } else {
          //   setShowSuccessAlert(false)
          // }
      }
      catch (err) {
        console.log(err)
        // setShowFailureAlert(true)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSave = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (validateEvent() === true) {
      setIsLoading(true)
      saveEvent()
    } else {
      setShowMessageAlert(true)
    }
  }

  const renderIsLoading = () => {
    if (isLoading) {
      return (
        <Loader />
      )
    }
  }

  const handleCloseAlert = (event, reason) => {
    setShowMessageAlert(false)
  }

  const alertAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="#F2F6F7"
        onClick={handleCloseAlert}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  const renderMessageAlert = () => {
    if (showMessageAlert) {
      return (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          action={alertAction}
        >
          <Alert
            severity="info"
            onClose={handleCloseAlert}
            sx={{ minWidth: '100%', color: '#1d1d1d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}
            spacing={5}
            variant="filled"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            {messageAlert}</Alert>
        </Snackbar>
      )
    }
  }
  return (
    <>
      {renderIsLoading()}
      {renderMessageAlert()}
      <Modal
        open={openEditEvent}
        onClose={closeEditEvent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-overlay">
        <Box className="modal-box">
          <Container className="modal-content">
            <Box className="modal-header">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                הזמנה חדשה
              </Typography>
            </Box>

            <Box className="modal-body">
              <EventType scheduleType={scheduleType} setScheduleType={setScheduleType} shouldJoinClass={shouldJoinClass} setShouldJoinClass={setShouldJoinClass} />
              <EventTime theme={theme} cacheRtl={cacheRtl} startHour={startHour} endHour={endHour} setStartHour={setStartHour} setEndHour={setEndHour} date={date} setDate={setDate} />
              <EventFrequency theme={theme} cacheRtl={cacheRtl} frequency={frequency} setFrequency={setFrequency} />
              <Box className="court-details flex-column">
                <Typography className="modal-body-text">
                  מגרשים
                </Typography>
                <div className="flex align-center" style={{ gap: "0.5rem" }}>
                  <SelectCourt theme={theme} cacheRtl={cacheRtl} courtNumbers={courtNumbers} setCourtNumbers={setCourtNumbers} />
                  <CourtPrice price={price} setPrice={setPrice} paidStatus={paidStatus} setPaidStatus={setPaidStatus}/>
                </div>
              </Box>
              <Box className="flex-row">
                  <EventDescription description={description} setDescription={setDescription} />
                  <EventTitle title={title} setTitle={setTitle}/>
              </Box>
              <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
              <div className="flex align-center" style={{ gap: "0.5rem", padding: "unset" }}>
                <InstructorsList instructorIndices={instructorIndices} setInstructorIndices={setInstructorIndices} />
                <ParticipantsList participantIndices={participantIndices} setPartipantIndices={setPartipantIndices} />
              </div>
              <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
              <div className='flex align-center justify-between save-cancel-btn-container'>
                <button onClick={handleSave} className='save-btn'>
                  שמירה
                </button>
                <button className='cancel-btn'>
                  ביטול
                </button>
              </div>
            </Box>
          </Container>
        </Box>
      </Modal>
    </>
  );
}
