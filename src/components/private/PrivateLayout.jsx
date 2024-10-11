import { useMediaQuery } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import Footer from './Footer'
import Header from './Header'
import Nav from './Nav'


const PrivateLayout = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    return (
        
        <div >
            
                
            <div className='grid__container dark:bg-slate-900 dark:text-slate-400 mb-20 md:mb-1' data-theme='dark'>
                <div className='background-lines'></div>
                
                <Header />
                {isMobile ? <BottomNav /> : <Nav />}
                <Footer />
                <Outlet/>
                
            </div>
        </div>
    )
}

export default PrivateLayout