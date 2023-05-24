import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
import { WeekDays, DayHours, TypeGames, MemberTypes, HourConstraint } from '../../club-helper'
import { courtService } from '../../../../../services/court.service'
import { Loader } from '../../../../../components/loader.jsx';
import { EditCourtModal } from '../../../../edit-event/edit-court';

export const ClubCourts = () => {
  const [showAddCourtForm, setShowAddCourtForm] = useState(false)
  const [showCourtConstraints, setShowCourtConstraints] = useState(false)
  // const [showAllCourts, setShowAllCourts] = useState(false)
  const courtActions = [{ title: "מגרשים", subtitle: "כל המגרשים", onClick: () => { setShowAddCourtForm(false); setShowCourtConstraints(false); } }, { title: "הוסף מגרש", subtitle: "הוסף מגרש חדש", onClick: () => { setShowAddCourtForm(true); setShowCourtConstraints(false); } }, { title: "מאפייני מגרש", subtitle: "סוגי מגרשים ומחירים", onClick: () => { setShowAddCourtForm(false); setShowCourtConstraints(true); } }];
  const [courtName, setCourtName] = useState();
  const [courtType, setCourtType] = useState("טניס");
  const [priceConstraints, setPriceConstraints] = useState([])
  const [editPriceConstraints, setEditPriceConstraints] = useState([])
  const [newConstraint, setNewConstraint] = useState(JSON.parse(JSON.stringify(HourConstraint)))
  const [courtData, setCourtData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [openEditCourt, setOpenEditCourt] = useState(false)
  const [selectedCourt, setSelectedCourt] = useState([]);
  const role = useSelector((storeState) => storeState.userModule.role)

  const navigate = useNavigate()

  useEffect(()=> {
    if (courtData.length === 0) {
      getClubCourts().then(res => {
        setCourtData(res)
      })
    }
    if (editPriceConstraints.length === 0) {
      getPriceConstraints().then(res => {
        setPriceConstraints(res)
        setEditPriceConstraints(res)
      })
    }
  }, [])
  const removeSelectedCourt = async (court) => {
    let res = await courtService.deleteClubCourt(court)
    getClubCourts().then(res => {
      setCourtData(res)
    })
    setOpenEditCourt(false)
  }
  const saveSelectedCourt = async (courtName, courtType) => {
    selectedCourt.name = courtName
    selectedCourt.type = courtType
    let res = await courtService.editClubCourt(selectedCourt)
    getClubCourts().then(res => {
      setCourtData(res)
    })
    setOpenEditCourt(false)
  }
  const getClubCourts = async () => {
    try {
      setIsLoading(true)
      let res = await courtService.getClubCourts()
      setIsLoading(false)
      return res.data.club_courts
    } catch (error) {
      navigate('/')
    }
  }
  const getPriceConstraints = async () => {
    try {
      setIsLoading(true)
      let res = await courtService.getPriceConstraints()
      setIsLoading(false)
      return res.data.price_constraints
    } catch (error) {
      navigate('/')
    }
  }
  const handleOpenCourt = (court) => {
    setSelectedCourt(court)
    setOpenEditCourt(true)
  }
  const closeEditCourt = () => {
    setOpenEditCourt(false)
  }


  const renderEditCourt = () => {
    if (openEditCourt) {
      return (
        <EditCourtModal selectedCourt={selectedCourt} openEditCourt={openEditCourt} closeEditCourt={closeEditCourt} saveSelectedCourt={saveSelectedCourt} removeSelectedCourt={removeSelectedCourt} />
      )
    }
  }
  const renderCourts = () => {
    if (courtData && courtData.length > 0) {
      return (
        courtData.map((court) => {
          return <Box key={court.name} className="club-court">
            <div variant="contained" component="label" onClick={() => handleOpenCourt(court)}>
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
      setIsLoading(true)
      let res = await courtService.addClubCourt({"name": Number(courtName), "type": courtType, "role": role})
      getClubCourts().then(res => {
        setCourtData(res)
      })
      setIsLoading(false)
      console.log(res.data.result)
    }
  }
  const validatePriceConstraint = (value, key) => {
    return !(key === 'price' && value<0)
  }
  const addNewConstraint = (value, key, innerkey) => {
    if (validatePriceConstraint(value, key)) {
      const mData = JSON.parse(JSON.stringify(newConstraint))
      innerkey ? mData[key][innerkey] = value : mData[key] = value
      setNewConstraint(mData)
    }
  }
  const handleEditConstraint = (value, index, key, innerkey) => {
    if (validatePriceConstraint(value, key)) {
      const mData = JSON.parse(JSON.stringify(editPriceConstraints))
      innerkey ? mData[index][key][innerkey] = value : mData[index][key] = value
      setEditPriceConstraints(JSON.parse(JSON.stringify(mData)))
    }
  }
  // const validateTimeConstraint = (constraint) => {
  //   return (constraint.hours.endHour.split(":")[0]>constraint.hours.startHour.split(":")[0])
  // }
  const saveConstraint = async (e) => {
    e.stopPropagation()
    if (newConstraint.days.length>0) {
      setIsLoading(true)
      let res = await courtService.addPriceConstraint(newConstraint)
      setIsLoading(false)
      if (res.data.result === 0) {
        priceConstraintsFromDb()
      }
    }
  }
  const editConstraint = async (e, constraint) => {
    e.stopPropagation()
    setIsLoading(true)
    let res = await courtService.editPriceConstraint(constraint)
    setIsLoading(false)
    if (res.data.result === 0) {
      priceConstraintsFromDb()
    }
  }
  const deleteConstraint = async (e, index) => {
    setIsLoading(true)
    let res = await courtService.deletePriceConstraint(priceConstraints[index])
    setIsLoading(false)
    if (res.data.result === 0) {
      priceConstraintsFromDb()
    }
  }
  const priceConstraintsFromDb = () => {
    getPriceConstraints().then(res => {
      setPriceConstraints(res)
      setEditPriceConstraints(res)
    })
  }
  const renderIsLoading = () => {
    if (isLoading) {
      return (
        <Loader />
      )
    }
  }
  const renderAddCourtForm = () => {
    return (
      <div>
        הוסף מגרש
        <TextBox label="שם" value={courtName} setValue={setCourtName} />
        <SelectMenu inputLabel="סוג מגרש" defaultValue={courtType} values={TypeGames} setValue={setCourtType} />
        <Button disabled={isLoading} variant="contained" component="label" onClick={() => saveCourt()}>הוסף מגרש</Button>
      </div>
    )
  }
  const renderNewConstraint = () => {
    return (
      <>
        <SelectMenu multiple={true} defaultValue={newConstraint.days} inputLabel="בחר ימים" values={WeekDays} setValue={(values) => addNewConstraint(values, "days")} />
        <SelectMenu inputLabel="משעה" defaultValue={newConstraint.hours.startHour} values={DayHours()} setValue={(values) => addNewConstraint(values, "hours", "startHour")} />
        <SelectMenu inputLabel="עד שעה" defaultValue={newConstraint.hours.endHour} values={DayHours()} setValue={(values) => addNewConstraint(values, "hours", "endHour")} />
        <SelectMenu inputLabel="סוג חבר" defaultValue={newConstraint.memberType} values={MemberTypes} setValue={(values) => addNewConstraint(values, "memberType")} />
        <TextBox label="מחיר" type="number" value={newConstraint.price} defaultValue={newConstraint.price} setValue={(value) => addNewConstraint(value, "price")} />
        <Button disabled={isLoading} variant="contained" component="label" onClick={(e) => saveConstraint(e)}>שמור</Button>
      </>
    )
  }
  const renderConstraintsPanel = () => {
    return (
      <>
        <h3>אילוץ חדש</h3>
        {renderNewConstraint()}
        <CustomDivider />
        <h3>אילוצי מחירים</h3>
        {renderConstraints()}
      </>
    )
  }
  const renderConstraints = () => {
    return (
      <>
      {editPriceConstraints && editPriceConstraints.length>0 && editPriceConstraints.map((datum, index) =>
          <Box>
            <p>{editPriceConstraints[index].days.join(", ")}</p>
            <SelectMenu multiple={true} defaultValue={editPriceConstraints[index].days} inputLabel="בחר ימים" values={WeekDays} setValue={(values) => handleEditConstraint(values, index, "days")} />
            <SelectMenu defaultValue={editPriceConstraints[index].hours.startHour} inputLabel="משעה" values={DayHours()} setValue={(values) => handleEditConstraint(values, index, "hours", "startHour")} />
            <SelectMenu defaultValue={editPriceConstraints[index].hours.endHour} inputLabel="עד שעה" values={DayHours()} setValue={(values) => handleEditConstraint(values, index, "hours", "endHour")} />
            <SelectMenu defaultValue={editPriceConstraints[index].memberType} inputLabel="סוג חבר" values={MemberTypes} setValue={(values) => handleEditConstraint(values, index, "memberType")} />
            <TextBox label="מחיר" type="number" value={editPriceConstraints[index].price} setValue={(value) => handleEditConstraint(value, index, "price")} />
            <Button disabled={isLoading} variant="contained" component="label" onClick={(e) => editConstraint(e, editPriceConstraints[index])} className="component-save-btn">שמור</Button>
            <FontAwesomeIcon onClick={(e) => deleteConstraint(e, index)} icon={faTrashAlt} />
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
        {renderEditCourt()}
        {renderCourts()}
        {renderCourtActions()}
        {showAddCourtForm && renderAddCourtForm()}
        {showCourtConstraints && renderConstraintsPanel()}
        {renderIsLoading()}
      </Container>
    </Box>
  )
}