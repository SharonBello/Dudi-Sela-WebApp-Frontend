import { NavLink } from "react-router-dom"

export const ProfileMenu = ({ onLogout, user, closeMenu, onToggleMenu }) => {

    return (
        <section className="profile-menu-wrapper" onClick={onToggleMenu}>
            <div className="profile-menu">
                <ul className="sub-category clean-list">
                    <li className="menu-item" onClick={() => closeMenu()}><NavLink to={`/user-profile/:userId`}>הפרופיל שלי</NavLink></li>
                    {user && <li className="menu-item" onClick={() => closeMenu()}><NavLink to={`/user-reservations//${user._id}`}>ההזמנות שלי</NavLink></li>}
                    <li className="menu-item" onClick={() => closeMenu()}><NavLink to={`/user-reservations/new-reservation`}>הזמנה חדשה</NavLink></li>
                    <li className="menu-item logout" onClick={() => onLogout()}><NavLink to={`/`}>יציאה</NavLink></li>
                </ul>
            </div>
        </section>
    )
}