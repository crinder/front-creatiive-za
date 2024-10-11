import { React, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useLocation } from 'react-router-dom';
import { useClient } from '../context/AuthClient';
import Find from './Find';
import InvoicesTab from './InvoicesTab';


const Invoices = () => {

  const [selectTab, setSelectTab] = useState('cobradas');
  const [defecto,setDefecto] = useState([])
  const { clientesAct, setClientesAct, isFocused, setIsFocuset,limpiarClient } = useClient();
  const title = 'Facturas';
  const location = useLocation();

  let ind = location.state?.ind;



  const handleSelect = (key) => {
    setSelectTab(key)
  };

  return (
    <div className='content dark:text-slate-100 dark:border-slate-300/10'>
      <Find title={title} clientesAct={clientesAct} setClientesAct={setClientesAct} isFocused={isFocused} setIsFocuset={setIsFocuset} ind={ind} />
      <div className={`content__invoice ${isFocused ? 'opacity__element' : ''}`} >

        <section className='tab__invoice'>
          <Tabs defaultActiveKey="cobradas" id="justify-tab-example" className="mb-3" justify onSelect={(key) => handleSelect(key)}>
            <Tab eventKey="cobradas" title="Cobradas" >
              <InvoicesTab tabkey={selectTab} clients={clientesAct} clientesAct={clientesAct} />
            </Tab>
            <Tab eventKey="pendiente" title="Pendientes" >
              <InvoicesTab tabkey={selectTab} clients={clientesAct} clientesAct={clientesAct} />
            </Tab>
            <Tab eventKey="canceladas" title="Canceladas">
              <InvoicesTab tabkey={selectTab} clients={clientesAct} clientesAct={clientesAct} className='bg-black' />
            </Tab>
          </Tabs>
        </section>

      </div>
    </div>
  );
}

export default Invoices