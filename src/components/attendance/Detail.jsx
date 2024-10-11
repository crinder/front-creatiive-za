import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Detail = () => {

    const location  = useLocation();
    const navigate = useNavigate();

    let datos = location.state.datos;
    let clientes = location.state.clientesAct;
    const ind = 'R'
    console.log(clientes);

    const regresa = () => {

        navigate('/creative-za/invoice', { state: { ind } });

    }


    return (
        <div className='bg-slate-700'>

            <ul>

                {datos.length > 0 && datos.map(attendance => {

                    return (
                        < li key={attendance._id} >
                            {attendance._id}
                        </li>)

                })}

            </ul>

            <div className='div__espacio'>
                <span class="button__span" onClick={regresa}>
                    Regresar
                </span>
            </div>

        </div >
    )
}

export default Detail