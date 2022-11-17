import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getLoggedUser } from '../../store/actions/user.actions.js'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { reservationService } from '../../services/reservation.service'
// import { prefixer } from 'stylis'

export const NewReservation = ({ newReservationModal, closeModal }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [startHour, setStartHour] = useState()
  const [endHour, setEndHour] = useState()
  const [courtNumber, setCourtNumber] = useState()
  const [date, setDate] = useState(new Date())

  let uid = useSelector((storeState) => storeState.userModule.uid)
  let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)


  useEffect(() => {
    dispatch(getLoggedUser)
  }, [loggedUser])

  const addReservation = async () => {
    const payload = {
      startHour,
      endHour,
      courtNumber,
      date
    }
    if (!loggedUser) {
      navigate('/signin')
    }
    else if ((loggedUser && !uid) || uid) {
      uid = loggedUser.data.uid
      try {
        let res = await reservationService.addNewReservation(uid, payload)
        if (res.data.result === 0) {
          alert("המגרש הוזמן בהצלחה")
        } else {
          alert("לא ניתן להזמין מגרש ")
        }
      }
      catch (err) {
        alert("failed to add")
      }
    }
  }

  const handleSubmit = (e) => {
    addReservation()
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <form className="container">
      <label>שעת התחלה</label>
      <br />
      <input
        name='startHour'
        value={startHour}
        type='number'
        onChange={(e) => {
          setStartHour(e.target.value)
        }}
      />
      <br />
      <label>שעת סיום</label>
      <br />
      <input
        name='endHour'
        value={endHour}
        type='number'
        onChange={(e) => {
          setEndHour(e.target.value)
        }}
      />
      <br />
      <label>תאריך</label>
      <br />
      <input
        name='date'
        value={date}
        type='date'
        onChange={(e) => {
          setDate(e.target.value)
        }}
      />
      <br />
      <label>מספר מגרש</label>
      <br />
      <input
        name='courtNumber'
        value={courtNumber}
        type='number'
        onChange={(e) => {
          setCourtNumber(e.target.value)
        }}
      />
      <br />
      <input
        className='submitButton'
        type='submit'
        value='הזמן מגרש'
        onClick={handleSubmit}
      />
    </form>
  )
}
