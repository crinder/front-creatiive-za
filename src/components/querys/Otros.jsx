import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import moment from "moment";
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';
import Form from 'react-bootstrap/Form';

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
        <div>Consultar pagos

            <div>
                <form onSubmit={getData}>


                    <label htmlFor="fecinic">Filtrar</label>
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
                        //maxDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                    />

                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        //maxDate={new Date()}
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

                        <caption>
                            <thead>
                                <th>ID pago</th>
                                <th>Estado</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                            </thead>

                            <tbody id="team-member-rows">

                                {otroPagos.length > 0 && otroPagos.map(client => {

                                    return (

                                        <tr key={client._id}>
                                            <td className='profile-info__name'>
                                                {client._id}
                                            </td>
                                            <td className='profile-info__name'>
                                                {client.status}
                                            </td>
                                            <td className='profile-info__name'>
                                                {client.amount}
                                            </td>
                                            <td className='profile-info__name'>
                                                {moment(client.created_at).format('DD-MM-YYYY HH:mm:ss')}
                                            </td>
                                        </tr>



                                    )
                                })

                                }

                            </tbody>
                        </caption>


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

export default Otros