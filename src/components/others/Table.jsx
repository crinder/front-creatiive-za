import { faTrash,faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';


const Table = ({ otros, setOtros, setVariant, setMessage,handleAlert,setIndicador }) => {

    const { token, isLoading } = useAuth();

    const cobrar = async (id) => {

        let body ={status: 'PAG'};

        const request = await fetch(Global.url + 'others/update/'+id, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-type": 'application/json',
                "authorization": token
            }

        });

        const data = await request.json();

        if(data.status == 'success'){
            handleAlert(true);
            setVariant('Correcto');
            setMessage('Marcado como pagado');
            setIndicador(true);
        }else{

            handleAlert(false);
            setVariant('Error');
            setMessage(data.message);

        }

    }

    const deleteOthers = async (id) => {
      
        const request = await fetch(Global.url + 'others/delete/' + id, {
            method: 'DELETE',
            headers: {
                "Content-type": 'application/json',
                "authorization": token
            }
        });
        
        const data = await request.json();

        if (data.status == 'success') {
            handleAlert(true);
            setVariant('Correcto');
            setMessage('Pago eliminado');
        }else{
            handleAlert(true);
            setVariant('Error');
            setMessage(data.message);
        }

        setOtros(otros.filter(otro => otro._id != id));

    }

    return (
        <div>
            <div className="table-widget dark:bg-slate-700 dark:border-none dark:text-slate-300'">
                <table className='dark:bg-slate-700 dark:border-none dark:text-slate-300 w-full'>
                    <caption>
                        <span className="table-row-count"></span>
                    </caption>
                    <thead>
                        <tr>
                            <th>Fecha otros pagos</th>
                            <th>Descripcion</th>
                            <th>Monto</th>
                            <th>Estatus</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="team-member-rows">
                        {otros.length > 0 && otros.map(otro => {

                            return (
                                <tr key={otro._id}>
                                    <td className="team-member-profile">
                                        <span className="profile-info">

                                            <span className="profile-info__name">
                                                {moment(otro.created_at).format('DD-MM-YYYY HH:mm:ss')}
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        <span className="status status--${teamMember.status}">
                                            {otro.description}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="status status--${teamMember.status}">
                                            {otro.amount}
                                        </span>
                                    </td>
                                    <td>{otro.status}</td>
                                    {otro.status == 'ACT' && <td><FontAwesomeIcon icon={faTrash} onClick={e => deleteOthers(otro._id)} /></td>}
                                    {otro.status == 'ACT' && <td><FontAwesomeIcon icon={faHandHoldingDollar} onClick={e => cobrar(otro._id)} /></td>}
                                </tr>
                            )
                        })

                        }

                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Table