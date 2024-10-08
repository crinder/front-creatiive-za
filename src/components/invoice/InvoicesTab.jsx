import { faEye, faHandHoldingDollar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';
import Modals from './Modal';

const InvoicesTab = ({ tabkey, clients, clientesAct }) => {

  const [invoicesGet, setInvoiceGet] = useState({});
  const { token, isLoading } = useAuth();

  const [aceptar, setAceptar] = useState(false);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [params, setParams] = useState({});

  const getInvoices = async () => {

    if (clients.length > 0) {

      let status;

      if (tabkey == 'cobradas') {
        status = 'COB';
      } else if (tabkey == 'pendiente') {
        status = 'PEN';
      } else if (tabkey == 'canceladas') {
        status = 'CAN';
      }

      let body = {
        status: status,
        id_clientes: clients
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
        setInvoiceGet(data.facturas);

      }
    }
  }

  useEffect(() => {
    if (clients.length > 0) {
      getInvoices();
    }

  }, [tabkey]);

  useEffect(() => {
    if (clients.length > 0) {
      getInvoices();
    }

  }, [clients]);

  useEffect(() => {
    if (aceptar) {
      getInvoices();
      setAceptar(false);
      handleClose();
    }

  }, [aceptar]);

  const cobrar = (idfact) => {
    let params = {
      header: 'Cobrar factura',
      body: 'Esta seguro de cobrar la factura?',
      idfact: idfact,
      action: 'COBRAR'
    }

    setParams(params);

    handleShow();

  }

  const cancelar = (idfact) => {

    let params = {
      header: 'Cancelar factura',
      body: 'Esta seguro de cancelar la factura?',
      idfact: idfact,
      action: 'CANCELAR'
    }

    setParams(params);
    handleShow();

  }


  const getAttendance = async (idefact) => {

    const request = await fetch(Global.url + 'attendance/list-fac/' + idefact, {
      method: 'GET',
      headers: {
        "Content-type": 'application/json',
        "authorization": token
      }
    });


    const data = await request.json();


    if (data.status == 'success') {
      let datos = data.attendancestored;
      navigate('/creative-za/consultar', { state: { datos, clientesAct } });
    }

  }


  return (
    <div>
      <Modals show={show} handleClose={handleClose} setAceptar={setAceptar} params={params} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
          <caption>
            <span className="table-row-count"></span>
          </caption>
          <thead className='text-xs text-gray-800 uppercase bg-gray-50 dark:bg-slate-800 dark:text-slate-400 '>
            <tr className="text-center bg-gray-50 dark:bg-slate-800">
              <th scope="col" class="px-6 py-3">Nombre</th>
              <th scope="col" class="px-6 py-3">Monto</th>
              <th scope="col" class="px-6 py-3">Fecha</th>
              {tabkey == 'cobradas' && <th th scope="col" class="px-6 py-3">Metodo de pago</th>}
              <th scope="col" class="px-6 py-3">Acciones</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody id="team-member-rows">
            {invoicesGet.length > 0 && invoicesGet.map(invoice => {
              return (
                <tr key={invoice._id} 
                className="odd:bg-white dark:odd:bg-slate-900 even:bg-gray-50 dark:even:bg-slate-700  border-b  text-center dark:text-slate-300">
                  <td className="team-member-profile px-6 py-4">
                    {/*<img src="${teamMember.src}" alt="${teamMember.name}"/>*/}
                    <span className="profile-info">

                      <span className="profile-info__name">
                        {invoice.id_client.name}
                      </span>

                      {/*<span className='profile-info__alias'>
                          
                        </span> */}
                    </span>
                  </td>
                  <td className="px-6 py-4 ">
                    <span className="status status--${teamMember.status}">
                      {invoice.amount+''+invoice.payment_charge}
                    </span>
                  </td>
                  <td className="px-6 py-4">{moment(invoice.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                  {tabkey == 'cobradas' && <td>{invoice.payment_method}</td>}
                  {tabkey == 'pendiente' && <td><FontAwesomeIcon icon={faHandHoldingDollar} onClick={e => cobrar(invoice._id)} /></td>}
                  {tabkey == 'pendiente' && <td><FontAwesomeIcon icon={faXmark} onClick={e => cancelar(invoice._id)} /></td>}
                  <td className="px-6 py-4"><FontAwesomeIcon icon={faEye} onClick={e => getAttendance(invoice._id)} /></td>

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

export default InvoicesTab