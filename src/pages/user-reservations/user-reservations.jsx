import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ReservationList } from '../../components/reservation-list/reservation-list.jsx'
import { reservationService } from '../../services/reservation.service.js'
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service';

export const UserReservations = () => {
  let [reservations, setReservations] = useState([])
  let uid = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).uid
  let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)

  useEffect(() => {
    getReservationsData(uid)
  }, [])

  const getReservationsData = async (uid) => {
    if (loggedUser || uid) {
      let reservations = await reservationService.query(uid)
      const _reservations = reservations.reverse()
      setReservations(_reservations)
      return _reservations
    }
  }

  return (
    <section className="reservations-app-container">
      <div>
        <div className="reservations-preview-main-wrapper container">
          <div className="reservations-list-container flex-column">
            <ReservationList reservations={reservations} />
          </div>
        </div>
      </div>
    </section>
  )

}

