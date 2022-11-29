import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { CoachesPreview } from './coaches-preview/coaches-preview.jsx'

export const Coaches = () => {
  const { loggedUser } = useSelector((storeState) => storeState.userModule)

  let coaches = [
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1669658055/General/Dudi%20Sela/715425_v698cb.jpg',
      legends: 'מאמן ראשי',
      quote: '"יתכן שיש אנשים שיש להם יותר כישרון ממך, אבל אין שום תירוץ לאף אחד לעבוד קשה יותר ממך." - דר גטר',
      name: 'דודי סלע',
      latinName: 'dudi-sela',
      coachSince: '2011',
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1669659160/General/Dudi%20Sela/benzvi2_ugzmuz.jpg',
      legends: 'מאמן בכיר',
      quote: '"אתה יכול להניע באמצעות פחד, ואתה יכול להניע באמצעות תגמול. אך שתי השיטות הן זמניות בלבד. הדבר היחיד שנמשך הוא מוטיבציה עצמית. "- הומר רייס',
      name: 'יואב בן צבי',
      latinName: 'yoav-ben-zvi',
      coachSince: '2010',
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1669659056/General/Dudi%20Sela/yoavshav_dpeq4q.jpg',
      legends: 'מאמן בכיר',
      quote: ' "רוב האנשים מוותרים בדיוק כשהם עומדים להשיג הצלחה. הם פורשים בקו החצר האחד. הם מוותרים ברגע האחרון של המשחק רגל אחת מנגיעה נוחה. "- רוס פרוט',
      name: 'יואב שב',
      latinName: 'yoav-shav',
      coachSince: '2011',
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1669659160/General/Dudi%20Sela/benzvi2_ugzmuz.jpg',
      legends: 'מאמן',
      quote: '"המוח הוא הגבול. כל עוד המוח יכול לדמיין את העובדה שאתה יכול לעשות משהו, אתה יכול לעשות את זה, כל עוד אתה באמת מאמין במאה אחוז. "- ארנולד שוורצנגר',
      name: 'מישהו מישהו',
      latinName: 'someone1',
      coachSince: '2010',
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1669659160/General/Dudi%20Sela/benzvi2_ugzmuz.jpg',
      legends: 'מאמן',
      quote: '"“אנשים מסוימים רוצים שזה יקרה, אנשים מסוימים מתפללים שזה יקרה, אחרים גורמים לזה לקרות. "- ג’ימ קריספר',
      name: 'מישהו מישהו',
      latinName: 'someone2',
      coachSince: '2010',
    }

  ]

  return (
    <section className="coaches-container container">
      <h2>נבחרת המאמנים</h2>
      <ul className="coaches-list clean-list">
        {coaches.map((coach, index) =>
          <CoachesPreview
            key={index}
            coaches={coaches}
            coach={coach}
          />
        )}
        <li className="last-li flex flex-column">
          <div>
            <h3>רוצים לקבוע אימון אישי?</h3>
            {!loggedUser ?
              <a href="/signup" className="open-popup-join">כנסו לחשבון</a> : <a href="https://wa.me/972523782815" target="_blank" rel="noreferrer">
                שליחת הודעה<FontAwesomeIcon icon={faWhatsapp} />
              </a>}
          </div>
        </li>
      </ul>
    </section>
  )
}