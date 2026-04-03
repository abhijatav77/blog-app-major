import React from 'react'
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <div className='bg-gray-100'>
                <div className='border border-gray-300 flex flex-col justify-center items-center space-y-4 p-10'>
                    <h1 className='text-2xl font-bold'>Apna<span className='text-blue-600'>Blog</span></h1>
                    <p>Our blog page provides diverse content including technology, lifestyle, health, travel, and education with engaging, informative, and easy-to-read articles.</p>
                    <div className='flex gap-5'>
                        <Link to={'https://x.com/abhi_jatav77'}>
                            <FaXTwitter size={25} className='hover:text-gray-600 duration-300' />
                        </Link>
                        <Link to={'https://github.com/abhijatav77'}>
                            <FaGithub size={25} className='hover:text-red-900 duration-300' />
                        </Link>
                        <Link to={'https://www.linkedin.com/in/abhi-jatav77'}>
                            <FaLinkedin size={25} className='hover:text-blue-500 duration-300' />
                        </Link>
                        <Link to={'https://www.youtube.com'}>
                            <FaYoutube size={25} className='hover:text-red-500 duration-300' />
                        </Link>
                    </div>
                </div>
                <p className='text-center p-5'>&copy; 2026 Apna<span className='text-blue-600'>Blog.</span> All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer