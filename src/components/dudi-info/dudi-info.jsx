import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTennisBall } from '@fortawesome/react-fontawesome'

export const DudiInfo = () => {
  return (
    <div className="dudi-info-wrapper container">
      <div className="selling-proposition ">
        <div className="selling-text">
          <h2>דודי סלע<br></br>מחבט מספר אחת בישראל</h2>
          <ul className="ul-selling-points">
            <li><h6>
              {/* <FontAwesomeIcon icon={faTennisBall} /> */}
              <strong>שחקן גביע דייוויס ואלוף ישראל</strong></h6>
              {/* <p>Find high-quality services at every price point. No hourly rates, just project-based pricing.</p> */}
            </li>

            <li><h6>
              {/* <FontAwesomeIcon icon={faTennisBall} /> */}
              <strong>מקום שני עולמי במספר זכיות בטורנירי צ'אלנג'ר</strong></h6>
              {/* <p>Find the right freelancer to begin working on your project within minutes.</p> */}
            </li>

            <li><h6>
              {/* <FontAwesomeIcon icon={faTennisBall} /> */}
              <strong>שמונה פעמים אלוף ישראל</strong></h6>
              {/* <p>Always know what you'll pay upfront. Your payment isn't released until you approve the work.</p> */}
            </li>
            <li><h6>
              {/* <FontAwesomeIcon icon={faTennisBall} /> */}
              <strong>דירוג שיא - 19</strong></h6>
              {/* <p>Questions? Our round-the-clock support team is available to help anytime, anywhere.</p> */}
            </li>
          </ul>
        </div>
        <div className="dudi-img">
          <img srcSet="https://res.cloudinary.com/primap/image/upload/v1669411761/General/Dudi%20Sela/1380675_10151713936454930_716247100_n_p4lhii.jpg" alt="" />
        </div>
      </div>
    </div >
  )
}


