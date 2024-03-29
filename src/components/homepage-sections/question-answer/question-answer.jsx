import React from 'react'

export const QuestionAnswer = () => {

  let questionAnswer = [
    {
      question: "איך מזמינים מגרש?",
      answer: "1. נרשמים או נכנסים לחשבון: \n2.לוחצים על הזמנת מגרש \n3. בוחרים תאריך ושעה \n4. בוחרים את המגרש הרצוי \n5. לוחצים על הזמנת מגרש \n6. ממלאים את פרטי התשלום \n7. ממתינים לאישור מנהל המגרש \n8. רואים את ההזמנה החדשה בלחיצה על ההזמנות שלי"
    },
    {
      question: "כמה זה עולה?",
      answer: ` מחיר השכרת מגרש הוא 80 שקלים לשעה בערב, 60 שקלים בבוקר. \nיש הנחה קבועה למנויי מועדון הספורט`
    },
    {
      question: "איך אפשר לשלם?",
      answer: `ניתן לשלם בכרטיס אשראי בצורה מאובטחת באתר, דרך פייבוקס בקישור בדף התשלום או ישירות מול מנהל המועדון`
    },
    {
      question: "אילו סוגי מרגשים מוצעים להשכרה?",
      answer: "ישנם שישה מגרשים טניס בתקינה הגבוהה ביותר בישראל"
    },
    {
      question: "מדיניות ביטולים והחזרים",
      answer: "ניתן לבטל הזמנת מגרש ולקבל החזר מלא עד כשעתיים לפני מועד ההשכרה. \nבמידה ואינכם יכולים להגיע בזמן שקבעתם ולא ביטלתם בזמן, תחויבו מחיר מלא של השכרת המגרש."
    },
    {
      question: "איך מזמינים אימון אישי",
      answer: "פשוט ניתן לפנות למנהל המועדון בוואטסאפ"
    },
    {
      question: "איך נרשמים לאקדמיה",
      answer: "פשוט ניתן לפנות למנהל המועדון בוואטסאפ או לשלוח מייל"
    },
  ]

  return (
    <>
      <h2>
        שאלות נפוצות
      </h2>
      <div className="qa container">
        {questionAnswer.map((qa, index) =>
          <div className="qa-item" key={index}>
            <details>
              <summary>{qa.question}</summary>
              <p>{qa.answer}</p>
            </details>
          </div>)}
      </div>
    </>
  )
}
