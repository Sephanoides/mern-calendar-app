import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { prepareEvent } from '../helpers/prepareEvent';
import { types } from '../types/types';


export const eventStartAddNew = ( event ) =>{
    return async (dispatch, getState) =>{

        const { uid, name } = getState().auth
        try {

            const resp = await fetchConToken('events', event, 'POST')
            const body = await resp.json();
    
            if( body.ok ){

                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name : name
                }
                dispatch( eventAddNew( event ) );
            }

        } catch (error) {
            
        }
       
    }
}


 const eventAddNew = ( event ) =>({
    type: types.eventAddNew,
    payload: event
})


export const eventSetActive = ( event ) =>({
    type: types.eventSetActive,
    payload: event
})


export const eventClearActiveEvent = () =>({   type: types.eventClearActiveEvent   })


export const startUpdate = ( evento ) =>{
    return async(dispatch)=>{

        try {

            const resp = await fetchConToken(`events/${evento.id}`, evento, 'PUT');
            const body = await resp.json();

            if( body.ok ){
                dispatch( eventUpdated( evento ) );
            }else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }

    }
}


export const eventUpdated = ( event ) =>({
    type: types.eventUpdated,
    payload: event
})


export const  eventStartDelete = ( event ) =>{
    return async (dispatch, getState)=>{

        const { id } = getState().calendar.activeEvent


        try {
            
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE')
            const body = await resp.json();

            if( body.ok ){
                dispatch( eventDelete() );
            }else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }

    }
}
 const eventDelete = () =>({ type: types.eventDeleted })

export const eventStartLoading = () =>{
    return async (dispatch) =>{

        try {
            
            const resp = await fetchConToken('events');
            const body = await resp.json();

            const eventos = prepareEvent( body.eventos ) ;
            
            dispatch( eventLoaded( eventos ));

        } catch (error) {
            console.log(error);
        }

    }
}

const eventLoaded = ( eventos )=>({
    type: types.eventLoaded,
    payload: eventos
})

export const clearEvents = () =>({
    type: types.eventClear
})