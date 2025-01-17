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
    const [totalIng, setTotalIng] = useState();
    const [totalEgr, setTotalEgr] = useState();

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
                setDatos(data.egresos);
                setIngresos(data.ingresos);

                let total = 0;

                data.ingresos.map(ingreso => {
                    total += ingreso.total;
                });

                setTotalIng(total);
                total = 0;

                data.egresos.map(egreso => {
                    total += egreso.total;
                });

                setTotalEgr(total);
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
                    <Form.Select aria-label="Default select example" onChange={changeStatusInvoice} className="shadow-lg w-11/12 py-3 px-6 text-xl font-semibold my-6 mx-3 dark:bg-slate-700 dark:border-none dark:text-slate-300">
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
                <caption>
                    <h2 className="text-3xl text-center font-bold dark:text-slate-300">Balance</h2>
                    {/* <span className="table-row-count"></span>  */}
                </caption>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
                    <thead className='text-lg text-gray-800 bg-gray-50 dark:bg-slate-800 dark:text-slate-400'>
                        <tr className="text-center bg-gray-50 dark:bg-slate-800 title__thead">
                            <th className="title__thead">Tipo</th>
                            <th className="title__thead">Descripcion</th>
                            <th className="title__thead">Credito</th>
                            <th className="title__thead">Debito</th>
                            <th className="title__thead">Fecha</th>
                        </tr>
                    </thead>
                    {datos.length > 0 && datos.map(client => {

                        return (
                            <tbody id="team-member-rows">
                                {client.details.map(detail => {
                                    return (

                                        <tr key={detail._id} className="text-center dark:text-slate-300 text-xl">

                                            <td className="team-member-profile px-6 py-2">
                                                <span className="profile-info">
                                                    Egreso
                                                </span>
                                            </td>

                                            <td className="team-member-profile px-6 py-2">
                                                <span className="profile-info">
                                                    {detail.method}
                                                </span>
                                            </td>

                                            <td className="team-member-profile px-6 py-2">
                                                <span className="profile-info">
                                                    -
                                                </span>
                                            </td>

                                            <td className="team-member-profile px-6 py-2">
                                                <span className="profile-info">
                                                    {detail.amount}
                                                </span>
                                            </td>

                                            <td className="team-member-profile px-6 py-2">
                                                <span className="profile-info">
                                                    {moment(detail.created_at).format('DD-MM-YYYY HH:mm:ss')}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })

                                }
                            </tbody>
                        )
                    })

                    }

                    {ingresos.length > 0 && ingresos.map(client => {

                        return (
                            <tbody id="team-member-rows">
                                {client.details.map(detail => {
                                    return (

                                        <tr key={detail._id} className="text-center dark:text-slate-300 text-xl">

                                            <td className="team-member-profile px-6 py-2">
                                                <span className="profile-info">
                                                    Ingreso
                                                </span>
                                            </td>

                                            <td className="team-member-profile px-6 py-2">

                                                {detail.cliente.length > 0 && detail.cliente.map(clien => {
                                                    return (
                                                        <span className="profile-info">Factura: {clien.name + ' '+ clien.surname}</span>
                                                    )
                                                })}

                                            </td>

                                            <td className="team-member-profile px-6 py-2">
                                                <span className="profile-info">
                                                    {detail.amount}
                                                </span>
                                            </td>

                                            <td className="team-member-profile px-6 py-2">
                                                <span className="profile-info">
                                                    -
                                                </span>
                                            </td>

                                            <td className="team-member-profile px-6 py-2">
                                                <span className="profile-info">
                                                    {moment(detail.created_at).format('DD-MM-YYYY HH:mm:ss')}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })

                                }
                            </tbody>
                        )
                    })

                    }
                    <tfoot className="border-t border-gray-200 dark:border-gray-700 p-4">
                        <tr className="text-center dark:text-slate-300 text-xl">
                            <td>
                                <span className="table-row-count"></span>
                            </td>
                            <td className="tfoot__td">
                                <span>Total ingresos: {totalIng}</span>
                            </td>
                        </tr>
                        <tr className="text-center dark:text-slate-300 text-xl">
                            <td>
                                <span className="table-row-count"></span>
                            </td>
                            <td className="tfoot__td">
                                <span>Total egresos: {totalEgr}</span>
                            </td>
                        </tr>

                        <tr className="text-center dark:text-slate-300 text-xl">
                            <td>
                                <span className="table-row-count"></span>
                            </td>
                            <td className="tfoot__td">
                                <span>Saldo: {totalEgr && totalIng - totalEgr}</span>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>
    )
}

export default Balance