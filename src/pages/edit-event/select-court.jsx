import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'

export const SelectCourt = ({ theme, cacheRtl, courts, setCourts }) => {

  const handleCourtSelection = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setCourts(courts.push(...e.target.value))
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl" className="select-court-container flex align-center" >
          <Box style={{ maxWidth: "10rem" }} className="">
            <FormControl fullWidth>
              <InputLabel id="select-court-label">מגרש</InputLabel>
              <Select
                labelId="select-court-label"
                sx={{ minWidth: "10rem", padding: "8.5px 14px !important" }}
                className="select-occurrence"
                multiple
                // value={courts}
                label="מגרש"
                onChange={(e) => handleCourtSelection(e)}
                value={[]}>
                <MenuItem value={[0]} className="select-occurrence-item">מגרש 1</MenuItem>
                <MenuItem value={[0]} className="select-occurrence-item">מגרש 2</MenuItem>
                <MenuItem value={[0]} className="select-occurrence-item">מגרש 3</MenuItem>
                <MenuItem value={[0]} className="select-occurrence-item">מגרש 4</MenuItem>
                <MenuItem value={[0]} className="select-occurrence-item">מגרש 5</MenuItem>
                <MenuItem value={[0]} className="select-occurrence-item">מגרש 6</MenuItem>
                <MenuItem value={[0]} className="select-occurrence-item">כחול מוזל</MenuItem>
                <MenuItem value={[0]} className="select-occurrence-item">אדום מוזל</MenuItem>
                <MenuItem value={[0]} className="select-occurrence-item">ירוק מוזל</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </ThemeProvider>
    </CacheProvider>
  )
}