import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const BodyCollapse = ({ clientInvoice, clientId, setDeleteAtte }) => {

  let attendances = [];
  let invoices = [];


  if (clientInvoice.attendanceStored) {
    attendances = clientInvoice.attendanceStored.filter(attendances => attendances.id_client == clientId);
    invoices = clientInvoice.invoiceStored.filter(invoices => invoices.id_client == clientId);
  }

  const deleteAttendance = (id) => {

    setDeleteAtte(id);
  }

  return (
    <div>
      <div className="table-widget">
        <table>
          <caption>
            <span className="table-row-count"></span>
          </caption>
          <thead>
            <tr>
              <th>Fecha asistencia</th>
              <th>Monto</th>
              <th>Estatus</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody id="team-member-rows">

            {attendances.length > 0 && attendances.map(attendance => {

              return (
                <tr>
                  <td className="team-member-profile">
                    <span className="profile-info">

                      <span className="profile-info__name">
                        {moment(attendance.created_at).format('YYYY-MM-DD HH:mm:ss')}
                      </span>
                    </span>
                  </td>
                  <td>
                    <span className="status status--${teamMember.status}">
                      {attendance.amount}
                    </span>
                  </td>
                  <td>{attendance.status}</td>
                 {attendance.status == 'ACT' &&  <td><FontAwesomeIcon icon={faTrash} onClick={e => deleteAttendance(attendance._id)}/></td>}
                </tr>
              )
            })

            }

          </tbody>
          <tfoot>


            {invoices.length > 0 && invoices.map(invoice => {

              return (
                <tr>
                  <td colspan="4">
                    total: {invoice.amount}
                  </td>
                </tr>
              )

            })

            }

          </tfoot>
        </table>
      </div></div>
  )
}

export default BodyCollapse