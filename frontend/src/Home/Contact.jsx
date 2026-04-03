import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/utils'
import { motion } from 'framer-motion'

const Contact = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${BACKEND_URL}/contact`, { name, email, message }, {
                withCredentials: true
            })
            toast.success(data.message)
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
        >
            <div className='mx-auto'>
                <div className='min-h-screen flex items-center justify-center'>
                    <form onSubmit={handleSubmit} className='shadow-lg rounded-lg p-6 w-full max-w-sm border border-gray-200'>
                        <h1 className='text-xl text-center font-medium'>Get in touch</h1>
                        <div className='space-y-5 mt-5'>
                            <div className=''>
                                <input type="text"
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md duration-300 px-4 py-2 border border-blue-500'
                                />
                            </div>
                            <div className=''>
                                <input type="email"
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md duration-300 px-4 py-2 border border-blue-500'
                                />
                            </div>
                            <div className='mb-2'>
                                <textarea
                                    rows={4}
                                    type="text"
                                    placeholder='Message'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className='w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md duration-300 px-4 py-2 border border-blue-500'
                                />
                            </div>
                            <button
                                type='submit'
                                className='w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] duration-300 transition-all'
                            >
                                Sent Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default Contact