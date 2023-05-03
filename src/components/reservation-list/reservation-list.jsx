
import React, { useState, useEffect } from 'react'
import { ReservationPreview } from '../reservation-preview/reservation-preview.jsx'
import dayjs from 'dayjs';

export const ReservationList = ({ reservations }) => {
    const todaysDate = dayjs().format('YYYY-MM-DD')
    const [sorting, setSorting] = useState({ field: 'date', ascending: false })
    const [currentReservations, setCurrentReservations] = useState(reservations)

    const applySorting = (e, key, ascending) => {
        e.preventDefault();
        e.stopPropagation();
        setSorting({ key: key, ascending: ascending });
    }

    useEffect(() => {
        // Copy array to prevent data mutation
        const currentReservationsCopy = [...currentReservations];

        // Apply sorting
        const sortedCurrentReservations = currentReservationsCopy.sort((a, b) => {
            return a[sorting.key].localeCompare(b[sorting.key]);
        });

        // Replace currentUsers with sorted currentUsers
        setCurrentReservations(
            // Decide either currentUsers sorted by ascending or descending order
            sorting.ascending ? sortedCurrentReservations : sortedCurrentReservations.reverse()
        );
    }, [sorting, currentReservations]);

    return (
        <section className="list-of-reservations-container">
            <table className="reservations-list">
                <thead>
                    <tr>
                        <th className='reservation-th' onClick={(e) => applySorting(e, 'date', !sorting.ascending)}>תאריך</th>
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
