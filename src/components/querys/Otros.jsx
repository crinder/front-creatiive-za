import moment from "moment";
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';

const Otros = () => {

    const { token, isLoading } = useAuth();
    const [statusDes, setStatusDes] = useState('');
    const [statusInvoice, setStatusInvoice] = useState('');
    const [otroPagos, setOtrosPagos] = useState([]);

    useEffect(() => {

        getMethod('other_payment');

    }, []);

    const changeStatusInvoice = (evento) => {
        setStatusInvoice(evento.target.value);
    }


    const getMethod = async (grupo) => {

        let body = {
            group: grupo,
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

            setStatusDes(data.findStored);
            setStatusInvoice(data.findStored[0]?.code);

        }

    }


    const getData = async (e) => {
        e.preventDefault();

        let body;

        let fecInicio = moment(startDate);
        fecInicio = fecInicio.format('DD/MM/YYYY');

        let fecFin = moment(endDate);
        fecFin = fecFin.format('DD/MM/YYYY');

        if (fecFin && fecInicio) {

            body = {
                inicio: fecInicio,
                fin: fecFin,
                ind: 'S',
                statusFac: statusInvoice
            }


            const request = await fetch(Global.url + 'others/get', {

                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    "Content-type": 'application/json',
                    "authorization": token
                }

            });

            const data = await request.json();

            if (data.status == 'success') {
                console.log(data.others);
                setOtrosPagos(data.others);
            }

        }

    }

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    return (
        <div className='content dark:border-slate-300/10'>
            <h2 className='text-4xl font-bold mb-4 dark:text-slate-200'>Consultar pagos</h2>

            <div>
                <form onSubmit={getData}>
                    <label htmlFor="fecinic" className="font-bold dark:text-slate-200">Filtrar</label>
                    <Form.Select aria-label="Default select example" onChange={changeStatusInvoice} className="shadow-lg w-11/12 py-3  px-6 text-xl font-semibold my-6 mx-3 dark:bg-slate-700 dark:border-none dark:text-slate-300">
                        {statusDes.length > 0 && statusDes.map(payment => {

                            return (
                                <option value={payment.code} id={payment._id}>{payment.descrip}</option>
                            )
                        })

                        }
                    </Form.Select>

                    <label htmlFor="fecinic" className="font-bold mt-3 dark:text-slate-300">Fecha desde</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        //maxDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        className="m-2 rounded py-2 px-3 shadow-sm dark:bg-slate-700 dark:border-none dark:text-slate-300"
                    />

                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        //maxDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        className="m-2 rounded py-2 px-3 shadow-sm dark:bg-slate-700 dark:border-none dark:text-slate-300"
                    />
                    <button type="submit" className="button solid mb-5">Buscar</button>
                </form>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
                    <thead className='text-lg text-gray-800 bg-gray-50 dark:bg-slate-800 dark:text-slate-400'>
                        <tr className="text-center bg-gray-50 dark:bg-slate-800 title__thead">
                            <th className="title__thead">Descripcion</th>
                            <th className="title__thead">Estado</th>
                            <th className="title__thead">Monto</th>
                            <th className="title__thead">Fecha</th>
                        </tr>
                    </thead>

                    <tbody id="team-member-rows">

                        {otroPagos.length > 0 && otroPagos.map(client => {

                            return (

                                <tr key={client._id} className="text-center dark:text-slate-300 text-xl">
                                    <td className='team-member-profile px-6 py-2'>
                                        <span className="profile-info">{client.method}</span>

                                    </td>

                                    <td className='team-member-profile px-6 py-2'>
                                        <span className="profile-info">{client.status}</span>
                                    </td>

                                    <td className='team-member-profile px-6 py-2'>
                                        <span className="profile-info">{client.amount}</span>
                                    </td>

                                    <td className='team-member-profile px-6 py-2'>
                                        <span className="profile-info">{moment(client.created_at).format('DD-MM-YYYY HH:mm:ss')}</span>
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

export default Otros