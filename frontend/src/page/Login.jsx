import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../utils/utils'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState("")

  const { setUser } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${BACKEND_URL}/user/login`, { role: selectedRole, email, password }, {
        withCredentials: true
      })

      console.log(data)
      toast.success(`${data.user.role} logged in successfull`)
      setUser(data.user)

      const profileRes = await axios.get(`${BACKEND_URL}/user/my-profile`, { withCredentials: true })
      setUser(profileRes.data.userData)
      if (profileRes.data.userData.role === 'admin') {
        navigate("/dashboard")
      } else {
        navigate("/")
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.response?.data?.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
    >
      <div className='min-h-screen flex items-center justify-center'>
        <div className='shadow-md p-6 rounded-md border border-gray-200 w-90'>
          <h1 className='text-xl font-semibold text-center'>Login</h1>
          <form onSubmit={handleSubmit}>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className='mt-5 w-full px-4 py-2 border border-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 rounded-md duration-300'
            >
              <option value="">Select role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className='mt-5'>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                className='w-full px-4 py-2 border border-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 rounded-md duration-300'
              />
            </div>
            <div className='mt-5'>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                className='w-full px-4 py-2 border border-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 rounded-md duration-300'
              />
            </div>
            <button
              type='submit'
              className='bg-linear-to-r from-blue-600 to-indigo-600 text-white w-full mt-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700'>
              Login
            </button>
            <p className='text-sm text-center mt-3'>
              Already have an account? <Link to={'/signup'} className='text-blue-600 font-semibold'>Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default Login