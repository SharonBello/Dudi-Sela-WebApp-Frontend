import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomDivider from '../shared-components/custom-divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { TextBox } from '../shared-components/text-box';
import { SelectMenu } from '../shared-components/select-menu'
import { SaveButton } from '../shared-components/save-button';
import { WeekDays, DayHours, CourtNames, TypeGames, MemberTypes, DemoConstraintsData, EmptyConstraint } from './club-helper'

export const CourtsManager = ({ }) => {
  const [courtTypes, setCourtTypes] = useState(TypeGames);
  const [showAddCourtForm, setShowAddCourtForm] = useState(false)
  const [showCourtTypeForm, setShowCourtTypeForm] = useState(false)
  // const [showAllCourts, setShowAllCourts] = useState(false)
  const courtActions = [{title: "מגרשים", subtitle: "כל המגרשים", onClick:() => {setShowAddCourtForm(false);setShowCourtTypeForm(false);}}, {title: "הוסף מגרש", subtitle: "הוסף מגרש חדש", onClick:() => {setShowAddCourtForm(true);setShowCourtTypeForm(false);}}, {title: "מאפייני מגרש", subtitle: "סוגי מגרשים ומחירים", onClick:() => {setShowAddCourtForm(false);setShowCourtTypeForm(true);}}];
  const [courtName, setCourtName] = useState();
  const [constraintsData, setConstraintsData] = useState(DemoConstraintsData)
  const [newConstraint, setNewConstraint] = useState(EmptyConstraint)
  const renderCourts = () => {
    return (
      CourtNames.map((court) => {
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
  const addNewConstraint = (values, key, innerkey) => {
    console.log(values, key, innerkey)
    const mData = JSON.parse(JSON.stringify(newConstraint))
    innerkey ? mData[key][innerkey] = values : mData[key] = values
    setNewConstraint(mData)
  }
  const handleSetConstraints = (values, index, key, innerkey) => {
    const mData = JSON.parse(JSON.stringify(constraintsData))
    innerkey ? mData[index][key][innerkey] = values : mData[index][key] = values
    setConstraintsData(mData)
  }
  const handleSave = (e) => {
    e.stopPropagation()
    e.preventDefault()
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
  const renderNewConstraint = () => {
    return (
      <>
        <SelectMenu multiple={true} defaultValue={newConstraint.days} inputLabel="בחר ימים" values={WeekDays} setValue={(values) => handleSetConstraints(values, "days")} />
        <SelectMenu inputLabel="משעה" defaultValue={newConstraint.hours.fromHour} values={DayHours()} setValue={(values) => addNewConstraint(values, "hours", "fromHour")} />
        <SelectMenu inputLabel="עד שעה" defaultValue={newConstraint.hours.tillHour} values={DayHours()} setValue={(values) => addNewConstraint(values, "hours", "tillHour")} />
        <SelectMenu inputLabel="סוג חבר" defaultValue={newConstraint.hours.tillHour} values={MemberTypes} setValue={(values) => addNewConstraint(values, "memberType")} />
        <TextBox label="מחיר" defaultValue={newConstraint.price} placeholder="מחיר" setValue={(value) => addNewConstraint(value, "price")} />
        <SaveButton onClick={handleSave} />
      </>
    )
  }
  const renderCourtTypeForm = () => {
    return (
      <>
          <h3>אילוץ חדש</h3>
          {renderNewConstraint()}
          <CustomDivider />
          <h3>אילוצי מחירים</h3>
          {constraintsData.map((datum, index) =>
          <Box>
            <p>{constraintsData[0].days.join(", ")}</p>
            <SelectMenu multiple={true} defaultValue={constraintsData[index].days} inputLabel="בחר ימים" values={WeekDays} setValue={(values) => handleSetConstraints(values, index, "days")} />
            <SelectMenu defaultValue={constraintsData[index].hours.fromHour} inputLabel="משעה" values={DayHours()} setValue={(values) => handleSetConstraints(values, index, "hours", "fromHour")} />
            <SelectMenu defaultValue={constraintsData[index].hours.endHour} inputLabel="עד שעה" values={DayHours()} setValue={(values) => handleSetConstraints(values, index, "hours", "tillHour")} />
            <SelectMenu defaultValue={constraintsData[index].memberType} inputLabel="סוג חבר" values={MemberTypes} setValue={(values) => handleSetConstraints(values, index, "memberType")} />
            <TextBox label="מחיר" value={constraintsData[index].price} setValue={(value) => handleSetConstraints(value, index, "price")} />
            <SaveButton onClick={handleSave} />
            <FontAwesomeIcon icon={faTrashAlt} />
          </Box>
          )}
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