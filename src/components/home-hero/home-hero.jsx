import React from 'react'
import VideoPlayer from 'react-background-video-player'
import { useSelector } from 'react-redux'

export const HomeHero = () => {
  const { loggedUser } = useSelector((storeState) => storeState.userModule)

    return (
        <div className="hero">
            <VideoPlayer
                className="video"
                src={
                    "https://res.cloudinary.com/primap/video/upload/v1667564876/General/Dudi%20Sela/pexels-cottonbro-5730331_gtd9q3.mp4"
                }
                autoPlay={true}
                muted={true}
                loop={true}
                height="80vh"
                width="100%"
            />

            <div className="hero-text">
                <h1 className="catch-phrase">האקדמיה לטניס<br></br>דודי סלע</h1>
                <p className="catch-phrase">אימון ברמה אחרת</p>
                {!loggedUser  ? <a href="/signin" className="open-popup-join">כניסת משתמשים</a> : <a href="/user-reservations/new-reservation" className="open-popup-join">הזמנת מגרש</a>}
            </div>
            <aside className="hero-stats">
                <div className="box-row container">
                    <ul className="clean-list flex align-center">
                        <li>
                            מגרשי אימון מקצועיים<br></br>
                            <strong>12 מגרשים</strong>
                        </li>
                        <li>
                            אקדמיה לטניס תחרותי<br></br>
                            <strong>תכניות מותאמות גיל</strong>
                        </li>
                        <li>
                            מאמנים ברמה הגבוהה ביותר<br></br>
                            <strong>צוות בכיר</strong>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}
