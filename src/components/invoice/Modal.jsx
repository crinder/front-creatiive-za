import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';


const Modals = ({ show, handleClose, setAceptar, params, handleAlert, setVariant, setMessage }) => {

    const { token, isLoading } = useAuth();
    const [statusInvoice, setStatusInvoice] = useState('');
    const [statusDes, setStatusDes] = useState('');
    const [isCob, setisCob] = useState(false);
    let tipo;

    useEffect(() => {

        getMethod('invoices_method_payment');
        setisCob(true);

    }, [params.action]);


    const accept = () => {

        if (params.action == 'COBRAR') {

            cobrar();
            tipo = 'cobrada';

        } else if (params.action == 'CANCELAR') {

            cancelar();
            tipo = 'cancelada';

        }

    }

    const changeStatusInvoice = (evento) => {
        setStatusInvoice(evento.target.value);
    }

    const updateInvoice = async (payload) => {

        const request = await fetch(Global.url + 'invoice/update', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                "authorization": token
            }
        });

        const data = await request.json();

        if (data.status == 'success') {
            setAceptar(true);
            handleAlert(true);
            setVariant('Correcto');
            setMessage('factura '+tipo);
        }else{
            handleAlert(true);
            setVariant('Error');
            setMessage(data.message);
        }

    }


    const cobrar = () => {

        let payload = {
            idfact: params.idfact,
            status: 'COB',
            indcont: 'S',
            payment_method: statusInvoice
        }

        updateInvoice(payload);

        setisCob(false);

    }

    const cancelar = () => {

        let payload = {
            idfact: params.idfact,
            status: 'CAN',
            indcont: 'N'
        }

        updateInvoice(payload);
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

            setStatusDes(data.findStored);
            setStatusInvoice(data.findStored[0]?.code);

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
                <Modal.Title className='text-2xl dark:text-slate-50'>{params.header}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='dark:bg-slate-800 dark:text-slate-300 dark:border-slate-300/10'>
                {params.body}

                {isCob &&
                    <div >
                        <label htmlFor="fecinic" className='my-2 text-capitalize text-slate-100'>Forma de pago</label>
                        <Form.Select aria-label="Default select example" onChange={changeStatusInvoice} className='shadow-lg w-11/12 py-3 md:py-3 px-6 text-xl font-semibold my-6 mx-3 dark:bg-slate-700 dark:border-none dark:text-slate-300'>
                            {statusDes.length > 0 && statusDes.map(payment => {

                                return (
                                    <option value={payment.code} id={payment._id}>{payment.descrip}</option>
                                )
                            })

                            }
                        </Form.Select>
                    </div>

                }



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