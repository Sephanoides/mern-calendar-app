import React from 'react'
import { useDispatch } from 'react-redux'
import { eventClearActiveEvent } from '../../actions/events';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {

    const dispatch = useDispatch();
    
    const handleAddEvent = () =>{
        dispatch( eventClearActiveEvent() );
        dispatch( uiOpenModal() );
    }

    return (
        <button
            className="btn btn-primary fab animate__animated animate__backInRight animate__faster"
            onClick={ handleAddEvent }
        >
            <i className=" fas fa-plus"></i>
        </button>
    )
}
