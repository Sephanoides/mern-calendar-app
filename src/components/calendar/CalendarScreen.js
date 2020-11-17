import React, {  useEffect, useState } from 'react'

import { Navbar } from '../ui/Navbar'
import { Calendar, momentLocalizer } from 'react-big-calendar';

import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import moment from 'moment';
import 'moment/locale/es';

import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import { AddNewFab } from '../ui/AddNewFab';
import { DeleteFab } from '../ui/DeleteFab';
import { uiOpenModal } from '../../actions/ui';

import { useDispatch, useSelector } from 'react-redux';
import { eventSetActive, eventStartLoading } from '../../actions/events';

import { eventClearActiveEvent } from '../../actions/events';

const localizer = momentLocalizer(moment)


export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month');
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { uid } = useSelector(state => state.auth)

    useEffect(()=>{

        dispatch( eventStartLoading() );


    },[dispatch])


    const onDoubleClick = (e) =>{ dispatch( uiOpenModal() ) }

    const onSelectEvent = (e) =>{ dispatch( eventSetActive(e) )}
    

    const onViewChange = (e) =>{
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) =>{

        dispatch( eventClearActiveEvent() );
        
    }

    const eventStyleGetter = ( event, start, end, isSelected) =>{
        
        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
     
        return {
            style
        }
    }

    return (
        <div className="calendar-screen ">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events} //Estado de los eventos en redux
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }//retorna un objeto className or style
                onSelectEvent={ onSelectEvent }
                onDoubleClickEvent={ onDoubleClick } 
                onSelectSlot= { onSelectSlot }
                selectable={ true }
                onView={ onViewChange } // guarda la vista en localstorage : week,days,etc
                view={lastView} //vista que muestra al ingresar al sistema
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />
            {
                ( activeEvent && <DeleteFab/>)
            }
            
            <CalendarModal/>
        </div>
    )
}
