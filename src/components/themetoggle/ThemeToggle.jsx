import React, { useEffect, useState } from 'react';

export const ThemeToggle = () => {

  const currentTheme = () => {
    
  }

  

  const [theme, setTheme] = useState(() => {
    if(window.matchMedia("(prefers-color-scheme: dark)").matches){
      return 'dark'
    }

    return 'light';
  });
  

  const handleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')

  }

  useEffect(() => {
    const prefersTheme = () =>{
      if (window.matchMedia(`(prefers-color-scheme: ${theme})`)) {
        return 'dark'
      }
    }
    if(theme === 'light'){
      document.querySelector('html').classList.remove('light')
      document.querySelector('html').classList.add('dark')
    } else {
      document.querySelector('html').classList.remove('dark')
      document.querySelector('html').classList.add('light')

    }
  
  }, [theme])
  

  console.log(theme);
  return (
    <>
    <button
    className='text-slate-100'
     onClick={handleTheme}>
    Cambiar tema
    </button>
    </>
  )
}
