import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ReservationList } from '../../components/reservation-list/reservation-list.jsx'
import axios from 'axios'

export const UserReservations = () => {
  const [reservations, setReservations] = useState([])
  const navigate = useNavigate()
  let uid = useSelector((storeState) => storeState.userModule.uid)
  let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)

  useEffect(() => {
    getReservationsData(uid)
  }, [])

  const getReservationsData = (uid) => {
    if (!loggedUser) {
      navigate('/signin')
    }
    else if ((loggedUser && !uid) || uid) {
      uid = loggedUser.data.uid
      const getReservations = async () => {
        const data = await axios(
          'http://localhost:4000/reservations/reservations?docId=' + uid,
        )
        setReservations(data.data.reservations)
      }
      getReservations()
    }
  }

  return (
    <section className="reservations-app-container">
      <div>
        <div className="reservations-preview-main-wrapper container">
          <div className="reservations-list-container flex flex-column">
            <ReservationList reservations={reservations} />
          </div>
        </div>
      </div>
    </section>
  )

}

