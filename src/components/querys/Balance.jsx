import moment from "moment";
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';

const Balance = () => {

    const { token, isLoading } = useAuth();
    const [statusDes, setStatusDes] = useState('');
    const [statusInvoice, setStatusInvoice] = useState('');
    const [datos, setDatos] = useState([]);
    const [ingresos, setIngresos] = useState([]);

    useEffect(() => {

        getMethod('balance');

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
                statusFac: statusInvoice
            }


            const request = await fetch(Global.url + 'others/balance', {

                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    "Content-type": 'application/json',
                    "authorization": token
                }

            });

            const data = await request.json();

            if (data.status == 'success') {
                console.log(data.egresos);
                setDatos(data.egresos);
                setIngresos(data.ingresos);
            }

        }

    }

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div className="content dark:border-slate-300/10">
            <h2 className="text-4xl font-bold mb-4 dark:text-slate-200">Ingresos y Egresos</h2>
            <div>
                <form onSubmit={getData}>

                    <label htmlFor="fecinic" className="font-bold dark:text-slate-200">Filtrar</label>
                    <Form.Select  aria-label="Default select example" onChange={changeStatusInvoice} className="shadow-lg w-11/12 py-8 md:py-3 px-6 text-xl font-semibold my-6 mx-3 dark:bg-slate-700 dark:border-none dark:text-slate-300">
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
                    <button type="submit" className="btn_submit solid mb-5">Buscar</button>
                </form>
            </div>

            <div className='result__client mx-auto md:flex md:justify-center'>
                <div className="table-widget mx-auto md:w-full dark:bg-slate-700 dark:border-none dark:text-slate-300">
                    <table>
                        <caption>
                        <h2 className="text-3xl text-center font-bold dark:text-slate-300">Balance</h2>
                        {/* <span className="table-row-count"></span>  */}
                        </caption>

                        <caption>
                            <thead className="md:flex md:justify-around md:items-center dark:text-slate-400">
                                <th>Egreso</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                            </thead>

                            <tbody id="team-member-rows">

                                {datos.length > 0 && datos.map(client => {

                                    return (

                                        <caption key={client._id}>
                                            <tbody >
                                                {client.details.map(detail => {
                                                    return (
                                                        <tr key={detail._id} >
                                                            <td className='profile-info__name'>
                                                                {detail._id}
                                                            </td>
                                                            <td className='profile-info__name'>
                                                                {detail.amount}
                                                            </td>
                                                            <td className='profile-info__name'>
                                                                {moment(detail.created_at).format('DD-MM-YYYY HH:mm:ss')}
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
                                                           total: {client.total}
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tfoot>

                                        </caption>

                                    )
                                })

                                }

                            </tbody>
                        </caption>

                        <caption>
                            <span className="table-row-count"></span>
                        </caption>

                        <caption>
                            <thead className="flex justify-around dark:text-slate-400">
                                <th>Factura</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                            </thead>

                            <tbody id="team-member-rows">

                                {ingresos.length > 0 && ingresos.map(client => {

                                    return (

                                        <caption key={client._id}>
                                            <tbody>
                                                {client.details.map(detail => {
                                                    return (
                                                        <tr key={detail._id} className="md:flex ">
                                                            <td className='profile-info__name md:flex md:min-w-96 md:justify-center'>
                                                                {detail._id}
                                                            </td>
                                                            <td className='profile-info__name md:flex md:min-w-96 md:justify-center'>
                                                                {detail.amount}
                                                            </td>
                                                            <td className='profile-info__name md:flex md:min-w-96 md:justify-center'>
                                                                {moment(detail.created_at).format('DD-MM-YYYY HH:mm:ss')}
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
                                                           total: {client.total}
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tfoot>

                                        </caption>

                                    )
                                })

                                }

                            </tbody>
                        </caption>



                    </table>
                </div>
            </div>
        </div>
    )
}

export default Balance