import * as React from 'react';
import { useState } from 'react';
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

export const EditEventModal = ({ openEditEvent, closeEditEvent, mDate, dayOfWeek }) => {

  const [isLoading, setIsLoading] = useState(false)

  const theme = createTheme({
    direction: 'rtl',
  })

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
  })

  const renderIsLoading = () => {
    if (isLoading) {
      return (
        <Loader />
      )
    }
  }

  return (
    <>
      {renderIsLoading()}
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
              <EventType />
              <EventTime theme={theme} cacheRtl={cacheRtl} />
              <EventFrequency theme={theme} cacheRtl={cacheRtl} />
              <Box className="court-details flex-column">
                <Typography className="modal-body-text">
                  מגרשים
                </Typography>
                <div className="flex align-center" style={{ gap: "0.5rem" }}>
                  <SelectCourt theme={theme} cacheRtl={cacheRtl} />
                  <CourtPrice />
                </div>
              </Box>
              <Box className="flex-row">
                  <EventDescription />
                  <EventTitle />
              </Box>
              <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
              <div className="flex align-center" style={{ gap: "0.5rem", padding: "unset" }}>
                <InstructorsList />
                <ParticipantsList />
              </div>
              <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
              <div className='flex align-center justify-between save-cancel-btn-container'>
                <button className='save-btn'>
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
