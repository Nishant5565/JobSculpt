import React from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../Pages/ThemeContext'

const JobSculptLogo = () => {
     const {theme} = React.useContext(ThemeContext);
     return (
     <Link to={'/'} className={`text-xl font-bold JobSculpt  top-10 left-10 ${theme != 'dark'? ' text-blue-600':'text-red-600'} absolute`}>
          JobSculpt
     </Link>
     )
}

export default JobSculptLogo