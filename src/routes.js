import { Homepage } from './pages/homepage/homepage.jsx'
import { Signup } from './pages/signup/signup.jsx'
import { Login } from './pages/login/login.jsx'
import { EditReservation } from './pages/edit-reservation/edit-reservation.jsx'
import { NewReservation } from './pages/new-reservation/new-reservation.jsx'
import { UserReservations } from './pages/user-reservations/user-reservations.jsx'
import { UserProfile } from './pages/user-profile/user-profile.jsx'
import { LearnTennis } from './pages/learn-tennis/learn-tennis.jsx'
import { ContactUs } from './pages/contact-us/contact-us.jsx'
import { ScheduleManager } from './pages/schedule-manager/schedule-manager.jsx'
import { Dashboard } from './pages/dashboard/dashboard.jsx'

const routes = [
    {
        path: '/about',
        component: <Homepage />,
    },
    {
        path: '/contact',
        component: <ContactUs />,
    },
    {
        path: '/learntennis',
        component: <LearnTennis />,
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
        path: '/user-profile',
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
        path: '/schedule',
        component: <ScheduleManager />,
    },
    {
        path: '/dashboard',
        component: <Dashboard />,
    },
    {
        path: '/',
        component: <Homepage />,
    }
]


// {
//     path: '/',
//     component: <Dashboard />,
// }
export default routes