import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadReservations } from '../../store/actions/reservation.actions.js'
import { ReservationList } from '../../components/reservation-list/reservation-list.jsx'
import { Loader } from '../../components/loader.jsx'


import axios from 'axios';

export const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const uid = useSelector((storeState) => storeState.userModule.uid);

    // const { reservations } = useSelector((storeState) => storeState.reservationModule)
    const [loader, setLoader] = useState(true)
    const dispatch = useDispatch()

  useEffect(() => {
    const getReservations = async () => {
      const data = await axios(
        'http://localhost:3030/reservations?docId='+uid,
      );

      setReservations(data.data.reservations);
    };
    getReservations();
  }, [uid]);

//   useEffect(() => {
//     setTimeout(() => {
//         setLoader(false)
//     }, 1000)
//     dispatch(loadReservations(uid))
//     window.scrollTo(0, 0)
// }, [])


  return (
    <section className="reservations-app-container">
            <div>
                <div className="reservations-preview-main-wrapper container">
                    <div className="reservations-list-container flex flex-column">
                        {/* {loader && <Loader />} */}
                        <ReservationList reservations={reservations} />
                    </div>
                </div>
            </div>
        </section>
  )

}

