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
    const { token, isLoading } = useAuth();
    const { showModal, setShowModal } = useState();
    const [show, setShow] = useState(false);
    const [aceptar, setAceptar] = useState(false);
    
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

    useEffect(() => {
        if (clientesAct.length > 0) {
            getInvoice();
        }

    }, [clientesAct]);

    useEffect(()=>{
        if(aceptar){
            getInvoice();
            setAceptar(false);
            handleClose();
        }
       
    },[aceptar]);


    const getInvoice = async () => {

        let payload = {
            ids_client: clientesAct,
            status: 'ACT'
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
            <Find clientesAct={clientesAct} setClientesAct={setClientesAct} isFocused={isFocused} setIsFocuset={setIsFocuset} />

            <div className={`content__invoice ${isFocused ? 'opacity__element' : ''}`} >

                <span variant="primary" onClick={handleShow}>
                    Launch static backdrop modal
                </span>


                <Modals show={show}  handleClose={handleClose} setAceptar={setAceptar} clientesAct={clientesAct}/>
                
                <section className='tab__invoice'>

                    {clientesAct.length > 0 && clientesAct.map(clients => {

                        return (
                            <div key={clients.id}>

                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <HeaderCollapse nombre={clients.nombre} />
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <BodyCollapse clientInvoice={clientInvoice} clientId={clients.id} />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            </div>
                        )

                    })


                    }

                </section>

            </div>
        </div>
    )
}

export default Attendance