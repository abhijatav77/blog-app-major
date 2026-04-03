import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import axios from 'axios'
import { BACKEND_URL } from '../../utils/utils'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ setComponent }) => {
  const { user, logout } = useAuth()
  const [show, setShow] = useState(false)

  const navigate = useNavigate()

  const handleComponents = (value) => {
    setComponent(value)
  }

    const handleLogout = async () => {
        try {
            const { data } = await axios.get(`${BACKEND_URL}/user/logout`, { withCredentials: true })
            toast.success(data.message)
            logout()
            navigate('/login')
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }

  return (
    <div className=''>
      <div onClick={() => setShow(!show)} className='absolute top-4 left-4 z-50 md:hidden'>
        {show ? (
          <IoClose size={22} />
        ) : (
          <CiMenuBurger size={22} />
        )}
      </div>
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-200 z-40 shadow-lg p-2 transform transition-transform duration-300 ${show ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className='w-full'>
          <div className='flex flex-col items-center justify-center pt-5'>
            <img
              src={user?.adminPhoto}
              alt=""
              className='w-30 h-30 rounded-full border-2 border-yellow-400'
            />
            <h1 className='font-semibold'>{user?.name}</h1>
          </div>

          <div className='flex flex-col gap-5 space-y-2 mt-6'>
            <button onClick={() => handleComponents("My Blog")} className='bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition duration-300 py-2 font-semibold'>MY BLOG</button>
            <button onClick={() => handleComponents("Create Blog")} className='bg-blue-500 w-full text-white rounded-lg hover:bg-blue-700 transition duration-300 py-2 font-semibold'>CREATE BLOG</button>
            <button onClick={() => handleComponents("My Profile")} className='bg-green-500 w-full text-white rounded-lg hover:bg-green-700 transition duration-300 py-2 font-semibold'>MY PROFILE</button>
            <button onClick={() => navigate('/')} className='bg-pink-500 w-full text-white rounded-lg hover:bg-pink-700 transition duration-300 py-2 font-semibold'>DASHBOARD</button>
            <button onClick={handleLogout} className='bg-red-600 w-full text-white rounded-lg hover:bg-red-800 transition duration-300 py-2 font-semibold'>LOGOUT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar