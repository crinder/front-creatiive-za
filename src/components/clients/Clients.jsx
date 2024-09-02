import React, { useContext } from 'react'
import useform from '../../assets/hooks/useform'
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';
import * as Yup from 'yup';
import {Formik,Form,Field,ErrorMessage} from 'formik';


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

    const {token,isLoading} = useAuth();

    const {form,changed} = useform({});

    const createCliente = async ()  => {
        
        const body = form;    
        

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
        }else{
            console.log('error');
        }

    }
    
    
    return (
        <Formik 
        initialValues={{ name: '', surname: '',fec_nac: '', email: '',identification: '',represent: '', phone: ''}}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            createCliente();
        }}
        >
        
        {({ handleChange }) => (
        <div className='content'>

            <div className='client__control'>

                <Form className='form_control'>
                    <div className='form__clients'>

                        <div className='form__title'>
                            <span className='header__tittle'>Crear cliente</span>
                        </div>

                        <section className='clients__forms'>

                            <div className='forms__input'>
                                <label htmlFor="name" className='label__form'>Nombre</label>
                                <Field type="text" name='name' className='input__form' onChange={(e) => { handleChange(e); changed(e); }}/>
                                <ErrorMessage name="name" component={CustomErrorMessage} />
                            </div>
                            <div className='forms__input'>
                                <label htmlFor="surname" className='label__form'>Apellido</label>
                                <Field type="text" name='surname' className='input__form' onChange={(e) => { handleChange(e); changed(e); }} />
                                <ErrorMessage name="surname"component={CustomErrorMessage}/>
                            </div>

                            <div className='forms__input'>
                                <label htmlFor="fec_nac" className='label__form'>Fecha nacimiento</label>
                                <Field type="text" name='fec_nac' className='input__form'onChange={(e) => { handleChange(e); changed(e); }}/>
                                <ErrorMessage name="fec_nac" component={CustomErrorMessage}/>
                            </div>

                            <div className='forms__input'>
                                <label htmlFor="nationality" className='label__form'>Nacionalidad</label>
                                <Field type="text" name='nationality' className='input__form' onChange={(e) => { handleChange(e); changed(e); }}/>
                            </div>

                            <div className='forms__input'>
                                <label htmlFor="identification" className='label__form'>Cedula</label>
                                <input type="text" name='identification' className='input__form' onChange={changed}/>
                            </div>

                            <div className='forms__input'>
                                <label htmlFor="represent" className='label__form'>Representante</label>
                                <Field type="text" name='represent' className='input__form' onChange={(e) => { handleChange(e); changed(e); }} />
                                <ErrorMessage name="represent" component={CustomErrorMessage}/>
                            </div>

                            <div className='forms__input'>
                                <label htmlFor="email" className='label__form'>Email</label>
                                <Field type="text" name='email' className='input__form' onChange={(e) => { handleChange(e); changed(e); }}/>
                                <ErrorMessage name="email" component={CustomErrorMessage}/>
                            </div>

                            <div className='forms__input'>
                                <label htmlFor="phone" className='label__form'>Telefono</label>
                                <Field type="text" name='phone' className='input__form' onChange={(e) => { handleChange(e); changed(e); }}/>
                                <ErrorMessage name="phone" component={CustomErrorMessage}/>
                            </div>

                            <button type="submit"  className="btn_submit solid">Crear</button>

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