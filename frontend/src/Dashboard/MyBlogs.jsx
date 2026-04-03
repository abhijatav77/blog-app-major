import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { BACKEND_URL } from '../../utils/utils'
import { motion } from 'framer-motion'

const MyBlogs = () => {
    const { adminBlogs, setAdminBlogs } = useAuth()

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${BACKEND_URL}/blog/delete-blog/${id}`, { withCredentials: true })
            toast.success(data.message)
            const updatedBlogs = adminBlogs.filter(blog => blog._id !== id);
            setAdminBlogs(updatedBlogs);
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
        >
            <div className='md:ml-64 pt-10 px-4 bg-gray-50 min-h-screen'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {adminBlogs && adminBlogs.length > 0 ? (
                        adminBlogs.map((el) => (
                            <div key={el._id} className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300'>

                                {/* Image */}
                                <div className='relative'>
                                    <img
                                        src={el.blogImage.url}
                                        alt=""
                                        className='w-full h-44'
                                    />

                                    {/* Overlay */}
                                    <div className='absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-2'>
                                        <p className='text-white text-sm font-semibold'>
                                            {el.title}
                                        </p>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className='flex justify-between p-3'>
                                    <Link
                                        to={`/update-blog/${el._id}`}
                                        className='bg-linear-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-md text-sm hover:from-blue-700 hover:to-purple-700 transition'
                                    >
                                        Update
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(el._id)}
                                        className='bg-linear-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-md text-sm hover:from-pink-600 hover:to-red-600 transition'
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        ))

                    ) : (
                        <div className='flex justify-center md:ml-80 w-full'>
                            <p className='font-semibold'>No blog uploaded by admin</p>
                        </div>
                    )}

                </div>
            </div>
        </motion.div>
    )
}

export default MyBlogs