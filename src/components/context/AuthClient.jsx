import React, {createContext, useContext, useState } from 'react'

const ClientContext = createContext();

export const AuthClient = ({children}) => {

    const [clientesAct, setClientesAct] = useState({});
    const [isFocused, setIsFocuset] = useState(false);



  return (
    <ClientContext.Provider value={{clientesAct, setClientesAct,isFocused,setIsFocuset}}>
        {children}
    </ClientContext.Provider>
  )
}

export const useClient = () => useContext(ClientContext);