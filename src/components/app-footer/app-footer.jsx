import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons"

// library.add(fab, faFacebook, faInstagram, faWhatsApp)

export const AppFooter = () => {
  return (
    <>
      <div className="footer-sections">
        <section className="top-footer container">
          <div className="main-item flex flex-column">
            <h2 className="title">האקדמיה</h2>
            <ul className="clean-list flex flex-column">
              <li><a href="/">מידע כללי</a></li>
              <li><a href="/">מגרשים</a></li>
              <li><a href="/">מגרשים</a></li>
            </ul>
          </div>
          <div className="main-item flex flex-column">
            <h2 className="title">צרו קשר</h2>
            <ul className="clean-list flex flex-column">
              <li><a href="/">עזרה</a></li>
              <li><a href="/">על האקדמיה</a></li>
            </ul>
          </div>
          <div className="main-item flex flex-column">
            <h2 className="title">הרשמו לקבלת מידע</h2>
            <p>קבלו את המידע המעודכן ביותר לגבי האקדמיה לטניס של דודי סלע</p>
            <form>
              <input type="email" name="email" placeholder="Enter email address" />
              <input type="submit" value="Subscribe" />
            </form>
          </div>
        </section>

        <section className="middle-footer flex">
          <ul className="social-icons clean-list flex">
            <li className="flex flex-column">
              <a href='https://www.facebook.com/DudiSelaTennisAcademy/' target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebook} />

              </a>
            </li>
            <li>
              <a href='https://www.instagram.com/?hl=en' target="_blank" className="disabled-link" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="https://wa.me/972523782815" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </li >
          </ul >
        </section>

      </div>
      <section className="bottom-footer">
        <ul className="legal-list clean-list flex">
          <li><a href="/">תנאים &amp; הגבלות</a></li>
          <li><a href="/">הצהרת פרטיות</a></li>
          <li>&copy; 2022 Copyright DudiSelaTennisAcademy Inc.</li>
        </ul>
      </section>
    </>
  )
}

