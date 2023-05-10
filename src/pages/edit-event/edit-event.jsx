import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import { Loader } from '../../components/loader.jsx';
import { createTheme } from '@mui/material/styles'
import createCache from '@emotion/cache'
import { EventFrequency } from './event-frequency.jsx'
import { EventTime } from './event-time.jsx'
import { EventType } from './event-type.jsx'
import { CourtPrice } from './court-price.jsx'
import { EventTitle } from './event-title.jsx'
import Divider from '@mui/material/Divider';
import { ParticipantsList } from './participants-list.jsx';
import { EventDescription } from './event-description.jsx';
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service';
import { eventService } from '../../services/event.service'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert'
import dayjs from 'dayjs'
import { EventTypes, FrequencyTypes, PaymentStatus } from '../club-manager/club-manager/club-helper.jsx'
import { SelectMenu } from '../shared-components/select-menu'
import { instructorService } from '../../services/instructor.service';
import { courtService } from '../../services/court.service';
import { hoursData } from '../club-manager/club-manager/club-components/schedule-day/schedule-helper.js';

export const EditEventModal = ({ openEditEvent, closeEditEvent, mDate, dayOfWeek, selectedCourts, selectedStartHour }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [eventType, setEventType] = useState(EventTypes[1]);
  const [startDate, setStartDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [hours, setHours] = useState({ startHour: hoursData[selectedStartHour]+":00", endHour: "21:00" })
  const [frequencyType, setFrequencyType] = useState(FrequencyTypes[0])
  const [courts, setCourts] = useState(selectedCourts);
  const [price, setPrice] = useState();
  const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [paidStatus, setPaidStatus] = useState(PaymentStatus[0])
  const [description, setDescription] = useState("test")
  const [endHour, setEndHour] = useState()
  const [title, setTitle] = useState("test")
  const [phoneNumber, setPhoneNumber] = useState("97223423423")
  const [shouldJoinClass, setShouldJoinClass] = useState(false);
  const [instructor, setInstructor] = useState("");
  const [participants, setParticipants] = useState(["קדם קבסו"]);
  const [tennisInstructors, setTennisInstructors] = useState([])
  const [messageAlert, setMessageAlert] = useState()
  const [showMessageAlert, setShowMessageAlert] = useState(false)
  const [clubCourts, setClubCourts] = useState([])
  let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)
  let uid = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).uid
  const navigate = useNavigate()
  const getInstructors = useCallback(async () => {
    let instructors = await instructorService.getInstructors()
    setTennisInstructors(instructors)
  }, [setTennisInstructors])
useEffect(() => {
    getInstructors()
    if (clubCourts.length === 0) {
      courtService.getClubCourts().then(res => {
        setClubCourts(res.data.club_courts.map(court => court.name))
      })
    }
}, [])
  const theme = createTheme({
    direction: 'rtl',
  })

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
  })

  const validateEvent = () => {
    // required fields, startHour, endHour, instructorIndices at least one instructor,
    if (!hours.startHour) {
      setMessageAlert("יש למלא שעת התחלה")
      return false
    }
    if (!hours.endHour) {
      setMessageAlert("יש למלא שעת סיום")
      return false
    }
    if (title.trim() === "") {
      setMessageAlert("יש למלא כותרת ארוע")
      return false
    }
    if (instructor.trim() === "") {
      setMessageAlert("יש לבחור מדריך אחד לפחות")
      return false
    }
    return true
  }

  const saveClubEvent = async () => {
    const payload =   { eventType, startDate, hours: JSON.stringify(hours), frequencyType, courts: JSON.stringify(courts),
    price, paidStatus, description, title, phoneNumber, instructor, participants: JSON.stringify(participants)}

    if (!loggedUser) {
      navigate('/signin')
    }
    else if (loggedUser || uid) {
      try {
        // validate that event of same date/time doesnt exist
        // let resExists = await eventService.isEventExists(uid, payload)
        // if (!resExists.data.isExists) {
        let res = await eventService.addClubEvent(payload)
        if (res.data.result === 0) {
          setMessageAlert("הארוע נשמר בהצלחה")
        } else {
          setMessageAlert("הארוע לא נשמר בהצלחה")
        }
        setShowMessageAlert(true)
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
      saveClubEvent()
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

  const handleSetStartHour = (e) => {
    const _hours = JSON.parse(JSON.stringify(hours))
    _hours.startHour = e.target.value
    setHours(_hours)
  }

  const handleSetEndHour = (e) => {
    const _hours = JSON.parse(JSON.stringify(hours))
    _hours.endHour = e.target.value
    setHours(_hours)
  }

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
            sx={{
              minWidth: '100%',
              color: '#1d1d1d',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#50D4F2'
            }}
            spacing={5}
            variant="filled"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >{messageAlert}</Alert>
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
              <EventType eventType={eventType} setEventType={setEventType} shouldJoinClass={shouldJoinClass} setShouldJoinClass={setShouldJoinClass} />
              <EventTime theme={theme} cacheRtl={cacheRtl} startHour={hours.startHour} endHour={endHour} setStartHour={handleSetStartHour} setEndHour={handleSetEndHour} date={date} setDate={setDate} />
              <EventFrequency theme={theme} cacheRtl={cacheRtl} frequencyType={frequencyType} setFrequencyType={setFrequencyType} />
              <Box className="court-details flex-column">
                <Typography className="modal-body-text">
                  מגרשים
                </Typography>
                <div className="flex align-center" style={{ gap: "0.5rem" }}>
                  <SelectMenu multiple={true} inputLabel="בחר מגרש" defaultValue={selectedCourts} values={clubCourts} setValue={setCourts} />
                  <CourtPrice price={price} setPrice={setPrice} paidStatus={paidStatus} setPaidStatus={setPaidStatus} />
                </div>
              </Box>
              <Box className="flex-row">
                <EventDescription description={description} setDescription={setDescription} />
                <EventTitle title={title} setTitle={setTitle} />
              </Box>
              <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
              <div className="flex align-center" style={{ gap: "0.5rem", padding: "unset" }}>
                <SelectMenu inputLabel="שם המדריך" value={instructor} values={tennisInstructors} setValue={setInstructor} />
                <ParticipantsList participants={participants} setParticipants={setParticipants} />
              </div>
              <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
              <div className='flex align-center justify-between save-cancel-btn-container'>
                <button disabled={isLoading} onClick={handleSave} className='save-btn'>
                  שמירה
                </button>
                <button onClick={closeEditEvent} className='cancel-btn'>
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
