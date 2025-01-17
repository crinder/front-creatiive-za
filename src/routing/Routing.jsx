import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Attendance from "../components/attendance/Attendance";
import Detail from "../components/attendance/Detail";
import Clients from "../components/clients/Clients";
import Layout from "../components/general/Layout";
import Create from "../components/invoice/Create";
import Invoices from "../components/invoice/Invoices";
import Others from "../components/others/Others";
import Home from "../components/private/Home";
import PrivateLayout from "../components/private/PrivateLayout";
import Login from "../components/public/Login";
import Asistencias from "../components/querys/Asistencias";
import Balance from "../components/querys/Balance";
import Otros from "../components/querys/Otros";
import { AnimatedRoute } from "./AnimatedRoute";
import UpdateClients from "../components/clients/UpdateClients";
import Clientes from "../components/querys/Clientes";

const Routing = () => {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/creative-za/*" element={<PrivateLayout />}>
        <Route path="home" element={<AnimatedRoute><Home /></AnimatedRoute>}/>
        <Route path="invoice" element={<AnimatedRoute><Invoices /></AnimatedRoute>}/>
        <Route path="crear-factura" element={<AnimatedRoute><Create /></AnimatedRoute>}/>
        <Route path="clients" element={<AnimatedRoute><Clients /></AnimatedRoute>}/>
        <Route path="asistencias" element={<AnimatedRoute><Attendance /></AnimatedRoute>}/>
        <Route path="consultar" element={<AnimatedRoute><Detail /></AnimatedRoute>}/>
        <Route path="consultar-asistencias" element={<AnimatedRoute><Asistencias /></AnimatedRoute>}/>
        <Route path="consultar-otros" element={<AnimatedRoute><Otros /></AnimatedRoute>}/>
        <Route path="otros-pagos" element={<AnimatedRoute><Others /></AnimatedRoute>}/>
        <Route path="consultar-balance" element={<AnimatedRoute><Balance /></AnimatedRoute>}/>
        <Route path="modificar-clientes" element={<AnimatedRoute><UpdateClients /></AnimatedRoute>}/>
        <Route path="consulta-clientes" element={<AnimatedRoute><Clientes /></AnimatedRoute>}/>
      </Route>
    </Routes>
  );
};

export default Routing;
