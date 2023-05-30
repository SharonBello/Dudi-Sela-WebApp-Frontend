import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { courtService } from '../../../../../services/court.service'
import Container from '@mui/material/Container';
import CustomDivider from '../../../../shared-components/custom-divider';
import Typography from '@mui/material/Typography'
import { CreatePunchCard } from './create-punch-card';
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../../../components/loader.jsx';
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const PunchCards = () => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [punchCards, setPunchCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCard, setSelectedCard] = useState();
  const navigate = useNavigate()
  const _emptyCard = { cardName: undefined, creditAmount: undefined, creditInMinutes: undefined, dueNumDays: undefined, blockOnDate: undefined, price: undefined, additionalDetails: undefined, showForSale: undefined, isMember: false, validForMembers: [], cardHours: []}
  const [messageAlert, setMessageAlert] = useState()
  const [showMessageAlert, setShowMessageAlert] = useState(false)

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
  const validateCard = (card) => {
    return (card.cardName && card.cardName.trim() !== "" && card.creditAmount && Number(card.creditAmount) > 0 && card.price && Number(card.price) > 0)
  }
  const saveSelectedCard = async (e, card) => {
    if (validateCard(card)) {
      setIsLoading(true)
      let res
      if (selectedCard.id) { // it is an existing card, as it has id
        card["id"] = selectedCard.id
        res = await courtService.editPunchCard(card)
      } else {
        res = await courtService.addPunchCard(card)
      }
      getPunchCards().then(res => {
        setPunchCards(res)
        setIsLoading(false)
      })
      setShowModalCreate(false)
      setSelectedCard(_emptyCard)
    } else {
      setMessageAlert('כרטיסייה חייבת להיות עם שם, מפסר ניקובים, ומחיר')
      setShowMessageAlert(true)
    }
  }
  const renderModalPunchCard = () => {
    if (showModalCreate) {
      return (
        <CreatePunchCard selectedCard={selectedCard} showModalCreate={showModalCreate} closePunchCard={closePunchCard} handleSave={saveSelectedCard} handleClose={(e) => handleClose(e)} isLoading={isLoading} removeSelectedCard={removeSelectedCard}/>
      )
    }
  }
  const handleCloseAlert = (event, reason) => {
    setShowMessageAlert(false)
  }
  const alertAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="#F2F6F7"
        onClick={handleCloseAlert}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )
  const renderMessageAlert = () => {
    if (showMessageAlert) {
      return (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          action={alertAction}
        >
          <Alert
            severity="info"
            onClose={handleCloseAlert}
            sx={{
              minWidth: '100%',
              color: '#1d1d1d',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#50D4F2'
            }}
            spacing={5}
            variant="filled"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >{messageAlert}</Alert>
        </Snackbar>
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
      {renderMessageAlert()}
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