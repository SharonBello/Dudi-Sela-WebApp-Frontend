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

export const SelectCourt = ({theme, cacheRtl}) => {

  const [courntNumber, setCourntNumber] = useState(6);

  const handleCourtSelection = (e) => {
    e.stopPropagation()
    e.preventDefault()
  };

  // TODO: replace the select with a modal and allow choosing more than one court
  return (
    <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
            <div dir="rtl" className="select-court-container flex align-center" >
                <Box className="flex-column">
                <Typography className="modal-body-text">
                    מגרשים
                </Typography>
                <Box style={{ maxWidth: "10rem" }} className="">
                    <FormControl fullWidth>
                    <InputLabel id="select-court-label">מגרש</InputLabel>
                    <Select
                        labelId="select-court-label"
                        className="select-occurrence"
                        value={courntNumber}
                        label="מגרש"
                        onChange={(e) => handleCourtSelection(e)}>
                        <MenuItem value={1} className="select-occurrence-item">מגרש 1</MenuItem>
                        <MenuItem value={1} className="select-occurrence-item">מגרש 2</MenuItem>
                        <MenuItem value={1} className="select-occurrence-item">מגרש 3</MenuItem>
                        <MenuItem value={1} className="select-occurrence-item">מגרש 4</MenuItem>
                        <MenuItem value={1} className="select-occurrence-item">מגרש 5</MenuItem>
                        <MenuItem value={1} className="select-occurrence-item">מגרש 6</MenuItem>
                        <MenuItem value={1} className="select-occurrence-item">כחול מוזל</MenuItem>
                        <MenuItem value={1} className="select-occurrence-item">אדום מוזל</MenuItem>
                        <MenuItem value={1} className="select-occurrence-item">ירוק מוזל</MenuItem>
                    </Select>
                    </FormControl>
                </Box>
                </Box>
            </div>
        </ThemeProvider>
    </CacheProvider>
  )
}