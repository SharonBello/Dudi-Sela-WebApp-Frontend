import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState } from 'react'
import CustomDivider from '../../../../shared-components/custom-divider';
import Typography from '@mui/material/Typography'
import { CreateClubCourse } from './create-club-course';
import { DemoClubCourses } from '../../club-helper';

export const ClubClasses = () => {
  const [showModalCreate, setShowModalCreate] = useState(false);

  const closeClubCourse = () => {
    console.log("close")
  }

  const renderModalCreate = () => {
    if (showModalCreate) {
      return (
        <CreateClubCourse showModalCreate={showModalCreate} closeClubCourse={closeClubCourse} setShowModalCreate={setShowModalCreate} />
      )
    }
  }

  const renderClubCourses = () => {
    return (
      DemoClubCourses.map((course) => <button>
        <h2>{course.description}</h2>
        <div>מדריך: {course.instructorName}</div>
        <div>תיאור הקורס: {course.title}</div>
      </button>
      )
    )
  }

  return (
    <Box className="club-box container">
      <Container className="club-content">
        <Box className="club-header">
          <Typography id="club-title" variant="h6" component="h2">חוגים</Typography>
        </Box>
        <CustomDivider />
        <button onClick={() => setShowModalCreate(true)}>
          <h2>הוסף קורס</h2>
        </button>
        {renderModalCreate()}
        <CustomDivider />
        <h2>סוגי החוגים</h2>
        {renderClubCourses()}
      </Container>
    </Box>
  )
}