import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"

import axios from 'axios';

export const UserReservations = () => {

  const [reservations, setReservations] = useState([]);
  const uid = useSelector((storeState) => storeState.userModule.uid);


  useEffect(() => {
    const getReservations = async () => {
      const data = await axios(
        'http://localhost:4000/reservations?docId='+uid,
      );

      setReservations(data.data.reservations);
    };
    getReservations();
  }, [uid]);
  return (
    <div>
    <ul>
      {reservations.map(item => (
        <li key={item.id}>
          <div>{item.startHour}</div>
          <div>{item.endHour}</div>
          <div>{item.date}</div>
          <div>{item.courtNumber}</div>
        </li>
      ))}
    </ul>
  </div>
  )

}

