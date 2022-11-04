import { NavLink } from "react-router-dom"

export const ProfileMenu = ({ onLogout, user, closeMenu, onToggleMenu }) => {

    return (
        <section className="profile-menu-wrapper" onClick={onToggleMenu}>
            <div className="profile-menu">
                <ul className="sub-category clean-list">
                    <li className="menu-item" onClick={() => closeMenu()}><NavLink to={`/user-profile/:userId`}>Profile</NavLink></li>
                    {user && <li className="menu-item" onClick={() => closeMenu()}><NavLink to={`/user-reservations//${user._id}`}>My Reservations</NavLink></li>}
                    <li className="menu-item" onClick={() => closeMenu()}><NavLink to={`/user-reservations/new-reservation`}>New Reservation</NavLink></li>
                    <li className="menu-item logout" onClick={() => onLogout()}><NavLink to={`/`}>Logout</NavLink></li>
                </ul>
            </div>
        </section>
    )
}