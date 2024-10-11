import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';


const Modals = ({ show, handleClose, setAceptar, clientesAct = [] }) => {


    const [cantidad, setCantidad] = useState({});
    const [cantidadSelect, setCantidadSelect] = useState('');
    const { token, isLoading } = useAuth();

    const accept = () => {
        CreateInvoice();
    }

    useEffect(() => {
        getMethod('invoices_amount');
    }, []);


    const changedCantidad = (evento) => {
        setCantidad(evento.target.value);
    }

    const getMethod = async (grupo) => {

        let body = {
            group: grupo,
            status: 'ACT'
        }


        const request = await fetch(Global.url + 'description/filter', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                "authorization": token
            }
        });

        const data = await request.json();

        if (data.status == 'success') {

            setCantidad(data.findStored);
            setCantidadSelect(data.findStored[0]?.code);
        }

    }


    const CreateInvoice = async () => {

        let body = {
            clientes: clientesAct,
            amount: cantidadSelect
        };


        const request = await fetch(Global.url + 'attendance/register', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                "authorization": token
            }
        });

        const data = await request.json();

        if (data.status == 'success') {
            setAceptar(true);
        }
    }


    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton className='dark:bg-slate-800 '>
                <Modal.Title className='text-2xl dark:text-slate-50'>Crear la asistencia</Modal.Title>
            </Modal.Header>
            <Modal.Body className='dark:bg-slate-800 dark:text-slate-300 dark:border-slate-300/10'>
                Esta seguro de crear las asistencias?
                <ul className='my-2 text-capitalize text-slate-100'>

                    {clientesAct.length > 0 && clientesAct.map(client => {
                        return (
                            <li key={client.id}>
                                {client.nombre}
                            </li>
                        )
                    })

                    }

                </ul>

                <form className='form__control'>
                    <Form.Select aria-label="Default select example" onChange={changedCantidad} className='shadow-lg w-11/12 py-3 md:py-3 px-6 text-xl font-semibold my-6 mx-3 dark:bg-slate-700 dark:border-none dark:text-slate-300'>
                        {cantidad.length > 0 && cantidad.map(payment => {

                            return (

                                <option value={payment.descrip} id={payment._id}>{payment.descrip}</option>

                            )
                        })

                        }
                    </Form.Select>

                </form>


            </Modal.Body>
            <Modal.Footer className='dark:bg-slate-800'>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={accept}>Aceptar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Modals