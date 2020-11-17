import { types } from "../types/types";


const initialState = {
    events: [],
    activeEvent: null

}

export const calendarReducer = ( state = initialState, action ) =>{

    switch (action.type) {

        case types.eventAddNew:
            return{
                ...state,
                events: [
                    ...state.events,
                     action.payload
                ]
            }
            
        case types.eventSetActive:
            return{
                ...state,
                activeEvent: action.payload
            }
        case types.eventClearActiveEvent:
            return{
                ...state,
                activeEvent: null
            }
        case types.eventUpdated:
            return{
                ...state,
                events: state.events.map(
                     e => ( e.id === action.payload.id ) ? action.payload : e
                )
                     //Si el evento que estoy actulizando es igual al evento que tengo en la lista
                     //de eventos, entonces retorna el mismo evento pero actualizado
            }
        case types.eventDeleted:
            return{
                ...state,
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent.id )
                ),
                activeEvent: null
            }       
        case types.eventLoaded:
            return{
                ...state,
                events: [ ...action.payload ]
            }
        case types.eventClear:
            return{
                ...initialState
            }             
        default:
            return state;
    }


}