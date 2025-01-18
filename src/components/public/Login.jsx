import React, { useEffect, useState } from 'react';
//import Image1 from '../../assets/img/undraw_maker_launch_re_rq81.svg'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import useForm from '../../assets/hooks/useform';
import Image1 from '../../assets/img/logo_creative_za.png';
import Image2 from '../../assets/img/image-2.png';
import Global from '../../helpers/Global';
import Alerts from '../utils/Alerts';


const login = () => {

    const [saved, setSaved] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [pass__word, setPass__word] = useState('');
    const navigate = useNavigate();
    

    const loginUser = async (e) => {

        e.preventDefault();

        setSaved("");
        setAlertMessage('');

        const userLoging = {
            cod_user: userName,
            password: pass__word
        }
        
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
                        <h2 className="signin__title">!Bienvenido de vuelta {userName}! </h2>
                        <div className='signin__alerta'>
                            {setSaved && <Alerts variant={saved} message={alertMessage} />}
                        </div>
                        <div className="signin__input">
                            <FontAwesomeIcon className='signin__input--icon' icon={faUser} />
                            <input className="input__control" type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} name='cod_user' />
                            <label htmlFor="Username" className="input__label" >Usuario </label>
                        </div>
                        <div className="signin__input">
                            <FontAwesomeIcon className='signin__input--icon' icon={faLock} />
                            <input className="input__control" type="password" placeholder="Password" name='password' onChange={(e) => setPass__word(e.target.value)} />
                            <label htmlFor="password" className="input__label" >Contraseña</label>
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
                            <h3 className="panel__title">Ingresa tus credenciales para gestionar las citas y los registros de tus pacientes.</h3>
                            <p className="panel__text">
                            
                            </p>
                        </div>
                        <div className='img__panel'>
                            <img src={Image1} className="panel__img panel__img--left image__left" alt="left-panel-img" />
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