import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: true
    },
    adminPhoto: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    }
},{Timestamp: true})

export const User = mongoose.model("User", userSchema)