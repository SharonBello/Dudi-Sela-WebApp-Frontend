import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { CoachesPreview } from './coaches-preview/coaches-preview.jsx'

export const Coaches = ({coaches}) => {
  const { loggedUser } = useSelector((storeState) => storeState.userModule)

  return (
   <>
      <ul className="coaches-list clean-list">
        {coaches.map((coach) =>
          <CoachesPreview
            key={coach.img}
            coach={coach}
          />
        )}
        <li className="last-li flex-column">
          <div>
            <h3>רוצים לקבוע אימון אישי?</h3>
            {!loggedUser ?
              <NavLink to="/signup" className="open-popup-join">כנסו לחשבון</NavLink> : <a href="https://wa.me/972523782815" target="_blank" rel="noreferrer">
                שליחת הודעה<FontAwesomeIcon icon={faWhatsapp} />
              </a>}
          </div>
        </li>
      </ul>
    </>
  )
}