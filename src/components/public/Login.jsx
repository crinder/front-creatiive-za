import React, { useEffect, useState } from 'react';
//import Image1 from '../../assets/img/undraw_maker_launch_re_rq81.svg'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import useForm from '../../assets/hooks/useform';
import Image1 from '../../assets/img/image-1.png';
import Image2 from '../../assets/img/image-2.png';
import Global from '../../helpers/Global';
import Alerts from '../utils/Alerts';


const login = () => {

    const { form, changed } = useForm({});
    const [saved, setSaved] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();
    

    const loginUser = async (e) => {

        e.preventDefault();

        setSaved("");
        setAlertMessage('');
        const userLoging = form;

        const request = await fetch(Global.url + 'users/login', {
            method: 'POST',
            body: JSON.stringify(userLoging),
            headers: {
                "Content-type": 'application/json'
            },
            credentials: 'include'

        });

        const data = await request.json();

        if (data.status == 'success') {
            setSaved('success');
            setAlertMessage('Login correcto');
            navigate('/creative-za/home');
            navigate(0);
        } else {
            setSaved('danger');
            setAlertMessage('Ha ocurrido un error, por favor valida el usuario y contraseña')
        }

    }

    return (

        <div className="container">
            <div className="container__form">
                <div className="signin-signup">
                    <form action="" className="form__signin" onSubmit={loginUser}>
                        <h2 className="signin__title">Bienvenido a Creative ZA</h2>
                        <div className='signin__alerta'>
                            {setSaved && <Alerts variant={saved} message={alertMessage} />}
                        </div>
                        <div className="signin__input">
                            <FontAwesomeIcon className='signin__input--icon' icon={faUser} />
                            <input className="input__control" type="text" placeholder="Username" onChange={changed} name='cod_user' />
                            <label htmlFor="Username" className="input__label" >Username </label>
                        </div>
                        <div className="signin__input">
                            <FontAwesomeIcon className='signin__input--icon' icon={faLock} />
                            <input className="input__control" type="password" placeholder="Password" name='password' onChange={changed} />
                            <label htmlFor="password" className="input__label" >Password </label>
                        </div>
                        <input type="submit" value="Login" className="btn_submit solid" />
                        <p className="signin__socialtxt">
                            Olvidaste tu contraseña?
                        </p>
                    </form>


                </div>

                <div className="container__panels">
                    <div className="panel left-panel">
                        <div className=" content--left">
                            <h3 className="panel__title">New here ?</h3>
                            <p className="panel__text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </div>
                        <div className='img__panel'>
                            <img src={Image1} className="panel__img panel__img--left" alt="left-panel-img" />
                            <img src={Image2} className="panel__img panel__img--left" alt="left-panel-img" />
                        </div>

                    </div>

                    <div className="panel right-panel">
                        <div className="content content--right">
                            <h3 className="panel__title">One of Us ?</h3>
                            <p className="panel__text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default login