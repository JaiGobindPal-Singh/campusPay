import { DbFunctions } from "../../../shared/lib/db.js";
export const payFees = async (req, res) => {
    try{
        const { rollNo, amount } = req.body;

        // Validate input
        if (!rollNo || !amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: "Roll number and amount are required" });
        }
        const result = await DbFunctions.studentFeePaymentByAccountant(rollNo, amount);
        if(!result){
            throw new Error("unknown error in payFees db function");
        }
        res.status(200).json({
            message: "Fees paid successfully",
            result: result,
            rollNo,
        });
    }catch(err){
        console.log('error in payFees controller', err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getStudentDetails = async (req, res) => {
    try{
        const { rollNo } = req.body;

        // Validate input
        if (!rollNo) {
            return res.status(400).json({ message: "Roll number is required" });
        }
        const result = await DbFunctions.getStudentByRollNo(rollNo);
        if(!result){
            throw new Error("unknown error in getStudentDetails db function");
        }
        res.status(200).json({
            message: "Student details fetched successfully",
            student: result
        });
    }catch(err){
        console.log('error in getStudentDetails controller', err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getPreviousTransactions = async (req, res) => {
    try{
        const { rollNo } = req.body;

        // Validate input
        if (!rollNo) {
            return res.status(400).json({ message: "Roll number is required" });
        }
        const result = await DbFunctions.getStudentPreviousTransactions(rollNo);
        if(!result){
            throw new Error("unknown error in getPreviousTransactions db function");
        }
        res.status(200).json({
            message: "Previous transactions fetched successfully",
            transactions: result
        });
    }catch(err){
        console.log('error in getPreviousTransactions controller', err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const printReceipt = async (req, res) => {
    try{
        const {receiptId, rollNo} = req.body;
        if(!receiptId) {
            return res.status(400).json({ message: "Receipt ID is required" });
        }
        const allReceipts = await DbFunctions.getStudentPreviousTransactions(rollNo);
        if(!allReceipts || allReceipts.length === 0) {
            return res.status(404).json({ message: "No receipts found for this student" });
        }
        const receipt = allReceipts.find(r => r.id.toString() == receiptId);
        if(!receipt) {
            return res.status(404).json({ message: "Receipt not found" });
        }
        res.status(200).json({
            message: "Receipt printed successfully",
            receipt: receipt
        });

    }catch(err){
        console.log('error in printReceipt controller', err);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export const addFine = async (req, res) => {
    try{
        const { rollNo, fineAmount } = req.body;

        // Validate input
        if (!rollNo || !fineAmount || isNaN(fineAmount) || fineAmount <= 0) {
            return res.status(400).json({ message: "Roll number and fine amount are required" });
        }
        const result = await DbFunctions.addFine(rollNo, fineAmount);
        if(!result){
            throw new Error("unknown error in addFine db function");
        }
        res.status(200).json({
            message: "Fine added successfully",
            rollNo,
            fineAmount
        });
    }catch(err){
        console.log('error in addFine controller', err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const scholarship = async (req, res) => {
    try{
       const { rollNo, scholarshipAmount } = req.body;
       if(!rollNo || !scholarshipAmount || isNaN(scholarshipAmount) || scholarshipAmount <= 0) {
            return res.status(400).json({ message: "Roll number and scholarship amount are required" });
        }
        const result = await DbFunctions.addScholarship(rollNo, scholarshipAmount);
        if(!result ){
            throw new Error("unknown error in scholarship db function");
        }
        res.status(200).json({
            message: "Scholarship added successfully",
            rollNo,
            scholarshipAmount
        });
    }catch(err){
        console.log('error in scholarship controller', err);
        return res.status(500).json({ message: "Internal server error" });
    }
}