import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux"
export const NewReservation = () => {

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
    axios.post('http://localhost:4000/reservations?docId='+uid, payload)
    .then(function (response) {
      console.log(response.data.result);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addReservation();
  }
  return (
    <form onSubmit={e => {handleSubmit(e)}}>
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
      <br/>
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
      <br/>
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
      <br/>
      <input
        className='submitButton'
        type='submit'
        value='Add Reservation'
      />
    </form>
  )
}
