import React from 'react'

const date = new Date().getFullYear();

const Footer = () => {
  return (
    <div className='text-center footer__container dark:bg-slate-900 dark:border-slate-300/10'>
      <span>Todos los derechos reservados &copy; {date}
      </span>
    </div>
  )
}

export default Footer