import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { TextBox } from '../../../../shared-components/text-box';
import { SwitchInput } from '../../../../shared-components/switch-input';
import { SelectMenu } from '../../../../shared-components/select-menu'
import { MemberTypes } from '../../club-helper'

export const CreatePunchCard = ({ showModalCreate, closePunchCard, setShowModalCreate }) => {
    const [cardName, setCardName] = useState()
    const [creditAmount, setCreditAmount] = useState()
    const [creditInMinutes, setCreditInMinutes] = useState()
    const [dueNumDays, setDueNumDays] = useState()
    const [blockOnDate, setBlockOnDate] = useState()
    const [price, setPrice] = useState()
    const [additionalDetails, setAdditionalDetails] = useState()
    const [showForSale, setShowForSale] = useState(false)
    const [isMember, setIsMember] = useState(false)
    const [validForMembers, setValidForMembers] = useState([])

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
                            כרטיסיה חדשה
                        </Typography>
                    </Box>
                    <Box className="modal-body">
                        <TextBox label="שם הכרטיסייה" value={cardName} setValue={setCardName} />
                        <SwitchInput label="מנויים" value={isMember} setValue={setIsMember} />
                        <TextBox label="כמות קרדיט" value={creditAmount} setValue={setCreditAmount} />
                        <TextBox label="זמן כל קרדיט בדקות" value={creditInMinutes} setValue={setCreditInMinutes} />
                        <TextBox label="תוקף בימים" value={dueNumDays} setValue={setDueNumDays} />
                        <TextBox label="לחסום בתאריך" value={blockOnDate} setValue={setBlockOnDate} />
                        <TextBox label="מחיר" value={price} setValue={setPrice} />
                        <TextBox label="מידע נוסף" value={additionalDetails} setValue={setAdditionalDetails} />
                        <SwitchInput label="להציג למכירה" value={showForSale} setValue={setShowForSale} />
                        <SelectMenu multiple={true} inputLabel="תקף עבור" defaultValue={validForMembers} values={MemberTypes} setValue={setValidForMembers} />

                        TODO
                        הוסף שעות

                        תקפות הכרטיסיה

                        <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
                        <div className='flex align-center justify-between save-cancel-btn-container'>
                            <button onClick={handleSave} className='save-btn'>
                                צור כרטיסיה
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