import React, {createContext, useContext, useState } from 'react'

const ClientContext = createContext();

export const AuthClient = ({children}) => {

    const [clientesAct, setclientesAct] = useState({});



  return (
    <ClientContext.Provider value={{clientesAct, setclientesAct}}>
        {children}
    </ClientContext.Provider>
  )
}

export const useClient = () => useContext(ClientContext);