import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Box from '@mui/material/Box';
import CustomDivider from '../../../../shared-components/custom-divider';
import { SaveButton } from '../../../../shared-components/save-button';
import { SelectMenu } from '../../../../shared-components/select-menu'
import { WeekDays, DayHours, DemoWorkHours } from '../../club-helper'

export const ClubHours = () => {
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
  const renderWorkHours = () => {
    return (
      workHours.map((wrkHrs) => {

        return <Box className="club-hr">
          <p>{wrkHrs.days.join(", ")}</p>
          <SelectMenu defaultValue={wrkHrs.hours.startHour} inputLabel="משעה" values={fromHour} setValue={setFromHour} />
          <SelectMenu defaultValue={wrkHrs.hours.endHour} inputLabel="עד שעה" values={tillHour} setValue={setTillHour} />
          <SaveButton onClick={handleSave} />
          <FontAwesomeIcon icon={faTrashAlt} />
        </Box>
      })
    )
  }
  return (
    <Box className="club-box container">
      <div className="grid-club-component">
        <Typography id="club-title" variant="h6" component="h2">שעות פעילות</Typography>
        <CustomDivider className="grid-divider" />
        <Box className="main-component-fields-container">

          <p>השעות בהן לקוחות יכולים להזמין מגרשים. זמנים אשר מחוץ לשעות הפעילות יסומנו ברקע אפור ולא ניתן יהיה להזמין בשעות אלו דרך האפליקציה</p>
          <div>הוסף שעות פעילות</div>
          <SelectMenu inputLabel="ימים" values={workDays} setValue={setWorkDays} />
          <SelectMenu inputLabel="משעה" values={fromHour} setValue={setFromHour} />
          <SelectMenu inputLabel="עד שעה" values={tillHour} setValue={setTillHour} />
          <SaveButton onClick={handleSave} />
          <CustomDivider />
          <div>שעות פעילות</div>
          {renderWorkHours()}
        </Box>

      </div>
    </Box>
  )
}