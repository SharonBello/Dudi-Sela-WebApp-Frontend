import { useState, useEffect, useCallback } from 'react'
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
import { SelectMenu } from '../../../../shared-components/select-menu';
import { UserRoles } from '../../club-helper';
import { PersonalDetails } from './personal-details';
import { Button } from '@mui/material';

export const UsersPermission = () => {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showSearchUser, setShowSearchUser] = useState(false);
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
  const handleGetClubUsers = useCallback(() => {
    getClubUsers().then(res => {
      setClubUsers(res)
      if (res.length > 0) {
        const _rowsTableUsers = res.map( (user) => createUserData(user.fullName, user.primaryPhone, user.email, user.role, user.validTill))
        setRowsTableUsers(_rowsTableUsers);
      }
    })
  })
  useEffect(()=> {
    if (clubUsers.length === 0) {
      getClubUsers().then(res => {
        setClubUsers(res)
        if (res.length > 0) {
          const _rowsTableUsers = res.map( (user) => createUserData(user.fullName, user.primaryPhone, user.email, user.role, user.validTill))
          setRowsTableUsers(_rowsTableUsers);
        }
      })
    }
  }, [])
  const getClubUsers = async () => {
    try {
      // setIsLoading(true)
      let res = await courtService.getClubUsers()
      // setIsLoading(false)
      return res.data
    } catch (error) {
      navigate('/')
    }
  }

  const handleSearch = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setRowsTableUsers(rowsTableUsers.filter( (user) => user.mail.indexOf(email.trim()) !== -1));
    if (email.trim() === "") handleGetClubUsers()
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


  const toggleAddUser = () => {
    setShowAddUser(!showAddUser)
  }

  const toggleSearchUser = () => {
    setShowSearchUser(!showSearchUser)
  }
  const closeAddUser = () => {
    setShowAddUser(false)
  }
  const handelCancelSearch = () => {
    handleGetClubUsers()
    setShowSearchUser(false)
  }
  const renderSearchUser = () => {
    if (showSearchUser) {
      return (
        <>
        <Box className="main-component-fields-container">
          <TextBox label="חפש שם משתמש לפי כתובת מייל" value={email} setValue={setEmail} />
        </Box>
        <Box className="">
        <Button label="חפש" component="label" onClick={(e) => handleSearch(e)}>חפש</Button>
        <Button label="ביטול" component="label" onClick={()=> handelCancelSearch() }>ביטול</Button>
        </Box></>
      )
    }
  }
  const renderModal = () => {
    if (showAddUser) {
      return (
        <PersonalDetails user={{}} showUserDetails={showAddUser} setShowUserDetails={setShowAddUser} closeUserDetails={closeAddUser} />
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
        <button onClick={() => toggleAddUser()}>
          <h2>הוסף משתמש</h2>
        </button>
        {renderModal()}
        <button onClick={() => toggleSearchUser()}>
          <h2>חפש משתמש</h2>
        </button>
        {renderSearchUser()}
        <CustomDivider />
        <UsersTable rows={rowsTableUsers} />
        <CustomDivider />
      </Container>
    </Box>
  )
}

/* {renderAddPermission()} */
// const renderAddPermission = () => {
//   if (showAddUser) {
//     return (
//       <>
//       <Box className="main-component-fields-container">
//         <TextBox label="מייל המשתמש" value={permissionType} setValue={setPermissionType} />
//       </Box>
//       <Box className="main-component-fields-container">
//         <SelectMenu inputLabel="סוג ההרשאה" value={permissionType} values={UserRoles} setValue={setPermissionType} />
//       </Box>
//       <Box className="">
//         <SaveButton label="הוסף" onClick={handleAddPermission} />
//       </Box>
//       </>
//     )
//   }
// }
/* <PermissionsTable rows={rowsUserPermissions} /> */

/* {renderCreateUser()} */
// const handleAddPermission = (e) => {
//   e.stopPropagation()
//   e.preventDefault()

// }

// const renderCreateUser = () => {
//   if (showCreateUser) {
//     return (
//       <>
//       <Box className="main-component-fields-container">
//         <TextBox label="טלפון הלקוח" value={email} setValue={setEmail} />
//         <TextBox label="שם משתמש (בכניסה לאפליקציה)" value={userName} setValue={setUserName} />
//         <TextBox label="תוכן מודעה" value={userMessage} setValue={setUserMessage} />
//       </Box>
//       <Box className="">
//         <SaveButton label="שלח הזמנה" onClick={handleSend} />
//       </Box></>
//     )
//   }
// }


// const getUserPermissions = async () => {
//   try {
//     // setIsLoading(true)
//     let res = await courtService.getUserPermissions()
//     // setIsLoading(false)
//     // permissionName, daysAheadInApp, daysAheadCancel, allowWatch, isManager, allowEditEvents, allowInnerEvents, allowOpenGates
//     return res.data.user_permissions
//   } catch (error) {
//     navigate('/')
//   }
// }
// following in useEffect
// if (userPermissions.length === 0) {
//   getUserPermissions().then(res => {
//     setUserPermissions(res)
//     if (res.length > 0)
//     setRowsUserPermissions(res);
//   })
// }