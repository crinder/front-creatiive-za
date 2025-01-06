import React from 'react';
import { ThemeToggle } from '../themetoggle/ThemeToggle';

const Header = () => {
  
  return (
    <div className='border-b header__container dark:bg-slate-900 dark:border-slate-300/10'>
      <h1 className='text-5xl font-bold text-center dark:text-slate-200'>Creativa - ZA</h1>
      <ThemeToggle />
    </div>
  )
}

export default Header