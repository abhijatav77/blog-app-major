import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './page/Home'
import Login from './page/Login'
import Register from './page/Register'
import Blogs from './page/Blogs'
import BlogDetails from './page/BlogDetails'
import About from './page/About'
import Footer from './Home/Footer'
import Contact from './page/Contact'
import Dashboard from './page/Dashboard'
import UpdateBlog from './Dashboard/UpdateBlog'
import { useAuth } from './context/AuthContext'

const App = () => {
  const location = useLocation()
  const hideNavbarFooter = ["/dashboard", "/login", "/signup"].includes(location.pathname)

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/blogs/:id' element={<BlogDetails />} />
        <Route path='/update-blog/:id' element={<UpdateBlog />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </div>
  )
}

export default App