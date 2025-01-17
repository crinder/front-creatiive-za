import moment from "moment";
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';

const Clientes = () => {

    const { token, isLoading } = useAuth();
    const [clienteStored, setClienteStored] = useState('');

    useEffect(() => {

        getData();

    }, []);


    const getData = async () => {

        const request = await fetch(Global.url + 'client/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": token
            }
        });

        const data = await request.json();

        if (data.status == 'success') {

            setClienteStored(data.clientStored);

        }

    }

    return (
        <div className='content dark:border-slate-300/10'>
            <h2 className='text-4xl font-bold mb-4 dark:text-slate-200'>Consulta clientes</h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
                    <thead className='text-lg text-gray-800 bg-gray-50 dark:bg-slate-800 dark:text-slate-400'>
                        <tr className="text-center bg-gray-50 dark:bg-slate-800 title__thead">
                            <th className="title__thead">Nombre</th>
                            <th className="title__thead">Representante</th>
                            <th className="title__thead">Telefono</th>
                            <th className="title__thead">Correo</th>
                        </tr>
                    </thead>

                    <tbody id="team-member-rows">

                        {clienteStored.length > 0 && clienteStored.map(client => {

                            return (

                                <tr key={client._id} className="text-center dark:text-slate-300 text-xl client-edit">
                                    <td className='team-member-profile px-6 py-2'>
                                        <span className="profile-info">{client.name + ' ' + client.surname}</span>
                                    </td>

                                    <td className='team-member-profile px-6 py-2'>
                                        <span className="profile-info">{client.represent}</span>
                                    </td>

                                    <td className='team-member-profile px-6 py-2'>
                                        <span className="profile-info">{client.phone}</span>
                                    </td>

                                    <td className='team-member-profile px-6 py-2'>
                                        <span className="profile-info">{client.email}</span>
                                    </td>
                                </tr>

                            )
                        })

                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <ul className="pagination">
                                </ul>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Clientes