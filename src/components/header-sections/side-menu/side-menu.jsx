import { NavLink, useNavigate, useLocation, useParams } from 'react-router-dom'
// import { loadGigs, setFilter } from '../../store/actions/gig.actions.js'
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
      <section className={`side-bar flex flex-column ${className}`} >
        <div className="menu-header">
          <div className="logo-sidemenu-container flex">
            <NavLink to="/" className="site-sidemenu-logo">
              <img src="https://res.cloudinary.com/primap/image/upload/v1667563747/General/Dudi%20Sela/Dudi-Logo_e5zm1a.svg" className="app-logo"
                alt="logo" />
            </NavLink>
            <h2>X</h2>
          </div>

          {!user &&
            <ul className='user-sign-side-btn clean-list flex flex-column'>
              <li>
                <a href="/signin" className="open-popup-side-menu">
                  כניסה
                </a>
              </li>
              <li>
                <a href="/signup" className="open-popup-side-menu">
                  הרשמה
                </a>
              </li>
            </ul>}

          {user && loggedUser &&
            <h3>כיף שחזרתם</h3>}
        </div>

        <nav className='menu-nav'>
          <ul className='side-menu-profile clean-list flex flex-column'>
            <li><NavLink to={`/about`} className="sidebar-item">על האקדמיה</NavLink></li>

            {loggedUser ? <li><NavLink to={`/user-profile`} className="sidebar-item">הפרופיל שלי</NavLink></li> : <span></span>}

            {loggedUser ? <li><NavLink to={`/user-reservations/new-reservation`} className="sidebar-item">הזמנת מגרש</NavLink></li> : <span></span>}

            {loggedUser ? <li><NavLink to={'/user-reservations'} onClick={handleClick} className="sidebar-item">ההזמנות שלי</NavLink>
            </li> : <span></span>}

            <li>
              <a href="https://wa.me/972523782815" target="_blank" rel="noreferrer" className="sidebar-item">צור קשר
              </a>
            </li>
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