import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';


const Modals = ({ show, handleClose, setAceptar, params }) => {

    const { token, isLoading } = useAuth();

    const accept = () => {

        if (params.action == 'COBRAR') {

            cobrar();

        } else if (params.action == 'CANCELAR') {

            cancelar();

        }

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


    const cobrar =  () => {

        let payload = {
            idfact: params.idfact,
            status: 'COB',
            indcont: 'S'
        }

        updateInvoice(payload);

    }

    const cancelar = () => {

        let payload = {
            idfact: params.idfact,
            status: 'CAN',
            indcont: 'N'
        }

        updateInvoice(payload);
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