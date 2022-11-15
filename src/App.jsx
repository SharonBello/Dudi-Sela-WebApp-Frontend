/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import routes from './routes.js'
import { Routes, Route } from 'react-router'
import { AppHeader } from './components/app-header/app-header.jsx'
import { AppFooter } from './components/app-footer/app-footer.jsx'
// import { authListener } from './services/auth_state_listener';

import './main.scss'

export const App = () => {

   return (
      <div className="app-container">
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
      </div>
   )
}

