import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { clearEvents } from '../../actions/events'

export const Navbar = () => {

    const { name } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const handleLogout = () =>{
        dispatch( startLogout() );
        dispatch( clearEvents() );
    }

    return (
        <nav className="navbar navbar-dark bg-primary mb-2">
            <a className="navbar-brand" href="#" >
                { name }
                </a>


            <button
             className="btn btn-secondary"
             onClick={ handleLogout }
             >
                <i className="fas fa-sign-out-alt" />
                <span>Salir</span>
            </button>
        </nav>
    )
}
