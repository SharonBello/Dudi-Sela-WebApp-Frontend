import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import CustomDivider from '../shared-components/custom-divider';
import { TextBox } from '../shared-components/text-box';
import { SaveButton } from '../shared-components/save-button';
// import { FacilityServices } from './facility-services';
// import UploadButton from '../shared-components/upload-button';
import { SwitchInput } from '../shared-components/switch-input';

export const ClubSettings = ({ }) => {
  const [hrBeforeCancel, setHrBeforeCancel] = useState(6);
  const [minPerReservation, setMinPerReservation] = useState(60);
  const [daysReservedBefore, setDaysReservedBefore] = useState(2);
  const [phoneCancelReservation, setPhoneCancelReservation] = useState("0523782815");
  const [daysInAdvance, setDaysInAdvance] = useState(8);
  const [cutOffDays, setCutOffDays] = useState("15:00:00");
  const [timeIntervals, setTimeIntervals] = useState("15");
  const [onlineReserve, setOnlineReserve] = useState(true);
  const [memberOnlyClub, setMemberOnlyClub] = useState(false);
  const [addPartnersToAll, setAddPartnersToAll] = useState(false);
  // const [timeIntervals, setTimeIntervals] = useState("15:00:00");

  const handleSave = (e) => {
    e.stopPropagation()
    e.preventDefault()
    // if (validateForm() === true) {
    //   setIsLoading(true)
    //   addReservation()
    // } else {
    //   setMessageAlert(validateForm())
    //   setShowMessageAlert(true)
    // }
  }

  return (
    <Box className="club-box">
      <Container className="club-content">
        <Box className="club-header">
          <Typography id="club-title" variant="h6" component="h2">הגדרות מועדון</Typography>
        </Box>
        <Typography id="club-title" variant="h6" component="h2"></Typography>
        <CustomDivider />
        <TextBox label="זמן בשעות שניתן לבטל לפני מועד הזמנת המגרש" value={hrBeforeCancel} setValue={setHrBeforeCancel} />
        <TextBox label="הזמן הקצר ביותר להזמנה בדקות" disabled={true} value={minPerReservation} setValue={setMinPerReservation} />
        <TextBox label="כמה ימים קדימה אפשר להזמין מראש" disabled={true} value={daysReservedBefore} setValue={setDaysReservedBefore} />
        <TextBox label="מספר טלפון לעדכון ההזמנה" value={phoneCancelReservation} setValue={setPhoneCancelReservation} />
        <TextBox label="days in advance" value={daysInAdvance} setValue={setDaysInAdvance} />
        <TextBox label="cut off days" value={cutOffDays} setValue={setCutOffDays} />
        <TextBox label="מרווחי זמן" value={timeIntervals} setValue={setTimeIntervals} />
        <SwitchInput label="פתוח להזמנות ברשת" value={onlineReserve} setValue={setOnlineReserve} />
        <SwitchInput label="מועדון לחברים בלבד" value={memberOnlyClub} setValue={setMemberOnlyClub} />
        <SwitchInput label="אפשרות להוסיף פרטנרים לכולם" value={addPartnersToAll} setValue={setAddPartnersToAll} />
        <SaveButton onClick={handleSave} />
      </Container>
    </Box>
  )
}