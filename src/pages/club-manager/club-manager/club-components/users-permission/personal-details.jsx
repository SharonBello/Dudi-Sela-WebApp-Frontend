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
import { DateFormat, UserRoles } from '../../club-helper'
import { SelectMenu } from '../../../../shared-components/select-menu';
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { courtService } from '../../../../../services/court.service';

export const PersonalDetails = ({ user, showUserDetails, setShowUserDetails, closeUserDetails }) => {
    const [firstName, setFirstName] = useState(user.firstName)
    const [role, setRole] = useState(user.role)
    const [lastName, setLastName] = useState(user.lastName)
    const [nickname, setNickname] = useState(user.nickname)
    const [id, setId] = useState(user.id)
    const [primaryPhone, setPrimaryPhone] = useState(user.primaryPhone)
    const [contactPhone, setContactPhone] = useState(user.contactPhone)
    const [email, setEmail] = useState(user.email)
    const [additionalPhone, setAdditionalPhone] = useState(user.additionalPhone)
    const [city, setCity] = useState(user.city)
    const [fullAddress, setFullAddress] = useState(user.fullAddress)
    const [clientComments, setClientComments] = useState(user.clientComments)
    const [isInstructor, setIsInstructor] = useState(user.isInstructor)
    const [instructorDetails, setInstructorDetails] = useState(user.instructorDetails)
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth)
    const [messageAlert, setMessageAlert] = useState()
    const [showMessageAlert, setShowMessageAlert] = useState(false)

    const handleDateChange = (dateChanged) => {
        setDateOfBirth(dayjs(new Date(dateChanged)).format(DateFormat))
    }
    const { width } = useWindowDimensions()
    const todaysDate = dayjs().format('DD/MM/YYYY')

    const validateUser = () => {
        if (!email) {
            setMessageAlert("חובה למלא מייל (חיב להיות ייחודי עבור כל משתמש)")
            return false
        }
        if (!role) {
            setMessageAlert("חובה לבחור סוג ההרשאה")
            return false
        }
        return true
    }
    const handleSave = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        if (validateUser()) {
            const payload =   { role, email, firstName, lastName, nickname, id, primaryPhone, contactPhone,
                additionalPhone, city, fullAddress, clientComments, isInstructor, instructorDetails, dateOfBirth}
            const res = await courtService.addClubUser(payload)
            if (res.data.result === 0) {
            setMessageAlert("המשתמש הוסף בהצלחה")
            } else {
            setMessageAlert("המשתמש לא הוסף בהצלחה")
            }
            setShowMessageAlert(true)
        } else {
            setShowMessageAlert(true)
        }

    }
    const handleClose = () => {
        setShowUserDetails(false)
    }
    const handleCloseAlert = (event, reason) => {
        setShowMessageAlert(false)
        // closeEditEvent()
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

    return (
        <>
            {renderMessageAlert()}
            <Modal
                open={showUserDetails}
                onClose={closeUserDetails}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal-overlay">
                <Box className="user-details-box flex-column align-center justify-between container">
                    <div className="grid-club-component">
                        <Typography id="club-title" className="club-title" variant="h6" component="h2">פרטים אישיים</Typography>
                        <h3>הרשאה: {user.role}</h3>
                        <SelectMenu inputLabel="סוג ההרשאה" value={role} values={UserRoles} setValue={setRole} />
                        <TextBox label="מייל" value={email} setValue={setEmail} />

                        <Box className="main-component-fields-container">

                            <TextBox label="שם פרטי" value={firstName} setValue={setFirstName} />
                            <TextBox label="שם משפחה" value={lastName} setValue={setLastName} />
                            <TextBox label="כינוי" value={nickname} setValue={setNickname} />
                            <TextBox label="תעודת זהות" value={id} setValue={setId} />
                            <TextBox label="טלפון ראשי" value={primaryPhone} setValue={setPrimaryPhone} />
                            <TextBox label="טלפון יצירת קשר" value={contactPhone} setValue={setContactPhone} />
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
        </>
    )
}