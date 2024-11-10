import React, { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return 'dark';
    }
    return 'light';
  });

  const handleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme === 'light') {
      document.querySelector('html').classList.remove('dark');
      document.querySelector('html').classList.add('light');
    } else {
      document.querySelector('html').classList.remove('light');
      document.querySelector('html').classList.add('dark');
    }
  }, [theme]);

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    setTheme(currentTheme);
  }, []); // Solo se ejecuta una vez al montar el componente

  console.log(theme);
  return (
    <>
      <button
        className='absolute top-2 right-2 border rounded-3xl p-3 text-xl font-semibold border-gray-300 dark:!border-slate-300/10 text-gray-800 dark:text-slate-400'
        onClick={handleTheme}>
        Light/Dark
      </button>
    </>
  );
};
