import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ReservationList } from '../../components/reservation-list/reservation-list.jsx'
import { reservationService } from '../../services/reservation.service.js'

export const UserReservations = () => {
  let [reservations, setReservations] = useState([])
  const navigate = useNavigate()
  let uid = useSelector((storeState) => storeState.userModule.uid)
  let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)

  useEffect(() => {
    getReservationsData(uid)
  }, [])

  const getReservationsData = async (uid) => {
    if (loggedUser || uid) {
      // uid = loggedUser.data.uid
      let reservations = await reservationService.query(uid)
      setReservations(reservations)
      return reservations
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

