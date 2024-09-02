import React, { useEffect, useState } from 'react'
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';

const InvoicesTab = ({ tabkey, clients }) => {

  const [invoicesGet, setInvoiceGet] = useState({});
  const { token, isLoading } = useAuth();

  const getInvoices = async () => {

    let status;

    console.log(clients);

    if (tabkey == 'cobradas') {
      status = 'PAG';
    } else if (tabkey == 'pendiente') {
      status = 'PEN';
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
    getInvoices();
  }, [tabkey,clients]);

  return (
    <div>{tabkey}
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
              <th>Metodo de pago</th>
            </tr>
          </thead>
          <tbody id="team-member-rows">
            {invoicesGet.length > 0 && invoicesGet.map(invoice => {
              return (
                <tr>
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
                  <td>{invoice.payment_method}</td>
                </tr>
              )
            })

            }

          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">
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