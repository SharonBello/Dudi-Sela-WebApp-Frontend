import React, { useEffect, useState } from 'react'
import { Card } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { reservationService } from '../../services/reservation.service.js'
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service';

export const UserProfile = () => {
    let uid = JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGED_USER)).uid
    let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)
    let [userCredit, setuserCredit] = useState()

    useEffect(() => {
        getUserCredit(uid)
    }, [])

    const getUserCredit = async (uid) => {
        if (loggedUser || uid) {
            let _userCredit = await reservationService.getCredit(uid)
            console.log(_userCredit)
            setuserCredit(_userCredit)
        }
    }



  return (
    <div className='academy-info container flex-column'>
      <Card>
        <article>
            <label>מספר הזמנות בכרטיסייה:</label>
            <> {userCredit} </>
        </article>
      </Card>
    </div >
  )
}


