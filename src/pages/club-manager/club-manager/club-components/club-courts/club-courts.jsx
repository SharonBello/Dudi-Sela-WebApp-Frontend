import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomDivider from '../../../../shared-components/custom-divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { TextBox } from '../../../../shared-components/text-box';
import { SelectMenu } from '../../../../shared-components/select-menu'
import { SaveButton } from '../../../../shared-components/save-button';
import { WeekDays, DayHours, TypeGames, MemberTypes, EmptyConstraint } from '../../club-helper'
import { courtService } from '../../../../../services/court.service'

export const ClubCourts = () => {
  const [courtTypes, setCourtTypes] = useState(TypeGames);
  const [showAddCourtForm, setShowAddCourtForm] = useState(false)
  const [showCourtTypeForm, setShowCourtTypeForm] = useState(false)
  // const [showAllCourts, setShowAllCourts] = useState(false)
  const courtActions = [{ title: "מגרשים", subtitle: "כל המגרשים", onClick: () => { setShowAddCourtForm(false); setShowCourtTypeForm(false); } }, { title: "הוסף מגרש", subtitle: "הוסף מגרש חדש", onClick: () => { setShowAddCourtForm(true); setShowCourtTypeForm(false); } }, { title: "מאפייני מגרש", subtitle: "סוגי מגרשים ומחירים", onClick: () => { setShowAddCourtForm(false); setShowCourtTypeForm(true); } }];
  const [courtName, setCourtName] = useState();
  const [courtType, setCourtType] = useState("טניס");
  const [priceConstraints, setPriceConstraints] = useState([])
  const [newConstraint, setNewConstraint] = useState(JSON.parse(JSON.stringify(EmptyConstraint)))
  const [courtData, setCourtData] = useState([])

  const navigate = useNavigate()
  useEffect(() => {
    getClubCourts().then(res => {
      setCourtData(res)
    })
    getPriceConstraints().then(res => {
      setPriceConstraints(res)
    })
  })
  const getClubCourts = async () => {
    try {
      let res = await courtService.getClubCourts()
      return res.data.courts
    } catch (error) {
      navigate('/')
    }
  }
  const getPriceConstraints = async () => {
    try {
      let res = await courtService.getPriceConstraints()
      return res.data.constraints
    } catch (error) {
      navigate('/')
    }
  }
  const renderCourts = () => {
    if (courtData.length > 0) {
      return (
        courtData.map((court) => {
          return <Box key={court.name} className="club-court">
            <div variant="contained" component="label">
              {court.name} - {court.type}
            </div>
          </Box>
        })
      )
    }
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
  const saveCourt = async () => {
    if (courtName.trim() !== "") {
      let res = await courtService.addClubCourt({"name": courtName, "type": courtType})
      console.log(res.data.result)
    }
  }
  const addNewConstraint = (values, key, innerkey) => {
    const mData = JSON.parse(JSON.stringify(newConstraint))
    innerkey ? mData[key][innerkey] = values : mData[key] = values
    setNewConstraint(mData)
  }
  const handleSetConstraints = (values, index, key, innerkey) => {
    const mData = JSON.parse(JSON.stringify(priceConstraints))
    innerkey ? mData[index][key][innerkey] = values : mData[index][key] = values
    setPriceConstraints(mData)
  }
  const handleSave = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (newConstraint.days.length>0 && newConstraint.price.trim() !=="" ) {
      let res = await courtService.addPriceConstraint(newConstraint)
      console.log(res.data.result)
    }
  }
  const renderAddCourtForm = () => {
    return (
      <div>
        הוסף מגרש
        <TextBox label="שם" value={courtName} setValue={setCourtName} />
        <SelectMenu inputLabel="סוג מגרש" defaultValue={courtType} values={courtTypes} setValue={setCourtType} />
        <Button variant="contained" component="label" onClick={() => saveCourt()}>הוסף מגרש</Button>
      </div>
    )
  }
  const renderNewConstraint = () => {
    return (
      <>
        <SelectMenu multiple={true} defaultValue={newConstraint.days} inputLabel="בחר ימים" values={WeekDays} setValue={(values) => addNewConstraint(values, "days")} />
        <SelectMenu inputLabel="משעה" defaultValue={newConstraint.hours.startHour} values={DayHours()} setValue={(values) => addNewConstraint(values, "hours", "fromHour")} />
        <SelectMenu inputLabel="עד שעה" defaultValue={newConstraint.hours.endHour} values={DayHours()} setValue={(values) => addNewConstraint(values, "hours", "tillHour")} />
        <SelectMenu inputLabel="סוג חבר" defaultValue={newConstraint.memberType} values={MemberTypes} setValue={(values) => addNewConstraint(values, "memberType")} />
        <TextBox label="מחיר" type="number" value={newConstraint.price} defaultValue={newConstraint.price} setValue={(value) => addNewConstraint(value, "price")} />
        <Button variant="contained" component="label" onClick={(e) => handleSave(e)}>שמור</Button>
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
        {priceConstraints.map((datum, index) =>
          <Box>
            <p>{priceConstraints[0].days.join(", ")}</p>
            <SelectMenu multiple={true} defaultValue={priceConstraints[index].days} inputLabel="בחר ימים" values={WeekDays} setValue={(values) => handleSetConstraints(values, index, "days")} />
            <SelectMenu defaultValue={priceConstraints[index].hours.fromHour} inputLabel="משעה" values={DayHours()} setValue={(values) => handleSetConstraints(values, index, "hours", "fromHour")} />
            <SelectMenu defaultValue={priceConstraints[index].hours.endHour} inputLabel="עד שעה" values={DayHours()} setValue={(values) => handleSetConstraints(values, index, "hours", "tillHour")} />
            <SelectMenu defaultValue={priceConstraints[index].memberType} inputLabel="סוג חבר" values={MemberTypes} setValue={(values) => handleSetConstraints(values, index, "memberType")} />
            <TextBox label="מחיר" type="number" value={priceConstraints[index].price} setValue={(value) => handleSetConstraints(value, index, "price")} />
            <SaveButton onClick={handleSave} />
            <FontAwesomeIcon icon={faTrashAlt} />
          </Box>
        )}
      </>

    )
  }
  return (
    <Box className="club-box container">
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