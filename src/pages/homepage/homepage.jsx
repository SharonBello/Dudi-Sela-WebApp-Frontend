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

  // const handleImgClick = () => {
  //   setIsActive(!isActive)
  // }

  return (
    <div className="home">
      <section className="home-hero">
        <HomeHero />
      </section>
      <section className="coaches-container container">
        <h2>נבחרת המאמנים</h2>
        {/* {(width <= 650) ? <CoachesMobile coaches={coaches}/> : <Coaches coaches={coaches}/>} */}
        <Coaches/>
      </section>
      <DudiInfo />
      {/* <section className="FAO-container container flex-column align-center">
        <QuestionAnswer />
      </section> */}
      <Testimonials />
      <h4 className='competitive-children-section'>
        <div>בקבוצות התחרותיות באקדמיה מתאמנים בין היתר אלוף ישראל לנוער לגילאי 14, 16, אלופת ישראל לנוער, שחקנים בטופ 200 העולמי לנוער, וגם שחקנים מנבחרת הדיוויס </div>
      </h4>
    </div >
  )
}

