import express from 'express'
import { admins, getMe, login, logout, signup } from '../controller/userController.js'
import { isAuthenticated } from '../middleware/userMiddleware.js'
const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout',isAuthenticated, logout)
router.get('/my-profile',isAuthenticated, getMe)
router.get('/admins', admins)


export default router