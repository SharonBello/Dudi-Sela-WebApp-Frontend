import React, { useState } from 'react'
import { HomeHero } from '../../components/home-hero/home-hero.jsx'
import { QuestionAnswer } from '../../components/question-answer/question-answer.jsx'
import { useWindowDimensions } from '../../hooks/useWindowDimensions.jsx'

export const Homepage = () => {
  const { width } = useWindowDimensions()
  let [ isActive, setIsActive ] = useState(false)

  const handleImgClick = () => {
    setIsActive(!isActive)
  }

  return (
    <div className="home">
      <section className="hero">
        <HomeHero />
      </section>

       <section className="FAO-container">
      <QuestionAnswer/>
      </section>

    </div >
  )
}

