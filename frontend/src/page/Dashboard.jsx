import React, { useEffect, useState } from 'react'
import Sidebar from '../Dashboard/Sidebar'
import MyProfile from '../Dashboard/MyProfile'
import CreateBlog from '../Dashboard/CreateBlog'
import UpdateBlog from '../Dashboard/UpdateBlog'
import MyBlogs from '../Dashboard/MyBlogs'
import { useAuth } from '../context/AuthContext'
import { FaSpinner } from 'react-icons/fa6'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {motion} from 'framer-motion'

const Dashboard = () => {
  const { isAuthenticated, user, role, loading } = useAuth()
  const [component, setComponent] = useState('My Blog')

  useEffect(() => {
    if(user) {
      setComponent('My Blog')
    }
  },[user])

  if (loading) {
    return <div className='h-screen w-screen flex items-center justify-center gap-2'>
      <FaSpinner className='animate-spin text-3xl text-blue-600' />
      <p className='text-2xl'>Loading...</p>
    </div>
  }

  if (!loading && !isAuthenticated) {
    return <Navigate to='/login' />
  }

  if (!loading && role !== 'admin') {
    toast.error('Access denied, only admin create')
    return <Navigate to='/' />
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      <Sidebar component={component} setComponent={setComponent} />
      {component === 'My Profile' ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog setComponent={setComponent} />
      ) : component === 'Update Blog' ? (
        <UpdateBlog />
      ) : (
        <MyBlogs />
      )}
    </motion.div>
  )
}

export default Dashboard