import React, { useState } from 'react'
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
// import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
// import { prefixer } from 'stylis'
import { login, getLoggedUser, setUserUid } from '../../store/actions/user.actions.js'

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
    // stylisPlugins: [prefixer, rtlPlugin],
  })

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
      dispatch(setUserUid(response.data.uid))
      dispatch(login(payload))
      dispatch(getLoggedUser())
      navigate('/')
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
                marginTop: 8,
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
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="כתובת מייל"
                      name="email"
                      autoComplete="email"
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
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                    />
                    <Grid item>
                      אני מאשר/ת כי קראתי והנני מסכים/ה
                      <Button onClick={() => setConditionsModal(!conditionsModal)}>
                        לתקנון האתר ומדיניות הפרטיות
                      </Button>
                      {/* </a> */}
                    </Grid>
                  </Grid>
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
                <Grid container justifyContent="center">
                  <Grid item>
                    כבר רשומים?
                    <NavLink to="/signin" variant="body2">
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

