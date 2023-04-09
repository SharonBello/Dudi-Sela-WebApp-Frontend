import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomDivider from '../shared-components/custom-divider';
import { TextBox } from '../shared-components/text-box';
import { SaveButton } from '../shared-components/save-button';
import { SelectMenu } from '../shared-components/select-menu'

export const ClubHours = ({ }) => {
  const [workDays, setWorkDays] = useState(["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]);
  const [workHours, setWorkHours] = useState([]);
  const getHours = () => {
    const hours = []
    for (let i = 0; i <= 24; i++) {
      if (i<10) {
        hours.push("0"+i+":00")
      } else {
        hours.push(i+":00")
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
    const hours = {days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי"], hours:{startHour:"06:00", endHour:"24:00"}}
    // setWorkHours(workHours.)
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
        <SelectMenu inputLabel="ימים" values={workDays} setValues={setWorkDays} />
        <SelectMenu inputLabel="משעה" values={fromHour} setValues={setFromHour} />
        <SelectMenu inputLabel="עד שעה" values={tillHour} setValues={setTillHour} />
        <SaveButton onClick={handleSave}/>
        <CustomDivider />
        <div>שעות פעילות</div>


      </Container>
    </Box>
  )
}