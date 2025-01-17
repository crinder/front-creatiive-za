import React from 'react';
import { ThemeToggle } from '../themetoggle/ThemeToggle';
import Logo from '../../assets/img/logo_creative_za.png';
import { NavLink } from 'react-router-dom';

const Header = () => {

  return (
    <div className='border-b header__container dark:bg-slate-900 dark:border-slate-300/10'>
      <div className='container__logo'>
        <div className='header__logo'>
          <NavLink to='/creative-za/home'>
            <img alt="Logo" src={Logo} className='header__img' />
          </NavLink>
        </div>
        <ThemeToggle />
      </div>
    </div>

  )
}

export default Header