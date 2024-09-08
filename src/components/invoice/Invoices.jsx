import { React, useState } from 'react'
import Find from './Find';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import InvoicesTab from './InvoicesTab';
import { useClient } from '../context/AuthClient';

const Invoices = () => {

  const [selectTab, setSelectTab] = useState('cobradas');
  const { clientesAct, setClientesAct, isFocused, setIsFocuset } = useClient();
  const title = 'Facturas';


  const handleSelect = (key) => {
    setSelectTab(key)
  };

  return (
    <div className='content__header'>
      <Find title={title} clientesAct={clientesAct} setClientesAct={setClientesAct} isFocused={isFocused} setIsFocuset={setIsFocuset} />
      <div className={`content__invoice ${isFocused ? 'opacity__element' : ''}`} >

        <section className='tab__invoice'>
          <Tabs defaultActiveKey="cobradas" id="justify-tab-example" className="mb-3" justify onSelect={(key) => handleSelect(key)}>
            <Tab eventKey="cobradas" title="Cobradas" >
              <InvoicesTab tabkey={selectTab} clients={clientesAct} />
            </Tab>
            <Tab eventKey="pendiente" title="Pendientes">
              <InvoicesTab tabkey={selectTab} clients={clientesAct} />
            </Tab>
            <Tab eventKey="canceladas" title="Canceladas">
              <InvoicesTab tabkey={selectTab} clients={clientesAct} />
            </Tab>
          </Tabs>
        </section>

      </div>
    </div>
  );
}

export default Invoices