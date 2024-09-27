import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';
import moment from 'moment';


const Table = ({ otros, setOtros }) => {

    const { token, isLoading } = useAuth();

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
            console.log('Otros eliminados');
        }

        setOtros(otros.filter(otro => otro._id != id));

    }

    return (
        <div>
            <div className="table-widget">
                <table>
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
                                <tr>
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