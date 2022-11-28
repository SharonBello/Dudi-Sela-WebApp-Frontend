import React, { useState } from 'react'
import { HomeHero } from '../../components/home-hero/home-hero.jsx'
import { QuestionAnswer } from '../../components/question-answer/question-answer.jsx'
import { useWindowDimensions } from '../../hooks/useWindowDimensions.jsx'
import { Testimonials } from '../../components/testimonials/testimonials.jsx'
import { DudiInfo } from '../../components/dudi-info/dudi-info.jsx'

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
      <DudiInfo />
       <section className="FAO-container container flex flex-column align-center">
      <QuestionAnswer/>
      </section>
      <Testimonials />

    </div >
  )
}

