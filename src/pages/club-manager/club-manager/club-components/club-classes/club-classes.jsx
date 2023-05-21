import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomDivider from '../../../../shared-components/custom-divider';
import Typography from '@mui/material/Typography'
import { CreateClubCourse } from './create-club-course';
import { DemoClubCourses } from '../../club-helper';
import { Loader } from '../../../../../components/loader.jsx';
import { useNavigate } from 'react-router-dom'
import { courtService } from '../../../../../services/court.service'

export const ClubClasses = () => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [clubClasses, setClubClasses] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=> {
    if (clubClasses.length === 0) {
      getClubClasses().then(res => {
        setClubClasses(res)
      })
    }
  }, [])

  const getClubClasses = async () => {
    try {
      setIsLoading(true)
      let res = await courtService.getClubClasses()
      setIsLoading(false)
      return res.data.club_classes
    } catch (error) {
      navigate('/')
    }
  }

  const closeClubCourse = () => {
    console.log("close")
  }

  const handleSave = async (e, clubClass) => {
    if (clubClass.title.trim() !== "") {
      setIsLoading(true)
      let res = await courtService.addClubClass(clubClass)
      getClubClasses().then(res => {
        setClubClasses(res)
      })
    }
    setShowModalCreate(false)
  }

  const renderModalCreate = () => {
    if (showModalCreate) {
      return (
        <CreateClubCourse showModalCreate={showModalCreate} closeClubCourse={closeClubCourse} setShowModalCreate={setShowModalCreate} handleSave={handleSave} />
      )
    }
  }

  const renderClubCourses = () => {
    return (
      clubClasses.map((course) => <button>
        <h2>{course.title}</h2>
        <div>מדריך: {course.tennisInstructor}</div>
        <div>תיאור הקורס: {course.description}</div>
      </button>
      )
    )
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
      {renderIsLoading()}
      <Container className="club-content">
        <Box className="club-header">
          <Typography id="club-title" variant="h6" component="h2">חוגים</Typography>
        </Box>
        <CustomDivider />
        <button onClick={() => setShowModalCreate(true)}>
          <h2>הוסף חוג</h2>
        </button>
        {renderModalCreate()}
        <CustomDivider />
        <h2>סוגי החוגים</h2>
        {renderClubCourses()}
      </Container>
    </Box>
  )
}