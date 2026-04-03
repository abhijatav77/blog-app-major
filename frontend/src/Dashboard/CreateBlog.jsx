import axios from 'axios';
import React, { useState } from 'react'
import { BACKEND_URL } from '../../utils/utils';
import toast from 'react-hot-toast';
import {motion} from 'framer-motion'
import { useAuth } from '../context/AuthContext';

const CreateBlog = ({ setComponent }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("")
  const [about, setAbout] = useState("")
  const [blogImage, setBlogImage] = useState(null)
  const [imagePreview, setImagePreview] = useState()

  const {setAdminBlogs} = useAuth()

  const changeImageHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setImagePreview(reader.result)
      setBlogImage(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append('title', title)
      formData.append('category', category)
      formData.append('about', about)
      formData.append('blogImage', blogImage)
      const { data } = await axios.post(`${BACKEND_URL}/blog/create-blog`, formData, {
        withCredentials: true
      })
      toast.success(data.message)
      setAdminBlogs((prev) => [...prev, data.blogData]);
      setComponent('My Blog')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
    >
      <div className='flex items-center justify-center min-h-screen'>
        <form onSubmit={handleSubmit}>
          <div className='shadow-md rounded-lg p-5'>
            <h1 className='text-center text-2xl font-semibold text-blue-700'>Create Blog</h1>
            <div className='mt-4'>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder='Title'
                className='w-full border border-blue-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md duration-300'
              />
            </div>
            <div className='mt-4'>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder='Category'
                className='w-full border border-blue-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md duration-300'
              />
            </div>
            <div className='mt-4'>
              <textarea
                rows={4}
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder='About'
                className='w-full border border-blue-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md duration-300'
              />
            </div>
            <div className='mt-4 flex flex-col justify-center items-center'>
              <img src={imagePreview ? `${imagePreview}` : "/imgPL.webp"} alt="Blog Image" className='w-30 h-30 rounded-lg border-2 object-cover' />
              <input
                type="file"
                onChange={changeImageHandler}
                className='mt-4 w-full border border-blue-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md duration-300'
              />
            </div>
            <button
              type='submit'
              className='mt-2 w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold border-blue-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md duration-300 hover:scale-[1.02]'
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default CreateBlog