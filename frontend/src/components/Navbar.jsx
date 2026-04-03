import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { BACKEND_URL } from '../../utils/utils'
import toast from 'react-hot-toast'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
    const [show, setShow] = useState(false)
    const { isAuthenticated, role, logout } = useAuth()
    const navigate = useNavigate()

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
        <div className='flex items-center justify-center'>
            <div className='container mx-auto fixed top-0 bg-white z-20'>
                {/* desktop */}
                <div className='flex items-center justify-between shadow-md p-3 rounded-md border border-gray-200'>
                    <Link to={'/'} className='text-xl font-bold'>Apna<span className='text-blue-600'>Blog</span></Link>
                    <ul className='hidden md:flex items-center gap-4'>
                        <Link to={'/'} className='px-4 py-2 rounded-md duration-300 hover:bg-gray-200 '>Home</Link>
                        <Link to={'/blogs'} className='px-4 py-2 rounded-md duration-300 hover:bg-gray-200 '>Blogs</Link>
                        <Link to={'/about'} className='px-4 py-2 rounded-md duration-300 hover:bg-gray-200 '>About</Link>
                        <Link to={'/contact'} className='px-4 py-2 rounded-md duration-300 hover:bg-gray-200 '>Contact</Link>
                    </ul>
                    <div className='hidden md:flex items-center gap-4'>
                        {role === 'admin' && (
                            <Link to={'/dashboard'} className='px-4 py-2 text-white rounded-md bg-linear-to-r from-blue-500 to-indigo-500 hover:bg-linear-to-r hover:from-blue-600 hover:to-indigo-600 duration-300'>
                                Dashboard
                            </Link>
                        )}
                        {!isAuthenticated ? (
                            <Link
                                to={'/login'}
                                className='px-4 py-2 text-white rounded-md bg-linear-to-r from-blue-500 to-indigo-500 hover:bg-linear-to-r hover:from-blue-600 hover:to-indigo-600 duration-300'
                            >
                                Login
                            </Link>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className='px-4 py-2 text-white rounded-md bg-red-600 hover:bg-linear-to-r hover:bg-red-700 duration-300'
                            >
                                Logout
                            </button>
                        )}
                    </div>
                    {/* Mobile */}
                    <div
                        onClick={() => setShow(!show)}
                        className='md:hidden'
                    >
                        {show ? <IoClose size={25} /> : <RxHamburgerMenu size={25} />}
                    </div>
                </div>
                {show && (
                    <div className='absolute right-0 top-16 p-5 rounded-md md:hidden bg-gray-100 w-70 h-screen flex flex-col text-lg font-medium'>
                        <Link to={'/'} className='py-2 border-b border-gray-600 text-center'>Home</Link>
                        <Link to={'/blogs'} className='py-2 border-b border-gray-600 text-center'>Blogs</Link>
                        <Link to={'/about'} className='py-2 border-b border-gray-600 text-center'>About</Link>
                        <Link to={'/contact'} className='py-2 text-center'>Contact</Link>
                        <div className='flex items-center justify-center gap-5 mt-2'>
                            {role === 'admin' && (
                                <Link to={'/dashboard'} className='px-4 py-2 text-white rounded-md bg-linear-to-r from-blue-500 to-indigo-500 hover:bg-linear-to-r hover:from-blue-600 hover:to-indigo-600 duration-300'>
                                    Dashboard
                                </Link>
                            )}
                            {!isAuthenticated ? (
                                <Link
                                    to={'/login'}
                                    className='px-4 py-2 text-white rounded-md bg-linear-to-r from-blue-500 to-indigo-500 hover:bg-linear-to-r hover:from-blue-600 hover:to-indigo-600 duration-300'
                                >
                                    Login
                                </Link>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className='px-4 py-2 text-white rounded-md bg-red-600 hover:bg-linear-to-r hover:bg-red-700 duration-300'
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar