//* This file contains the functions and mehtods that are used to establish connection with database and perfom the CRUD operations on the database

import mongoose from "mongoose";
import studentModel from "../models/student.model.js";
import accountantModel from "../models/accountant.model.js";
import transactionModel from "../models/transaction.model.js";
import clerkModel from "../models/clerk.model.js";
import degreeModel from "../models/degree.model.js";
import { hashPassword } from "./bcrypt.js";
import generateUniqueId from "./generateUniqueId.js";
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
    static async payFeesByStudent(rollNo, amount,status,paymentId,orderId) {
        try{
            const tempAmount = amount; 
            const student = await studentModel.findOne({ rollNo });
            if(status){
                if (!student) {
                    throw new Error("Student not found");
                }
                // Update the student's pending fees and fine
                if(amount > (student.pendingFees + student.fine)){
                    throw new Error("Amount exceeds pending fees");
                }
                if(amount >= student.pendingFees){
                    amount -= student.pendingFees;
                    student.pendingFees = 0;
                }else{
                    student.pendingFees -= amount;
                    amount = 0;
                }
                student.fine -= amount;
                
                //handle negative fine 
                if(student.fine < 0) {
                    student.fine = 0; 
                }
            }
            student.previousTransactions.push({
                id: generateUniqueId(),
                amount: tempAmount,
                date: new Date(),  
                online :{
                    status: status? 'success':'pending',
                    paymentId,
                    orderId
                }
            })
            await student.save();
            // Create a transaction record in the database
            await transactionModel.create({
                studentId: student._id,
                amount: tempAmount,
                date: new Date(),
                status: status ? 'success' : 'pending',
                paymentId,
                orderId
            });
            return
        }catch(err){
            process.env.NODE_ENV == "development" && console.log("Error in payFeesByStudent db function:", err);
            throw err;
        }
    }
    static async generateReceipt(rollNo, amount,) {
        try{
            const student = await studentModel.findOne({ rollNo });
            if (!student) {
                throw new Error("Student not found");
            }
            // Create a new receipt object
            const receipt = {
                id: generateUniqueId(),
                amount,
                date: new Date()  // Creates a Date object with current date and time
            };
            // Add the receipt to the student's previous transactions
            if (!student.previousTransactions) {
                student.previousTransactions = [];
            }
            student.previousTransactions.push(receipt);
            await student.save();
            return receipt;
        }catch(err){
            process.env.NODE_ENV == "development" && console.log("Error in generateReceipt db function:", err);
            throw err;
        }
    }
    static async getStudentDetails(rollNo,mobile){
        // return
        try{
            const student =await studentModel.findOne({ rollNo, mobile });
            if (!student) {
                throw new Error("Student not found");
            }
            return student;
        }catch(error){
            process.env.NODE_ENV == "development" && console.log("Error in getStudentDetails db function:", error);
            throw error;
        }
    }
    static async getAccountantDetails(username) {
        try{
            const accountant =await accountantModel.findOne({ username });
            if (!accountant) {
                throw new Error("Accountant not found");
            }
            return accountant; 
        }catch(error){
            process.env.NODE_ENV == "development" && console.log("Error in getAccountantDetails db function:", error);
            throw error;
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
            process.env.NODE_ENV == "development" && console.log("Error in createAccountant db function:", error);
            throw error;
        }
    }
    static async addNewStudent(rollNo, name, mobile, degree) {
        try {
            if (!rollNo || !name || !mobile || !degree) {
                throw new Error("All fields are required");
            }
            const result =await degreeModel.findOne({ degree: degree.toLowerCase() });
            if (!result) {
                throw new Error("Degree not found");
            }
            const pendingFees = result.fees;
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
            process.env.NODE_ENV == "development" && console.log("Error in addNewStudent db function:", error);
            throw error;
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
            process.env.NODE_ENV == "development" && console.log('error in create new clerk db function;',err);
            throw err;
        }
    }
    static async getStudentByRollNo(rollNo) {
        try{
            const student = await studentModel.findOne({ rollNo });
            if (!student) {
                throw new Error("Student not found");
            }
            return student;
        }catch(error){
            process.env.NODE_ENV == "development" && console.log("Error in getStudentByRollNo db function:", error);
            throw error;
        }
    }
    static async studentFeePaymentByAccountant(rollNo,amount){
        try{
            const tempAmount = amount; // Store the original amount for receipt generation
            const student = await studentModel.findOne({rollNo});
            if (!student) {
                throw new Error("Student not found");
            }

            // Update the student's pending fees and fine
            if(amount > (student.pendingFees + student.fine)){
                throw new Error("Amount exceeds pending fees");
            }
            if(amount >= student.pendingFees){
                amount -= student.pendingFees;
                student.pendingFees = 0;
            }else{
                student.pendingFees -= amount;
                amount = 0;
            }
            student.fine -= amount;

            //handle negative fine 
            if(student.fine < 0) {
                student.fine = 0; // Ensure fine does not go negative
            }
            await student.save();
            return this.generateReceipt(rollNo,tempAmount);
            
        }catch(err){
            process.env.NODE_ENV == "development" && console.log("Error in StudentFeePaymentByAccountant db function:", err);
            throw err;
        }
    }
    static async addFine(rollNo,fineAmount){
        try{
            const student = await studentModel.findOne({rollNo});
            if (!student) {
                throw new Error("Student not found");
            }
            if(fineAmount <= 0) {
                throw new Error("Fine amount must be greater than zero");
            }
            // Update the student's fine
            if(student.fine < 0){
                student.fine = 0; // Ensure fine does not go negative
            }
            student.fine += fineAmount; 
            await student.save();
            return student;
        }catch(err){
            process.env.NODE_ENV == "development" && console.log("Error in UpdateFine db function:", err);
            throw err;
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
            }else{
                student.pendingFees -= scholarshipAmount;
                scholarshipAmount = 0;
            }
            student.fine -= scholarshipAmount;
            if(student.fine < 0) {
                student.fine = 0; // Ensure fine does not go negative
            }
            await student.save();
            return student;
    }catch(err){
            process.env.NODE_ENV == "development" && console.log("Error in addScholarship db function:", err);
            throw err;
        }
    }
    static async getClerkDetails(username) {
        try{
            const clerk =await clerkModel.findOne({ username});
            if (!clerk) {
                throw new Error("Clerk not found");
            }
            return clerk;
        }catch(error){
            process.env.NODE_ENV == "development" && console.log("Error in getClerkDetails db function:", error);
            throw error;
        }
    }
    static async getStudentPreviousTransactions(rollNo) {
        try{
            const student = await studentModel.findOne({ rollNo });
            if (!student) {
                throw new Error("Student not found");
            }
            return student.previousTransactions;
        }catch(error){
            process.env.NODE_ENV == "development" && console.log("Error in getPreviousTransactions db function:", error);
            throw error;
        }
    }
    //*defineDegreeFees also creates a new degree if it does not exist
    static async defineDegreeFees(degree,fees){
        try{
            degree = degree.toLowerCase();
            const fetchedDegree =await degreeModel.findOne({ degree });
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
            process.env.NODE_ENV == "development" && console.log("Error in defineDegreeFees db function:", err);
            throw err;
        }

    }
    static async getTransactionsByPendingStatus(){
        try{
            const transactions = await transactionModel.find({ status: 'pending' });
            return transactions;
        }catch(err){
            process.env.NODE_ENV == "development" && console.log("Error in getTransactionsByPendingStatus db function:", err);
            throw err;
        }
    }

    
}