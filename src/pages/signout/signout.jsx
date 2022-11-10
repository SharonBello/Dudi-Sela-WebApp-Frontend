import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

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

import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'
import { authSignout } from './services/auth_signout';

export const Signup = () => {
  //TODO change to onclick when the users signs out
  //the behavior now is that when the component load then the user signs out
//   useEffect(() => {
//     authSingout();
//  }, [])
  const theme = createTheme({
    direction: 'rtl',
  })

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
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

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            signeout
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </div>
      </ThemeProvider>
    </CacheProvider>)
}

