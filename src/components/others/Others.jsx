import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import useform from '../../assets/hooks/useform';
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';
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
        <div className='content dark:border-slate-300/10'>
            <header>
                <div>
                    <span className='text-4xl font-bold dark:text-slate-200'>Otros pagos</span>
                </div>
            </header>

            <section>
                <form onSubmit={register}>
                    <Form.Select aria-label="Default select example" onChange={changedMethod} className="shadow-lg w-11/12 py-8 md:py-3 px-6 text-2xl md:text-xl font-semibold my-6 mx-3 dark:bg-slate-700 dark:border-none dark:text-slate-300">
                        <option disabled selected>Seleccione un pago</option>
                        {descrip.length > 0 && descrip.map(payment => {

                            return (

                                <option value={payment.descrip} id={payment._id}>{payment.descrip}</option>

                            )
                        })

                        }
                    </Form.Select>

                    <div className='flex flex-col my-2'>
                        <label htmlFor="amount" className='label__form dark:text-slate-300'>Monto</label>
                        <input type="text" name='amount' className='rounded py-3 px-3  dark:bg-slate-700 dark:border-none dark:text-slate-300' onChange={changed} />
                    </div>

                    <div className='flex flex-col my-2'>
                        <label htmlFor="observation" className='label__form dark:text-slate-300'>Observación</label>
                        <input type="text" name='observation' className='rounded py-3 px-3  dark:bg-slate-700 dark:border-none dark:text-slate-300' onChange={changed} />
                    </div>
                    <button type="submit" className="btn_submit solid my-8">Crear</button>
                </form>
            </section>

            <section >
                    <Table otros={otros} setOtros={setOtros}  />
            </section>
        </div>
    )
}

export default Others