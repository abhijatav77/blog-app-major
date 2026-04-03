import React from 'react'
import { useAuth } from '../context/AuthContext'

const Creators = () => {
    const { admins } = useAuth()
    return (
        <div className='container mx-auto px-4'>
            <h1 className='text-2xl font-semibold'>Admins</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 mt-5 gap-5 w-full h-full'>
                {admins.map((element) => (
                    <div key={element._id} className='flex flex-col items-center justify-center w-full'>
                        <img 
                            src={element.adminPhoto.url} 
                            alt="" 
                            className='w-50 h-50 rounded-full border-2 border-yellow-500 md:w-50 md:h-50'    
                        />
                        <h1>{element.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Creators