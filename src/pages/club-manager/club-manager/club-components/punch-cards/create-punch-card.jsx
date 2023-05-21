import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import CustomDivider from '../../../../shared-components/custom-divider';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { TextBox } from '../../../../shared-components/text-box';
import { SwitchInput } from '../../../../shared-components/switch-input';
import { SelectMenu } from '../../../../shared-components/select-menu'
import { MemberTypes, DemoPunchCards, DemoWorkHours } from '../../club-helper'
import { AddClubHours } from '../club-hours/add-club-hours'
import { ClubHoursList } from '../club-hours/club-hours-list'
import { courtService } from '../../../../../services/court.service'

export const CreatePunchCard = ({ showModalCreate, closePunchCard, handleSave, handleClose, isLoading }) => {
    // const [cardName, setCardName] = useState()
    // const [creditAmount, setCreditAmount] = useState()
    // const [creditInMinutes, setCreditInMinutes] = useState()
    // const [dueNumDays, setDueNumDays] = useState()
    // const [blockOnDate, setBlockOnDate] = useState()
    // const [price, setPrice] = useState()
    // const [additionalDetails, setAdditionalDetails] = useState()
    // const [showForSale, setShowForSale] = useState(false)
    // const [isMember, setIsMember] = useState(false)
    // const [validForMembers, setValidForMembers] = useState([])
    const [cardName, setCardName] = useState()
    const [creditAmount, setCreditAmount] = useState()
    const [creditInMinutes, setCreditInMinutes] = useState()
    const [dueNumDays, setDueNumDays] = useState()
    const [blockOnDate, setBlockOnDate] = useState()
    const [price, setPrice] = useState()
    const [additionalDetails, setAdditionalDetails] = useState()
    const [showForSale, setShowForSale] = useState()
    const [isMember, setIsMember] = useState()
    const [validForMembers, setValidForMembers] = useState([])
    const [clubHoursList, setClubHoursList] = useState([])
    const [workHours, setWorkHours] = useState([]);

    const navigate = useNavigate()

    useEffect(()=> {
        const getClubHours = async () => {
            try {
            //   setIsLoading(true)
              let res = await courtService.getClubHours()
            //   setIsLoading(false)
              return res.data.club_hours
            } catch (error) {
              navigate('/')
            }
          }

        if (clubHoursList.length === 0) {
          DemoWorkHours(setWorkHours)
          getClubHours().then(res => {
            setClubHoursList(res)
          })
        }
      }, [])
      const handleSaveClubHours = async (e, clubHours) => {
        // if (clubHours.days.length > 0) {
        //   setIsLoading(true)
        //   let res = await courtService.addClubHours(clubHours)
        //   getClubHours().then(res => {
        //     setClubHoursList(res)
        //     setIsLoading(false)
        //   })
        // }
      }
      const handleDeleteClubHour = async(e, index) => {
        // setIsLoading(true)
        // let res = await courtService.deleteClubHours(clubHoursList[index])
        // // setIsLoading(false)
        // getClubHours().then(res => {
        //   setClubHoursList(res)
        //   setIsLoading(false)
        // })
      }
      const handleEditClubHours = async (e, clubHours) => {
        console.log(clubHours)
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

                        <CustomDivider className="grid-divider" />
                        <Box className="club-hours-instructions">
                            <span>שעות הפעילות</span>
                        </Box>
                        <CustomDivider className="grid-divider" />
                        <AddClubHours />
                        <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
                        <Box className="club-hours-instructions">
                            <span>תקפות הכרטיסייה</span>
                        </Box>
                        <ClubHoursList clubHoursList={clubHoursList} handleSaveClubHours={handleSaveClubHours} handleDeleteClubHour={handleDeleteClubHour} handleEditClubHours={handleEditClubHours}/>
                        <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
                        <div className='flex align-center justify-between save-cancel-btn-container'>
                            <button disabled={isLoading} onClick={(e) => handleSave(e, {cardName, creditAmount, creditInMinutes, dueNumDays, blockOnDate, price, additionalDetails, showForSale, "validForMembers": validForMembers[0] })} className='save-btn'>
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