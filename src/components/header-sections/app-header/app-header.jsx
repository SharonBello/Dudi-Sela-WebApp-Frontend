import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signout, setLoggedUser, setUserUid } from '../../../store/actions/user.actions.js'
import { ProfileMenu } from '../profile-menu/profile-menu.jsx'
import { SideMenu } from '../side-menu/side-menu.jsx'
import { useWindowDimensions } from '../../../hooks/useWindowDimensions.jsx'
import { userService } from '../../../services/user.service.js'

export const AppHeader = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  let loggedUser = useSelector((storeState) => storeState.userModule.loggedUser)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isSideMenu, setSideMenu] = useState(false)
  const token = localStorage.getItem('user')
  const adminUser = localStorage.getItem('dudisela-admin-user')
  const { width } = useWindowDimensions()
  const [scrolled, setScrolled] = useState(false)

  const menuRef = useRef(null)
  const profileRef = useRef(null)

  let [isActive, setIsActive] = useState(false)
  let homeHeaderClassName = (pathname === '/') ? 'scroll' : ''
  let classHamburgerMenu = (width < 900) ? 'visible' : 'hidden'
  let classNavList = (width < 600) ? 'hidden' : ''

  // useEffect(() => {
  //   dispatch(setLoggedUser)

  // }, [loggedUser])

  useEffect(() => {
    document.addEventListener("click", handleSideClickOutside)
  }, [isSideMenu])

  useEffect(() => {
    document.addEventListener("click", handleProfileClickOutside)
  }, [showProfileMenu])

  useEffect(() => {
    if (pathname === '/') {
      window.addEventListener("scroll", handleScroll)
    }
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])

  const handleScroll = e => {
    setScrolled(window.scrollY < 200)
  }

  const handleSideClickOutside = (e) => {
    if (menuRef.current && isSideMenu && !menuRef.current.contains(e.target)) onToggleSideMenu()
  }

  const handleProfileClickOutside = (e) => {
    if (profileRef.current && showProfileMenu && !profileRef.current.contains(e.target)) onToggleProfileMenu()
  }

  const onCloseMenu = () => {
    setShowProfileMenu(false)
  }

  const onToggleMenu = (ev) => {
    ev.stopPropagation()
    setShowProfileMenu(!showProfileMenu)
  }

  const onToggleProfileMenu = (ev) => {
    setShowProfileMenu(!showProfileMenu)
  }

  const onToggleSideMenu = () => {
    let flag = !isSideMenu
    setSideMenu(flag)
  }

  if (loggedUser && !loggedUser.picture) {
    loggedUser.picture = "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
  }

  const handleClick = () => {
    setIsActive(!isActive)
  }

  const handleSignout = () => {
    userService.authSignout()
      .then((response) => {
        dispatch(setUserUid(null))
        dispatch(signout())
        document.location.href = '/'
        userService.authSignout();
        //TODO show notification user sign out
      })
  }

  return (
    <header className={`header container flex align-center ${(scrolled && pathname === '/') ? 'scrolled' : ''}`}>
      {/* // <header className={`${scrolled && (pathname === '/')}` ? 'header container flex align-center scrolled' : 'header container flex align-center regular'}> */}
      {/* <header className="header container flex align-center"> */}
      <article className="logo-hamburger-container flex align-center">
        <div className="side-menu">
          {width < 900 && <button ref={menuRef} onClick={onToggleSideMenu} className={`hamburger-icon ${classHamburgerMenu}`}>
            {isSideMenu && <SideMenu menuOpen={isSideMenu} closeMenu={onToggleSideMenu} user={loggedUser} handleClick={handleClick} handleSignout={handleSignout} />}
          </button>}
        </div>
        <div className="logo">
          <NavLink to="/" className="site-logo">
            <img src="https://res.cloudinary.com/primap/image/upload/v1667563747/General/Dudi%20Sela/Dudi-Logo_e5zm1a.svg" className="app-logo"
              alt="logo" />
          </NavLink>
        </div>
      </article>
      <ul className={`nav-list clean-list flex align-center ${classNavList}`}>

        {(loggedUser ? <li><NavLink to={`/user-reservations`} className="link-page">ההזמנות שלי</NavLink>
        </li> : <span></span>)}

        {(loggedUser ? <li><NavLink to={`/user-reservations/new-reservation`} className="link-page">הזמנת מגרש</NavLink>
        </li> : <li><NavLink to={'/signin'} onClick={handleClick} className="link-page">הזמנת מגרש</NavLink>
        </li>)}


        <li><NavLink to={`/learntennis`} onClick={handleClick} className="link-page">לימוד טניס</NavLink>
        </li>

        <li><NavLink to={`/contact`} onClick={handleClick} className="link-page">צרו קשר</NavLink>
        </li>

        <li><NavLink to={`/about`} onClick={handleClick} className="link-page">על האקדמיה</NavLink>
        </li>

        <li>
          {!loggedUser && <NavLink to='/signin' rel="nofollow" className="open-popup-login link-page">כניסה</NavLink>}
          <div className="avatar-container">
            {loggedUser && <img className="avatar-img" src={`${loggedUser.picture}`} onClick={onToggleMenu} alt="Avatar"></img>}
          </div>

          <div className="profile-container" ref={profileRef}>
            {showProfileMenu && <ProfileMenu menuOpen={showProfileMenu} user={loggedUser} closeMenu={onCloseMenu} onToggleMenu={onToggleProfileMenu} handleSignout={handleSignout} />}
          </div>
        </li>

        {!loggedUser ? <li><NavLink to={`/signup`} onClick={handleClick} className="link-page">הרשמה</NavLink>
        </li>
        : <span></span>}

        {(adminUser==="true" ? <li><NavLink to={`/scheduler`} className="link-page">מנהל ההזמנות</NavLink>
        </li> : <span></span>)}
      </ul>

    </header>
  )
}