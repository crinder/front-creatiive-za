import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';
import Form from 'react-bootstrap/Form';


const Modals = ({ show, handleClose, setAceptar, params }) => {

    const { token, isLoading } = useAuth();
    const [statusInvoice, setStatusInvoice] = useState('');
    const [statusDes, setStatusDes] = useState('');
    const [isCob, setisCob] = useState(false);

    useEffect(() => {

        getMethod('invoices_method_payment');
        setisCob(true);

    }, [params.action]);


    const accept = () => {

        if (params.action == 'COBRAR') {

            cobrar();

        } else if (params.action == 'CANCELAR') {

            cancelar();

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
            console.log('actualizado');
            setAceptar(true);
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
            <Modal.Header closeButton>
                <Modal.Title>{params.header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {params.body}

                {isCob &&
                    <div>
                        <label htmlFor="fecinic">Forma de pago</label>
                        <Form.Select aria-label="Default select example" onChange={changeStatusInvoice}>
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