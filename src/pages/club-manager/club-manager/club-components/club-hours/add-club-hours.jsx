import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { SelectMenu } from '../../../../shared-components/select-menu'
import { WeekDays, DayHours, DemoWorkHours, HourConstraint } from '../../club-helper'
import Button from '@mui/material/Button';

export const AddClubHours = ({handleSaveClubHours}) => {
  const [workDays, setWorkDays] = useState(WeekDays);
  const [workHours, setWorkHours] = useState([]);
  const [fromHour, setFromHour] = useState('06:00');
  const [tillHour, setTillHour] = useState('11:00');

  useEffect(() => {
    DemoWorkHours(setWorkHours)
  }, [])
  return (
    <Box className="club-hours-fields-container flex justify-between">
        <SelectMenu multiple={true} inputLabel="ימים" defaultValue={[]} values={workDays} setValue={setWorkDays} />
        <SelectMenu inputLabel="משעה" defaultValue={HourConstraint.hours.startHour} values={DayHours()} setValue={setFromHour} />
        <SelectMenu inputLabel="עד שעה" defaultValue={HourConstraint.hours.endHour} values={DayHours()} setValue={setTillHour} />
        <Button variant="contained" component="label" onClick={(e) => handleSaveClubHours(e, {"hours": {"startHour": fromHour, "endHour": tillHour}, "days": workDays})}>שמור</Button>
    </Box>
  )
}