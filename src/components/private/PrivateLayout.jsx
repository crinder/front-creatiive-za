import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const PrivateLayout = () => {
    return (
        <div>
            <div className='grid__container' data-theme='dark'>
                <Header />
                <Nav />
                <Footer />
                <Outlet/>
            </div>
        </div>
    )
}

export default PrivateLayout