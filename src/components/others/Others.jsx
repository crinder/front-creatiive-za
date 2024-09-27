import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../context/AuthContext';
import Global from '../../helpers/Global';
import useform from '../../assets/hooks/useform';
import Table from './Table';

const Others = () => {

    const { form, changed } = useform();
    const { token, isLoanding } = useAuth();
    const [descrip, setDescrip] = useState('');
    const [method, setMethod] = useState('');
    const [resultado, setResultado] = useState('');
    const [otros, setOtros] = useState([]);

    useEffect(() => {
        getDescripcion();
    }, []);



    const getDescripcion = async () => {


        let body = {
            group: 'other_payment',
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

            setDescrip(data.findStored);
        }
    }

    const changedMethod = (event) => {
        setMethod(event.target.value);
    }

    useEffect(() => {

        if (resultado) {
            setOtros([...otros, resultado]);
        }

    }, [resultado]);


    const register = async (e) => {
        e.preventDefault();

        let body = form;

        body.method = method;

        const request = await fetch(Global.url + 'others/register', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                "authorization": token
            }
        });
        const data = await request.json();

        if (data.status == 'success') {
            console.log('Registro exitoso...' + data);
            setResultado(data.others);
        }
    }

    return (
        <div>
            <header>
                <div>
                    <span>Otros pagos</span>
                </div>
            </header>

            <section>
                <form onSubmit={register}>
                    <Form.Select aria-label="Default select example" onChange={changedMethod}>
                        <option disabled selected>Seleccione un pago</option>
                        {descrip.length > 0 && descrip.map(payment => {

                            return (

                                <option value={payment.descrip} id={payment._id}>{payment.descrip}</option>

                            )
                        })

                        }
                    </Form.Select>

                    <div className='forms__input'>
                        <label htmlFor="amount" className='label__form'>Monto</label>
                        <input type="text" name='amount' className='input__form' onChange={changed} />
                    </div>

                    <div className='forms__input'>
                        <label htmlFor="observation" className='label__form'>Observación</label>
                        <input type="text" name='observation' className='input__form' onChange={changed} />
                    </div>
                    <button type="submit" className="btn_submit solid">Crear</button>
                </form>
            </section>

            <section>
                    <Table otros={otros} setOtros={setOtros} />
            </section>
        </div>
    )
}

export default Others