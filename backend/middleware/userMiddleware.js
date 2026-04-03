import jwt from 'jsonwebtoken'
import { User } from '../model/userModel.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "User login first"
            })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findById(decoded.id).select("-password")

        req.user = user

        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
}

export const isAdmin = (req, res, next) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: "Access denied, only admin create"
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
}