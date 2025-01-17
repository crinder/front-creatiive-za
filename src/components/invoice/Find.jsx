import { faFileMedical} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useEffect, useState } from "react";
import Global from "../../helpers/Global";
import { useAuth } from "../context/AuthContext";
import Toasts from "../utils/Toasts";
import { InputSearch } from "./InputSearch";

const Find = ({title, clientesAct, setClientesAct,  isFocused,  setIsFocuset,  ind,}) => {

  const { token, isLoading } = useAuth();
  const [inputClient, setInputClient] = useState("");
  const [requestClient, setRequestClient] = useState("");
  const [clientSuccess, setClientSuccess] = useState(false);
  const [clientResponse, setClientResponse] = useState([]);

  const handleFocus = () => setIsFocuset(true);

  const handleBlur = () => {
    const time = setTimeout(() => {
      setIsFocuset(false);
    }, 300);
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      devuelveClientes();
    }, 2000);

    return () => clearTimeout(getData);
  }, [inputClient]);

  useEffect(() => {
    if (clientResponse.length > 0) {
      setClientesAct(clientResponse);
    }

    if (clientResponse.length == 0 && clientesAct.length > 0) {
      setClientResponse(clientesAct);
    }

    if (ind == "R") {
      setClientesAct({});
    }
  }, [clientResponse]);

  const changeInput = (event) => {
    setInputClient(event.target.value);
  };

  const temporalClient = (id, nombre) => {
    const clientSelected = clientResponse.some((seleted) => seleted.id == id);

    setClientResponse(
      clientSelected
        ? clientResponse.filter((selected) => selected.od !== id)
        : [...clientResponse, { id: id, nombre: nombre }]
    );
  };

  const devuelveClientes = async () => {
    if (inputClient.length > 0) {
      const request = await fetch(
        Global.url + "client/list-clients/" + inputClient,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: token,
          },
        }
      );

      const data = await request.json();

      if (data.status == "success") {
        setRequestClient(data.clientStored);
        setClientSuccess(true);
      }
    }
  };

 

  return (
    <div>
      <header className="mb-4">
        <div>
          <span className="text-4xl font-bold" >{title}</span>
        </div>
      </header>
      <section>
        <div className="search__wrapper relative">
          {/* <FontAwesomeIcon icon={faMagnifyingGlass} className='search__icon' /> */}

          <InputSearch changeInput={changeInput} handleBlur={handleBlur} handleFocus={handleFocus} />

          <div className={`navList-in block absolute z-10 max-h-80 w-2/3 pl-8 bg-slate-100 outline overflow-auto border-none cursor-pointer dark:bg-slate-800
               ${!isFocused ? 'ocultar_elemento' : ''}  `}>
            {requestClient.length > 0 &&
              requestClient.map((clientes) => (
                <div className="client__response" key={clientes._id}>
                  <FontAwesomeIcon icon={faFileMedical} id={clientes._id} className="client__medical"/>
                  <span className="response__clientes" onClick={() => 
                  {temporalClient(clientes._id, clientes.name + " " + clientes.surname);}}
                  >
                    {clientes.name + " " + clientes.surname}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </section>

      <div className={`content__invoice ${isFocused ? "opacity__element" : ""}`}>
        <section className="toast__clients">
          {clientResponse.length > 0 &&
            clientResponse.map((select) => {
              return (
                <div className="toasts__client" key={select.id}>
                  <Toasts name={select.nombre} id={select.id} clientResponse={clientResponse} setClientResponse={setClientResponse}/>
                </div>
              );
            })}
        </section>
      </div>
    </div>
  );
};

export default Find;
