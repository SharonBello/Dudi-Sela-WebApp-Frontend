import React from 'react'
import { ChildrenPractice } from '../../components/homepage-sections/childrenpractice/childrenpractice'
import { NavLink } from 'react-router-dom'

export const LearnTennis = () => {
  return (
        <div className={window.innerWidth > 700 ? 'margins-pc' : 'margins-mobile'}>
        <h2>לגדול ולהתפתח באקדמיה</h2>
        <p>
    לגדול ולהתפתח באקדמיה
    באקדמיה אנו מאמינים במתן יחס אישי ובמלוא תשומת הלב לילד שלך. לכן אנו מקפידים על שמירת מספר ילדים מאוזן בכל קבוצה ועד שמונה ילדים בקבוצה

    מעבר ליכולת משחק שאנחנו דואגים לפתח, ישנו דגש רב על פיתוח יכולות גופניות, שיפור קואורדינציה והקניית ערכי המשחק.

    לימודי טניס כבר בגיל צעיר עוזר לילקים לפתח את היכולות המוטוריות הבסיסיות שיעזרו לו בכל ענף ספורט ויאפשרו התפתחות תקינה של יכולות פיזיות ומנטליות.

    לימודי הטניס אצלנו יקנו לילדיך ערכים חשובים לחיים- בין אם זה משמעת באימונים ועמידה בלוחות הזמנים ובין אם זה התמדה באימונים
        </p>


        <h2 className='competitive-children-section'>קבוצות תחרותיות</h2>
        <p>
          <blockquote>בקבוצות התחרותיות באקדמיה מתאמנים בין היתר אלוף ישראל לנוער לגילאי 14, 16, אלופת ישראל לנוער, שחקנים בטופ 200 העולמי לנוער, וגם שחקנים מנבחרת הדיוויס </blockquote>

        </p>


        <div className='whatsapplink'>
            <NavLink to="/contact">רוצים לגדול אצלנו גם? תוכלו ליצור קשר </NavLink>
        </div>

        <ChildrenPractice />

    </div>
  )
}

