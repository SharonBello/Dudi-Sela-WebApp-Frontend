import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'

export const EventFrequency = ({theme, cacheRtl}) => {

  const [once, setOnce] = useState('');
  const [onceAWeek, setOnceAWeek] = useState('');
  const [onceAMonth, setOnceAMonth] = useState('')

  const handleOccurrence = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (e.target.value === 'once') setOnce(e.target.value);
    if (e.target.value === 'onceAWeek') setOnceAWeek(e.target.value);
    if (e.target.value === 'onceAMonth') setOnceAMonth(e.target.value);
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
                        value={once}
                        label="אירוע חד פעמי"
                        onChange={(e) => handleOccurrence(e)}
                    >
                        <MenuItem value={once} className="select-occurrence-item">אירוע חד פעמי</MenuItem>
                        <MenuItem value={onceAWeek} className="select-occurrence-item">שבועי</MenuItem>
                        <MenuItem value={onceAMonth} className="select-occurrence-item">חודשי</MenuItem>
                    </Select>
                    </FormControl>
                </Box>
                </Box>
            </div>
        </ThemeProvider>
    </CacheProvider>
  )
}