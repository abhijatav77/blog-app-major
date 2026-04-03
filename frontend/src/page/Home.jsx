import React from 'react'
import Hero from '../Home/Hero'
import Blog from '../Home/Blog'
import SpecificBlog from '../Home/SpecificBlog'
import Creators from '../Home/Creators'
import Contact from '../Home/Contact'
import {motion} from 'framer-motion'

const Home = () => {
  return (
        <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
    >
      <Hero />
      <Blog />
      <SpecificBlog />
      <Contact />
      <Creators />
    </motion.div>
  )
}

export default Home