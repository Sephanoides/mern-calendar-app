import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';

import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formLoginValues, handleLoginInputChange] = useForm({
        lEmail: '',
        lPassword:''
    });

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rNombre:'',
        rCorreo:'',
        rPassword1:'',
        rPassword2:''
    })

    const { lEmail, lPassword } = formLoginValues; 
    const {rNombre, rCorreo, rPassword1, rPassword2} = formRegisterValues;
    

    const handleLoginSubmitForm = (e) =>{
        e.preventDefault();
        dispatch( startLogin(lEmail, lPassword ) );

    }

    const handleSubmitRegisterForm = (e) =>{
        e.preventDefault();
        
        if( rPassword1 !== rPassword2){
            return Swal.fire('Error','Las contraseñas deben coincidir','error');
        }

        dispatch( startRegister(rNombre,rCorreo,rPassword1 ) );
    }

   
    return (
        <div className="container login-container mb-5">
            <div className="row">
                <div className="col-md-6 login-form-1" >
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLoginSubmitForm}>
                        <div className="form-group">
                            <input 
                                type="text"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                                className="form-control"
                                placeholder="Contraseña"
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleSubmitRegisterForm}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                value={rNombre}
                                name="rNombre"
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                value={rCorreo}
                                name="rCorreo"
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                value={rPassword1}
                                name="rPassword1"
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                value={rPassword2}
                                name="rPassword2"
                                onChange={handleRegisterInputChange} 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
