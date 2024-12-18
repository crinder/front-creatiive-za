import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import useform from '../../assets/hooks/useform';
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';
import Alerts from '../utils/Alerts';


const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es obligatorio').min(3,'El nombre debe tener minimo 3 letras'),
    surname: Yup.string().required('El nombre es obligatorio').min(3,'El nombre debe tener minimo 3 letras'),
    email: Yup.string().email('Email Invalido').required('El email es obligatorio'),
    fec_nac: Yup.date().required('La fecha de nacimiento es obligatoria'),
    identification: Yup.number('Solo se pueden incluir numeros'),
    represent: Yup.string('').min(3,'El nombre debe tener minimo 3 letras'),
    phone: Yup.number('Solo se pueden incluir numeros').min(7,'El número debe tener minimo 7 numeros'),
    
});


const CustomErrorMessage = ({ children }) => (
    <div className="color__error">
      {children}
    </div>
  );

const Clients = () => {

    const [showAlert, setShowAlert] = useState(false)

    const handleAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        },5000) 
    }

    const {token,isLoading} = useAuth();

    const {values,changed} = useform({});

    const createCliente = async (values)  => {
        
        const body = values;    
        console.log(body)

        const request = await fetch(Global.url+'client/register',{
            method: 'POST',
            body: JSON.stringify(body),
            headers:{
                "Content-type": 'application/json',
                "authorization": token
            }
        });

       
        const data = await request.json();

        if(data.status == 'success'){
            console.log('guardado');
            handleAlert();
        }else{
            console.log('error');
        }

    }

    const [statusDes, setStatusDes] = useState([]);

    useEffect(() => {
        if(token){
        getMethod('nationality');
        }
    }, [token]);


    const getMethod = async (grupo) => {

        let form = {
            group: grupo,
            status: 'ACT'
        }


        const request = await fetch(Global.url + 'description/filter', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                "authorization": token
            }
        });

        const data = await request.json();

        if (data.status == 'success') {

            setStatusDes(data.findStored);
            

        }}

        const message = 'Se Creó el Cliente'
    
    
    return (
        <Formik 
        initialValues={{ name: '', surname: '',fec_nac: '', email: '',identification: '',represent: '', phone: '', nationality: ''}}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            createCliente(values);
        }}
        >
        
        {({ handleChange }) => (
        <div className='content dark:border-slate-300/10'>

            <div className='client__control'>

                <Form className='form_control'>
                    <div className='w-full'>

                        <div className='form__title mb-4'>
                            <span className='text-4xl font-bold dark:text-slate-100'>Crear cliente</span>
                        </div>

                        <section className='clients__forms'>
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div className=''>
                                <label htmlFor="name" className='block mb-2 text-1xl font-medium text-gray-900 dark:text-white'>Nombre</label>
                                <Field type="text" name='name' className='bg-gray-50 border border-gray-300 text-gray-900 text-1xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:!border-none !outline-none dark:placeholder-gray-400  dark:text-white  dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => { handleChange(e); changed(e); }}/>
                                <ErrorMessage name="name" component={CustomErrorMessage} />
                            </div>
                            <div className=''>
                                <label htmlFor="surname" className='block mb-2 text-1xl font-medium text-gray-900 dark:text-white'>Apellido</label>
                                <Field type="text" name='surname' className='bg-gray-50 border border-gray-300 text-gray-900 text-1xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:!border-none !outline-none dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => { handleChange(e); changed(e); }} />
                                <ErrorMessage name="surname"component={CustomErrorMessage}/>
                            </div>

                            <div className=''>
                                <label htmlFor="fec_nac" className='block mb-2 text-1xl font-medium text-gray-900 dark:text-white'>Fecha nacimiento</label>
                                <Field type="text" name='fec_nac' className='bg-gray-50 border border-gray-300 text-gray-900 text-1xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:!border-none !outline-none dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'onChange={(e) => { handleChange(e); changed(e); }}/>
                                <ErrorMessage name="fec_nac" component={CustomErrorMessage}/>
                            </div>

                            <div className=''>
                                <label htmlFor="nationality" className='block mb-2 text-1xl font-medium text-gray-900 dark:text-white'>Nacionalidad</label>
                                <Field as='select' name='nationality' className='bg-gray-50 border border-gray-300 text-gray-900 text-1xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:!border-none !outline-none dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                                <option value='' disabled>Seleccione Su Nacionalidad</option>
                                {statusDes.map(nationality => (
                                            <option selected key={nationality._id} value={nationality.code}>{nationality.descrip}</option>
                                        
                                        ))}
                                </Field>
                            </div>

                            <div className=''>
                                <label htmlFor="identification" className='block mb-2 text-1xl font-medium text-gray-900 dark:text-white'>Cedula</label>
                                <Field type="text" name='identification' className='bg-gray-50 border border-gray-300 text-gray-900 text-1xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:!border-none !outline-none dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => { handleChange(e); changed(e);}}/>
                            </div>

                            <div className=''>
                                <label htmlFor="represent" className='block mb-2 text-1xl font-medium text-gray-900 dark:text-white'>Representante</label>
                                <Field type="text" name='represent' className='bg-gray-50 border border-gray-300 text-gray-900 text-1xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:!border-none !outline-none dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => { handleChange(e); changed(e); }} />
                                <ErrorMessage name="represent" component={CustomErrorMessage}/>
                            </div>
                            </div>
                        <div className='mb-6'>
                            <div className=''>
                                <label htmlFor="email" className='block mb-2 text-1xl font-medium text-gray-900 dark:text-white'>Email</label>
                                <Field type="text" name='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-1xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:!border-none !outline-none dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => { handleChange(e); changed(e); }}/>
                                <ErrorMessage name="email" component={CustomErrorMessage}/>
                            </div>
                        </div>
                        <div className='mb-6'>
                            <div className=''>
                                <label htmlFor="phone" className='block mb-2 text-1xl font-medium text-gray-900 dark:text-white'>Telefono</label>
                                <Field type="text" name='phone' className='bg-gray-50 border border-gray-300 text-gray-900 text-1xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:!border-none !outline-none dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => { handleChange(e); changed(e); }}/>
                                <ErrorMessage name="phone" component={CustomErrorMessage}/>
                            </div>
                        </div>
                        {showAlert === true ? <Alerts message={message} /> : null}
                        <div className='flex items-start md:items-center'>
                            <button type="submit"  className=" button">Crear</button>
                        </div>
                        </section>

                    </div>

                </Form>
            </div>
        </div>
        )}
        </Formik>
    )
}

export default Clients