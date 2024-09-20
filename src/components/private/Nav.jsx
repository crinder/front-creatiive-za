import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faUsers, faHouse, faReceipt, faClipboardUser } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/img/storeify.png';
import { NavLink } from 'react-router-dom';

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

        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>

            <nav className='sidebar__container'>

                <div className="sidebar-top-wrapper">
                    <div className="sidebar-top">
                        <a href="#" className="logo__wrapper">
                            <img src={logo} alt="Logo" className="logo-small" />

                        </a>
                    </div>
                    <div className="expand-btn" onClick={handlecollpased}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                </div>


                <div className="sidebar-links">
                    <ul className='navigation'>
                        <li>
                            <NavLink to='/creative-za/home' title="Home" className="nav__link">
                                <FontAwesomeIcon icon={faHouse} />
                                <span className="link hide">Home</span>
                                <span className="tooltip__content">Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/creative-za/invoice" title="invoice" className="nav__link" disabled>
                                <FontAwesomeIcon icon={faReceipt} />
                                <span className="link hide">Crear facturas</span>
                                <span className="tooltip__content">Crear facturas</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/creative-za/clients" title="clients" className="nav__link" disabled>
                                <FontAwesomeIcon icon={faUsers} />
                                <span className="link hide">Clientes</span>
                                <span className="tooltip__content">Clientes</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/creative-za/asistencias" title="asistencias" className="nav__link" disabled>
                                <FontAwesomeIcon icon={faClipboardUser} />
                                <span className="link hide">Asistencias</span>
                                <span className="tooltip__content">Asistencias</span>
                            </NavLink>
                        </li>

                        <li>
                            <div onClick={handleDropdownToggle}>
                                <NavLink to="#" title="asistencias" className="nav__link" disabled>
                                    <FontAwesomeIcon icon={faClipboardUser} />
                                    <span className="link hide">Consultas</span>
                                </NavLink>
                            </div>
                                <div className={` ${isDropdownOpen ? 'dropdown__menu' : 'dropdown__hide'}`}>
                                    <ul>
                                        <li>
                                            <NavLink to="/creative-za/consultar-asistencias" title="consultar-asistencias" className="nav__link" disabled>
                                                <FontAwesomeIcon icon={faClipboardUser} />
                                                <span className="link hide">Asistencias</span>
                                                <span className="tooltip__content">Asistencias</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/creative-za/consultar-facturas" title="consultar-facturas" className="nav__link" disabled>
                                            <FontAwesomeIcon icon={faClipboardUser} />
                                            <span className="link hide">Facturas</span>
                                            <span className="tooltip__content">Facturas</span>
                                            </NavLink>
                                        </li>

                                    </ul>
                                </div>
                        </li>

                        <li>
                            <NavLink to="/creative-za/asistencias" title="asistencias" className="nav__link" disabled>
                                <FontAwesomeIcon icon={faClipboardUser} />
                                <span className="link hide">Asistencias</span>
                                <span className="tooltip__content">Asistencias</span>
                            </NavLink>
                        </li>

                    </ul>
                </div>

            </nav>
        </div>
    )
}

export default Nav