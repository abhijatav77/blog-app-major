
import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true
    },
    blogImage: {
        public_id: {
            type: String,
        },
        url: {
            type: String
        }
    },
    admin: {
        name: {
            type: String
        },
        photo: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
},{timestamp: true})

export const Blog = mongoose.model("Blog", blogSchema)