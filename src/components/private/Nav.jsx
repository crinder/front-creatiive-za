import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AttendIcon } from "../../assets/icons/AttendIcon";
import { BalanceIcon } from "../../assets/icons/BalanceIcon";
import { ClientsIcon } from "../../assets/icons/ClientsIcon";
import { HomeIcon } from "../../assets/icons/HomeIcon";
import { InvIcon } from "../../assets/icons/InvIcon";
import { OthersIcon } from "../../assets/icons/OthersIcon";
import { QueryIcon } from "../../assets/icons/QueryIcon";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Nav = () => {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownClient, setIsDropdownClient] = useState(false);

    const handlecollpased = () => {
        setIsCollapsed(!isCollapsed);
    }



    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDropdownToggleClient = () => {
        setIsDropdownClient(!isDropdownClient);
    }

    return (

        <div className='sidebar dark:bg-slate-900 dark:border-slate-300/10'>

            <nav className='sidebar__container'>

                <div className="sidebar-top-wrapper">
                    {/* <div className="sidebar-top">
                        <a href="#" className="logo__wrapper">
                            <img src={logo} alt="Logo" className="logo-small" />

                        </a>
                    </div> */}

                </div>


                <div className="sidebar-links">
                    <ul className='navigation'>
                        <li>
                            <NavLink to='/creative-za/home' title="Home" className="nav__link ">
                                <HomeIcon />
                                <span className="link hide">Home</span>
                                <span className="tooltip__content">Home</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/creative-za/asistencias" title="asistencias" className="nav__link z-20" disabled>
                                <AttendIcon />
                                <span className="link hide">Asistencias</span>
                                <span className="tooltip__content">Asistencias</span>
                            </NavLink>
                        </li>

                        <li>
                            <div className="nav__link z-20 nav__link--dropdown" disabled onClick={handleDropdownToggleClient}>
                                <QueryIcon />
                                <span className="link hide">Cliente</span>
                                <span className="tooltip__content">Cliente</span>
                            </div>
                            <div className={`${isDropdownClient ? 'dropdown__menu-client' : 'dropdown__hide'}`}>
                                <ul className={`${isDropdownClient ? 'dropdown__in' : 'dropdown__out'}`} >
                                    <li>
                                        <NavLink to="/creative-za/clients" title="clients" className="nav__link" disabled>
                                            <ClientsIcon />
                                            <span className="link hide">Crear</span>
                                            <span className="tooltip__content">Crear</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/creative-za/modificar-clientes" title="modificar-clientes" className="nav__link" disabled>
                                            <FontAwesomeIcon icon={faPen}/>
                                            <span className="link hide">Modificar</span>
                                            <span className="tooltip__content">Modificar </span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li>
                            <NavLink to="/creative-za/invoice" title="invoice" className="nav__link" disabled>
                                <InvIcon />
                                <span className="link hide">Facturas</span>
                                <span className="tooltip__content">Facturas</span>
                            </NavLink>
                        </li>

                        <li>
                            <div className="nav__link z-20 nav__link--dropdown" disabled onClick={handleDropdownToggle}>
                                <QueryIcon />
                                <span className="link hide">Reportes</span>
                                <span className="tooltip__content">Reportes</span>
                            </div>
                            <div className={` ${isDropdownOpen ? 'dropdown__menu' : 'dropdown__hide'} `}>
                                <ul className={`${isDropdownOpen ? 'dropdown__in' : 'dropdown__out'}`} >
                                    <li>
                                        <NavLink to="/creative-za/consultar-asistencias" title="consultar-asistencias" className="nav__link" disabled>
                                            <AttendIcon />
                                            <span className="link hide">Facturas</span>
                                            <span className="tooltip__content">Facturas</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/creative-za/consultar-otros" title="consultar-otros" className="nav__link" disabled>
                                            <OthersIcon />
                                            <span className="link hide">Otros pagos</span>
                                            <span className="tooltip__content">Otros pagos</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/creative-za/consultar-balance" title="consultar-otros" className="nav__link" disabled>
                                            <BalanceIcon />
                                            <span className="link hide">Balance</span>
                                            <span className="tooltip__content">Ingresos y Egresos</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/creative-za/consulta-clientes" title="consultar-otros" className="nav__link" disabled>
                                            <BalanceIcon />
                                            <span className="link hide">Clientes</span>
                                            <span className="tooltip__content">Clientes</span>
                                        </NavLink>
                                    </li>

                                </ul>
                            </div>
                        </li>
                        <li>
                            <NavLink to='/creative-za/otros-pagos' title="Home" className="nav__link">
                                <OthersIcon />
                                <span className="link hide">Otros pagos</span>
                                <span className="tooltip__content">Otros pagos</span>
                            </NavLink>
                        </li>

                    </ul>
                </div>

            </nav>

        </div>
    )
}

export default Nav