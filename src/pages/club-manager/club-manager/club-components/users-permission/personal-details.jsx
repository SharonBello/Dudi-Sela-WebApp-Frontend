import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import { TextBox } from '../../../../shared-components/text-box';
import { SwitchInput } from '../../../../shared-components/switch-input';
import CustomDivider from '../../../../shared-components/custom-divider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useWindowDimensions } from '../../../../../hooks/useWindowDimensions';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';

export const PersonalDetails = ({ user, showUserDetails, setShowUserDetails, closeUserDetails }) => {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [nickname, setNickname] = useState(user.nickname)
    const [id, setId] = useState(user.id)
    const [primaryPhone, setPrimaryPhone] = useState(user.primaryPhone)
    const [contactPhone, setContactPhone] = useState(user.contactPhone)
    const [mailAddress, setMailAddress] = useState(user.mailAddress)
    const [additionalPhone, setAdditionalPhone] = useState(user.additionalPhone)
    const [city, setCity] = useState(user.city)
    const [fullAddress, setFullAddress] = useState(user.fullAddress)
    const [clientComments, setClientComments] = useState(user.clientComments)
    const [isInstructor, setIsInstructor] = useState(user.isInstructor)
    const [instructorDetails, setInstructorDetails] = useState(user.instructorDetails)
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth)

    const handleDateChange = (dateChanged) => {
        setDateOfBirth(dayjs(new Date(dateChanged)).format('YYYY-MM-DD'))
    }
    const { width } = useWindowDimensions()
    const todaysDate = dayjs().format('DD/MM/YYYY')

    const handleSave = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setShowUserDetails(false)
    }
    const handleClose = () => {
        setShowUserDetails(false)
    }

    return (
        <Modal
            open={showUserDetails}
            onClose={closeUserDetails}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal-overlay">
            <Box className="user-details-box flex-column align-center justify-between container">
                <div className="grid-club-component">
                    <Typography id="club-title" className="club-title" variant="h6" component="h2">פרטים אישיים</Typography>
                    <h3>חבר מועדון: {user.permission}</h3>
                    <Box className="main-component-fields-container">
                        <TextBox label="שם פרטי" value={firstName} setValue={setFirstName} />
                        <TextBox label="שם משפחה" value={lastName} setValue={setLastName} />
                        <TextBox label="כינוי" value={nickname} setValue={setNickname} />
                        <TextBox label="תעודת זהות" value={id} setValue={setId} />
                        <TextBox label="טלפון ראשי" value={primaryPhone} setValue={setPrimaryPhone} />
                        <TextBox label="טלפון יצירת קשר" value={contactPhone} setValue={setContactPhone} />
                        <TextBox label="כתובת מייל" value={mailAddress} setValue={setMailAddress} />
                        <TextBox label="טלפון נוסף" value={additionalPhone} setValue={setAdditionalPhone} />
                        <TextBox label="עיר" value={city} setValue={setCity} />
                        <TextBox label="כתבות מלאה" value={fullAddress} setValue={setFullAddress} />
                        <TextBox label="הערות לקוח" value={clientComments} setValue={setClientComments} />
                        <SwitchInput label="מדריך" value={isInstructor} setValue={setIsInstructor} />
                        <TextBox label="פרטי מדריך נוספים" value={instructorDetails} setValue={setInstructorDetails} />

                        <Box className="date-time-container flex-column">
                            <Typography className="modal-body-text">
                                תאריך לידה
                            </Typography>
                            <Box className="date-time-select flex align-center">
                                <section className="date-container flex justify-between align-center">
                                    {(width < 600) ?
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                                label="תאריך"
                                                inputFormat="DD/MM/YYYY"
                                                value={todaysDate}
                                                placeholder={todaysDate}
                                                onChange={handleDateChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        : <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DesktopDatePicker
                                                label="תאריך"
                                                inputFormat="DD/MM/YYYY"
                                                // value={todaysDate}
                                                placeholder={todaysDate}
                                                onChange={handleDateChange}
                                            // renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>}
                                </section>
                            </Box>
                        </Box>

                    </Box>
                    <Box className="btn-club-components-container flex align-center">
                        <button onClick={handleSave} className='save-btn'>
                            שמור
                        </button>
                        <button onClick={handleClose} className='cancel-btn'>
                            סגור
                        </button>
                    </Box>
                </div>
            </Box>
        </Modal>
    )
}