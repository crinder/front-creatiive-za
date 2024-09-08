import React, { useEffect, useState } from 'react'
import Find from '../invoice/Find'
import Accordion from 'react-bootstrap/Accordion';
import { useClient } from '../context/AuthClient';
import HeaderCollapse from './HeaderCollapse';
import BodyCollapse from './BodyCollapse';
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';
import Modals from './Modals';

const Attendance = () => {

    const { clientesAct, setClientesAct, isFocused, setIsFocuset } = useClient();
    const [clientInvoice, setClientInvoice] = useState([]);
    const [deleteAtte, setDeleteAtte] = useState();
    const { token, isLoading } = useAuth();
    const [show, setShow] = useState(false);
    const [aceptar, setAceptar] = useState(false);
    const title = 'Asistencias';


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
            if(deleteAtte){
                deleteAttendance();
            }
           

    },[deleteAtte]);

    const deleteAttendance = async () => {

        const id = deleteAtte;

        const request = await fetch (Global.url+'attendance/delete/'+id,{
            method: 'DELETE',
            headers: {
                "Content-type": 'application/json',
                "authorization": token
            }
        });

        const data = await request.json();

        if(data.status == 'success'){
            console.log('Asistencia eliminada');
            getInvoice();
        }

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
        <div className='content__header'>
            <Find title={title} clientesAct={clientesAct} setClientesAct={setClientesAct} isFocused={isFocused} setIsFocuset={setIsFocuset} />

            <div className={`content__invoice ${isFocused ? 'opacity__element' : ''}`} >

                <Modals show={show} handleClose={handleClose} setAceptar={setAceptar} clientesAct={clientesAct} />

                <section className='tab__invoice'>

                    {clientesAct.length > 0 &&  clientesAct.map(clients => {

                        return (
                            <div key={clients.id} className='accordion__div'>

                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <HeaderCollapse nombre={clients.nombre} />
                                        </Accordion.Header>
                                        <Accordion.Body>
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
            <span class="button__span" onClick={handleShow}>
                    Crear asistencia
                </span>
            </div>
        </div>
    )
}

export default Attendance