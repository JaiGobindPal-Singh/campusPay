//* This file contains the functions and mehtods that are used to establish connection with database and perfom the CRUD operations on the database

import mongoose from "mongoose";
import studentModel from "../models/student.model.js";
import accountantModel from "../models/accountant.model.js";
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
    static async generateReceipt(rollNo, amount,) {
        try{
            const student = await studentModel.findOne({ rollNo });
            if (!student) {
                throw new Error("Student not found");
            }
            // Create a new receipt object
            const receipt = {
                id: generateUniqueId(10),
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
            console.log("Error in generateReceipt:", err);
            throw new Error("Error in generateReceipt db function");
        }
    }
    static async getStudentDetails(rollNo,mobile){
        // return
        try{
            const student = studentModel.findOne({ rollNo, mobile });
            return student;
        }catch(error){
            console.log("Error in getStudentDetails:", error);
            throw new Error("Error in getStudentDetails db function");
        }
    }
    static async getAccountantDetails(username) {
        try{
            const accountant = accountantModel.findOne({ username });
            return accountant; 
        }catch(error){
            console.log("Error in getAccountantDetails:", error);
            throw new Error("Error in getAccountantDetails db function");
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
            throw new Error("Error creating new accountant db function");
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
            throw new Error("Error adding new student db function");
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
            throw new Error("Error creating new clerk db function");
        }
    }
    static async getStudentByRollNo(rollNo) {
        try{
            const student = await studentModel.findOne({ rollNo });
            return student;
        }catch(error){
            console.log("Error in getStudentByRollNo:", error);
            throw new Error("Error in getStudentByRollNo db function");
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
            console.log("Error in StudentFeePaymentByAccountant:", err);
            throw new Error("error in StudentFeePaymentByAccountant db function");
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
            console.log("Error in UpdateFine:", err);
            throw new Error("error in UpdateFine db function");
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
            console.log("Error in addScholarship:", err);
            throw new Error("error in addScholarship db function");
        }
    }
    static async getClerkDetails(username, password) {
        try{
            const clerk = clerkModel.findOne({ username});
            return clerk;
        }catch(error){
            console.log("Error in getClerkDetails:", error);
            throw new Error("Error in getClerkDetails db function");
        }
    }
    static async getStudentPreviousTransactions(rollNo) {
        try{
            const student = await studentModel.findOne({ rollNo });
            if (!student) {
                throw new Error("Student not found");
            }
            return student.previousTransactions? student.previousTransactions : [];
        }catch(error){
            console.log("Error in getPreviousTransactions db function:", error);
            throw new Error("Error in getPreviousTransactions db function");
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
            throw new Error("Error in defineDegreeFees db function");
        }

    }
    
}