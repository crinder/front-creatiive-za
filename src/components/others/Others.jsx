import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import FormB from 'react-bootstrap/Form';
import * as Yup from 'yup';
import useform from '../../assets/hooks/useform';
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';
import Table from './Table';
import Message from '../utils/Message';

const Others = () => {

    const { values, changed } = useform();
    const { token, isLoanding } = useAuth();
    const [descrip, setDescrip] = useState('');
    const [method, setMethod] = useState('');
    const [resultado, setResultado] = useState('');
    const [otros, setOtros] = useState([]);
    const [variant, setVariant] = useState();
    const [message, setMessage] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [indicador, setIndicador] = useState(false);

    useEffect(() => {
        getDescripcion();
    }, []);

    const handleAlert = () => {
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 5000)
    }

    useEffect(() => {
        buscarPendientes();
    }, [indicador]); 

    const validationSchema = Yup.object({
        amount: Yup.number().required('Ingrese un monto').min(1, 'El monto deber ser minimo de 1'),
        observation: Yup.string().required('ingrese una observación').min(3, 'La observación debe tener minimo 3 caracteres'),
    });

    const CustomErrorMessage = ({ children }) => (
        <div className="color__error">
            {children}
        </div>
    );

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
            buscarPendientes();
        }
    }

    const buscarPendientes = async() => {

        let body= {status: 'ACT'};

        const request = await fetch(Global.url + 'others/get', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                "authorization": token
            }
        });

        const data = await request.json();

        if (data.status == 'success') {
            setOtros(data.others);
        } else {
            setVariant('Error');
            setMessage(data.message);
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


    const register = async (values) => {

        let body = values;
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
            setResultado(data.others);
            setVariant('Correcto');
            setMessage('Pago creado');
        } else {
            setVariant('Error');
            setMessage(data.message);
        }

        handleAlert();
    }

    return (

        <Formik
            initialValues={{ amount: '', observation: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                register(values);
            }}
        >

            {({ handleChange }) => (
                <div className='content dark:border-slate-300/10'>
                    <Message showAlert={showAlert} tipo={variant} message={message} />

                    <header>
                        <div>
                            <span className='text-4xl font-bold dark:text-slate-200'>Otros pagos</span>
                        </div>
                    </header>

                    <section>

                        <Form>
                            <FormB.Select aria-label="Default select example" onChange={changedMethod} className="shadow-lg w-11/12 py-6 md:py-3 px-6 text-2xl md:text-xl font-semibold my-6 mx-3 dark:bg-slate-700 dark:border-none dark:text-slate-300">
                                <option disabled selected>Seleccione un pago</option>
                                {descrip.length > 0 && descrip.map(payment => {

                                    return (
                                        <option value={payment.descrip} id={payment._id}>{payment.descrip}</option>
                                    )
                                })

                                }
                            </FormB.Select>

                            <div className='flex flex-col my-2'>
                                <label htmlFor="amount" className='label__form dark:text-slate-300'>Monto</label>
                                <Field type="text" name='amount' className='rounded py-3 px-3  dark:bg-slate-700 dark:border-none dark:text-slate-300' onChange={(e) => { handleChange(e); changed(e); }} />
                                <ErrorMessage name="amount" component={CustomErrorMessage} />
                            </div>

                            <div className='flex flex-col my-2'>
                                <label htmlFor="observation" className='label__form dark:text-slate-300'>Observación</label>
                                <Field type="text" name='observation' className='rounded py-3 px-3  dark:bg-slate-700 dark:border-none dark:text-slate-300' onChange={(e) => { handleChange(e); changed(e); }} />
                                <ErrorMessage name="observation" component={CustomErrorMessage} />
                            </div>
                            <button type="submit" className="button solid my-8">Crear</button>
                        </Form>
                    </section>

                    <section >
                        <Table otros={otros} setOtros={setOtros} setVariant={setVariant} setMessage={setMessage} handleAlert={handleAlert} setIndicador={setIndicador} />
                    </section>
                </div>
            )}

        </Formik>

    )
}

export default Others