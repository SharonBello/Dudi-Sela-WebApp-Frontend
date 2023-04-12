import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { TextBox } from '../shared-components/text-box';

export const CreatePunchCard = ({ showModalCreate, closePunchCard, setShowModalCreate }) => {
    const [cardName, setCardName] = useState("ee")
    // const [clubMail, setClubMail] = useState("dudiselaacademy@gmail.com");

    const handleSave = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setShowModalCreate(false)
    }
    const handleClose = () => {
        setShowModalCreate(false)
    }
    return (
        <Modal
            open={showModalCreate}
            onClose={closePunchCard}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal-overlay">
            <Box className="modal-box">
                <Container className="modal-content">
                    <Box className="modal-header">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            כרטיסייה חדשה
                        </Typography>
                    </Box>
                    <Box className="modal-body">
                        <TextBox label="שם הכרטיסייה" value={cardName} setValue={setCardName} />
                        <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
                        <div className='flex align-center justify-between save-cancel-btn-container'>
                            <button onClick={handleSave} className='save-btn'>
                                צור כרטיסייה
                            </button>
                            <button onClick={handleClose} className='cancel-btn'>
                                ביטול
                            </button>
                        </div>
                    </Box>
                </Container>
            </Box>
        </Modal>
    )
}


