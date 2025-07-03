//* This file contains the functions and mehtods that are used to establish connection with database and perfom the CRUD operations on the database

import mongoose from "mongoose";
import studentModel from "../models/student.model.js";
import accountantModel from "../models/accountant.model.js";
import clerkModel from "../models/clerk.model.js";
import degreeModel from "../models/degree.model.js";
import { hashPassword } from "./bcrypt.js";
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed:", error);
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
            console.log("Error in getStudentDetails:", error);
        }
    }
    static async getAccountantDetails(username) {
        try{
            const accountant = accountantModel.findOne({ username });
            return accountant; 
        }catch(error){
            console.log("Error in getAccountantDetails:", error);
        }
    }
    static async createNewAccountant(username,fullname,mobile, password) {
        try{
            if(!username || !fullname || !mobile || !password) {
                throw new Error("All fields are required");
            }
            const existingAccountant = await accountantModel.findOne({ username });
            if (existingAccountant) {
                throw new Error("Accountant with this username already exists");
            }
            const hashedPassword = await hashPassword(password);
            const accountant = new accountantModel({ username,
                fullname,
                mobile,
                password :hashedPassword
            });
            await accountant.save();
            return accountant;
        }catch(error){
            console.log("Error in createAccountant:", error);
        }
    }
    static async addNewStudent(rollNo, name, mobile, degree) {
        try {
            const pendingFees = degreeModel.findOne({ degree: degree.toLowerCase() }).fees;
            if (!pendingFees) {
                throw new Error("Degree not found or fees not defined");
            }
            const student = new studentModel({
                rollNo,
                name,
                mobile,
                degree,
                pendingFees,
                fine : 0
            });
            await student.save();
            return student;
        } catch (error) {
            console.log("Error in addNewStudent:", error);
        }
    }
    static async createNewClerk(username,fullname,mobile, password) {
        try{
            if(!username || !fullname || !mobile || !password) {
                throw new Error("All fields are required");
            }
            const existingClerk = await clerkModel.findOne({ username });
            if (existingClerk) {
                throw new Error("Clerk with this username already exists");
            }
            const hashedPassword = await hashPassword(password);
            const clerk = new clerkModel({
                username,
                fullname,
                mobile,
                password :hashedPassword
            });
            await clerk.save();
            return clerk;
        }catch(err){
            console.log('error in create new clerk;',err);
            throw new Error("Error creating new clerk");
        }
    }
    static async getStudentByRollNo(rollNo) {
        try{
            const student = await studentModel.findOne({ rollNo });
            return student;
        }catch(error){
            console.log("Error in getStudentByRollNo:", error);
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
            console.log("Error in StudentFeePaymentByAccountant:", err);
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
            console.log("Error in UpdateFine:", err);
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
            console.log("Error in addScholarship:", err);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }
    static async getClerkDetails(username, password) {
        try{
            const clerk = clerkModel.findOne({ username});
            return clerk;
        }catch(error){
            console.log("Error in getClerkDetails:", error);
        }
    }

    //*defineDegreeFees also creates a new degree if it does not exist
    static async defineDegreeFees(degree,fees){
        try{
            degree = degree.toLowerCase();
            const fetchedDegree = degreeModel.findOne({ degree });
            if(fetchedDegree){
                fetchedDegree.fees = fees;
                fetchedDegree.save();
                return fetchedDegree;
            }else{
                const newDegree = new degreeModel({ degree, fees });
                await newDegree.save();
                return newDegree;
            }
        }catch(err){
            console.log("Error in defineDegreeFees:", err);
        }

    }
}