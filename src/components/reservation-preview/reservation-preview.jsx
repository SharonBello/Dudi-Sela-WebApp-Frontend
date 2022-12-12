import React, { useState } from "react"
import { useNavigate } from "react-router"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// import { UserMessages } from "../../components/user-messages/user-messages.jsx"
import moment from 'moment'

moment().format()

export const ReservationPreview = ({ item }) => {
    let { isCancelable, setIsCancelable } = useState(false)
    let { isEditable, setIsEditable } = useState(false)
    const navigate = useNavigate()

    const getTimeLeft = (item) => {
        const currentDate = moment()
        const future = moment(item.date)
        const timeLeft = moment(future.diff(currentDate)).format("HH:mm:ss")
        return timeLeft
    }

    const getIsCancelable = (item) => {
        const cancelItem = getTimeLeft(item)
        if (cancelItem > 2) {
            setIsCancelable(true)
        }
        else {
            setIsCancelable(false)
        }
    }

    const onCancelItem = (item) => {
        getIsCancelable(item)
        if (isCancelable) {
            // UserMessages('info')
        }
    }

    const getIsEditable = (item) => {
        const editItem = getTimeLeft(item)
        if (editItem > 2) {
            setIsEditable(true)
        }
        else {
            setIsEditable(false)
        }
    }

    const onEditItem = (item) => {
        getIsEditable(item)
        if (isEditable) {
            navigate('/reservation/edit')
        }
    }

    return (
        <>
            <tr key={item.id}>
                <td data-label="תאריך">{item.date}</td>
                <td data-label="שעת התחלה">{item.startHour}</td>
                <td data-label="שעת סיום">{item.endHour}</td>
                <td data-label="מספר מגרש">{item.courtNumber}</td>
                <td data-label="פעולות" className="flex align-center justify-center">
                    <table className="table-actions flex">
                        <tbody>
                            <tr className="table-action-cell">
                                <td className="table-cell-btn">
                                    {isEditable ? <button className="table-btn" onClick={onEditItem}>
                                        <NavLink to='/user-reservations/edit-reservation/:reservationId'>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </NavLink>
                                    </button> : <button className="table-btn" disabled>
                                        <NavLink to='/user-reservations/edit-reservation/:reservationId' disabled>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </NavLink>
                                    </button>}
                                </td>
                                <td className="table-cell-btn">
                                    {isCancelable ? <button className="table-btn" onClick={onCancelItem}>
                                        <NavLink to='/user-reservations/'>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </NavLink>
                                    </button> : <button className="table-btn" disabled>
                                        <NavLink to='/user-reservations/'>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </NavLink>
                                    </button>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </>
    )
}