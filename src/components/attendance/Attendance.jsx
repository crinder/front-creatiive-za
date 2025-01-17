import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Global from '../../helpers/Global';
import { useClient } from '../context/AuthClient';
import { useAuth } from '../context/AuthContext';
import Find from '../invoice/Find';
import Alerts from '../utils/Alerts';
import BodyCollapse from './BodyCollapse';
import HeaderCollapse from './HeaderCollapse';
import Modals from './Modals';
import Message from '../utils/Message';

const Attendance = () => {

    const { clientesAct, setClientesAct, isFocused, setIsFocuset } = useClient();
    const [clientInvoice, setClientInvoice] = useState([]);
    const [deleteAtte, setDeleteAtte] = useState();
    const { token, isLoading } = useAuth();
    const [show, setShow] = useState(false);
    const [aceptar, setAceptar] = useState(false);
    const [variant, setVariant] = useState();
    const [message, setMessage] = useState();

    const title = 'Asistencias';
    const [showAlert, setShowAlert] = useState(false);

    const handleAlert = () => {
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 5000)
    }


    const handleClose = () => setShow(false);
    const handleShow = () => {

        if (clientesAct.length > 0) {
            setShow(true);
        } else {
            alert('Debe seleccionar un cliente');
        }

    }


    useEffect(() => {
        if (clientesAct.length > 0) {
            getInvoice();
        }

    }, [clientesAct]);

    useEffect(() => {
        if (aceptar) {
            getInvoice();
            setAceptar(false);
            handleClose();
        }

    }, [aceptar]);


    useEffect(() => {
        if (deleteAtte) {
            deleteAttendance();
        }


    }, [deleteAtte]);

    const deleteAttendance = async () => {

        const id = deleteAtte;

        const request = await fetch(Global.url + 'attendance/delete/' + id, {
            method: 'DELETE',
            headers: {
                "Content-type": 'application/json',
                "authorization": token
            }
        });

        const data = await request.json();

        if (data.status == 'success') {
            getInvoice();
            setVariant('Correcto');
            setMessage('Asistencia eliminada');
        }else{
            setVariant('Error');
            setMessage(data.error);
        }

        handleAlert();

    }


    const getInvoice = async () => {

        let payload = {
            ids_client: clientesAct,
            status: 'ACT',
            statusFac: 'PEN'
        }

        const request = await fetch(Global.url + 'attendance/list', {

            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "Content-type": 'application/json',
                "authorization": token
            }

        });

        const data = await request.json();

        if (data.status == 'success') {
            setClientInvoice(data);
        }

    }

    return (
        <div className='content dark:border-slate-300/10 dark:text-slate-200'>

            <Message showAlert={showAlert} tipo={variant} message={message} />

            <Find title={title} clientesAct={clientesAct} setClientesAct={setClientesAct} isFocused={isFocused} setIsFocuset={setIsFocuset} />

            <div className={`content__invoice ${isFocused ? 'opacity__element' : ''}`} >

                <Modals show={show} handleClose={handleClose} setAceptar={setAceptar} clientesAct={clientesAct} onAviso={handleAlert} setVariant={setVariant} setMessage={setMessage}/>

                <section className='tab__invoice'>

                    {clientesAct.length > 0 && clientesAct.map(clients => {

                        return (
                            <div key={clients.id} className='accordion__div'>

                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header >
                                            <HeaderCollapse nombre={clients.nombre} />
                                        </Accordion.Header>
                                        <Accordion.Body >
                                            <BodyCollapse clientInvoice={clientInvoice} clientId={clients.id} setDeleteAtte={setDeleteAtte} />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            </div>
                        )

                    })


                    }

                </section>
            </div>
            <div className='div__espacio'>
                <span className="button-success" onClick={handleShow}>
                    Crear asistencia
                </span>
            </div>
        </div>
    )
}

export default Attendance