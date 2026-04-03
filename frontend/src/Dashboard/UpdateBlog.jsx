import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../utils/utils';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const UpdateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("")
  const [about, setAbout] = useState("")
  const [blogImage, setBlogImage] = useState(null)
  const [imagePreview, setImagePreview] = useState("")

  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSingleBlog = async() => {
      try {
        const {data} = await axios.get(`${BACKEND_URL}/blog/single-blog/${id}`,{withCredentials: true})
        console.log(data)
        setTitle(data.blog.title)
        setCategory(data.blog.category)
        setAbout(data.blog.about)
        setImagePreview(data.blog.blogImage.url)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchSingleBlog()
  },[])

  const handleUpdate = async(e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('category', category)
      formData.append('about', about)
         if (blogImage instanceof File) {
      formData.append('blogImage', blogImage)
    }

      const {data} = await axios.put(`${BACKEND_URL}/blog/update-blog/${id}`, formData, {
        withCredentials: true
      })
      toast.success(data.message)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='relative container mx-auto'>
      <div onClick={() => navigate(-1)} className='flex items-center gap-2 cursor-pointer border border-gray-200 absolute top-5 left-5 shadow-lg px-4 py-2 rounded-md'>
        <FaArrowLeft />
        <p>Back Page</p>
      </div>
      <div className='flex items-center justify-center min-h-screen'>
        <form onSubmit={handleUpdate}>
          <div className='shadow-md rounded-lg p-5'>
            <h1 className='text-center text-2xl font-semibold text-blue-700'>Update Blog</h1>
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
                placeholder='Category'
                className='w-full border border-blue-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md duration-300'
              />
            </div>
            <div className='mt-4 flex flex-col items-center'>
              <img src={imagePreview ? `${imagePreview}` : "/imgPL.webp"} alt="Blog Image" className='w-30 h-30 rounded-lg border-2 object-cover' />
              <input 
                type="file"
                onChange={(e) => setBlogImage(e.target.files[0])}
                className='mt-4 w-full border border-blue-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md duration-300'
              />
            </div>
            <button
              type='submit'
              className='mt-2 w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold border-blue-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md duration-300'
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateBlog