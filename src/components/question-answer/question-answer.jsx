import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"

export const QuestionAnswer = () => {
  return (
    <>
      <h2>
        שאלות ותשובות
      </h2>
      <div className="qa">

        <details className="default square">
          <summary>איך מזמינים מגרש?<span className="open-detail"></span>
            <span className="close-detail"></span></summary>
          <p>
            1. נרשמים או נכנסים לחשבון בלינק הזה:
            <NavLink to="/signin"> כניסה/הרשמה</NavLink>
            <br />
            2. לוחצים על
            <NavLink to="/user-reservations/new-reservation"> הזמנת מגרש</NavLink>
            <br />
            3. בוחרים תאריך ושעה
            <br />
            4. בוחרים את המגרש הרצוי
            <br />
            5. לוחצים על הזמנת מגרש
            <br />
            6. ממלאים את פרטי התשלום
            <br />
            7. ממתינים לאישור מנהל המגרש
            <br />
            8. רואים את ההזמנה החדשה בלחיצה על
            <NavLink to="/user-reservations"> ההזמנות שלי</NavLink>
          </p>
        </details>

        <details className="primary square">
          <summary>כמה זה עולה?<span className="open-detail"></span><span className="close-detail"></span></summary>
          <p>מחיר השכרת מגרש הוא 120 שקלים לשעה.
            <br />
            יש הנחה קבועה למנויי מועדון הספורט
          </p>
        </details>
        <details className="success">
          <summary>איך אפשר לשלם? <span className="open-detail"></span>
            <span className="close-detail"></span></summary>
          <p className='container'>ניתן לשלם בכרטיס אשראי בצורה מאובטחת באתר,
            דרך פייבוקס בקישור בדף התשלום
            או ישירות מול מנהל המועדון
            <a href="https://wa.me/972523782815" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </p>
        </details>
        <details className="success">
          <summary>אילו סוגי מרגשים מוצעים להשכרה? <span className="open-detail"></span>
            <span className="close-detail"></span></summary>
          <p className='container'>
            ישנם שישה מגרשים טניס בתקינה הגבוהה ביותר בישראל
          </p>
        </details>
        <details className="success">
          <summary>מדיניות ביטולים והחזרים <span className="open-detail"></span>
            <span className="close-detail"></span></summary>
          <p className='container'>
            ניתן לבטל הזמנת מגרש ולקבל החזר מלא עד כשעתיים לפני מועד ההשכרה.
            במידה ואינכם יכולים להגיע בזמן שקבעתם ולא ביטלתם בזמן, תחויבו מחיר מלא של השכרת המגרש.
          </p>
        </details>
        <details className="success">
          <summary>איך מזמינים אימון אישי<span className="open-detail"></span>
            <span className="close-detail"></span></summary>
          <p className='container'>
            פשוט ניתן לפנות למנהל המועדון בוואטסאפ
            <a href="https://wa.me/972523782815" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </p>
        </details>
        <details className="success">
          <summary>איך נרשמים לאקדמיה<span className="open-detail"></span>
            <span className="close-detail"></span></summary>
          <p className='container'>
            פשוט ניתן לפנות למנהל המועדון בוואטסאפ
            <a href="https://wa.me/972523782815" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            <br />
            או למלא את הפרטים כאן
            ונחזור אליכם בהקדם
          </p>
        </details>
      </div>
    </>
  )
}
