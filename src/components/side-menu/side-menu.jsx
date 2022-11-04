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
    navigate('/login')
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
                <button className="open-popup-side-menu" onClick={() => { openLogin() }}>Login</button>
              </li>
              <li>
                <button className="open-popup-side-menu" onClick={() => { openJoin() }}>Join</button>
              </li>
            </ul>}

          {user && loggedUser && <div><Logo /><br></br><h3>Hello, {loggedUser.userName}</h3></div>}
        </div>

        <nav className='menu-nav'>

          <ul className='side-menu-profile clean-list'>
            <li>{user ? <NavLink to={`/user-profile/${user._id}`} className="sidebar-item">My Profile</NavLink> : <NavLink to={'/login'} className="sidebar-item">My Profile</NavLink>}</li>

            {(pathname === '/' && loggedUser ? <li><NavLink to={`/user-reservations/${user._id}`} onClick={handleClick} className="sidebar-item">Reservations</NavLink>
            </li> : <li><NavLink to={'/login'} onClick={handleClick} className="sidebar-item">Reservations</NavLink>
            </li>)}

          <li>
            {loggedUser ?
              <NavLink to={'/'} onClick={() => onLogout()} className="sidebar-item">LogOut</NavLink> : <span></span>}
          </li>

          </ul>

        </nav>
      </section>
    </div>
  )
            }