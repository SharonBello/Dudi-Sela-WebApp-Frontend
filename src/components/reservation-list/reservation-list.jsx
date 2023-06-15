
import React, { useState, useEffect } from 'react'
import { ReservationPreview } from '../reservation-preview/reservation-preview.jsx'
import { DateFormat } from '../../pages/club-manager/club-manager/club-helper.jsx'
import dayjs from 'dayjs';
import { courtService } from '../../services/court.service.js';

export const ReservationList = ({ reservations }) => {
    const todaysDate = dayjs().format(DateFormat)
    const [sorting, setSorting] = useState({ field: 'date', ascending: false })
    const [currentReservations, setCurrentReservations] = useState(reservations)
    const [hrBeforeCancel, setHrBeforeCancel] = useState();

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
    }, []);
    useEffect(()=> {
        const getClubPreferences = async () => {
            let res = await courtService.getClubPreferences()
            return res.data.club_preferences
        }
        if (hrBeforeCancel === undefined) {
          getClubPreferences().then(res => {
            setHrBeforeCancel(res.hrBeforeCancel)
          });
        }
      }, [])
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
                            hrBeforeCancel={hrBeforeCancel}
                        />
                    )}
                </tbody>
            </table>
        </section>
    )
}
