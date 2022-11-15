import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux"
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
// import { prefixer } from 'stylis'

export const NewReservation = ({ newReservationModal, closeModal }) => {

  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(0);
  const [courtNumber, setCourtNumber] = useState(0);
  const [date, setDate] = useState(new Date());
  const uid = useSelector((storeState) => storeState.userModule.uid);

  const addReservation = () => {
    const payload = {
      startHour,
      endHour,
      courtNumber,
      date
    }
    console.log('uid', uid);
    axios.post('http://localhost:3030/reservations?docId=' + uid, payload)
      .then(function (response) {
        console.log(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    if (uid) {
      addReservation();
    }
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    
<form method="dialog" onSubmit={e => { handleSubmit(e) }}>
      <label>startHour</label>
      <br />
      <input
        name='startHour'
        value={startHour}
        type='number'
        onChange={(e) => {
          setStartHour(e.target.value);
        }}
      />
      <br />
      <label>endHour</label>
      <br />
      <input
        name='endHour'
        value={endHour}
        type='number'
        onChange={(e) => {
          setEndHour(e.target.value);
        }}
      />
      <br />
      <label>Date</label>
      <br />
      <input
        name='date'
        value={date}
        type='date'
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <br />
      <label>courtNumber</label>
      <br />
      <input
        name='courtNumber'
        value={courtNumber}
        type='number'
        onChange={(e) => {
          setCourtNumber(e.target.value);
        }}
      />
      <br />
      <input
        className='submitButton'
        type='submit'
        value='Add Reservation'
      />
    </form>
    
  )
}
