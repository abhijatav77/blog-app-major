import mongoose, { mongo } from "mongoose";

const nodeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {Timestamp: true})

export const Node = mongoose.model('Node', nodeSchema)