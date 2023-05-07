import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Box from '@mui/material/Box';
import CustomDivider from '../../../../shared-components/custom-divider';
import { SaveButton } from '../../../../shared-components/save-button';
import { SelectMenu } from '../../../../shared-components/select-menu'
import { WeekDays, DayHours, DemoWorkHours } from '../../club-helper'
import { AddClubHours } from './add-club-hours'
import { ClubHoursList } from './club-hours-list'

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

  const renderAddClubHours = () => {
    return (<AddClubHours />)
  }
  const renderClubHours = () => {
    return (<ClubHoursList />)
  }
  return (
    <Box className="club-hours-box container">
      <div className="grid-club-hours-component flex-column">
        <Typography id="club-title" variant="h6" component="h2">שעות פעילות</Typography>
        <CustomDivider className="grid-divider" />
        <Box className="club-hours-instructions">
          <p>השעות בהן לקוחות יכולים להזמין מגרשים. זמנים אשר מחוץ לשעות הפעילות יסומנו ברקע אפור ולא ניתן יהיה להזמין בשעות אלו דרך האפליקציה<br />
            <span>הוסף שעות פעילות:</span>
          </p>
        </Box>
        <CustomDivider className="grid-divider" />
        {renderAddClubHours()}
        <div>שעות פעילות</div>
        <CustomDivider className="grid-divider" />
        {renderClubHours()}
      </div>
    </Box>
  )
}