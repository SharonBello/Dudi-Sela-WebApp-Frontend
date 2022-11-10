import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, getLoggedUser, setUserUid } from '../../store/actions/user.actions.js'
import { ProfileMenu } from '../profile-menu/profile-menu.jsx'
import { SideMenu } from '../side-menu/side-menu.jsx'
import { useWindowDimensions } from '../../hooks/useWindowDimensions.jsx'
import { authSignout } from '../../services/auth_signout.js';

export const AppHeader = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  let { loggedUser } = useSelector((storeState) => storeState.userModule)
  const { court } = useSelector((storeState) => storeState.courtModule)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isSideMenu, setSideMenu] = useState(false)
  const { width } = useWindowDimensions()
  const menuRef = useRef(null)
  const profileRef = useRef(null)

  let [isActive, setIsActive] = useState(false)
  let homeClassName = (pathname === '/') ? 'active' : 'link page'

  useEffect(() => {
    dispatch(getLoggedUser)

  }, [dispatch, loggedUser])

  useEffect(() => {
    document.addEventListener("click", handleSideClickOutside)
  }, [isSideMenu])

  useEffect(() => {
    document.addEventListener("click", handleProfileClickOutside)
  }, [showProfileMenu])


  const handleSideClickOutside = (e) => {
    if (menuRef.current && isSideMenu && !menuRef.current.contains(e.target)) onToggleSideMenu()
  }

  const handleProfileClickOutside = (e) => {
    if (profileRef.current && showProfileMenu && !profileRef.current.contains(e.target)) onToggleProfileMenu()
  }

  let classHamburgerMenu = (width < 600) ? 'gray' : 'white'

  const onLogout = () => {
    dispatch(logout())
    setShowProfileMenu(!showProfileMenu)
  }

  const onCloseMenu = () => {
    setShowProfileMenu(false)
  }

  const onToggleMenu = (ev) => {
    ev.stopPropagation()
    setShowProfileMenu(!showProfileMenu)
  }

  const onToggleProfileMenu = (ev) => {
    // ev.stopPropagation()
    setShowProfileMenu(!showProfileMenu)
  }

  const onToggleSideMenu = () => {
    // console.log('on toggle side menu', isSideMenu)
    let flag = !isSideMenu
    setSideMenu(flag)
  }

  if (loggedUser && !loggedUser.imgUrl) {
    loggedUser.imgUrl = "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
  }

  const handleClick = () => {
    setIsActive(!isActive)
  }

  const handleSignout = () => {
    authSignout();
    dispatch(setUserUid(null))
  }

  return (
    <header className="header container flex align-center">
      <article className="logo-hamburger-container flex align-center">
        <div className="side-menu">
          {width < 600 && <button ref={menuRef} onClick={onToggleSideMenu} className={`hamburger-icon ${classHamburgerMenu}`}>
            {isSideMenu && <SideMenu menuOpen={isSideMenu} closeMenu={onToggleSideMenu} user={loggedUser} handleClick={handleClick} />}
          </button>}
        </div>
        <div className="logo">
          <NavLink to="/" className="site-logo">
          <img src="https://res.cloudinary.com/primap/image/upload/v1667563747/General/Dudi%20Sela/Dudi-Logo_e5zm1a.svg" className="app-logo"
          alt="logo" />
          </NavLink>
        </div>
      </article>

      <ul className="nav-list clean-list flex align-center">

        {(pathname === '/' && loggedUser ? <li><Link to={`/user-reservations/:userId`} onClick={handleClick} className={`${homeClassName}`}>ההזמנות שלי</Link>
        </li> : <li><NavLink to={'/user-reservations/:userId'} onClick={handleClick} className="link-page">ההזמנות שלי</NavLink>
        </li>)}

        {(pathname === '/' && loggedUser ? <li><Link to={`/user-reservations/new-reservation/:userId`} onClick={handleClick} className={`${homeClassName}`}>הזמן מגרש</Link>
        </li> : <li><NavLink to={'/user-reservations/new-reservation/:userId'} onClick={handleClick} className="link-page">הזמן מגרש</NavLink>
        </li>)}

        <li><NavLink to={`/about`} onClick={handleClick} className="link-page">על האקדמיה</NavLink>
        </li>

        <li>
          {!loggedUser && <Link to='/login' rel="nofollow" className="open-popup-login link-page">כניסה</Link>}
          <div className="avatar-container">
            {loggedUser && <img className="avatar-img" src={`${loggedUser.imgUrl}`} onClick={onToggleMenu} alt="Avatar"></img>}
          </div>

          <div className="profile-container" ref={profileRef}>
            {showProfileMenu && <ProfileMenu menuOpen={showProfileMenu} onLogout={onLogout} user={loggedUser} closeMenu={onCloseMenu} onToggleMenu={onToggleProfileMenu} />}
          </div>
        </li>

        <li>
          {!loggedUser && <Link to='/signout' rel="nofollow" className="open-popup-login link-page" onClick={() => handleSignout()}>יציאה</Link>}
          <div className="avatar-container">
            {loggedUser && <img className="avatar-img" src={`${loggedUser.imgUrl}`} onClick={onToggleMenu} alt="Avatar"></img>}
          </div>

          <div className="profile-container" ref={profileRef}>
            {showProfileMenu && <ProfileMenu menuOpen={showProfileMenu} onLogout={onLogout} user={loggedUser} closeMenu={onCloseMenu} onToggleMenu={onToggleProfileMenu} />}
          </div>
        </li>

        {!loggedUser ? <li><Link to={`/signup`} onClick={handleClick} className="link-page">הרשמה</Link>
        </li> : <li><NavLink to={`/user-reservations/new-reservation`} onClick={handleClick} className="link-page">הזמנת מגרש</NavLink>
        </li>}
      </ul>
    </header>
  )
}