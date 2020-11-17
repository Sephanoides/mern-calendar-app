import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';

import moment from 'moment';
import Swal from 'sweetalert2'

import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, startUpdate } from '../../actions/events';

const customStyles = {
    content: {
        top             : '50%',
        left            : '50%',
        right           : 'auto',
        bottom          : 'auto',
        marginRight     : '-50%',
        transform       : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');
//Estas horas se setean por defecto en el modal como inicio-fin
const now = moment().minutes(0).seconds(0).add(1,'hours'); // 3:00:00
const  nowPlus1 = now.clone().add(1,'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}


export const CalendarModal = () => {

    const { modalOpen }     = useSelector( state => state.ui)
    const { activeEvent }   = useSelector(state => state.calendar) 
    const   dispatch        = useDispatch()

    const [ dateStart, setDateStart ]   = useState( now.toDate() ) //para que lo haga con la fecha actual
    const [ dateEnd, setDateEnd ]       = useState( nowPlus1.toDate() )// setea una unicavez el datepicker
    const [titleValid , setTitleValid ] = useState(true)

    const [ formValues, setFormValues ] = useState(initEvent)
    const { notes, title, start, end }  = formValues;

    useEffect(() => {
        /*Este efecto está atento a los cambios del evento activo, si no purgamos el state del evento
        activo, el useEffect no se dispara, ya que siempre será el mismo estado */
        if ( activeEvent ){//si no existe devuelve null
            setFormValues( activeEvent );
        }else{
            setFormValues( initEvent )
        } 

    }, [activeEvent,setFormValues])

    const RequestClose = () =>{

        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        setFormValues( initEvent );

    }

    const handleStartDateChange = (e) =>{
        setDateStart( e ); //Setea la hora de inicio cuando la cambiemos en el data picker
        setFormValues({
            ...formValues,
            start : e
        })
    }

    const handleEndDateChange = (e) =>{
        setDateEnd( e ) //setea la fecha de termino cuando la cambiemos en el datapicker
        setFormValues({
            ...formValues,
            end : e
        })
    }
    
    const handleInputChange = ({ target }) =>{
        
        setFormValues({
            ...formValues,
            [target.name] : target.value
        })

    }

    const handleSubmitForm = (e) =>{
        e.preventDefault()

        const momentStart = moment( start );
        const momentEnd = moment ( end )

        if( momentStart.isSameOrAfter( momentEnd ) ){ //verifiquemos fecha y hora de inicio
            return Swal.fire({
                title: 'Error!',
                text: 'La hora de fin debe ser mayor a la de inicio',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        }

        if( title.trim().length < 2){
            return setTitleValid( false );
        }
        

        if( activeEvent ){
            dispatch( startUpdate( formValues ) ); //update de la nota activa
        }else{
            dispatch( eventStartAddNew({...formValues}) );
        }

        setTitleValid( true ); // para quitar la alerta en el titulo invalido
        RequestClose();

    }

    return (
        <Modal
            isOpen={ modalOpen }
            // onAfterOpen={}
            onRequestClose={ RequestClose }
            style={customStyles}
            closeTimeoutMS={200}
            className="modal" //estilos del modal
            overlayClassName="modal-fondo" // para el fondo del modal
        >
            <h1> { activeEvent ? 'Editando' : 'Nuevo evento'} </h1>
            <hr />
            <form className="container" onSubmit={ handleSubmitForm }>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart }
                        className="form-control" //estilos de bootstrap
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${ !titleValid && 'is-invalid'} `}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value= { title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange= { handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}

