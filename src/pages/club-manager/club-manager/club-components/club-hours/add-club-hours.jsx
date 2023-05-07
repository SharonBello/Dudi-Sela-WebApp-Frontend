import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { SaveButton } from '../../../../shared-components/save-button';
import { SelectMenu } from '../../../../shared-components/select-menu'
import { WeekDays, DayHours, DemoWorkHours } from '../../club-helper'

export const AddClubHours = () => {
  const [workDays, setWorkDays] = useState(WeekDays);
  const [workHours, setWorkHours] = useState([]);
  const [fromHour, setFromHour] = useState(DayHours());
  const [tillHour, setTillHour] = useState(DayHours());
  const handleSave = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }
  useEffect(() => {
    DemoWorkHours(setWorkHours)
  }, [])
  return (
    <Box className="club-hours-fields-container flex justify-between">
        <SelectMenu inputLabel="ימים" values={workDays} setValue={setWorkDays} />
        <SelectMenu inputLabel="משעה" values={fromHour} setValue={setFromHour} />
        <SelectMenu inputLabel="עד שעה" values={tillHour} setValue={setTillHour} />
        <SaveButton onClick={handleSave} />
    </Box>
  )
}