import React from 'react'
import routes from './routes.js'
import { Routes, Route } from 'react-router'
import { AppHeader } from './components/header-sections/app-header/app-header.jsx'
import { AppFooter } from './components/app-footer/app-footer.jsx'
import { SnackbarProvider } from 'notistack';
import { useDispatch } from 'react-redux'
import { setLoggedUser } from './store/actions/user.actions.js';
import { useNavigate } from "react-router"

import './main.scss'

export const App = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   window.addEventListener("storage", () => {
      dispatch(setLoggedUser())
      navigate('/')
   });

   return (
      <div className="app-container flex">
         <SnackbarProvider maxSnack={3}>
            <header className="app-header-container">
               <AppHeader />
            </header>

            <main className="routes-container">
               <Routes>
                  {routes.map(route =>
                     <Route key={route.path}
                        exact="true"
                        element={route.component}
                        path={route.path} />)}
               </Routes>
            </main>

            <footer className="app-footer-container">
               <AppFooter />
            </footer>
         </SnackbarProvider>
      </div>
   )
}

