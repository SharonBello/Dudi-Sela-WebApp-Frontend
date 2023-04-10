import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomDivider from '../shared-components/custom-divider';
import { SaveButton } from '../shared-components/save-button';
import { SelectMenu } from '../shared-components/select-menu'

export const ClubHours = ({ }) => {
  const [workDays, setWorkDays] = useState(["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]);
  const [workHours, setWorkHours] = useState([]);
  const getHours = () => {
    const hours = []
    for (let i = 0; i <= 24; i++) {
      if (i < 10) {
        hours.push("0" + i + ":00")
      } else {
        hours.push(i + ":00")
      }
    }
    return hours
  }
  const [fromHour, setFromHour] = useState(getHours());
  const [tillHour, setTillHour] = useState(getHours());
  const handleSave = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }
  const initWorkHours = () => {
    const hours1 = { days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי"], hours: { startHour: "06:00", endHour: "24:00" } }
    const hours2 = { days: ["שישי"], hours: { startHour: "06:00", endHour: "23:00" } }
    const hours3 = { days: ["שבת"], hours: { startHour: "06:00", endHour: "23:00" } }
    setWorkHours([hours1, hours2, hours3])
  }
  useEffect(() => {
    initWorkHours()
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
    <Box className="club-box">
      <Container className="club-content">
        <Box className="club-header">
          <Typography id="club-title" variant="h6" component="h2">שעות פעילות</Typography>
        </Box>
        <CustomDivider />
        <p>השעות בהן לקוחות יכולים להזמין מגרשים. זמנים אשר מחוץ לשעות הפעילות יסומנו ברקע אפור ולא ניתן יהיה להזמין בשעות אלו דרך האפליקציה</p>
        <div>הוסף שעות פעילות</div>
        <SelectMenu inputLabel="ימים" values={workDays} setValue={setWorkDays} />
        <SelectMenu inputLabel="משעה" values={fromHour} setValue={setFromHour} />
        <SelectMenu inputLabel="עד שעה" values={tillHour} setValue={setTillHour} />
        <SaveButton onClick={handleSave} />
        <CustomDivider />
        <div>שעות פעילות</div>
        {renderWorkHours()}

      </Container>
    </Box>
  )
}