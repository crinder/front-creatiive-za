import { useMediaQuery } from '@mui/material'
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import Footer from './Footer'
import Header from './Header'
import Nav from './Nav';
import { useAuth } from '../context/AuthContext';


const PrivateLayout = () => {
    const isMobile = useMediaQuery('(max-width:768px)');

    const { token, loanding, cargando, existe } = useAuth();

    console.log('private layout...'+cargando+' token '+token+' existe '+existe);

    if(cargando){
        return <h1>cargando+ {cargando}</h1>
    }else{
        
    return (
        
        <div >
            <div className='mb-20 grid__container dark:bg-slate-900 dark:text-slate-400 md:mb-1' data-theme='dark'>
                <div className='background-lines'></div>
                
                <Header />
                {isMobile ? <BottomNav /> : <Nav />}
                <Footer />
                {!existe && !token && !cargando ? 
                    <Navigate to="/login"/>
                    :
                    <Outlet/> 
                }
            </div>
        </div>
    )

}
}

export default PrivateLayout