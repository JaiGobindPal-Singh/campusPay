import mongoose from "mongoose";

const accountantSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String,
        required: true
    },
    fullname:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model("accountant", accountantSchema);