import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomDivider from '../../../../shared-components/custom-divider';
import Typography from '@mui/material/Typography'
import { TextBox } from '../../../../shared-components/text-box';
import { SwitchInput } from '../../../../shared-components/switch-input';
import { SaveButton } from '../../../../shared-components/save-button';
import UsersTable from './users-table'
import { Loader } from '../../../../../components/loader.jsx';
import { courtService } from '../../../../../services/court.service'
import { useNavigate } from 'react-router-dom'
import PermissionsTable from './permissions-table';

export const UsersPermission = () => {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [userMessage, setUserMessage] = useState(`שלום  מועדון האקדמיה לטניס דודי סלע  מזמין אותך להצטרף למערכת הזמנות ממוחשבת. לחץ על הקישור להורדת האפליקציה https://lazuz.co.il`);
  const [permissionType, setPermissionType] = useState()
  const [clubUsers, setClubUsers] = useState([])
  const [userPermissions, setUserPermissions] = useState([])
  const navigate = useNavigate()
  const [rowsTableUsers, setRowsTableUsers] = useState([])
  const [rowsUserPermissions, setRowsUserPermissions] = useState([])

  useEffect(()=> {
    if (userName) {
      const message = `שלום  ${userName} לטניס דודי סלע  מזמין אותך להצטרף למערכת הזמנות ממוחשבת. לחץ על הקישור להורדת האפליקציה https://lazuz.co.il`
      setUserMessage(message)
    }
  }, [userName])
  useEffect(()=> {
    if (clubUsers.length === 0) {
      getClubUsers().then(res => {
        setClubUsers(res)
        if (res.length > 0)
          setRowsTableUsers(res.map( (user) => createUserData(user.fullName, user.primaryPhone, user.mailAddress, user.permission, user.validTill)));
      })
    }
    if (userPermissions.length === 0) {
      getUserPermissions().then(res => {
        setUserPermissions(res)
        if (res.length > 0)
        setRowsUserPermissions(res);
      })
    }
  }, [])
  const getClubUsers = async () => {
    try {
      // setIsLoading(true)
      let res = await courtService.getClubUsers()
      // setIsLoading(false)
      return res.data.club_users
    } catch (error) {
      navigate('/')
    }
  }
  const getUserPermissions = async () => {
    try {
      // setIsLoading(true)
      let res = await courtService.getUserPermissions()
      // setIsLoading(false)
      // permissionName, daysAheadInApp, daysAheadCancel, allowWatch, isManager, allowEditEvents, allowInnerEvents, allowOpenGates
      return res.data.user_permissions
    } catch (error) {
      navigate('/')
    }
  }
  const handleSend = (e) => {
    e.stopPropagation()
    e.preventDefault()
    // if (validateForm() === true) {
    // } else {
    //   setMessageAlert(validateForm())
    //   setShowMessageAlert(true)
    // }
  }
  const createUserData = (fullName, primaryPhone, mail, permission, validTill) => {
    return {
      fullName,
      primaryPhone,
      mail,
      permission,
      validTill,
    };
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
          <TextBox label="טלפון הלקוח" value={email} setValue={setEmail} />
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
          <TextBox label="חפש שם משתמש לפי כתובת מייל" value={email} setValue={setEmail} />
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
          <Typography id="club-title" variant="h6" component="h2">משתמשים</Typography>
        </Box>
        <CustomDivider />
        {/* <button onClick={() => toggleCreateUser()}>
          <h2>הזמן משתמש</h2>
        </button> */}
        <button onClick={() => toggleAddUser()}>
          <h2>הוסף משתמש</h2>
        </button>
        {renderCreateUser()}
        {renderAddUser()}
        <CustomDivider />
        <UsersTable rows={rowsTableUsers} />
        <CustomDivider />
        <PermissionsTable rows={rowsUserPermissions} />
        <CustomDivider />
        {renderAddPermission()}
      </Container>
    </Box>
  )
}