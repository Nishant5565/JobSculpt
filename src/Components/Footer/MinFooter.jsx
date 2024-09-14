import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../Pages/ThemeContext';
const MinFooter = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <footer className={`py-10 text-center flex flex-col justify-between h-40 md:flex-row md:justify-center gap-2 md:items-center  text-[12px] mx-10 rounded-[20px] mb-10 text-white bg-black ${theme == 'dark' ?"border-2 border-gray-200 ":""} `}>
      
        <p>© 2023 - 2024</p>
        <p>JobSculpt® Global Inc.</p>
        <p>Privacy Policy</p>
    </footer>
  );
}

export default MinFooter;