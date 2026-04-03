import React from 'react'
import { useAuth } from '../context/AuthContext'
import {motion} from 'framer-motion'

const MyProfile = () => {
  const { user } = useAuth()
  console.log("Profilessssss", user)
  return (
            <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
        >
      <div className='flex items-center justify-center h-screen'>
        <div className='shadow-md rounded-md border border-gray-200 overflow-hidden'>
          <div className='relative'>
            <img
              src={user.adminPhoto}
              alt=""
              className='w-64 h-50 object-cover'
            />
            <img
              src={user.adminPhoto}
              alt=""
              className='w-24 h-24 rounded-full border-2 border-yellow-400 absolute -bottom-10 left-20'
            />
          </div>
          <div className='mt-10 text-center mb-5'>
            <h1 className='pt-2 font-semibold'>{user.name}</h1>
            <p className='text-xs'>{user.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MyProfile