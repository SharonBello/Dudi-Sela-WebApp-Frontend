import React, { useState, useEffect, useCallback, useRef } from 'react'
import Swal from 'sweetalert2'
import VideoPlayer from 'react-background-video-player'

export const CoachesPreview = ({ coach }) => {
    console.log("🚀 ~ file: coaches-preview.jsx:6 ~ CoachesPreview ~ coach", coach)
    const [hover, setHover] = useState(false);
    const videoRef = useRef()

    const openCoachDetails = () => {
        Swal.fire({
            backdrop: 'rgba(0,0,0,0.8)',
            titleText: `${coach.name}`,
            html: `${coach.description}`,
            html: '${coach.video ?
                (<iframe width="400"
                height="200"
                src={coach.video}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture"
                allowfullscreen>
                </iframe>) : coach.img}',


            imageUrl: `${coach.video ? coach.video : coach.img}`,
            imageWidth: 400,
            footer: `<a href="https://wa.me/972523782815" target="_blank" rel="noreferrer" style='background-color: #C9DB39;
            color: #1d1d1d;
            min-width: 30%;
            margin-block-start: rem(16px);
            margin: 0 auto;
            text-align: center;
            border: 1px solid transparent;
            border-radius: 4px;
            cursor: pointer;
            font-size: calc(0.8rem + 0.8vw);
            font-weight: 600;
            padding: rem(36px);
            transition: 70ms cubic-bezier(.75, 0, .25, 1);
            '>קבעו אימון אישי</a>`,
            showCloseButton: true,
            focusConfirm: false,
            allowOutsideClick: true,
            allowEscapeKey: true,
            stopKeydownPropagation: true,
            showConfirmButton: false,
        })
    }

    const handleMouseEnter = useCallback(() => {
        setHover(true)
    }, [setHover,])

    const handleMouseLeave = useCallback(() => {
        setHover(false)
    }, [setHover,])

    useEffect(() => {
        if (coach?.video === "") return;
        videoRef.current.addEventListener('play', handleMouseEnter);
        videoRef.current.removeEventListener('pause', handleMouseLeave);
        videoRef.current.volume = videoRef.volume;
    }, [handleMouseEnter, handleMouseLeave, coach.video])

    const renderMedia = () => {
        if (coach.video === "") {
            return (<img alt={coach.title} src={coach.img} />);
        }
        if (coach.video !== "") {
            if (hover) {
                return (<VideoPlayer
                    className="video"
                    src={coach.video}
                    autoPlay={true}
                    mute={false}
                    volume={true}
                    preload='auto'
                    loop={true}
                    maxHeight="100%"
                    maxWidth="100%"
                    />)
                }
            }
            // return (<img alt={coach.title} src={coach.img} />);
            return (<video  src={coach.video} />);
        }

    return (
        <li
            role="button"
            ref={videoRef}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
            className={`slide ${coach.latinName}`}
            onClick={() => openCoachDetails()}>
            <p className="coach-legends flex-column">{coach.name}
                <span>{coach.title}</span>
                <span>
                    {coach.legends}
                </span>
            </p>
            {renderMedia()}
        </li>
    )
}
