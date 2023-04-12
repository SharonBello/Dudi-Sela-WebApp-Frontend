import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { reservationService } from '../../services/reservation.service.js'
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service';

export const UserProfile = () => {
    const uid = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).uid
    const email = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).email

    let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)
    let [userCredit, setUserCredit] = useState()

    useEffect(() => {
        getUserCredit(uid)
    })

    const getUserCredit = async (uid) => {
        if (loggedUser || uid) {
            let _userCredit = await reservationService.getCredit(uid)
            setUserCredit(_userCredit)
        }
    }



  return (
    <div className='academy-info container flex-column'>
        <article>
              <label>{email}</label>
              <br />
              <label>מספר הזיכויים שיש לכרטיסיה:</label>
            <> {userCredit} </>
        </article>
    </div >
  )
}


