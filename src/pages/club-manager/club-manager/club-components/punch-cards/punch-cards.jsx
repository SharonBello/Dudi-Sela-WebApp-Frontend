import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { courtService } from '../../../../../services/court.service'
import Container from '@mui/material/Container';
import CustomDivider from '../../../../shared-components/custom-divider';
import Typography from '@mui/material/Typography'
import { CreatePunchCard } from './create-punch-card';
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../../../components/loader.jsx';

export const PunchCards = () => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [, setShowPunchCard] = useState(false);
  const [, setSelectedPunchCard] = useState(false);
  const [punchCards, setPunchCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=> {
    if (punchCards.length === 0) {
      getPunchCards().then(res => {
        setPunchCards(res)
      })
    }
  }, [])
  const getPunchCards = async () => {
    try {
      // setIsLoading(true)
      let res = await courtService.getPunchCards()
      // setIsLoading(false)
      return res.data.punch_cards
    } catch (error) {
      navigate('/')
    }
  }
  const closePunchCard = () => {
    console.log("close")
  }

  const handleSave = async (e, card) => {
    if (card.cardName.trim() !== "") {
      setIsLoading(true)
      let res = await courtService.addPunchCard(card)
      getPunchCards().then(res => {
        setPunchCards(res)
        setIsLoading(false)
      })
    }
    setShowModalCreate(false)
  }
  const handleClose = () => {
      setShowModalCreate(false)
  }
  const renderModalCreate = () => {
    if (showModalCreate) {
      return (
        <CreatePunchCard showModalCreate={showModalCreate} closePunchCard={closePunchCard} handleSave={handleSave} handleClose={(e) => handleClose(e)} isLoading={isLoading}/>
      )
    }
  }
  const handleShowPunchCard = (e, card) => {
    console.log(e, card)
    setSelectedPunchCard(card)
    setShowPunchCard(true)
  }
  const renderPunchCards = () => {
    return (
      punchCards.map((card) => <button onClick={(e) => handleShowPunchCard(e, card)}>
        <h2>{card.cardName}</h2>
        <div>כמות קרדיט: {card.creditAmount}</div>
        <div>מחיר: {card.price}</div>
      </button>
      )
    )
  }
  const renderModalPunchCard = () => {
    return (
      <></>
    )
  }
  const renderIsLoading = () => {
    if (isLoading) {
      return (
        <Loader />
      )
    }
  }
  return (
    <Box className="club-box container">
      <Container className="club-content">
        <Box className="club-header">
          <Typography id="club-title" variant="h6" component="h2">כרטיסיות</Typography>
        </Box>
        <CustomDivider />
        <button onClick={() => setShowModalCreate(true)}>
          <h2>צור כרטיסיה</h2>
        </button>
        {renderModalCreate()}
        <CustomDivider />
        <h2>סוגי כרטיסיות</h2>
        {renderPunchCards()}
        {renderModalPunchCard()}
        {renderIsLoading()}
      </Container>
    </Box>
  )
}