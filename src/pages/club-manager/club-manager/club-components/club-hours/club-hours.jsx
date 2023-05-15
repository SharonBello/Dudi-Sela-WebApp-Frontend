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
import { courtService } from '../../../../../services/court.service'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../../../components/loader.jsx';

export const ClubHours = () => {
  const [workDays, setWorkDays] = useState(WeekDays);
  const [workHours, setWorkHours] = useState([]);
  const [fromHour, setFromHour] = useState(DayHours());
  const [tillHour, setTillHour] = useState(DayHours());
  const [clubHoursList, setClubHoursList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=> {
    if (clubHoursList.length === 0) {
      DemoWorkHours(setWorkHours)
      getClubHours().then(res => {
        setClubHoursList(res)
        setIsLoading(false)
      })
    }
  }, [])

  const handleSaveClubHours = async (e, clubHours) => {
    if (clubHours.days.length > 0) {
      setIsLoading(true)
      let res = await courtService.addClubHours(clubHours)
      getClubHours().then(res => {
        setClubHoursList(res.data)
        setIsLoading(false)
      })
    }
  }
  const handleDeleteClubHour = async(e, index) => {
    setIsLoading(true)
    let res = await courtService.deleteClubHours(clubHoursList[index])
    // setIsLoading(false)
    getClubHours().then(res => {
      setIsLoading(false)
      setClubHoursList(res.data.club_hours)
    })
  }
  const handleEditClubHours = async (e, clubHours) => {
    console.log(clubHours)
  }
  const getClubHours = async () => {
    try {
      setIsLoading(true)
      return await courtService.getClubHours()
    } catch (error) {
      navigate('/')
    }
  }
  // const handleSetClubHour = (value, key, innerkey) => {
    // if (validatePriceConstraint(value, key)) {
    //   const mData = JSON.parse(JSON.stringify(newConstraint))
    //   innerkey ? mData[key][innerkey] = value : mData[key] = value
    //   setNewConstraint(mData)
    // }
  // }

  const renderAddClubHours = () => {
    return (<AddClubHours handleSaveClubHours={handleSaveClubHours}/>)
  }
  const renderClubHours = () => {
    if (clubHoursList.length > 0) {
      return (<ClubHoursList clubHoursList={clubHoursList} handleSaveClubHours={handleSaveClubHours} handleDeleteClubHour={handleDeleteClubHour} handleEditClubHours={handleEditClubHours}/>)
    }
  }
  const renderIsLoading = () => {
    if (isLoading) {
      return (
        <Loader />
      )
    }
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
        {renderIsLoading()}
      </div>
    </Box>
  )
}