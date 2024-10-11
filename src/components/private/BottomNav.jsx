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

  return (
    <>
      <NavList isDropdownOpen={isDropdownOpen}  />

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
            >
              <HomeIcon />
            </button>
          </NavLink>
          <NavLink
            to="/creative-za/invoice"
            title="invoice"
            className="flex justify-center items-center"
          >
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-slate-900 group"
            >
              <InvIcon />
            </button>
          </NavLink>

          <NavLink
            to="/creative-za/clients"
            title="clients"
            className="flex justify-center items-center"
          >
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-slate-900 group"
            >
              <ClientsIcon />
            </button>
          </NavLink>

          <NavLink
            to="/creative-za/asistencias"
            title="asistencias"
            className="flex justify-center items-center"
          >
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-slate-900 group"
            >
              <AttendIcon />
            </button>
          </NavLink>

          <NavLink
            to="#"
            onClick={handleDropdownToggle}
            title="asistencias"
            className="flex justify-center items-center"
          >
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-slate-900 group"
            >
              <QueryIcon isDropdownOpen={isDropdownOpen} />
            </button>
          </NavLink>

          <NavLink
            to="/creative-za/otros-pagos"
            title="asistencias"
            className="flex justify-center items-center"
          >
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-slate-900 group"
            >
              <OthersIcon />
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
