import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../utils/utils'
import toast from 'react-hot-toast'
import {motion} from 'framer-motion'

const Register = () => {
    const [role, setRole] = useState()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [adminPhoto, setAdminPhoto] = useState(null)

    const navigate = useNavigate()

    const handleRoleChanger = (e) => {
        const selectRole = e.target.value
        setRole(selectRole);

        if(selectRole !== 'admin'){
            setAdminPhoto(null)
        }
    }

    const handleAdmin = (e) => {
        const file = e.target.files[0]
        setAdminPhoto(file)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('role', role)
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        if(role === 'admin'){
            formData.append('adminPhoto', adminPhoto)
        }
         try {
            const {data} = await axios.post(`${BACKEND_URL}/user/signup`,formData,{
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            console.log(data)
            toast.success(`${role} registered successfull`)
            navigate('/login')
            setName("")
            setEmail("")
            setRole("")
            setPassword("")
            setAdminPhoto(null)
        } catch (error) {
            console.log(error.message)
            toast.error(error.response?.data?.message)
        }
    }


    return (
            <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
    >
            <div className='min-h-screen flex items-center justify-center'>
                <div className='shadow-md p-6 rounded-md border border-gray-200 w-90'>
                    <h1 className='text-xl font-semibold text-center'>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <select
                            value={role}
                            onChange={handleRoleChanger}
                            className='mt-5 w-full px-4 py-2 border border-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 rounded-md duration-300'
                        >
                            <option value="">Select role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <div className='mt-5'>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Name'
                                className='w-full px-4 py-2 border border-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 rounded-md duration-300'
                            />
                        </div>
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
                        <div className='mt-4'>
                            {role === 'admin' && (
                                <input type="file"
                                onChange={handleAdmin}
                                className='w-full px-4 py-2 border border-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 rounded-md duration-300'
                            />
                            )}
                        </div>
                        <button 
                            type='submit'
                            className='bg-linear-to-r from-blue-600 to-indigo-600 text-white w-full mt-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700'>
                            Register
                        </button>
                        <p className='text-sm text-center mt-3'>
                            Already have an account? <Link to={'/login'} className='text-blue-600 font-semibold'>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default Register