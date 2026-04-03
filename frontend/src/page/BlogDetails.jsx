import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../../utils/utils'
import { FaArrowLeft } from 'react-icons/fa'

const BlogDetails = () => {
    const { id } = useParams()
    const [blog, setBlog] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        const fetchSingleBlog = async () => {
            try {
                const { data } = await axios.get(`${BACKEND_URL}/blog/single-blog/${id}`)
                setBlog(data.blog)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchSingleBlog()
    }, [id])

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative w-full h-[60vh]">
                <div onClick={() => navigate(-1)} className='m-4 absolute bg-white z-10 px-3 py-1 rounded-full flex items-center gap-2 cursor-pointer hover:bg-gray-50 shadow-md hover:scale-105 duration-300'>
                    <FaArrowLeft />
                    <p className='font-semibold'>Back to Blog</p>
                </div>
                <img
                    src={blog.blogImage?.url}
                    alt="blog"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
                        {blog.title}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 -mt-20 relative z-10">

                    {/* Category Badge */}
                    <span className="inline-block bg-linear-to-r from-blue-500 to-purple-500 text-white text-sm px-4 py-1 rounded-full mb-4">
                        {blog.category}
                    </span>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        {blog.title}
                    </h2>

                    {/* Divider */}
                    <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-500 mb-6"></div>

                    {/* About Content */}
                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                        {blog.about}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails