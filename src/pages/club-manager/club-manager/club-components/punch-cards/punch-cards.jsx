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
  const [punchCards, setPunchCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCard, setSelectedCard] = useState();
  const navigate = useNavigate()
  const _emptyCard = { cardName: undefined, creditAmount: undefined, creditInMinutes: undefined, dueNumDays: undefined, blockOnDate: undefined, price: undefined, additionalDetails: undefined, showForSale: undefined, isMember: false, validForMembers: [], cardHours: []}

  useEffect(()=> {
    if (punchCards.length === 0) {
      getPunchCards().then(res => {
        setPunchCards(res)
      })
      setSelectedCard(_emptyCard)
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

  const handleClose = () => {
      setShowModalCreate(false)
      setSelectedCard(_emptyCard)
  }
  const renderModalCreate = () => {
    if (showModalCreate) {
      return (
        <CreatePunchCard selectedCard={selectedCard} showModalCreate={showModalCreate} closePunchCard={closePunchCard} handleSave={saveSelectedCard} handleClose={(e) => handleClose(e)} isLoading={isLoading}/>
      )
    }
  }
  const handleShowPunchCard = (e, card) => {
    console.log(e, card)
    setSelectedCard(card)
    setShowModalCreate(true)
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
  const removeSelectedCard = async (court) => {
    let res = await courtService.deletePunchCard(court)
    // getClubCards().then(res => {
    //   setCardData(res)
    // })
    setShowModalCreate(false)
  }
  const saveSelectedCard = async (e, card) => {
    // let res = await courtService.editPunchCard(selectedCard)
    // getClubCards().then(res => {
    //   setCardData(res)
    // })

    if (card.cardName.trim() !== "") {
      setIsLoading(true)
      let res
      if (selectedCard && selectedCard.id) { // card exists
        card["id"] = selectedCard.id
        res = await courtService.editPunchCard(card)
      } else {
        res = await courtService.addPunchCard(card)
      }
      getPunchCards().then(res => {
        setPunchCards(res)
        setIsLoading(false)
      })
    }
    setShowModalCreate(false)
    setSelectedCard(_emptyCard)
    setShowModalCreate(false)
  }
  const renderModalPunchCard = () => {
    if (showModalCreate) {
      return (
        <CreatePunchCard selectedCard={selectedCard} showModalCreate={showModalCreate} closePunchCard={closePunchCard} handleSave={saveSelectedCard} handleClose={(e) => handleClose(e)} isLoading={isLoading} removeSelectedCard={removeSelectedCard}/>
      )
    }
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