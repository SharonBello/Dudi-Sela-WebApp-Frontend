import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomDivider from '../../../../shared-components/custom-divider';
import Typography from '@mui/material/Typography'
import { TextBox } from '../../../../shared-components/text-box';
import { SwitchInput } from '../../../../shared-components/switch-input';
import { SaveButton } from '../../../../shared-components/save-button';
import { DemoClubUsers } from '../../club-helper'
import UsersTable from './users-table'

export const UsersPermission = () => {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [userPhone, setUserPhone] = useState();
  const [userName, setUserName] = useState();
  const [userMessage, setUserMessage] = useState(`שלום  מועדון האקדמיה לטניס דודי סלע  מזמין אותך להצטרף למערכת הזמנות ממוחשבת. לחץ על הקישור להורדת האפליקציה https://lazuz.co.il`);
  const [permissionType, setPermissionType] = useState()

  useEffect(()=> {
    if (userName) {
      const message = `שלום  ${userName} לטניס דודי סלע  מזמין אותך להצטרף למערכת הזמנות ממוחשבת. לחץ על הקישור להורדת האפליקציה https://lazuz.co.il`
      setUserMessage(message)
    }
  }, [userName])

  const handleSend = (e) => {
    e.stopPropagation()
    e.preventDefault()
    // if (validateForm() === true) {
    // } else {
    //   setMessageAlert(validateForm())
    //   setShowMessageAlert(true)
    // }
  }

  const handleAddPermission = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const toggleCreateUser = () => {
    setShowCreateUser(!showCreateUser)
  }

  const toggleAddUser = () => {
    setShowAddUser(!showAddUser)
  }

  const renderCreateUser = () => {
    if (showCreateUser) {
      return (
        <>
        <Box className="main-component-fields-container">
          <TextBox label="טלפון הלקוח" value={userPhone} setValue={setUserPhone} />
          <TextBox label="שם משתמש (בכניסה לאפליקציה)" value={userName} setValue={setUserName} />
          <TextBox label="תוכן מודעה" value={userMessage} setValue={setUserMessage} />
        </Box>
        <Box className="">
          <SaveButton label="שלח הזמנה" onClick={handleSend} />
        </Box></>
      )
    }
  }

  const renderAddUser = () => {
    if (showAddUser) {
      return (
        <>
        <Box className="main-component-fields-container">
          <TextBox label="חפש שם משתמש לפי טלפון ללא ספרת ה-0" value={userPhone} setValue={setUserPhone} />
        </Box>
        <Box className="">
          <SaveButton label="חפש" onClick={handleSend} />
        </Box></>
      )
    }
  }

  const renderAddPermission = () => {
    if (showAddUser) {
      return (
        <>
        <Box className="main-component-fields-container">
          <TextBox label="סוג המשתמש" value={permissionType} setValue={setPermissionType} />
        </Box>
        <Box className="main-component-fields-container">
          <SwitchInput label="מנהל" value={permissionType} setValue={setPermissionType} />
        </Box>
        <Box className="">
          <SaveButton label="הוסף" onClick={handleAddPermission} />
        </Box>
        </>
      )
    }
  }
  return (
    <Box className="club-box container">
      <Container className="club-content">
        <Box className="club-header">
          <Typography id="club-title" variant="h6" component="h2">כרטיסיות</Typography>
        </Box>
        <CustomDivider />
        <button onClick={() => toggleCreateUser()}>
          <h2>הזמן משתמש</h2>
        </button>
        <button onClick={() => toggleAddUser()}>
          <h2>הוסף משתמש</h2>
        </button>
        {renderCreateUser()}
        {renderAddUser()}
        <CustomDivider />
        <UsersTable />
        <CustomDivider />
        {/* TODO: after correcting the userstable with buttons, use same table structure for permissions manager
        <PermissionsManager /> */}
        <CustomDivider />
        {renderAddPermission()}



      </Container>
    </Box>
  )
}