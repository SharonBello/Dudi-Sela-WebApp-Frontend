import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import { FREQUENCY_TYPES } from '../../pages/edit-event/event';

export const EventFrequency = ({ theme, cacheRtl, frequency, setFrequency }) => {

    const handleOccurrence = (e) => {
        e.stopPropagation()
        e.preventDefault()
        //TODO: replace following frequency to ENUM
        if (e.target.value === 'once') setFrequency(0);
        if (e.target.value === 'onceAWeek') setFrequency(1);
        if (e.target.value === 'onceAMonth') setFrequency(2);
    };

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <div dir="rtl" className="occurrence-container flex align-center" >
                    <Box className="schedule-occurrence-container flex-column">
                        <Typography className="modal-body-text">
                            בחירת תדירות
                        </Typography>
                        <Box style={{ maxWidth: "10rem" }} className="select-occurrence-container">
                            <FormControl fullWidth>
                                <InputLabel id="select-occurrence-label">תדירות</InputLabel>
                                <Select
                                    labelId="select-occurrence-label"
                                    className="select-occurrence"
                                    value={FREQUENCY_TYPES.Once}
                                    label="אירוע חד פעמי"
                                    onChange={(e) => handleOccurrence(e)}
                                >
                                    <MenuItem value={FREQUENCY_TYPES.Once} className="select-occurrence-item">אירוע חד פעמי</MenuItem>
                                    <MenuItem value={FREQUENCY_TYPES.OnceAWeek} className="select-occurrence-item">שבועי</MenuItem>
                                    <MenuItem value={FREQUENCY_TYPES.OnceAMonth} className="select-occurrence-item">חודשי</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </div>
            </ThemeProvider>
        </CacheProvider>
    )
}