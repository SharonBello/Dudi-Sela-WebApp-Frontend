import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomDivider from '../shared-components/custom-divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { TextBox } from '../shared-components/text-box';
import { SelectMenu } from '../shared-components/select-menu'

export const CourtsManager = ({ }) => {
  const [courts, setCourts] = useState(["מגרש 1", "מגרש 2", "מגרש 3", "מגרש 4", "מגרש 5", "מגרש 6", "כחול מוזל", "אדום מוזל", "ירוק מוזל"]);
  const [courtTypes, setCourtTypes] = useState(["טניס", "פאדל", "פיקלבול"]);
  const [showAddCourtForm, setShowAddCourtForm] = useState(false)
  const [showCourtTypeForm, setShowCourtTypeForm] = useState(false)
  // const [showAllCourts, setShowAllCourts] = useState(false)
  //{title: "מגרשים", subtitle: "כל המגרשים"},
  const courtActions = [{title: "הוסף מגרש", subtitle: "הוסף מגרש חדש", onClick:() => {setShowAddCourtForm(true);setShowCourtTypeForm(false);}}, {title: "מאפייני מגרש", subtitle: "סוגי מגרשים ומחירים", onClick:() => {setShowAddCourtForm(false);setShowCourtTypeForm(true);}}];
  const [courtName, setCourtName] = useState();
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

  const renderCourts = () => {
    return (
      courts.map((court) => {
        return <Box className="club-court">
          <div variant="contained" component="label">
            {court}
          </div>
        </Box>
      })
    )
  }
  const renderCourtActions = () => {
    return (
      courtActions.map((action) => {
        return <button onClick={action.onClick}>
          <h1>{action.title}</h1>
          <h2>{action.subtitle}</h2>
        </button>
      })
    )
  }
  const saveCourt = () => {
    console.log("save court")
  }
  const renderAddCourtForm = () => {
    return (
      <div>
        הוסף מגרש
        <TextBox label="שם" value={courtName} setValue={setCourtName} />
        <SelectMenu inputLabel="סוג מגרש" values={courtTypes} setValue={setCourtTypes} />
        <Button variant="contained" component="label" onClick={() => saveCourt()}>הוסף מגרש</Button>
      </div>
    )
  }
  const renderCourtTypeForm = () => {
    const hours1 = { days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי"], hours: { startHour: "06:00", endHour: "24:00" } }

    return (
      <>

          <h1>אילוץ חדש</h1>
          <h1>אילוצי מחירים</h1>
          <Box className="club-hr">
          {/* <SelectMenu defaultValue={wrkHrs.hours.startHour} inputLabel="בחר ימים" values={fromHour} setValue={setFromHour} />
          <SelectMenu defaultValue={wrkHrs.hours.endHour} inputLabel="משעה" values={fromHour} setValue={setFromHour} />
          <SelectMenu defaultValue={wrkHrs.hours.endHour} inputLabel="עד שעה" values={tillHour} setValue={setTillHour} />
          <SelectMenu defaultValue={wrkHrs.hours.endHour} inputLabel="סוג חבר" values={memberTypes} setValue={setMemberType} />
          <SaveButton onClick={handleSave} />
          <FontAwesomeIcon icon={faTrashAlt} /> */}
        </Box>
      </>
    )
  }
  return (
    <Box className="club-box">
      <Container className="club-content">
        <Box className="club-header">
          <Typography id="club-title" variant="h6" component="h2">ניהול מגרשים</Typography>
        </Box>
        <CustomDivider />
        {renderCourts()}
        {renderCourtActions()}
        {showAddCourtForm && renderAddCourtForm()}
        {showCourtTypeForm && renderCourtTypeForm()}

      </Container>
    </Box>
  )
}