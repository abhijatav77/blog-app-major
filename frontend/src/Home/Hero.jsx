import React from 'react'
import abhi from '../../public/01.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

const Hero = () => {
    const { role } = useAuth()

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
        >
            <div className='min-h-screen mt-12'>
                <div className='flex container items-center justify-center mx-auto flex-col-reverse md:flex-row px-4 pt-8'>
                    <div className="flex-1 text-center md:text-left md:w-[50%]">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Share Your <span className="text-blue-600">Stories</span>
                            <br />
                            With The World
                        </h1>

                        <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
                            Welcome to ApnaBlog - a platform where ideas come to life.
                            Share your thoughts, experiences, and knowledge with a global
                            community of readers and writers. Start your blogging journey today!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                to="/blogs"
                                className="px-8 py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] transition-all duration-300 text-white rounded-lg text-center font-medium"
                            >
                                Start Reading
                            </Link>
                            {role === 'admin' && (
                                <Link
                                    to="/dashboard"
                                    className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300 text-center font-medium"
                                >
                                    Write a Blog
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className='md:w-[50%]'>
                        <img src={abhi} alt="hero" />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Hero