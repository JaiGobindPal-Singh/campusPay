import { DbFunctions } from "../../../shared/lib/db.js";
import { createRazorpayOrder, getRazorpayKey, reverifyRazorpayPayment, verifyRazorpayPayment } from "../../../shared/features/paymentFeature/razorPay.js";


//* pay fees controller returns the razorpay order details and razorpay key and payment is verified by the verifyPaymentController and the student details are updated in the database
export const payFees = async function (req, res) {
    try {
        let { amount } = req.body;
        amount = Number(amount);
        //checking the amount
        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }
        const studentDetails = await DbFunctions.getStudentByRollNo(req.student.rollNo);
        if (!studentDetails) {
            return res.status(404).json({ error: "Student not found" });
        }
        const totalPendingFees = studentDetails.pendingFees + studentDetails.fine;
        if (amount > totalPendingFees) {
            return res.status(400).json({ error: "Amount exceeds total pending fees" });
        }

        // Create a Razorpay order
        const result = await createRazorpayOrder(amount);
        const razorpayKey = getRazorpayKey();
        res.status(200).json({
            message: "Razorpay order created successfully",
            order: result,
            razorpayKey,
            student: studentDetails
        });
    } catch (err) {
        process.env.NODE_ENV == "development" && console.log('error in payFees controller', err);
        res.status(500).json({ error: err.message });
    }
}
//verify payment controller verifies the payment and updates the student details in the database 
export const verifyPaymentController = async function (req, res) {
    try {
        const { payment_id, order_id, signature} = req.body;
        // Validate the payment details
        if (!payment_id || !order_id || !signature) {
            return res.status(400).json({ error: "Invalid payment details" });
        }

        // Verify the payment signature
        let isVerified = verifyRazorpayPayment(signature,order_id,payment_id);
        //reverification of payment if verification fails by matching the signature
        if(!isVerified) {
            isVerified = await reverifyRazorpayPayment(payment_id);
        }
        if (!isVerified) {
            DbFunctions.payFeesByStudent(req.student.rollNo, req.body.amount, false, req.body.payment_id,req.body.order_id)
            return res.status(400).json({ error: "Payment verification failed",success: false });
        } else {
            DbFunctions.payFeesByStudent(req.student.rollNo, req.body.amount, true, req.body.payment_id,req.body.order_id)
            return res.status(200).json({ message: "Payment verified successfully",success: true  });
        }
    } catch (err) {
        try{
            DbFunctions.payFeesByStudent(req.student.rollNo, req.body.amount, false, req.body.payment_id,req.body.order_id)
        }catch(err){
            process.env.NODE_ENV == "development" && console.log('error in updating student details in verifyPaymentController', err);
        }
        process.env.NODE_ENV == "development" && console.log('error in verifyPaymentController', err);
        res.status(500).json({ error: err.message , success: false });
    }
}
export const getPreviousTransactions = async function (req, res) {
    try {
        const transactions = await DbFunctions.getStudentPreviousTransactions(req.student.rollNo);
        res.status(200).json({
            message: "previous transactions fetched successfully",
            transactions: transactions
        });
    } catch (err) {
        process.env.NODE_ENV == "development" && console.log('error in getPreviousTransactions controller', err);
        res.status(500).json({ error: err.message });
    }
}
export const getCurrentStudentDetails = async function (req, res) {
    try{
        const student = await DbFunctions.getStudentByRollNo(req.student.rollNo);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.status(200).json({
            message: "Current student details fetched successfully",
            data: {
                rollNo: student.rollNo,
                name: student.name,
                mobile: student.mobile,
                pendingFees: student.pendingFees,
                fine: student.fine,
                class: student.degree,
            }
        });
    }catch(err){
        process.env.NODE_ENV == "development" && console.log('error in getCurrentStudentDetails controller', err);
        res.status(500).json({ error: err.message });
    }
}
export const reverifyPaymentController = async function (req, res) {
    try {
        const { payment_id } = req.body;
        // Validate the payment details
        if (!payment_id) {
            return res.status(400).json({ error: "Invalid payment details" });
        }

        // Reverify the payment
        const isVerified = await reverifyRazorpayPayment(payment_id);
        if(isVerified) {
            return res.status(200).json({ message: "Payment reverified successfully", success: true });
        }
        else {
            return res.status(400).json({ error: "Payment re-verification failed", success: false });
        }
    }catch (err) {
        process.env.NODE_ENV == "development" && console.log('error in reverifyRazorpayPayment controller', err);
        res.status(500).json({ error: err.message });
    }
}