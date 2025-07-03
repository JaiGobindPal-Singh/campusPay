import mongoose from "mongoose";
const degreeSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: true,
        unique: true
    },
    fees:{
        type: Number,
        required: true
    }
})

export default mongoose.model("degree", degreeSchema);