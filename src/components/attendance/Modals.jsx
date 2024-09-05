import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
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
            console.log('success');
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
            <Modal.Header closeButton>
                <Modal.Title>Crear la asistencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Esta seguro de crear las asistencias?
                <ul>

                    {clientesAct.length > 0 && clientesAct.map(client => {
                        return (
                            <li>
                                {client.nombre}
                            </li>
                        )
                    })

                    }

                </ul>

                <form className='form__control'>
                    <Form.Select aria-label="Default select example" onChange={changedCantidad}>
                        {cantidad.length > 0 && cantidad.map(payment => {

                            return (
                                <option value={payment.descrip} id={payment._id}>{payment.descrip}</option>
                            )
                        })

                        }
                    </Form.Select>

                </form>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={accept}>Aceptar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Modals