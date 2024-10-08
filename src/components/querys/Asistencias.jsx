import moment from "moment";
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';

const Asistencias = () => {

    const { token, isLoading } = useAuth();
    const [statusDes, setStatusDes] = useState('');
    const [statusInvoice, setStatusInvoice] = useState('');
    const [statusAttendance, setStatusAttendance] = useState('');
    const [clientInvoice, setClientInvoice] = useState('');

    useEffect(() => {

        getMethod('invoices_status');

    }, []);

    const changeStatusInvoice = (evento) => {
        setStatusInvoice(evento.target.value);
    }


    const changeStatusAttendance = (evento) => {
        setStatusAttendance(evento.target.value);
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
            setStatusAttendance(data.findStored[0]?.code);

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


            const request = await fetch(Global.url + 'invoice/list', {

                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    "Content-type": 'application/json',
                    "authorization": token
                }

            });

            const data = await request.json();

            if (data.status == 'success') {
                console.log(data.facturas);
                setClientInvoice(data.facturas);
            }

        }

    }

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    return (
        <div className='content dark:border-slate-300/10'>
            <h2 className="text-4xl font-bold mb-4 dark:text-slate-200">Consultar asistencias</h2>

            <div>
                <form onSubmit={getData}>


                    <label htmlFor="fecinic" className="font-bold dark:text-slate-200">Estatus factura</label>
                    <Form.Select aria-label="Default select example" onChange={changeStatusInvoice} className="shadow-lg w-11/12 py-8 md:py-3 px-6 text-xl font-semibold my-6 mx-3 dark:bg-slate-700 dark:border-none dark:text-slate-300">
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
                    
                    <button type="submit" className="btn_submit solid mb-5">Crear</button>
                </form>
            </div>

            <div className='result__client flex justify-center '>
                <div className="table-widget w-full dark:bg-slate-700 dark:border-none dark:text-slate-300">
                    <table >
                        <caption className="grid"> 
                            <h2 className="text-3xl text-center font-bold dark:text-slate-300">Asistencias</h2>
                            {/* <span className="table-row-count"></span> */}
                        </caption>

                        {clientInvoice.length > 0 && clientInvoice.map(client => {

                            return (
                                <caption key={client._id} className="grid grid-rows-2 table__body">
                                    <thead key={client._id} className="dark:bg-slate-200 " >
                                        {client.clients.map(clientes => {

                                            return (
                                                <tr key={clientes._id}>
                                                    <th className="text-xl font-bold ">{clientes.name}</th>
                                                </tr>
                                            )

                                        })}
                                    </thead>

                                    <tbody id="team-member-rows" className="">
                                        <tr className="grid grid-cols-4 " >
                                            <td className='profile-info__name '>
                                                ID asistencia
                                            </td>
                                            <td className='profile-info__name'>
                                                Estado
                                            </td>
                                            <td className='profile-info__name'>
                                                Monto
                                            </td>
                                            <td className='profile-info__name'>
                                                Fecha de asistencia
                                            </td>
                                        </tr>
                                        {client.asistencias.map(asistencia => {
                                            return (
                                                <tr key={asistencia._id} className="grid grid-cols-4 dark:bg-slate-200">
                                                    <td className='profile-info__name'>
                                                        {asistencia._id}
                                                    </td>
                                                    <td className='profile-info__name'>
                                                        {asistencia.status}
                                                    </td>
                                                    <td className='profile-info__name'>
                                                        {asistencia.amount}
                                                    </td>
                                                    <td className='profile-info__name'>
                                                        {moment(asistencia.created_at).format('DD-MM-YYYY HH:mm:ss')}
                                                    </td>
                                                </tr>
                                            )
                                        })

                                        }

                                    </tbody>
                                </caption>


                            )
                        })

                        }


                        <tbody id="team-member-rows">
                        </tbody>
                        <tfoot className="dark:bg-slate-700">
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
        </div>
    )
}

export default Asistencias