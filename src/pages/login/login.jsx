/* eslint-disable no-undef */
import * as React from 'react'
import { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { useNavigate, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, setLoggedUser, setUserUid } from '../../store/actions/user.actions.js'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
// import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
// import { prefixer } from 'stylis'
import { userService } from '../../services/user.service.js'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState()


  const theme = createTheme({
    direction: 'rtl',
  })

  useEffect(() => {
    if (loggedUser) {
      // setIsLogin(isLogin)
      dispatch(setLoggedUser())
      // navigate('/')
    }
  }, [])

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: userService.handleCredentialResponse
      })
      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        type: "standard",
        theme: "filled_black",
        size: "large",
        text: "כניסה עם גוגל",
        shape: "rectangular",
      })
    }
    setIsLogin(isLogin)
    dispatch(setLoggedUser())
   
  }, []);

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    // stylisPlugins: [prefixer, rtlPlugin],
  })

  function RTL(props) {
    return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>
  }

  const loginUser = (email, password) => {
    const payload = {
      email,
      password
    }
    userService.login(payload)
      .then((response) => {
        if (response.data.result === 1) {
          dispatch(setUserUid(null))
          alert("user or password invalid")
          setIsLogin(!isLogin)
          navigate('/signin')

        } else {
          dispatch(setUserUid(response.data.uid))
          setIsLogin(isLogin)
          dispatch(login(payload))
          dispatch(setLoggedUser())
          navigate('/')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleSubmit = (ev) => {
    try {
      ev.preventDefault()
      const data = new FormData(ev.currentTarget)
      const loginInfo = {
        email: data.get('email'),
        password: data.get('password'),
      }
      loginUser(loginInfo.email, loginInfo.password)
    } catch (err) {
      console.error('err', err)
    }
  }

  const onChangePage = () => {
    setIsLogin(!isLogin)
  }

  return (
    <main className="login-sign-up-container container flex flex-column">
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div dir="rtl">
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: '#1cbf73' }} />
                <Typography component="h1" variant="h5">
                  כיף שחזרתם!
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="אימייל"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="סיסמא"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {/* {isLogin ? 'Login' : 'Sign in'} */}
                    כניסה לחשבון שלי
                  </Button>

                  <Grid container>
                    <Grid item xs>
                      <NavLink to="/" variant="body2">
                        שכחתי סיסמה
                      </NavLink>
                    </Grid>
                  </Grid>

                  <div id="loginDiv" className="googleSignin flex flex-column">
                  </div>

                  <Grid container>
                    <Grid item>
                      חדשים באתר?
                      <NavLink to="/signup" variant="body2" onClick={onChangePage}>
                        {/* {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'} */}
                        הרשמו כאן
                      </NavLink>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </div>
        </ThemeProvider>
      </CacheProvider >
    </main >
  )
}

