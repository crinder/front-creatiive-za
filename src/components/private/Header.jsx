import React from 'react';
import { ThemeToggle } from '../themetoggle/ThemeToggle';

const Header = () => {
  
  return (
    <div className='header__container dark:bg-slate-900 border-b  dark:border-slate-300/10'>
      <h1 className='font-bold text-5xl text-center dark:text-slate-200'>Creative - ZA</h1>
      <ThemeToggle />
    </div>
  )
}

export default Header