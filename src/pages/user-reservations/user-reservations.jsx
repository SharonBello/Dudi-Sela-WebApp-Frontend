import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ReservationList } from '../../components/reservation-list/reservation-list.jsx'
import axios from 'axios'

export const UserReservations = () => {
  const [reservations, setReservations] = useState([])
  const uid = useSelector((storeState) => storeState.userModule.uid)

  useEffect(() => {
    const getReservations = async () => {
      const data = await axios(
        'http://localhost:4000/reservations/reservations?docId='+uid,
      )

      setReservations(data.data.reservations)
    }
    getReservations()
  }, [uid])

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

