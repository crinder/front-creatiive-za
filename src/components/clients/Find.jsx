import { faFileMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useEffect, useState } from "react";
import { useClient } from '../context/AuthClient';
import Global from "../../helpers/Global";
import { useAuth } from "../context/AuthContext";
import Toasts from "../utils/Toasts";
import { InputSearch } from "../invoice/InputSearch";

const Find = ({clientResponse,setClientResponse}) => {

    const [inputClient, setInputClient] = useState("");
    const [requestClient, setRequestClient] = useState("");
    const { token, isLoading } = useAuth();
    const { clientesAct, setClientesAct, isFocused, setIsFocuset, limpiarClient } = useClient();


    const handleFocus = () => setIsFocuset(true);

    const changeInput = (event) => {
        setInputClient(event.target.value);
    };

    useEffect(() => {
        const getData = setTimeout(() => {
            devuelveClientes();
        }, 2000);

        return () => clearTimeout(getData);
    }, [inputClient]);


    const handleBlur = () => {
        const time = setTimeout(() => {
            setIsFocuset(false);
        }, 300);
    };

    const temporalClient = (client) => {
        
        console.log('find...',client);

        setClientResponse(client);
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
                //setClientSuccess(true);
            }
        }
    };

    return (
        <div>
            <header className="mb-4">
                <div>
                    <span className="text-4xl font-bold" >Modificar cliente</span>
                </div>
            </header>
            <section>
                <div className="search__wrapper relative">
                    <InputSearch changeInput={changeInput} handleBlur={handleBlur} handleFocus={handleFocus} />
                </div>

                <div className={`navList-in block absolute z-10 max-h-80 w-2/3 pl-8 bg-slate-100 outline overflow-auto border-none cursor-pointer dark:bg-slate-800
                               ${!isFocused ? 'ocultar_elemento' : ''}  `}>
                    {requestClient.length > 0 &&
                        requestClient.map((clientes) => (
                            <div className="client__response" key={clientes._id}>
                                <FontAwesomeIcon icon={faFileMedical} id={clientes._id} className="client__medical" />
                                <span className="response__clientes" onClick={() => { temporalClient(clientes); }}>
                                    {clientes.name + " " + clientes.surname}
                                </span>
                            </div>
                        ))}
                </div>

            </section>
        </div>
    );
};

export default Find;
