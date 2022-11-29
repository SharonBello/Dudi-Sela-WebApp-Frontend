import React from 'react'
import Swal from 'sweetalert2'

export const CoachesPreview = (props) => {

    const openCoachDetails = () => {
        Swal.fire({
            backdrop: 'rgba(0,0,0,0.8)',
            titleText: `${props.coach.name}`,
            html: `${props.coach.quote}`,
            imageUrl: `${props.coach.img}`,
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

    return (
        <>
            <li className={`slide ${props.coach.latinName}`}
                onClick={() => openCoachDetails()}>
                <p className="coach-legends">{props.coach.name}<br></br>
                    {props.coach.legends}</p>
                <img alt={props.coach.profession} src={props.coach.img} />
            </li>
        </>
    )
}
