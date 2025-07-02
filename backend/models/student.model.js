import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: Number,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    pendingFees: {
        type: Number,
        default: 0
    },
    fine: {
        type: Number,
        default: 0
    },
    degree: {
        type: String,
        required: true
    }
})

export default mongoose.model("student", studentSchema);
