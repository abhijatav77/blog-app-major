import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Blog = () => {
    const { blogs, loading } = useAuth();

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin text-3xl text-blue-600" />
                <p className="text-2xl">Loading...</p>
            </div>
        );
    }

    // No blogs
    if (!blogs || blogs.length === 0) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <p className="text-2xl">No posts yet!</p>
            </div>
        );
    }

    // Slider settings (simplified + infinite loop)
    const sliderSettings = {
        loop: true,
        autoplay: { delay: 2000 },
        // navigation: true,
        // pagination: { clickable: true },
        breakpoints: {
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
        },
        modules: [Navigation, Pagination, Autoplay],
    };
    
    return (
        <div className="container mx-auto px-4">
            {/* Slider Section */}
            {blogs.length > 0 && (
                <div className="">
                    <h2 className="text-xl font-medium mb-4">Featured Blogs</h2>
                    <Swiper {...sliderSettings}>
                        {blogs.map((blog) => (
                            <SwiperSlide key={blog._id}>
                                <div className='px-3'>
                                    <div className="shadow-md border border-gray-100 rounded-lg overflow-hidden">
                                        <Link to={`/blogs/${blog._id}`} className="relative block">
                                            <img
                                                src={blog.blogImage.url}
                                                alt={blog.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            {/* <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" /> */}
                                            <h3 className="absolute bottom-2 left-2 text-white text-sm font-medium hover:text-yellow-400 transition-colors">
                                                {blog.title}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center justify-between p-4">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={blog.admin.photo}
                                                    alt={blog.admin.name}
                                                    className="w-8 h-8 rounded-full border-2 border-yellow-400"
                                                />
                                                <span className="text-sm">{blog.admin.name}</span>
                                            </div>
                                            <span className="bg-linear-to-r from-blue-500 to-indigo-500 text-white text-xs px-3 py-1 rounded-full">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default Blog;