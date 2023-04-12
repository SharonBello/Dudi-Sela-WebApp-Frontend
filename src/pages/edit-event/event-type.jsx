import * as React from 'react';
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

export const EventType = ({ scheduleType, setScheduleType, shouldJoinClass, setShouldJoinClass }) => {

    const handleScheduleType = (scheduleType) => {
        if (scheduleType !== null) setScheduleType(scheduleType);
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
                    <ToggleButton value="internalSchedule">
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
