import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Loader } from '../../components/loader.jsx';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { EventFrequency } from './event-frequency.jsx';
import { EventTime } from './event-time.jsx';

export const EditEventModal = ({openEditEvent, closeEditEvent, mDate, dayOfWeek}) => {

  const START_HOUR_DAY = 6
  const [scheduleType, setScheduleType] = useState('schedule');
  const [checked, setChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false)


  const handleScheduleType = (scheduleType) => {
    if (scheduleType !== null) setScheduleType(scheduleType);
  };

  const handleCheckedClass = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setChecked(e.target.checked);
  };

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
                <Box className="schedule-type-container flex-column">
                  <Typography className="modal-body-text">
                    בחירת סוג הזמנה
                  </Typography>
                  <Box className="toggle-form-container flex align-center justify-between">
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

                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox
                          checked={checked}
                          onChange={(e) => handleCheckedClass(e)}
                          inputProps={{ 'aria-label': 'controlled' }}
                          sx={{
                            color: "#C9DB39",
                            '&.Mui-checked': {
                              color: "#C9DB39",
                            },
                          }}
                        />}
                        label="צרף לחוג" />
                    </FormGroup>
                  </Box>
                </Box>

                <EventTime theme={theme} cacheRtl={cacheRtl} />
                <EventFrequency theme={theme} cacheRtl={cacheRtl} />
              </Box>
            </Container>
          </Box>
        </Modal>
    </>
  );
}
