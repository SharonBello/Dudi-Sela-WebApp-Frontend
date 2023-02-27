import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signout } from '../../../store/actions/user.actions.js'

export const SideMenu = ({ menuOpen, user, closeMenu, handleClick, handleSignout }) => {
  const { loggedUser } = useSelector((storeState) => storeState.userModule)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const className = (menuOpen) ? 'open' : ''

  const onSignout = () => {
    dispatch(signout())
    closeMenu()
  }

  const openJoin = () => {
    navigate('/signup')
    closeMenu()
  }

  const openLogin = () => {
    navigate('/signin')
    closeMenu()
  }

  return (
    <div className={`background-backdrop overlay ${menuOpen ? 'visible' : ''}`}>
      <section className={`side-bar flex-column ${className}`} >
        <div className="menu-header">
          <div className="logo-sidemenu-container flex">
            <NavLink to="/" className="site-sidemenu-logo">
              <img src="https://res.cloudinary.com/primap/image/upload/v1677420672/General/Dudi%20Sela/DudiLogo_wdbxir.svg" className="app-logo"
                alt="logo" />
            </NavLink>
            <h2>X</h2>
          </div>

          {!user &&
            <ul className='user-sign-side-btn clean-list flex-column'>
              <li>
                <NavLink to="/signin" className="open-popup-side-menu">
                  כניסה
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className="open-popup-side-menu">
                  הרשמה
                </NavLink>
              </li>
            </ul>}

          {user && loggedUser &&
            <h3>כיף שחזרתם</h3>}
        </div>

        <nav className='menu-nav'>
          <ul className='side-menu-profile clean-list flex-column'>
            <li><NavLink to={`/about`} className="sidebar-item">על האקדמיה</NavLink></li>
            <li><NavLink to={`/learntennis`} className="sidebar-item">לימוד טניס</NavLink></li>
            <li><NavLink to={`/contact`} className="sidebar-item">צרו קשר</NavLink></li>

            {loggedUser ? <li><NavLink to={`/user-profile`} className="sidebar-item">אזור אישי</NavLink></li> : <span></span>}

            {/* {loggedUser ? <li><NavLink to={`/user-reservations/new-reservation`} className="sidebar-item">הזמנת מגרש</NavLink></li> : <span></span>}

            {loggedUser ? <li><NavLink to={'/user-reservations'} onClick={handleClick} className="sidebar-item">ההזמנות שלי</NavLink>
            </li> : <span></span>} */}

            <li>
              {loggedUser ?
                <NavLink to={'/'} onClick={() => handleSignout()} className="sidebar-item">יציאה</NavLink> : <span></span>}
            </li>

          </ul>

        </nav>
      </section>
    </div>
  )
}