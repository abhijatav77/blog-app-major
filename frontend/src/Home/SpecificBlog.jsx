import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'

const SpecificBlog = () => {
    const { blogs, loading } = useAuth()

    if (loading) {
        <div className='h-screen w-screen flex items-center justify-center gap-2'>
            <FaSpinner className='animate-spin text-3xl text-blue-600' />
            <p className='text-2xl'>Loading...</p>
        </div>
    }

    const filterBlogs = blogs.filter((blog) => blog.category === 'Food')
    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-2xl font-semibold'>Foodie</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5 overflow-hidden'>
                {blogs && blogs.length > 0 ? (
                    filterBlogs.slice(0,5).map((blog) => (
                        <div
                            key={blog._id}
                        >
                            <Link to={`/blogs/${blog._id}`} className='relative w-full flex items-center justify-center hover:scale-105 duration-300'>
                                <img
                                    src={blog.blogImage.url}
                                    alt="blog Image"
                                    className='w-full h-48 object-cover rounded-md border border-gray-100'
                                />
                                <span className='bg-linear-to-t inset-0 absolute from-black/40 to-transparent rounded-md'></span>

                                <h1 className='absolute bottom-0 text-white hover:text-yellow-500 duration-300 pb-2 text-sm text-center'>
                                    {blog.title}
                                </h1>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className='mt-10 w-full'>
                        <p className='text-2xl text-center'>No post blog yet!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SpecificBlog