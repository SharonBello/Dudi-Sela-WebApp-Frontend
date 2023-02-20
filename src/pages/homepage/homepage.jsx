import React, { useState } from 'react'
import { HomeHero } from '../../components/homepage-sections/home-hero/home-hero.jsx'
import { QuestionAnswer } from '../../components/homepage-sections/question-answer/question-answer.jsx'
import { useWindowDimensions } from '../../hooks/useWindowDimensions.jsx'
import { Testimonials } from '../../components/homepage-sections/testimonials/testimonials.jsx'
import { DudiInfo } from '../../components/homepage-sections/dudi-info/dudi-info.jsx'
import { Coaches } from '../../components/homepage-sections/coaches/coaches.jsx'
import { CoachesMobile } from '../../components/homepage-sections/coaches/coaches-mobile/coaches-mobile.jsx'

export const Homepage = () => {
  // const { width } = useWindowDimensions()
  let [isActive, setIsActive] = useState(false)

  let coaches = [
    {
      img: "https://res.cloudinary.com/primap/image/upload/v1674812443/General/Dudi%20Sela/dudisela_pbrmv6.webp",
      video: "",
      name: 'דודי סלע',
      lastName: 'sela',
      title: 'מנהל ומאמן האקדמיה',
      description: 'לשעבר שחקן ATP טופ 30 עם ניסיון של מעל 10 שנים בטופ 100 העולמי. ' +
      'הוביל את נבחרת ישראל בגביע דייויס להופעה היסטורית בחצי הגמר בשנת 2009. ' +
      'השחקן השני המוביל בהיסטוריה של ה-ATP בתארים של אתגרי ATP. '
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/yoavbenzvi_n3ywhn.webp',
      video: "",
      name: 'יואב בן צבי',
      lastName: 'ben-zvi',
      title: 'מנהל ומאמן האקדמיה',
      description: 'מאמן נבחרת ישראל. שחקן לאומי בכיר לשעבר עם ניסיון של מעל מ-15 שנה כמאמן מקצועי. ' +
      'המאמן הראשי של דודי סלע למעלה משבע שנים בתקופה שבה הדירוג של דודי היה 35 בעולם. ' +
      'היה מאמנה הראשי של שחקנית ה- WTA לשעבר שדורגה במקום ה -11, שחר פאר. '
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1674812443/General/Dudi%20Sela/tomerzirkin_mdrfvs.webp',
      video: '',
      name: 'תומר צירקין',
      lastName: 'zirkin',
      title: '',
      description: 'מאמן טניס תחרותי באקדמיה בעל ניסיון של 6 שנים באימון ' +
                  ' שחקן מקצועי לשעבר בנוער וקצת בבוגרים. ' +
                  'אני מאמין שהערכים שקיבלתי במגרש ובבית אלה הערכים שאני מביא איתי למגרש ולשחקנים. כדי להגיע רחוק בטניס תחרותי צריך עקביות לאורך זמן, אמונה וסביבה תומכת '
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/dorvertherimer_yhiteu.webp',
      video: "",
      name: 'דור ורטהיימר',
      lastName: 'werthaimer',
      title: '',
      description: 'בן 37, אב לשניים, בעל תואר שני, שחקן מקצוען לשעבר ומאמן טניס עם נסיון של 15 שנים. '
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/ronilior_nbrdrv.webp',
      video: "",
      name: 'רוני ליאור',
      lastName: 'lior',
      title: '',
      description: 'בת 21 מחיפה, הכרתי את הטניס בגיל 8, נמצאת בענף כבר 13 שנים. ' +
                    'שחקנית טניס מקצועי לשעבר בנוער ובבוגרים. ' +
                    'אני מאמינה בעבודה קשה, התמדה, סבלנות וסובלנות, יחס אישי לכל שחקן, השקעה ובעיקר להנות מכל רגע על המגרש '
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/orasna_lmqbho.webp',
      name: 'אור אסנה',
      video: 'https://res.cloudinary.com/primap/video/upload/v1674812472/General/Dudi%20Sela/orasna_trux9o.mp4',
      lastName: 'asana',
      title: '',
      description: 'שחקן תחרותי לשעבר יוצא יחידה מובחרת ומאמן 7 שנים מתעסק בטניס לכל הרמות ולכל הגילאים ודוגל בעבודה קשה על המגרש. משפט שמוביל אותי מהיום הראשון שהתחלתי לאמן :"החינוך הוא הדרך, האדם הוא המטרה"'
    },
    {
      img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/roeishafir_p5oool.webp',
      name: 'רועי שפיר',
      video: '',
      lastName: 'saphir',
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
      lastName: 'sipris',
      title: '',
      description: 'משחק טניס מגיל 6 כולל טניס תחרותי בתחרויות בינלאומיות. ' +
                  'מאמן עם ניסיון של מעל 10 שנים בכל הרמות. '
    }
  ]
  // const handleImgClick = () => {
  //   setIsActive(!isActive)
  // }

  const renderCoaches = () => {
    if (window.innerWidth < 720) {
      return <CoachesMobile coaches={coaches}/>;
    } else {
      return <Coaches coaches={coaches}/>;
    }
  }

  return (
    <div className="home">
      <section className="home-hero">
        <HomeHero />
      </section>
      <section className="coaches-container container">
        <h2>נבחרת המאמנים</h2>
        {renderCoaches()}
      </section>
      <DudiInfo />
      <section className="FAO-container container flex-column align-center">
        <QuestionAnswer />
      </section>
      <Testimonials />
    </div >
  )
}

