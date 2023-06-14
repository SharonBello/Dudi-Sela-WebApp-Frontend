import React, { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { reservationService } from "../../services/reservation.service"
import { useSelector } from "react-redux"
import dayjs from "dayjs"
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service';

export const ReservationPreview = ({ item, todaysDate }) => {
    const [isCancelable, setIsCancelable] = useState(false)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showFailureAlert, setShowFailureAlert] = useState(false)

    const navigate = useNavigate()
    const NUM_DAYS_CANCEL_REGISTRATION = 1 //TODO take the number in hours frm club manager page
    let uid = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER)).uid
    let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)

    const getTimeLeft = useCallback((item) => {
        const futureDate = dayjs(item.date)
        const timeLeft = futureDate.diff(todaysDate, 'day')
        return timeLeft
    }, [todaysDate])

    const getIsCancelable = useCallback((item) => {
        const cancelItem = getTimeLeft(item)
        if (cancelItem > NUM_DAYS_CANCEL_REGISTRATION) {
            setIsCancelable(true)
        }
        else {
            setIsCancelable(false)
        }
    }, [NUM_DAYS_CANCEL_REGISTRATION, getTimeLeft])

    const onDeleteReservation = async () => {
        setShowDeleteAlert(true)
    }

    const closeDeleteAlert = () => {
        setShowDeleteAlert(false);
    }

    const handleDeleteReservation = async () => {
        if (!loggedUser) {
            navigate('/signin')
        }
        if (loggedUser) {
            const payload = item
            const res = await reservationService.deleteReservation(uid, payload)
            const resCredit = await reservationService.changeCredit(uid, { "userCredit": 1, "mail": loggedUser.email, "date": todaysDate})
            setShowDeleteAlert(false)
            if (res.data.result === 0 && resCredit.data.result === 0) {
                setShowSuccessAlert(true)
            } else {
                setShowSuccessAlert(false)
            }
        }
    }

    const handleCloseAlert = (event, reason) => {
        setShowSuccessAlert(false)
        setShowFailureAlert(false)
        navigate('/')
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

    const renderSuccessAlert = () => {
        if (showSuccessAlert) {
            return (
                <Snackbar
                    open={true}
                    autoHideDuration={60000}
                    onClose={handleCloseAlert}
                    action={alertAction}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        severity="success"
                        onClose={handleCloseAlert}
                        sx={{
                            minWidth: '100%',
                            color: '#1d1d1d',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '10px',
                            backgroundColor: '#C9DB39'
                        }}
                        spacing={5}
                        variant="filled"
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        המגרש בוטל בהצלחה, הכרטיסיה זוכתה בהזמנה של מגרש (מידע בפרופיל האישי) </Alert>
                </Snackbar>
            )
        }
    }

    const renderFailureAlert = () => {
        if (showFailureAlert) {
            return (
                <Snackbar
                    open={true}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={6000}
                    onClose={handleCloseAlert}
                    action={alertAction}
                >
                    <Alert
                        severity="error"
                        onClose={handleCloseAlert}
                        sx={{
                            minWidth: '100%',
                            color: '#fff',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '10px',
                            backgroundColor: '#dc0000'
                        }}
                        spacing={5}
                        // margin={5}
                        variant="filled"
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        ביטול המגרש נכשל</Alert>
                </Snackbar>
            )
        }
    }

    const renderDeleteAlert = () => {
        return (
            <Dialog
                open={showDeleteAlert}
                onClose={closeDeleteAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"ביטול הזמנה"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {" האם את/ה בטוח/ה שברצונך לבטל את ההזמנה?"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteAlert}>לא</Button>
                    <Button onClick={handleDeleteReservation} autoFocus>
                        כן
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    useEffect(() => {
        getIsCancelable(item);
    }, [getIsCancelable, item])

    return (
        <>
            {renderDeleteAlert()}
            {renderSuccessAlert()}
            {renderFailureAlert()}
            <tr key={item.id}>
                <td data-label="תאריך">{item.date}</td>
                <td data-label="שעת התחלה">{item.startHour}</td>
                <td data-label="שעת סיום">{item.endHour}</td>
                <td data-label="מספר מגרש">{item.courtNumber}</td>
                <td data-label="פעולות" className="flex align-center justify-center">
                    <table className="table-actions flex">
                        <tbody>
                            <tr className="table-action-cell">
                                <td className="table-cell-btn">
                                    {isCancelable ? <button className="table-btn" onClick={onDeleteReservation}>
                                        <NavLink to='/user-reservations/'>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </NavLink>
                                    </button> : <button className="table-btn" disabled>
                                        <NavLink to='/user-reservations/'>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </NavLink>
                                    </button>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </>
    )
}