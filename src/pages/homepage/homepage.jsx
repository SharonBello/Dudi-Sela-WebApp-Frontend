import React, { useState } from 'react'
import { HomeHero } from '../../components/homepage-sections/home-hero/home-hero.jsx'
import { QuestionAnswer } from '../../components/homepage-sections/question-answer/question-answer.jsx'
import { useWindowDimensions } from '../../hooks/useWindowDimensions.jsx'
import { Testimonials } from '../../components/homepage-sections/testimonials/testimonials.jsx'
import { DudiInfo } from '../../components/homepage-sections/dudi-info/dudi-info.jsx'
import { Coaches } from '../../components/homepage-sections/coaches/coaches.jsx'

export const Homepage = () => {
  const { width } = useWindowDimensions()
  let [ isActive, setIsActive ] = useState(false)

  const handleImgClick = () => {
    setIsActive(!isActive)
  }

  return (
    <div className="home">
      <section className="home-hero">
        <HomeHero />
      </section>
      <Coaches />
      <DudiInfo />
       <section className="FAO-container container flex flex-column align-center">
      <QuestionAnswer/>
      </section>
      <Testimonials />

    </div >
  )
}

