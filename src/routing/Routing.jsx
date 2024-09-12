import React from 'react'
import { Routes, Route, BrowserRouter, Navigate, Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../components/context/AuthContext';
import { AuthClient } from '../components/context/AuthClient';
import Layout from '../components/general/Layout'
import Login from '../components/public/Login';
import PrivateLayout from '../components/private/PrivateLayout'
import Home from '../components/private/Home';
import Invoices from '../components/invoice/Invoices';
import Clients from '../components/clients/Clients';
import Create from '../components/invoice/Create';
import Attendance from '../components/attendance/Attendance';
import Detail from '../components/attendance/Detail';

const Routing = () => {
    return (
        <AuthContext>
            <AuthClient>
                <BrowserRouter>

                    <Routes>
                        <Route path='/' element={<Layout />}>
                            <Route path='login' element={<Login />}></Route>
                        </Route>
                        <Route path='/creative-za/*' element={<PrivateLayout />}>
                            <Route path='home' element={<Home />}></Route>
                            <Route path='invoice' element={<Invoices />}></Route>
                            <Route path='crear-factura' element={<Create />}></Route>
                            <Route path='clients' element={<Clients />}></Route>
                            <Route path='asistencias' element={<Attendance/>}></Route>
                            <Route path='consultar' element={<Detail/>}></Route>
                        </Route>
                    </Routes>

                </BrowserRouter>
            </AuthClient>
        </AuthContext>
    )
}

export default Routing