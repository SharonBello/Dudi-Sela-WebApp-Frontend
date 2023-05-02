import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { TextBox } from '../../../../shared-components/text-box';
import { SelectMenu } from '../../../../shared-components/select-menu'
import { DemoInstructors } from '../../club-helper'

export const CreateClubCourse = ({ showModalCreate, closeClubCourse, setShowModalCreate }) => {
    const [description, setDescription] = useState()
    const [instructorName, setInstructorName] = useState()
    const [courseDescription, setCourseDescription] = useState()
    const [instructor, setInstructor] = useState()

    const handleSave = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setShowModalCreate(false)
    }
    const handleClose = () => {
        setShowModalCreate(false)
    }

    // const getInstructors = useCallback(async () => {
    //     let instructors = await instructorService.getInstructors()
    //     setInstructors(instructors)
    //   }, [setInstructors])

    return (
        <Modal
            open={showModalCreate}
            onClose={closeClubCourse}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal-overlay">
            <Box className="modal-box">
                <Container className="modal-content">
                    <Box className="modal-header">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            קורס חדש
                        </Typography>
                    </Box>
                    <Box className="modal-body">
                        <TextBox label="כותרת הקורס" value={description} setValue={setDescription} />
                        <SelectMenu inputLabel="שם המדריך" values={DemoInstructors} setValue={setInstructorName} />
                        <TextBox label="תיאור הקורס" value={courseDescription} setValue={setCourseDescription} />
                        <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
                        <div className='flex align-center justify-between save-cancel-btn-container'>
                            <button onClick={handleSave} className='save-btn'>
                                שמור
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