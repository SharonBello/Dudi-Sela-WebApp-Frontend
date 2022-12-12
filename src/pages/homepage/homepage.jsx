import React, { useState } from 'react'
import { HomeHero } from '../../components/homepage-sections/home-hero/home-hero.jsx'
import { QuestionAnswer } from '../../components/homepage-sections/question-answer/question-answer.jsx'
import { useWindowDimensions } from '../../hooks/useWindowDimensions.jsx'
import { Testimonials } from '../../components/homepage-sections/testimonials/testimonials.jsx'
import { DudiInfo } from '../../components/homepage-sections/dudi-info/dudi-info.jsx'
import { Coaches } from '../../components/homepage-sections/coaches/coaches.jsx'
import { CoachesMobile } from '../../components/homepage-sections/coaches/coaches-mobile/coaches-mobile.jsx'

export const Homepage = () => {
  const { width } = useWindowDimensions()
  let [isActive, setIsActive] = useState(false)

  let coaches = [
    {
      img: 'http://res.cloudinary.com/primap/image/upload/v1669658055/General/Dudi%20Sela/715425_v698cb.jpg',
      legends: 'מאמן ראשי',
      quote: '"יתכן שיש אנשים שיש להם יותר כישרון ממך, אבל אין שום תירוץ לאף אחד לעבוד קשה יותר ממך." - דר גטר',
      name: 'דודי סלע',
      latinName: 'dudi-sela',
      coachSince: '2011',
    },
    {
      img: 'http://res.cloudinary.com/primap/image/upload/v1669659160/General/Dudi%20Sela/benzvi2_ugzmuz.jpg',
      legends: 'מאמן בכיר',
      quote: '"אתה יכול להניע באמצעות פחד, ואתה יכול להניע באמצעות תגמול. אך שתי השיטות הן זמניות בלבד. הדבר היחיד שנמשך הוא מוטיבציה עצמית. "- הומר רייס',
      name: 'יואב בן צבי',
      latinName: 'yoav-ben-zvi',
      coachSince: '2010',
    },
    {
      img: 'http://res.cloudinary.com/primap/image/upload/v1669659056/General/Dudi%20Sela/yoavshav_dpeq4q.jpg',
      legends: 'מאמן בכיר',
      quote: ' "רוב האנשים מוותרים בדיוק כשהם עומדים להשיג הצלחה. הם פורשים בקו החצר האחד. הם מוותרים ברגע האחרון של המשחק רגל אחת מנגיעה נוחה. "- רוס פרוט',
      name: 'יואב שב',
      latinName: 'yoav-shav',
      coachSince: '2011',
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1670859928/General/Dudi%20Sela/Christian-Tennis-Coach-Square-1024x1024_cmepwl.jpg',
      legends: 'מאמן',
      quote: '"המוח הוא הגבול. כל עוד המוח יכול לדמיין את העובדה שאתה יכול לעשות משהו, אתה יכול לעשות את זה, כל עוד אתה באמת מאמין במאה אחוז. "- ארנולד שוורצנגר',
      name: 'יוסי גבע',
      latinName: 'someone1',
      coachSince: '2010',
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1670860127/General/Dudi%20Sela/_DSF5266_pwm0di.jpg',
      legends: 'מאמן',
      quote: '"“אנשים מסוימים רוצים שזה יקרה, אנשים מסוימים מתפללים שזה יקרה, אחרים גורמים לזה לקרות. "- ג’ימ קריספר',
      name: 'ירין לוי',
      latinName: 'someone2',
      coachSince: '2010',
    }

  ]

  const handleImgClick = () => {
    setIsActive(!isActive)
  }

  return (
    <div className="home">
      <section className="home-hero">
        <HomeHero />
      </section>
      <section className="coaches-container container">
        <h2>נבחרת המאמנים</h2>
        {(width <= 650) ? <CoachesMobile coaches={coaches}/> : <Coaches coaches={coaches}/>}
      </section>
      <DudiInfo />
      <section className="FAO-container container flex-column align-center">
        <QuestionAnswer />
      </section>
      <Testimonials />
    </div >
  )
}

