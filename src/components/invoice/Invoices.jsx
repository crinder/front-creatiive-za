import { React, useContext, useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import InvoicesTab from './InvoicesTab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFileMedical } from '@fortawesome/free-solid-svg-icons';
import Global from '../../helpers/Global';
import { useAuth } from '../context/AuthContext';
import Toasts from '../utils/Toasts';
import {useNavigate} from 'react-router-dom';
import { useClient } from '../context/AuthClient';


const Invoices = () => {

  const navigate = useNavigate();
  const { token, isLoading } = useAuth();
  const {clientesAct, setclientesAct} = useClient();
  const [inputClient, setInputClient] = useState('');
  const [requestClient, setRequestClient] = useState('');
  const [clientSuccess, setClientSuccess] = useState(false);
  const [clientResponse, setClientResponse] = useState([]);
  const [selectTab, setSelectTab] = useState('cobradas');


  const handleSelect = (key) => {
    console.log(key)
    setSelectTab(key)
  };

  const [isFocused, setIsfocuset] = useState(false);

  const handleFocus = () => setIsfocuset(true);
  
  const handleBlur = () => {
    const time = setTimeout(() => {
      setIsfocuset(false); 
    }, 300);
  } 

  const createInvoice = () => {
    setclientesAct(clientResponse);
    navigate('/creative-za/crear-factura');
  }
 
  useEffect(() => {
    const getData = setTimeout(() => {
      devuelveClientes();
    }, 2000);

    return () => clearTimeout(getData);

  }, [inputClient]);

  const changeInput = (event) => {

    setInputClient(event.target.value);

  }

  const temporalClient = (id, nombre) => {

    const clientSelected = clientResponse.some(seleted => seleted.id == id);

    setClientResponse(clientSelected ? clientResponse.filter(selected => selected.od !== id) :
                       [...clientResponse,{id: id, nombre: nombre}]);

  }


  const devuelveClientes = async () => {

    const request = await fetch(Global.url + 'client/list-clients/' + inputClient, {

      method: 'GET',
      headers: {
        "Content-type": 'application/json',
        "authorization": token
      }

    });

    const data = await request.json();

    if (data.status == 'success') {
      setRequestClient(data.clientStored);
      setClientSuccess(true);
    }

  }


  return (
    <div className='content__header'>


      <header>
        <div>
          <span>Facturas</span>
        </div>

        <section>
          <div className="search__wrapper">
            <FontAwesomeIcon icon={faMagnifyingGlass} className='search__icon' />

            <input type="input" className='input__search' placeholder="Ingresa nombre u apellido..." onChange={changeInput} onBlur={handleBlur} onFocus={handleFocus} />

            <span className='button__form' onClick={createInvoice}>Crear factura</span>

            <div className={`response__search ${!isFocused ? 'ocultar_elemento' : ''}`}>
              {requestClient.length > 0 && requestClient.map(clientes => (
                <div className="client__response" key={clientes._id}>
                  <FontAwesomeIcon icon={faFileMedical} id={clientes._id} className='client__medical' />
                  <span className='response__clientes' onClick={() => { temporalClient(clientes._id, clientes.name + ' ' + clientes.surname); }}>
                    {clientes.name + ' ' + clientes.surname}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </section>
      </header>


      <div className={`content__invoice ${isFocused ? 'opacity__element' : ''}`} >


        <section className='toast__clients'>

          {clientResponse.length > 0 && clientResponse.map(select => {

            return(
              <Toasts name = {select.nombre} id = {select.id}   />
            )

          })

          }
        </section>


        <section className='tab__invoice'>
          <Tabs defaultActiveKey="cobradas" id="justify-tab-example" className="mb-3" justify onSelect={(key) => handleSelect(key)}> 
            <Tab eventKey="cobradas" title="Cobradas" >
              <InvoicesTab tabkey={selectTab} clients={clientResponse}/>
            </Tab>
            <Tab eventKey="pendiente" title="Pendientes">
              <InvoicesTab tabkey={selectTab} clients={clientResponse}/>
            </Tab>
            <Tab eventKey="canceladas" title="Canceladas" disabled>
             
            </Tab>
          </Tabs>
        </section>

      </div>

    </div>
  );
}

export default Invoices