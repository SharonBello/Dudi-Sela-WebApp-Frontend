import React, { useState, useEffect, useRef } from "react"

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const counter = useRef(0);

  let slides = [
    {
      elementName: 'group-practice',
      quote: 'רמת האימונים הקבוצתיים אינטנסיבית וגבוהה, המאמנים מספקים תמיכה ומענה על כל שאלה וצורך. הקבוצה הקטנות (מקסימום של 4 שחקנים) מאפשרות לי להתמקד בכל אימון ולהתקדם בקלות ובמהירות. האימונים מספקים תוצאות מהירות וכל אימון מרגיש משמעותי. מעבר לכך, האימונים בקבוצה רצינית ותחרותית מדרבנת אותי להתקדם ולהשיג את המטרות שלי.',
      name: '--איתי גולדשטיין',
      img: 'https://res.cloudinary.com/primap/image/upload/v1669392539/General/Dudi%20Sela/1_5_wyrwrm.jpg'
    },
    {
      elementName: 'personal-training',
      quote: 'רמת האימונים הקבוצתיים אינטנסיבית וגבוהה, המאמנים מספקים תמיכה ומענה על כל שאלה וצרכים שלי. הקבוצה הקטנות (מקסימום של 4 שחקנים) מאפשרות לי להתמקד בכל אימון ולהתקדם בקלות ובמהירות. האימונים מספקים תוצאות מהירות וכל אימון מרגיש משמעותי. מעבר לכך, האימונים בקבוצה רצינית ותחרותית מדרבנת אותי להתקדם ולהשיג את המטרות שלי.',
      name: 'דור ינאי',
      img: 'https://res.cloudinary.com/primap/image/upload/v1669392548/General/Dudi%20Sela/1_3_tnz7rj.jpg'
    },
    {
      elementName: 'parent',
      quote: 'רמת האימונים הקבוצתיים אינטנסיבית וגבוהה, המאמנים מספקים תמיכה ומענה על כל שאלה וצרכים שלי. הקבוצה הקטנות (מקסימום של 4 שחקנים) מאפשרות לי להתמקד בכל אימון ולהתקדם בקלות ובמהירות. האימונים מספקים תוצאות מהירות וכל אימון מרגיש משמעותי. מעבר לכך, האימונים בקבוצה רצינית ותחרותית מדרבנת אותי להתקדם ולהשיג את המטרות שלי.',
      name: 'שחר כהן',
      img: 'https://res.cloudinary.com/primap/image/upload/v1669388589/General/Dudi%20Sela/pexels-rodnae-productions-8224537_pcqgk5.jpg'
    },
    {
      elementName: 'customer',
      quote: 'רמת האימונים הקבוצתיים אינטנסיבית וגבוהה, המאמנים מספקים תמיכה ומענה על כל שאלה וצרכים שלי. הקבוצה הקטנות (מקסימום של 4 שחקנים) מאפשרות לי להתמקד בכל אימון ולהתקדם בקלות ובמהירות. האימונים מספקים תוצאות מהירות וכל אימון מרגיש משמעותי. מעבר לכך, האימונים בקבוצה רצינית ותחרותית מדרבנת אותי להתקדם ולהשיג את המטרות שלי.',
      name: ' לוי לוי',
      img: 'https://res.cloudinary.com/primap/image/upload/v1669400699/General/Dudi%20Sela/pexels-blue-arauz-7386780_e69ymd.jpg'
    },
    
  ]
  
  useEffect(() => {
    setInterval(() => {
      counter.current = counter.current + 1;
      setCurrentIndex(counter.current % slides.length);
    }, 10000)
  }, []);

  return (
    <section className="slider-container container">
      <div className="slider">
        <div className="slider-content flex flex-column">
          <blockquote>{slides[currentIndex].quote}
          </blockquote>

          <figcaption>{slides[currentIndex].name}
          </figcaption>
        </div>
        <div className="slider-img">
          <img src={slides[currentIndex].img} alt={slides[currentIndex].name} />
        </div>
      </div>
    </section>
  )
}

