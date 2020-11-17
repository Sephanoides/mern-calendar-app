import React from 'react'


export const CalendarEvent = ({ event }) => {

    const { title, user} = event;

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            <strong> { title } </strong>
            <span>- { user.name } </span>
        </div>
    )
}
