import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import moment from "moment";
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';
import Form from 'react-bootstrap/Form';

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


    const guardarDatos = async (e) => {
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


            console.log(data);

            if (data.status == 'success') {
                console.log(data.facturas);
                setClientInvoice(data.facturas);
            }

        }

    }

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    return (
        <div>Consultar asistencias

            <div>
                <form onSubmit={guardarDatos}>


                    <label htmlFor="fecinic">Estatus factura</label>
                    <Form.Select aria-label="Default select example" onChange={changeStatusInvoice}>
                        {statusDes.length > 0 && statusDes.map(payment => {

                            return (
                                <option value={payment.code} id={payment._id}>{payment.descrip}</option>
                            )
                        })

                        }
                    </Form.Select>

                    <label htmlFor="fecinic">Fecha desde</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        maxDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                    />

                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        maxDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                    />
                    <button type="submit" className="btn_submit solid">Crear</button>
                </form>
            </div>

            <div className='result__client'>
                <div className="table-widget">
                    <table>
                        <caption>
                            <span className="table-row-count"></span>
                        </caption>

                        {clientInvoice.length > 0 && clientInvoice.map(client => {

                            return (
                                <caption key={client._id}>
                                    <thead key={client._id}>
                                        {client.clients.map(clientes => {

                                            return (
                                                <tr key={clientes._id}>
                                                    <th>{clientes.name}</th>
                                                </tr>
                                            )

                                        })}
                                    </thead>

                                    <tbody id="team-member-rows">
                                        <tr>
                                            <td className='profile-info__name'>
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
                                                <tr key={asistencia._id}>
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
                                                        {asistencia.created_at}
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
        </div>
    )
}

export default Asistencias