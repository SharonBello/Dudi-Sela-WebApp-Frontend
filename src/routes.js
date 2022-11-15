import { Homepage } from './pages/homepage/homepage.jsx'
import { About } from './pages/about/about.jsx'
import { Signup } from './pages/signup/signup.jsx'
import { Login } from './pages/login/login.jsx'
import { EditReservation } from './pages/edit-reservation/edit-reservation.jsx'
import { NewReservation } from './pages/new-reservation/new-reservation.jsx'
import { UserReservations } from './pages/user-reservations/user-reservations.jsx'
import { UserProfile } from './pages/user-profile/user-profile.jsx'


const routes = [
    {
        path: '/about',
        component: <About />,
    },
    {
        path: '/user-reservations/edit-reservation/:reservationId',
        component: <EditReservation />,
    },
    {
        path: '/user-reservations/new-reservation',
        component: <NewReservation />,
    },
    {
        path: '/user-reservations',
        component: <UserReservations />,
    },
    {
        path: '/user-profile/:userId',
        component: <UserProfile/>,
    },
    {
        path: '/signin',
        component: <Login />,
    },
    {
        path: '/signup',
        component: <Signup />,
    },
    {
        path: '/signout',
        component: <Homepage />,
    },
    {
        path: '/',
        component: <Homepage />,
    }
]

export default routes