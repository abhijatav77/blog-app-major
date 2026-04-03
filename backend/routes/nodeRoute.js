import express from 'express'
import { nodeMailer } from '../controller/nodeController.js'
const router = express.Router()

router.post('/contact', nodeMailer)

export default router;