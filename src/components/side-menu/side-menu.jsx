import { NavLink, useNavigate, useLocation, useParams } from 'react-router-dom'
// import { loadGigs, setFilter } from '../../store/actions/gig.actions.js'
import { useSelector, useDispatch } from 'react-redux'
import { logout, getLoggedUser } from '../../store/actions/user.actions.js'
import { Logo } from '../../services/svg-service.js'


export const SideMenu = ({ menuOpen, user, closeMenu, handleClick }) => {
  const { loggedUser } = useSelector((storeState) => storeState.userModule)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const className = (menuOpen) ? 'open' : ''

  const onLogout = () => {
    dispatch(logout())
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
          <h2>X</h2>
          {!user &&
            <ul>
              <li>
                <button className="open-popup-side-menu" onClick={() => { openLogin() }}>כניסה</button>
              </li>
              <li>
                <button className="open-popup-side-menu" onClick={() => { openJoin() }}>הרשמה</button>
              </li>
            </ul>}

          {user && loggedUser && <div><Logo /><br></br><h3>Hello, {loggedUser.userName}</h3></div>}
        </div>

        <nav className='menu-nav'>

          <ul className='side-menu-profile clean-list'>
            <li>{user ? <NavLink to={`/user-profile/${user._id}`} className="sidebar-item">הפרופיל שלי</NavLink> : <NavLink to={'/signin'} className="sidebar-item">הפרופיל שלי</NavLink>}</li>

            {(pathname === '/' && loggedUser ? <li><NavLink to={`/user-reservations/${user._id}`} onClick={handleClick} className="sidebar-item">ההזמנות שלי</NavLink>
            </li> : <li><NavLink to={'/signin'} onClick={handleClick} className="sidebar-item">ההזמנות שלי</NavLink>
            </li>)}

          <li>
            {loggedUser ?
              <NavLink to={'/'} onClick={() => onLogout()} className="sidebar-item">יציאה</NavLink> : <span></span>}
          </li>

          </ul>

        </nav>
      </section>
    </div>
  )
            }