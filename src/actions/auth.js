import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types"

export const startLogin = ( email, password )=>{

    return async (dispatch) =>{

        const resp = await fetchSinToken('auth', { email, password}, 'POST');
        const body = await resp.json();
        
        if( body.ok ){ // si el body.ok == true
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() ); //para manipular la duración del token

            dispatch( login({
                uid: body.uid,
                name: body.name
            }));
            
        }else{
            
            Swal.fire('Error', body.msg ,'error');
        }
    }
}

export const startRegister = (name, email, password) =>{
    return async(dispatch) =>{

        const resp = await fetchSinToken('auth/new',{name, email, password}, 'POST');
        const body = await resp.json();

        if( body.ok){// body.ok=true
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() ); //para manipular la duración del token

            dispatch( login({
                uid: body.uid,
                name: body.name
            }));
        }else{

            Swal.fire('Error', body.msg ,'error');
        }
    }
}

export const  startChecking = () =>{
    return async (dispatch) =>{

        try {
            const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if( body.ok){// body.ok=true
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() ); //para manipular la duración del token
            
            dispatch( login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            console.log('No está logeado')
            dispatch( checkingFinish() );
        }
        } catch (error) {
            console.log(error);
        }

        
    }
}

const checkingFinish = () =>({
    type: types.authCheckingFinish
})

const login = ( user ) =>({
    type: types.authLogin,
    payload: user
})


export const startLogout = ()=>{
    return ( dispatch )=>{

        localStorage.clear();
        dispatch( logout() );
    }
}

const logout = () =>({
    type: types.authLogout
})