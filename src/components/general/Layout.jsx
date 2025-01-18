import React from 'react'
import Login from '../public/Login'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Layout = () => {

    const { token, loading, cargando, existe } = useAuth();

    console.log('layout...cargrando' + cargando + token + ' ' + existe)

    return (
        <>
            {(!existe && !cargando) ?

                <Outlet /> :
                <Navigate to="/creative-za/home" />
            }

            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
            

        </>
    )
}

export default Layout