import React, {  useState } from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/events';

export const DeleteFab = () => {

    const dispatch = useDispatch();
    
    const handleDelete = () => {

        setIsRender('animate__backOutRight');

        setTimeout( ()=>{
            dispatch( eventStartDelete() );
        },1000)
        
    }
    const [isRender, setIsRender] = useState('animate__backInRight')
    
    return (
        <button
            className={`btn btn-danger fab-delete ${isRender} animate__animated  animate__faster`}
            onClick={handleDelete}
        >
            <i className="fas fa-trash" />
        </button>
    )
}
