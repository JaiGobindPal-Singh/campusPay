import mongoose from "mongoose";
const clerkSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model("clerk", clerkSchema);