import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { CoachesPreview } from './coaches-preview/coaches-preview.jsx'

export const Coaches = () => {
  const { loggedUser } = useSelector((storeState) => storeState.userModule)
  let coaches = [
    {
      img: "https://res.cloudinary.com/primap/image/upload/v1674812443/General/Dudi%20Sela/dudisela_pbrmv6.webp",
      video: "",
      name: 'דודי סלע',
      latinName: 'dudi-sela',
      title: 'מנהל ומאמן האקדמיה',
      description: 'לשעבר שחקן ATP טופ 30 עם ניסיון של מעל 10 שנים בטופ 100 העולמי. ' +
      'הוביל את נבחרת ישראל בגביע דייויס להופעה היסטורית בחצי הגמר בשנת 2009. ' +
      'השחקן השני המוביל בהיסטוריה של ה-ATP בתארים של אתגרי ATP. '
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/yoavbenzvi_n3ywhn.webp',
      video: "",
      name: 'יואב בן צבי',
      latinName: 'yoav-ben-zvi',
      title: 'מנהל ומאמן האקדמיה',
      description: 'מאמן נבחרת ישראל. שחקן לאומי בכיר לשעבר עם ניסיון של מעל מ-15 שנה כמאמן מקצועי. ' +
      'המאמן הראשי של דודי סלע למעלה משבע שנים בתקופה שבה הדירוג של דודי היה 35 בעולם. ' +
      'היה מאמנה הראשי של שחקנית ה- WTA לשעבר שדורגה במקום ה -11, שחר פאר. '
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1674812443/General/Dudi%20Sela/tomerzirkin_mdrfvs.webp',
      video: '',
      name: 'תומר צירקין',
      latinName: '',
      title: '',
      description: 'מאמן טניס תחרותי באקדמיה בעל ניסיון של 6 שנים באימון ' +
                  ' שחקן מקצועי לשעבר בנוער וקצת בבוגרים. ' +
                  'אני מאמין שהערכים שקיבלתי במגרש ובבית אלה הערכים שאני מביא איתי למגרש ולשחקנים. כדי להגיע רחוק בטניס תחרותי צריך עקביות לאורך זמן, אמונה וסביבה תומכת '
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/dorvertherimer_yhiteu.webp',
      video: "",
      name: 'דור ורטהיימר',
      latinName: '',
      title: '',
      description: 'בן 37, אב לשניים, בעל תואר שני, שחקן מקצוען לשעבר ומאמן טניס עם נסיון של 15 שנים. '
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/ronilior_nbrdrv.webp',
      video: "",
      name: 'רוני ליאור',
      latinName: '',
      title: '',
      description: 'בת 21 מחיפה, הכרתי את הטניס בגיל 8, נמצאת בענף כבר 13 שנים. ' +
                    'שחקנית טניס מקצועי לשעבר בנוער ובבוגרים. ' +
                    'אני מאמינה בעבודה קשה, התמדה, סבלנות וסובלנות, יחס אישי לכל שחקן, השקעה ובעיקר להנות מכל רגע על המגרש '
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/orasna_lmqbho.webp',
      name: 'אור אסנה',
      video: 'https://res.cloudinary.com/primap/video/upload/v1674812472/General/Dudi%20Sela/orasna_trux9o.mp4',
      latinName: '',
      title: '',
      description: 'שחקן תחרותי לשעבר יוצא יחידה מובחרת ומאמן 7 שנים מתעסק בטניס לכל הרמות ולכל הגילאים ודוגל בעבודה קשה על המגרש. משפט שמוביל אותי מהיום הראשון שהתחלתי לאמן :"החינוך הוא הדרך, האדם הוא המטרה"'
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/roeishafir_p5oool.webp',
      name: 'רועי שפיר',
      video: '',
      latinName: '',
      title: '',
      description: 'בוגר מכללת וינגייט תעודת מאמן טניס ' +
                    'שחקן מקצועי לשעבר בנוער וקצת בבוגרים. ' +
                    'ספורטאי מצטיין בצבא כשחקן טניס פעיל. ' +
                    'מאמן טניס כבר 17 שנה! ' +
                    'עובד עם כל הגילאים וכל הרמות. ' +
                    'אירגון של תחרויות טניס לחובבנים. '
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/yonisipris_p3p8el.webp',
      video: "",
      name: 'יוני סיפריס',
      latinName: '',
      title: '',
      description: 'משחק טניס מגיל 6 כולל טניס תחרותי בתחרויות בינלאומיות. ' +
                  'מאמן עם ניסיון של מעל 10 שנים בכל הרמות. '
    }
  ]

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