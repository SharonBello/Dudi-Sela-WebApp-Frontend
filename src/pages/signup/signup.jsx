import React, { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { TermsConditionsModal } from '../../components/terms-conditions-modal/terms-conditions-modal.jsx'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { userService } from '../../services/user.service.js'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { login, setLoggedUser, setUserUid, setUserRole } from '../../store/actions/user.actions.js'
import { setGoogleAccounts } from '../../components/google-accounts/google.accounts.jsx'
import { STORAGE_KEY_LOGGED_USER } from '../../services/user.service.js'

export const Signup = () => {
  const [conditionsModal, setConditionsModal] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const theme = createTheme({
    direction: 'rtl',
  })

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
  })

  useEffect(() => {
    /* global google */
    if (window.google) {
      setGoogleAccounts("signupDiv")
    }
  }, [])

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {' © כל הזכויות שמורות ל '}
        <Link color="inherit" href="#">
          Dudi Sela
        </Link>{' '}
        <br></br>
        {new Date().getFullYear()}
      </Typography>
    )
  }

  const handleClose = () => {
    setConditionsModal(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const payload = {
      email: data.get('email'),
      password: data.get('password'),
    }
    userService.signup(payload)
      .then((response) => {
        if (!response.data.uid) {
          dispatch(setUserUid(null))
          dispatch(setUserRole(null))
          navigate('/signin')
        } else {
          const miniUser = {"email": payload.email, "uid": response.data.uid}
          sessionStorage.setItem(STORAGE_KEY_LOGGED_USER, JSON.stringify(miniUser))

          dispatch(setUserUid(response.data.uid))
          //signup doesnt give an admin role
          dispatch(login(payload))
          dispatch(setLoggedUser())
          navigate('/')
        }

      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 25,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                כיף שבאת!
                קדימה מתחילים!
              </Typography>
              <Box component="form" validate='true' onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="כתובת מייל"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="סיסמא"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12} sx={{
                    marginTop: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                    <FormControlLabel
                      sx={{
                        padding: 'unset',
                        margin: 'unset',
                      }}
                      control={
                        <Checkbox
                          value="allowExtraEmails"
                          color="primary"
                          sx={{
                            padding: 'unset',
                            margin: 'unset',
                          }}
                        />
                      }
                    />
                    <Grid item>
                      אני מאשר/ת כי קראתי והנני מסכים/ה
                    </Grid>
                  </Grid>
                  <Button onClick={() => setConditionsModal(!conditionsModal)}>
                    לתקנון האתר ומדיניות הפרטיות
                  </Button>
                  {conditionsModal && <section className="conditions-modal">
                    <TermsConditionsModal conditionsModal={conditionsModal} handleClose={handleClose} />
                  </section>}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  הרשמה
                </Button>
                <div id="signupDiv" style={{ minWidth: '100%', marginBlock: '1rem', paddingInlineStart: '5rem'}}>
                </div>

                <Grid container justifyContent="center">
                  <Grid item>
                    כבר רשומים?
                    <NavLink to="/signin" style={{textDecoration: 'underline'}}>
                      כניסה
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </div>
      </ThemeProvider>
    </CacheProvider>)
}

