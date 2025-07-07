import express from 'express';
import { validateStudent } from '../middlewares/protectRoute.js';
import { payFees, getPreviousTransactions, verifyPaymentController, getCurrentStudentDetails, reverifyPaymentController }from '../controllers/student.controller.js';
const router = express.Router();


router.post('/payfees',validateStudent,payFees);
router.post('/previoustransactions',validateStudent,getPreviousTransactions);
router.post('/verify-payment',validateStudent,verifyPaymentController);
router.post('/getCurrentStudentDetails',validateStudent, getCurrentStudentDetails);
router.post('/reverify-payment', validateStudent, reverifyPaymentController);
export default router;