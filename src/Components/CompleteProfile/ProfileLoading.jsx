import React from 'react'

const ProfileLoading = ({theme}) => {
  return (
     <div className={`${theme === 'dark' ? 'bg-[#131313]' : 'bg-[#e7e7e7]'} rounded-[25px] p-6 mb-10 min-h-screen flex items-center justify-center `} >
     <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} container mx-auto max-w-4xl p-10 sm:p-20 rounded-3xl shadow-2xl transition-all duration-500 min-h-[500px]`}>

     </div>
   </div>
  )
}

export default ProfileLoading