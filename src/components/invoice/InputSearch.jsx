import React from "react";

export const InputSearch = ({changeInput, handleBlur, handleFocus}) => {
  return (
    <>
      <input
        type="input"
        className="input shadow-lg  px-6 py-8 md:py-3 rounded-xl w-56 transition-all outline-none dark:bg-transparent dark:text-slate-400 dark:placeholder:text-slate-500"
        placeholder="Ingresa un Cliente..."
        onChange={changeInput}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <svg
        className="size-11 md:size-6 absolute top-6 md:top-3 right-16 md:right-12 text-gray-500 dark:text-slate-50 font-bold"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
    </>
  );
};
