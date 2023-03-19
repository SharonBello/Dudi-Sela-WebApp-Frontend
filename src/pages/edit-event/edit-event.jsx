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

export const EditEventModal = ({openEditEvent, closeEditEvent, mDate, dayOfWeek}) => {

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
                <EventType />
                <EventTime theme={theme} cacheRtl={cacheRtl} />
                <EventFrequency theme={theme} cacheRtl={cacheRtl} />
              </Box>
            </Container>
          </Box>
        </Modal>
    </>
  );
}
