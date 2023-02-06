import React from 'react'
import { ChildrenPractice } from '../../components/homepage-sections/childrenpractice/childrenpractice'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"

export const LearnTennis = () => {
  const { loggedUser } = useSelector((storeState) => storeState.userModule)

  const tennisAcademyInfo = [
    {
      id: 1,
      title: 'לגדול ולהתפתח באקדמיה',
      body: 'באקדמיה אנו מאמינים במתן יחס אישי ובמלוא תשומת הלב לילד שלך. לכן אנו מקפידים על שמירת מספר ילדים מאוזן בכל קבוצה ועד שמונה ילדים בקבוצה. מעבר ליכולת משחק שאנחנו דואגים לפתח, ישנו דגש רב על פיתוח יכולות גופניות, שיפור קואורדינציה והקניית ערכי המשחק. לימודי טניס כבר בגיל צעיר עוזרים לילד לפתח את היכולות המוטוריות הבסיסיות שיעזרו לו בכל ענף ספורט ויאפשרו התפתחות תקינה של יכולות פיזיות ומנטליות. לימודי הטניס אצלנו יקנו לילדך ערכים חשובים לחיים- בין אם זה משמעת באימונים ועמידה בלוחות הזמנים ובין אם זה התמדה באימונים.',
    },
    {
      id: 2,
      title: 'קבוצות תחרותיות',
      body: 'בקבוצות התחרותיות באקדמיה מתאמנים בין היתר אלוף ישראל לנוער לגילאי 14, 16, אלופת ישראל לנוער, שחקנים בטופ 200 העולמי לנוער, וגם שחקנים מנבחרת הדיוויס.',
    },
  ]

  return (
    <div className='academy-info container flex-column'>
      {tennisAcademyInfo.map((item) =>
        <article
          key={item.id}
        >
          <h2>{item.title}</h2>
          <p>{item.body}</p>
        </article>
      )}
      <div className='contact-link flex align-center justify-between'>
        {/* {!loggedUser ? */}
        <a href="https://wa.me/972523782815" target="_blank" rel="noreferrer" className="flex align-center open-popup-join">רוצים לגדול איתנו?<FontAwesomeIcon icon={faWhatsapp} /></a>
      </div>
      <div className='slide-images'>
        <ChildrenPractice />
      </div>

    </div >
  )
}


