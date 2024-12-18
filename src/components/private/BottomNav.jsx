import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AttendIcon } from "../../assets/icons/AttendIcon";
import { ClientsIcon } from "../../assets/icons/ClientsIcon";
import { HomeIcon } from "../../assets/icons/HomeIcon";
import { InvIcon } from "../../assets/icons/InvIcon";
import { OthersIcon } from "../../assets/icons/OthersIcon";
import { QueryIcon } from "../../assets/icons/QueryIcon";
import { NavList } from "./NavList";

export const BottomNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFocus = () => setIsFocuset(true);

  const handleBlur = () => {
    const time = setTimeout(() => {
      setIsFocuset(false);
    }, 100);
  };

  const [isFocused, setIsFocuset] = useState(false);

  const [isActive, setIsActive] = useState(null);

  const handleIsActive = (icon) => {
    setIsActive(icon);
  };

  return (
    <>
      <NavList
        isDropdownOpen={isDropdownOpen}
        isFocused={isFocused}
        setIsFocuset={setIsFocuset}
        
        handleIsActive={handleIsActive}
      />

      <div className="fixed bottom-0 left-0 z-50 w-full h-24 bg-white border-t border-gray-200 dark:!bg-slate-900 dark:!border-slate-300/10">
        <div className="grid h-full w-full  grid-cols-6  font-medium">
          <NavLink
            to="/creative-za/home"
            title="Home"
            className="flex justify-center items-center"
          >
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-slate-900 group"
              onClick={() => handleIsActive('icon1')}
            >
              {isActive === 'icon1' ? <span className="dark:text-slate-300 navList-in">Home</span> : <HomeIcon />}
            </button>
          </NavLink>
          <NavLink
            to="/creative-za/invoice"
            title="invoice"
            className="flex justify-center items-center"
          >
            <button
              type="button"
              onClick={() => handleIsActive('icon2')}
              className="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-slate-900 group"
            >
              {isActive === 'icon2' ? <span className="dark:text-slate-300 navList-in">Facturas</span> : <InvIcon />}
            </button>
          </NavLink>

          <NavLink
            to="/creative-za/clients"
            title="clients"
            className="flex justify-center items-center"
          >
            <button
              type="button"
              onClick={() => handleIsActive('icon3')}
              className="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-slate-900 group"
            >
              {isActive === 'icon3' ? <span className="dark:text-slate-300 navList-in">Clientes</span> : <ClientsIcon />}
            </button>
          </NavLink>

          <NavLink
            to="/creative-za/asistencias"
            title="asistencias"
            className="flex justify-center items-center"
          >
            <button
              type="button"
              onClick={() => handleIsActive('icon4')}
              className="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-slate-900 group"
            >
              {isActive === 'icon4' ? <span className="dark:text-slate-300 navList-in">Asistencias</span> : <AttendIcon />}
            </button>
          </NavLink>

          <NavLink
            to="#"
            onClick={handleFocus}
            title="asistencias"
            onBlur={handleBlur}
            onFocus={handleFocus}
            className="flex justify-center items-center"
          >
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-slate-900 group"
            >
              {isActive === 'icona' ? <span className="dark:text-slate-300 navList-in">Asistencias</span> : isActive === 'iconb' ? <span className="dark:text-slate-300 navList-in">Otros Pagos</span> : isActive === 'iconc' ? <span className="dark:text-slate-300 navList-in">Balance</span> : <QueryIcon/>} 
              
            </button>
          </NavLink>

          <NavLink
            to="/creative-za/otros-pagos"
            title="asistencias"
            className="flex justify-center items-center"
          >
            <button
              type="button"
              onClick={() => handleIsActive('icon5')}
              className="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-slate-900 group "
            >
              {isActive === 'icon5' ? <span className='dark:text-slate-300 navList-in'  >Otros Pagos</span> : <OthersIcon className='navList-in'/>}
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
