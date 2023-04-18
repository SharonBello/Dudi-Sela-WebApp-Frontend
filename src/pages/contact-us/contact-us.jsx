import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faWhatsapp, faWaze } from "@fortawesome/free-brands-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from 'react-router-dom'

export const ContactUs = () => {
  return (
    <section className="contact-us-container flex-column">
      <div className="main-item flex align-center">
        <div className="contact-us flex-column">
          <h2 className="title">צרו קשר</h2>
          <ul className="clean-list flex-column">
            <li>
              <a href="mailto:dudiselaacademy@gmail.com">שליחת מייל</a>
            </li>
            <li>
              <a href="https://wa.me/972587040485" target="_blank" rel="noreferrer">
                שליחת הודעה<FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </li>
            <li>
              <a href="tel:972523782815" target="_blank" rel="noreferrer">
                התקשרו אלינו<FontAwesomeIcon icon={faPhone} /></a>
            </li>
            <li><p>כתובתינו:<br />חיים לבנון 60, תל-אביב</p>
              נווטו אלינו ב-<a href='https://ul.waze.com/ul?place=ChIJI-no_m9JHRURWDitqXYq95c&ll=32.11617920%2C34.80226590&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faWaze} /></a>
            </li>
            <li><NavLink to="/about">על האקדמיה</NavLink></li>

            <li>
              <a href='https://www.facebook.com/DudiSelaTennisAcademy/' target="_blank" rel="noreferrer">
                פייסבוק<FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a href='https://www.instagram.com/dudiselaacademy/' target="_blank" rel="noreferrer">
                אינסטגרם<FontAwesomeIcon icon={faInstagram} /></a></li>
          </ul>
        </div>
      </div>
    </section >
  )
}


