
import { ReservationPreview } from '../reservation-preview/reservation-preview.jsx'
import React, { useState, useEffect } from 'react'
import { utilService } from '../../services/util-service.js'

export const ReservationList = ({ reservations }) => {
    const year = new Date().getFullYear()
    let month = utilService.getLocalMonthName(new Date())

    const [qtyTotalReservations, setQtyTotalReservations] = useState(0)
    const [qtyMonthlyReservations, setQtyMonthlyReservations] = useState(0)
    const [qtyYearReservations, setQtyYearReservations] = useState(0)

    // useEffect(() => {
    //     calcTotals()
    // }, [reservations])


    const getYearReservations = () => {
        const thisYear = (new Date()).getFullYear()
        const yearReservations = reservations.filter(reservation => {
            return thisYear === utilService.getYearNumber(reservation.date)
        })
        setQtyYearReservations(yearReservations.length)
    }

    const getMonthReservations = () => {
        const thisMonth = (new Date()).getMonth()
        const monthlyReservations = reservations.filter(reservation => {
            return thisMonth + 1 === utilService.getMonthNumber(reservation.date)
        })
        setQtyMonthlyReservations(monthlyReservations.length)
    }

    const calcTotals = () => {
        setQtyTotalReservations(reservations.length)
        getMonthReservations()
        getYearReservations()
    }

    return (
        <section className="list-of-reservations-container container">
            <div className='reservation-totals flex justify-between'>
                <div className='reservation-Total-order flex flex-column align-center'>
                    <h2 className='reservation-total-amount'>סיכום הזמנות<br></br>מגרשים</h2>
                    <hr className='gentle-line'></hr>
                    <p className='qty-total-order'>כמות: {qtyTotalReservations}</p>
                </div>

                <hr width="1" size="100"></hr>

                <div className='reservation-Total-order flex flex-column align-center'>
                    <h2 className='reservation-total-amount'>הזמנות שנת<br></br>{year}</h2>
                    <hr className='gentle-line'></hr>
                    <p className='qty-total-order'>כמות: {qtyYearReservations}
                    </p>
                </div>

                <hr width="1" size="100"></hr>

                <div className='reservation-Total-order flex flex-column align-center'>
                    <h2 className='reservation-total-amount'>הזמנות חודש<br></br>{month}</h2>
                    <hr className='gentle-line'></hr>
                    <p className='qty-total-order'>כמות: {qtyMonthlyReservations}</p>
                </div>
            </div>

            <table className="reservations-list">
                <thead>
                    <tr>
                        <th className='reservation-th'>תאריך</th>
                        <th className='reservation-th'>שעת התחלה</th>
                        <th className='reservation-th'>שעת סיום</th>
                        <th className='reservation-th'>מספר מגרש</th>
                        <th className='reservation-th'>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations && reservations.map(item =>
                        <ReservationPreview
                        key={item.id}
                        item={item}
                        />
                        )}
                </tbody>
            </table>
        </section>

    )
}
