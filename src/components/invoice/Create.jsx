import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import useform from '../../assets/hooks/useform';
import Global from '../../helpers/Global';
import { useClient } from '../context/AuthClient';
import { useAuth } from '../context/AuthContext';
import Toasts from '../utils/Toasts';


const Create = () => {

    const { form, changed } = useform();
    const { clientesAct, setclientesAct } = useClient();
    const { token, isLoanding } = useAuth();
    const [isChecked, setIsChecked] = useState(false);
    const [metodo, setMetodo] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cantidad,setCantidad] = useState({});
    const [cantidadSelect, setCantidadSelect] = useState('');

    const changedMethod = (evento) => {
        setPaymentMethod(evento.target.value);
    }

    const changedCantidad = (evento) => {
        setCantidad(evento.target.value);
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    useEffect(() => {
        getMethod('invoices_method_payment','M');
        getMethod('invoices_amount','C');
    }, []);
 

    const getMethod = async (grupo,estado) => {

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
            console.log('success');
            if(estado == 'M'){
                setMetodo(data.findStored);
                setPaymentMethod(data.findStored[0]?.code);
            }else if(estado == 'C'){
                setCantidad(data.findStored);
                setCantidadSelect(data.findStored[0]?.code);
            }
            
        }

    }

    let clientes = Object.values(clientesAct);


    const CreateInvoice = async (e) => {
        e.preventDefault();

        let body = form;

        body.id_client = clientesAct;
        body.status = isChecked ? 'PAG' : 'PEN';
        body.payment_method = paymentMethod;
        body.amount = cantidadSelect;
        const request = await fetch(Global.url + 'invoice/register', {
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
        }
    }

    return (

        <div className='content dark:border-slate-300/10'>

            {clientes.length > 0 && clientes.map(client => {

                return (
                    <Toasts name={client.nombre} id={client.id}/>
                )
            })

            }

            <div className='invoice__control'>

                <form className='form__control' onSubmit={CreateInvoice}>

                    <section className='clients__forms'>

                        <div className='forms__input'>
                            <label htmlFor="amount" className='label__form'>Monto</label>
                            <Form.Select aria-label="Default select example" onChange={changedCantidad}>
                                {cantidad.length > 0 && cantidad.map(payment => {

                                    return (
                                        <option value={payment.descrip} id={payment._id}>{payment.descrip}</option>
                                    )
                                })

                                }
                            </Form.Select>
                        </div>

                        <div className='forms__input'>
                            <label htmlFor="payment_method" className='label__form'>Metodo de pago</label>
                            <Form.Select aria-label="Default select example" onChange={changedMethod}>
                                {metodo.length > 0 && metodo.map(payment => {

                                    return (
                                        <option value={payment.descrip} id={payment._id}>{payment.descrip}</option>
                                    )
                                })

                                }
                            </Form.Select>
                        </div>

                        <div className='forms__input'>
                            <label htmlFor="observation" className='label__form'>Observación</label>
                            <input type="text" name='observation' className='input__form' onChange={changed} />
                        </div>

                        <div className='forms__input'>
                            <label className='label__form' htmlFor='status'>Estatus</label>
                            <input type='checkbox' name='status' checked={isChecked}
                                onChange={handleCheckboxChange}
                                value={isChecked ? 'si' : 'no'} />
                        </div>

                        <button type="submit" className="btn_submit solid">Crear factura</button>
                    </section>

                </form>

            </div>

        </div>
    )
}

export default Create