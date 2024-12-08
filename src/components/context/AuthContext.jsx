import React, { createContext, useContext, useEffect, useState } from 'react'
import Global from '../../helpers/Global';

const Context = createContext();

export const AuthContext = ({children}) => {

    /*const [value, setValue] = useState("Valor inicial"); esto funciona*/

    const [token, setToken] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cargando, setCargando] = useState(true);
    const [existe, setExiste] = useState(true);
    
    let headers;

    const checkAuth = async () =>{

            if(!token){
                headers = {
                    "Content-type": 'application/json'
                }
            }else{
                headers= {
                    "Content-type": 'application/json',
                    'authorization': token
                }
            }
    
            const request = await fetch(Global.url+'users/refresh',{
                method: 'GET',
                headers,
                credentials: 'include'
            });
    
            const data = await request.json();
    
            if(data.status == 'success'){
    
                setToken(data.token);
                setCargando(false);
                setExiste(true);
            }else{
                setCargando(false);
                setExiste(false);
            }
    }

    useEffect(() => {
      const interval = setInterval(() =>{
        checkAuth();
      }, 10*60*100);
        
    },[]);

    useEffect(() => {

        if(!token){
            console.log('token no existe...'+token);
            checkAuth();
        }

    },[token]);

    
    console.log(token);
    console.log(loading);
    console.log(existe);

  return (
    <Context.Provider value={{token,loading,cargando,existe}}>
        {children}
    </Context.Provider>
  )
}

export const useAuth = () => useContext(Context);