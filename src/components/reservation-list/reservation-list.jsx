
import React from 'react'
import { ReservationPreview } from '../reservation-preview/reservation-preview.jsx'
import dayjs from 'dayjs';

export const ReservationList = ({ reservations }) => {
    const todaysDate = dayjs().format('YYYY-MM-DD')

    return (
        <section className="list-of-reservations-container container">
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
                            todaysDate={todaysDate}
                        />
                    )}
                </tbody>
            </table>
        </section>
    )
}
