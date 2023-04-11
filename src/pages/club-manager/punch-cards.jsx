import { useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomDivider from '../shared-components/custom-divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { CreatePunchCard } from './create-punch-card';
import { DemoPunchCards } from './club-helper';

export const PunchCards = ({}) => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showPunchCard, setShowPunchCard] = useState(false);
  const [selectedPunchCard, setSelectedPunchCard] = useState(false);

  const closePunchCard = () => {
    console.log("close")
  }

  const renderModalCreate = () => {
    if (showModalCreate) {
      return (
        <CreatePunchCard showModalCreate={showModalCreate} closePunchCard={closePunchCard} setShowModalCreate={setShowModalCreate}/>
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
      DemoPunchCards.map((card)=> <button onClick={(e) => handleShowPunchCard(e, card)}>
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

  return (
    <Box className="club-box">
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
        </Container>
    </Box>
  )
}