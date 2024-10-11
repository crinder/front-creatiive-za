import React from "react";
import { NavLink } from "react-router-dom";

export const NavList = ({isDropdownOpen}) => {
  return (
    <>
    

    <div className={`${isDropdownOpen ? 'navList-in' : 'navList-out'} fixed bottom-24 right-9 z-50`}>
      <div className="w-64 text-3xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:!bg-slate-900 dark:!border-slate-300/50  dark:text-slate-400">
        <NavLink
          to="/creative-za/consultar-asistencias" title="consultar-asistencias"
          aria-current="true"
          className="block w-full px-5 py-5 border-b  cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring focus:ring-blue-700 focus:text-blue-700  dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:border-slate-300/50 dark:focus:ring-slate-200/10 dark:focus:text-slate-100"
        >
          Asistencias
        </NavLink>
        <NavLink
          to="/creative-za/consultar-otros" title="consultar-otros"
          className="block w-full px-5 py-5 border-b  cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring focus:ring-blue-700 focus:text-blue-700  dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:border-slate-300/50 dark:focus:ring-slate-200/10 dark:focus:text-slate-100"
        >
          Otros Pagos
        </NavLink>
        <NavLink
          to="/creative-za/consultar-balance" title="consultar-balance"
          className="block w-full px-5 py-5 border-b  cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring focus:ring-blue-700 focus:text-blue-700  dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:border-slate-300/50 dark:focus:ring-slate-200/10 dark:focus:text-slate-100"
        >
          Balance
        </NavLink>
        
      </div>
    </div>
    
    </>
  );
};
