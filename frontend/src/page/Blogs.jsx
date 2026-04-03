import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Blogs = () => {
  const { blogs, loading } = useAuth()

  return (
     <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-4">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Latest Blogs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {loading ? (
            <div className='h-screen w-screen flex items-center justify-center gap-2'>
              <FaSpinner className='animate-spin text-3xl text-blue-600' />
              <p className='text-2xl'>Loading...</p>
            </div>
          ) : blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <Link
                to={`/blogs/${blog._id}`}
                key={blog._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl duration-300 relative"
              >

                {/* Image */}
                <img
                  src={blog.blogImage?.url}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />

                {/* Content */}
                <div className="text-center mt-2">

                  {/* Category */}
                  <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
                    {blog.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-lg font-bold mt-2">
                    {blog.title}
                  </h2>

                  {/* Author */}
                  <div className="flex items-center justify-center mt-4 gap-2 bg-linear-to-r from-blue-500 to-indigo-600 p-2 ">
                    <img
                      src={blog.admin?.photo}
                      alt="admin"
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                    <span className="text-sm font-medium text-white">
                      {blog.admin?.name}
                    </span>
                  </div>

                </div>
              </Link>

            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No blogs found
            </div>
          )}

        </div>
      </div>
    </div>
    </motion.div>
  )
}

export default Blogs