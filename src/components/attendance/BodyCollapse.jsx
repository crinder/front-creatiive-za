import React from 'react'

const BodyCollapse = ({ clientInvoice, clientId }) => {

  console.log(clientInvoice);
  console.log(clientId);
  let attendances = [];
  let invoices = [];


  if(clientInvoice.attendanceStored){
     attendances =  clientInvoice.attendanceStored.filter(attendances => attendances.id_client == clientId);
     invoices =    clientInvoice.invoiceStored.filter(invoices => invoices.id_client == clientId);
  }
  

  console.log(attendances);


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
            </tr>
          </thead>
          <tbody id="team-member-rows">

            {attendances.length > 0 && attendances.map(attendance => {

              return (
                <tr>
                  <td className="team-member-profile">
                    <span className="profile-info">

                      <span className="profile-info__name">
                        {attendance.created_at}
                      </span>
                    </span>
                  </td>
                  <td>
                    <span className="status status--${teamMember.status}">
                      {attendance.amount}
                    </span>
                  </td>
                  <td>{attendance.status}</td>
                </tr>

              )
            })

            }

          </tbody>
          <tfoot>


            {invoices.length > 0 && invoices.map(invoice => {

              return(
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