import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { TextBox } from '../../../../shared-components/text-box';
import { SelectMenu } from '../../../../shared-components/select-menu'
import { DemoInstructors } from '../../club-helper'
import { instructorService } from '../../../../../services/instructor.service';

export const CreateClubCourse = ({ showModalCreate, closeClubCourse, setShowModalCreate, handleSave }) => {
    const [description, setDescription] = useState()
    const [instructorName, setInstructorName] = useState()
    const [courseDescription, setCourseDescription] = useState()
    const [tennisInstructors, setTennisInstructors] = useState([])
    const [isDisabled, setIsDisabled] = useState(false)

    const handleClose = () => {
        setShowModalCreate(false)
    }


    useEffect(() => {
        const getInstructors = async () => {
            let instructors = await instructorService.getInstructors()
            setTennisInstructors(instructors)
        }
        getInstructors()
    }, [])

    const handleOnClick = (e) => {
        setIsDisabled(true)
        handleSave(e, {"title": description, "description":courseDescription, "tennisInstructor": instructorName})
    }

    const handleSetInstructor = (name) => {
        setInstructorName(name)
    }
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
                        <SelectMenu inputLabel="שם המדריך" value={instructorName} values={tennisInstructors} setValue={handleSetInstructor} />
                        <TextBox label="תיאור הקורס" value={courseDescription} setValue={setCourseDescription} />
                        <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
                        <div className='flex align-center justify-between save-cancel-btn-container'>
                            <button disabled={isDisabled} onClick={handleOnClick} className='save-btn'>
                                שמור
                            </button>
                            <button onClick={(e) => handleClose(e)} className='cancel-btn'>
                                ביטול
                            </button>
                        </div>
                    </Box>
                </Container>
            </Box>
        </Modal>
    )
}