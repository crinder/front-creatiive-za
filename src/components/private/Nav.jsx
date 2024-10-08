import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AttendIcon } from "../../assets/icons/AttendIcon";
import { BalanceIcon } from "../../assets/icons/BalanceIcon";
import { ClientsIcon } from "../../assets/icons/ClientsIcon";
import { HomeIcon } from "../../assets/icons/HomeIcon";
import { InvIcon } from "../../assets/icons/InvIcon";
import { OthersIcon } from "../../assets/icons/OthersIcon";
import { QueryIcon } from "../../assets/icons/QueryIcon";


const Nav = () => {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const handlecollpased = () => {
        setIsCollapsed(!isCollapsed);
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

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
                            <NavLink to="/creative-za/invoice" title="invoice" className="nav__link" disabled>
                                <InvIcon />
                                <span className="link hide">Crear facturas</span>
                                <span className="tooltip__content">Crear facturas</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/creative-za/clients" title="clients" className="nav__link" disabled>
                                <ClientsIcon />
                                <span className="link hide">Clientes</span>
                                <span className="tooltip__content">Clientes</span>
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
                            <div onClick={handleDropdownToggle}>
                                <NavLink to="#" title="asistencias" className="nav__link z-20" disabled>
                                    <QueryIcon/>
                                    <span className="link hide">Consultas</span>
                                </NavLink>
                            </div>
                            <div className={` ${isDropdownOpen ? 'dropdown__menu' : 'dropdown__hide'} `}>
                                <ul className={`${isDropdownOpen ? 'dropdown__in' : 'dropdown__out'}`} >
                                    <li>
                                        <NavLink to="/creative-za/consultar-asistencias" title="consultar-asistencias" className="nav__link" disabled>
                                            <AttendIcon />
                                            <span className="link hide">Asistencias</span>
                                            <span className="tooltip__content">Asistencias</span>
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