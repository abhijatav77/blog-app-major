import { User } from "../model/userModel.js";
import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        let cloudinaryResponse = null
        let adminPhotoData = null

        if (role === 'admin') {

            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Admin photo is required'
                })
            }

            const { adminPhoto } = req.files;
            const allowedFormat = ['image/jpeg', 'image/png']
            if (!allowedFormat.includes(adminPhoto.mimetype)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid photo format, Only jpg & png are allowed.'
                })
            }

            cloudinaryResponse = await cloudinary.uploader.upload(adminPhoto.tempFilePath);

            // delete temp file after upload
            fs.unlinkSync(adminPhoto.tempFilePath);

            if (!cloudinaryResponse || cloudinaryResponse.error) {
                return res.status(500).json({
                    success: false,
                    message: 'Image upload failed'
                })
            }

            adminPhotoData = {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            };
        }


        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Weak Password"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)





        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role,
            adminPhoto: adminPhotoData
        })

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            newUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found`
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        if (user.role !== role) {
            return res.status(404).json({
                success: false,
                message: `given ${role} is not found`
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        })

        return res.status(200).json({
            success: true,
            message: `${role} is register successfully`,
            user: {
                email: user.email,
                role: user.role
            },
            token
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const logout = async (req, res) => {
    try {
        res.clearCookie('token', "", { Date: Date.now() })
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getMe = async (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        userData: {
            name: user.name,
            email: user.email,
            role: user.role,
            adminPhoto: user.adminPhoto.url
        }
    })
}

export const admins = async(req, res) => {
    try {
        const adminData = await User.find({role: "admin"})
        if(!adminData){
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            })
        }
        return res.status(200).json({
            success: true,
            adminData
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}
