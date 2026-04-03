import express from 'express'
import 'dotenv/config'
import main from './database/db.js'
import userRouter from './routes/userRoute.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary';
import blogRouter from './routes/blogRoute.js'
import nodeRouter from './routes/nodeRoute.js'
const app = express()


const PORT = process.env.PORT

//middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

//fileUpload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp/'
}))

//cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
})

//router
app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)
app.use('/api', nodeRouter)


main()
.then(() => {
    app.listen(PORT, ()=> {
        console.log(`Server running port no ${PORT}`)
    }) 
})
.catch((error) => {
    console.log(error.message)
})