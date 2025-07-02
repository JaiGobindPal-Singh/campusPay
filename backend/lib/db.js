import mongoose from "mongoose";
import studentModel from "../models/student.model.js";
import accountantModel from "../models/accountant.model.js";
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
         // Exit the process with failure
    }
}

export class DbFunctions{
    static async getStudentDetails(rollNo,mobile){
        // return
        try{
            const student = studentModel.findOne({ rollNo, mobile });
            return student;
        }catch(error){
            console.error("Error in getStudentDetails:", error);
        }
    }
    static async getAccountantDetails(username, password) {
        try{
            const accountant = accountantModel.findOne({ username , password });
            return accountant; 
        }catch(error){
            console.error("Error in getAccountantDetails:", error);
        }
    }
    static async createAccountant(username, password) {
        try{
            const accountant = new accountantModel({ username, password });
            accountant.save();
            return accountant;
        }catch(error){
            console.error("Error in createAccountant:", error);
        }
    }




    //below are the functions used by the accountant to manage student fees
    static async getStudentByRollNo(rollNo) {
        try{
            const student = await studentModel.findOne({ rollNo });
            return student;
        }catch(error){
            console.error("Error in getStudentByRollNo:", error);
        }
    }
    static async studentFeePaymentByAccountant(rollNo,amount){
        try{
            const student = await studentModel.findOne({rollNo});
            if (!student) {
                throw new Error("Student not found");
            }

            // Update the student's pending fees and fine
            if(amount > student.pendingFees + student.fine){
                throw new Error("Amount exceeds pending fees");
            }
            if(amount >= student.pendingFees){
                amount -= student.pendingFees;
                student.pendingFees = 0;
            }
            student.fine -= amount;
            await student.save();
            return student;
        }catch(err){
            console.error("Error in StudentFeePaymentByAccountant:", err);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }
    static async addFine(rollNo,fineAmount){
        try{
            const student = await studentModel.findOne({rollNo});
            if (!student) {
                throw new Error("Student not found");
            }

            // Update the student's fine
            student.fine += fineAmount; 
            await student.save();
            return student;
        }catch(err){
            console.error("Error in UpdateFine:", err);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }
    static async addScholarship(rollNo, scholarshipAmount) {
        try {
            const student = await studentModel.findOne({ rollNo });
            if (!student) {
                throw new Error("Student not found");
            }

            // Update the student's pending fees with scholarship amount
            if(scholarshipAmount >= student.pendingFees) {
                scholarshipAmount -= student.pendingFees;
                student.pendingFees = 0;
            }
            student.fine -= scholarshipAmount;
            await student.save();
            return student;
    }catch(err){
            console.error("Error in addScholarship:", err);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }
}