import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faWhatsapp, faWaze } from "@fortawesome/free-brands-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

export const AppFooter = () => {
  const { pathname } = useLocation()

  return (
    (pathname !== '/schedule' && pathname !== '/dashboard') ? (
      <>
        <div className="footer-sections">
          <section className="top-footer container">
            <div className="main-item flex-column">
              <h2 className="title">האקדמיה</h2>
              <ul className="clean-list flex-column">
                <li><p>כתובתינו:<br />חיים לבנון 60, תל-אביב</p>
                  נווטו אלינו ב-<a href='https://ul.waze.com/ul?place=ChIJI-no_m9JHRURWDitqXYq95c&ll=32.11617920%2C34.80226590&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faWaze} /></a>
                </li>
                {/* <li><NavLink to="/user-reservation/new-reservation">הזמנת מגרשים</NavLink></li> */}
                <li><NavLink to="/about">על האקדמיה</NavLink></li>
              </ul>
            </div>
            <div className="main-item flex-column">
              <h2 className="title">צרו קשר</h2>
              <ul className="clean-list flex-column">
                <li>
                  <a href="mailto:dudiselaacademy@gmail.com">שליחת מייל</a>
                </li>
                <li>
                  <a href="https://wa.me/972523782815" target="_blank" rel="noreferrer">
                    שליחת הודעה<FontAwesomeIcon icon={faWhatsapp} />
                  </a>
                </li>
                <li>
                  <a href="tel:972523782815" target="_blank" rel="noreferrer">
                    התקשרו אלינו<FontAwesomeIcon icon={faPhone} /></a>
                </li>

              </ul>
            </div>
            <div className="main-item flex-column">
              <h2 className="title">מדיה חברתית</h2>
              <ul className="clean-list flex-column">
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

          </section>

        </div>
        <section className="bottom-footer">
          <ul className="legal-list clean-list flex">
            <li><NavLink to="/">תנאים &amp; הגבלות</NavLink></li>
            <li><NavLink to="/">הצהרת פרטיות</NavLink></li>
            <li>&copy; 2023 Copyright DudiSelaTennisAcademy Inc.</li>
          </ul>
        </section>
      </>
    ) : (
      <span></span>
    )
  )
}

