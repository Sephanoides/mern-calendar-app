import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest // aqui va el exact por ejemplo y el resto de las props
}) => {

    return (
        <Route {...rest}
            component={(props) => (
                ( isAuthenticated )
                    ? ( <Redirect to='/' /> ) // si está autenticado envia al /
                    : ( <Component {...props} /> )// si no está autenticado manda al login
            )}

        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}