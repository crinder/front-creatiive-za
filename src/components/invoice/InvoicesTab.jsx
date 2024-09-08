import React, { useEffect, useState } from 'react'
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDollar, faXmark } from "@fortawesome/free-solid-svg-icons";
import Modals from './Modal';

const InvoicesTab = ({ tabkey, clients }) => {

  const [invoicesGet, setInvoiceGet] = useState({});
  const { token, isLoading } = useAuth();

  const [aceptar, setAceptar] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [params, setParams] = useState({});

  const getInvoices = async () => {

    let status;

    if (tabkey == 'cobradas') {
      status = 'COB';
    } else if (tabkey == 'pendiente') {
      status = 'PEN';
    }else if(tabkey == 'canceladas'){
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

  useEffect(() => {
    if(clients.length > 0){
      getInvoices();
    }
    
  }, [tabkey, clients]);

  useEffect(()=>{
    if(aceptar){
        getInvoices();
        setAceptar(false);
        handleClose();
    }
   
},[aceptar]);

  const cobrar = (idfact) => {
    let params = {
      header: 'Cobrar factura',
      body: 'Esta seguro de cobrar la factura',
      idfact: idfact,
      action: 'COBRAR'
    }

    setParams(params);

    handleShow();

  }

  const cancelar = (idfact) => {

    let params = {
      header: 'Cancelar factura',
      body: 'Esta seguro de cancelar la factura',
      idfact: idfact,
      action: 'CANCELAR'
    }

    setParams(params);
    handleShow();

  }


  return (
    <div>
      <Modals show={show} handleClose={handleClose} setAceptar={setAceptar} params={params} />
      <div className="table-widget">
        <table>
          <caption>
            <span className="table-row-count"></span>
          </caption>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Monto</th>
              <th>Fecha</th>
              {tabkey != 'canceladas' && <th>Metodo de pago</th>}
              {tabkey == 'pendiente' && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody id="team-member-rows">
            {invoicesGet.length > 0 && invoicesGet.map(invoice => {
              return (
                <tr key={invoice._id}>
                  <td className="team-member-profile">
                    {/*<img src="${teamMember.src}" alt="${teamMember.name}"/>*/}
                    <span className="profile-info">

                      <span className="profile-info__name">
                        {invoice.id_client.name}
                      </span>

                      {/*<span className='profile-info__alias'>
                          
                        </span> */}
                    </span>
                  </td>
                  <td>
                    <span className="status status--${teamMember.status}">
                      {invoice.amount}
                    </span>
                  </td>
                  <td>{invoice.created_at}</td>
                      {tabkey != 'canceladas'&&  <td>{invoice.payment_method}</td>}
                      {tabkey == 'pendiente' &&  <td><FontAwesomeIcon icon={faHandHoldingDollar} onClick={e => cobrar(invoice._id)} /></td>}
                      {tabkey == 'pendiente' &&  <td><FontAwesomeIcon icon={faXmark} onClick={e => cancelar(invoice._id)} /></td>}
                  
                 
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