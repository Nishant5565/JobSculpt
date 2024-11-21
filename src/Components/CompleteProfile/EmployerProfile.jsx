import React from 'react'
import { useState, useEffect } from 'react'
import { Box } from '@mui/system'
const EmployerProfile = ({user, setStep, theme}) => {
     const [skillsHiring, setSkillsHiring] = useState([])


     useEffect(() => {
          setSkillsHiring(user?.skillsHiring)
     }
     ,[skillsHiring])
     
  return (
     <Box className="w-full max-w-2xl mx-auto flex flex-col items-center">
          <Box className={`w-full rounded-3xl p-8 transition-all duration-300`}>
               <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold">Complete your profile</h1>
                    <p className="text-sm text-gray-500">This information will let us know more about you.</p>
               </div>

               <div className=' font-semibold'>
                    Add SKills That You Are Looking For
               </div>
          </Box>
     </Box>
  )
}

export default EmployerProfile