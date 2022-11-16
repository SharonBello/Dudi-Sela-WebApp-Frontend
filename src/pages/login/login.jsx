import * as React from 'react'
import { useState, useEffect } from 'react'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'

import { useNavigate, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { cloudinaryService } from '../../services/cloudinary.service.js'
import { login, signup, getLoggedUser, signUpGoogle, setUserUid } from '../../store/actions/user.actions.js'
import { AuthService } from '../../services/auth-service.js'
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import { userService } from '../../services/user.service.js'
import jwt_decode from 'jwt-decode'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
// import { prefixer } from 'stylis'

export const Login = () => {
  let { loggedUser } = useSelector((storeState) => storeState.userModule)
  const [isImg, setIsImg] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loader, setLoader] = useState(false)
  const theme = createTheme({
    direction: 'rtl',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLoggedUser())
  }, [loggedUser])

  // useEffect(() => {
  //   // eslint-disable-next-line no-undef
  //   google.account.id.initialize({
  //   // window.account.id.initialize({
  //     // clientId: AuthService.getClientId(),
  //     clientId: "617359385601-u3l9uaocobtbjeouarq1tdbud47u37p6.apps.googleusercontent.com",
  //     callback: data => handleCredentialResponse(data)
  //   })
  // }, [])

  function handleCredentialResponse(response) {
    console.log('encoded JWT ID Token:', response.credential)
  }

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    // stylisPlugins: [prefixer, rtlPlugin],
  })

  function RTL(props) {
    return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>
  }

  const handleGoogleSignUp = (response) => {
    let userObject = jwt_decode(response.credential)
    dispatch(signUpGoogle(userObject))
    setTimeout(() => {
      setLoader(true)
    }, 3000)
    setTimeout(() => {
      navigate('/')
    }, 4000)
  }

  const uploadImg = (ev) => {
    const CLOUD_NAME = cloudinaryService.getCloudName()
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', cloudinaryService.getPreset())
    setIsImg(true)
    return fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(res => {
      setImgUrl(res.url)
    }).catch(err => console.error(err))
  }

  const loginUser = (email, password) => {
    const payload = {
      email,
      password
    }
    userService.login(payload)
    .then((response) => {
      dispatch(setUserUid(response.data.uid))
    })
    .catch((error) => {
      console.log(error)
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
      if (isLogin) {
        dispatch(login(loginInfo))
        dispatch(getLoggedUser())
        navigate('/')
      } else {
        dispatch(getLoggedUser())
        navigate('/')
      }

      loginUser(data.get('email'),data.get('password'))

    } catch (err) {
      console.log('err', err)
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
                  {/* {isLogin ? 'כניסה' : 'Sign Up'} */}
                  כיף שחזרתם!
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <label htmlFor='file-input' className='file-img'>
                    {(!isLogin) ? (!isImg) ?
                      <input className='file-input' type={'file'} name="imgUrl" value={''} onChange={uploadImg} />
                      : <Avatar alt="profile" src={imgUrl} />
                      : <span></span>}
                  </label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="שם משתמש"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  {!isLogin &&
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="fullname"
                      label="שם מלא"
                      name="fullname"
                      autoComplete="fullname"
                    />}
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

                  <div className="signInDiv flex flex-column">
                    <GoogleOAuthProvider clientId={AuthService.getClientId()}>
                      <div className="App">
                        <GoogleLogin
                          onSuccess={(credentialResponse) => {
                            handleGoogleSignUp(credentialResponse)
                          }}
                          onError={() => {
                            console.log("Login Failed")
                          }}
                        />
                      </div>
                    </GoogleOAuthProvider>
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
      </CacheProvider>
    </main>
  )
}

