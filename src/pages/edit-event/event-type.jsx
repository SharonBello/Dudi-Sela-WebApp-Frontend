import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const EventType = ({ eventType, setEventType, shouldJoinClass, setShouldJoinClass }) => {

    const handleScheduleType = (e, eventType) => {
        if (eventType !== null) setEventType(eventType);
    };

    const handleCheckedClass = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setShouldJoinClass(e.target.checked);
    };

    return (
        <Box className="schedule-type-container flex-column">
            <Typography className="modal-body-text">
                בחירת סוג הזמנה
            </Typography>
            <Box className="toggle-form-container flex align-center justify-between">
                <ToggleButtonGroup
                    value={eventType}
                    exclusive
                    className="flex align-center toggle-schedule-type">
                    <ToggleButton value="הזמנה" onClick={(e) => handleScheduleType(e, "הזמנה")}>
                        <Box className="flex align-center justify-between">
                            <CalendarMonthIcon />
                            <Typography>
                                הזמנה
                            </Typography>
                        </Box>
                    </ToggleButton>
                    <ToggleButton value="הזמנה פנימית" onClick={(e) => handleScheduleType(e, "הזמנה פנימית")}>
                        <Box className="flex align-center">
                            <PermContactCalendarIcon />
                            <Typography>
                                הזמנה פנימית
                            </Typography>
                        </Box>
                    </ToggleButton>
                    <ToggleButton value="לא זמין" onClick={(e) => handleScheduleType(e, "לא זמין")}>
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
                            checked={shouldJoinClass}
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

    )
}
