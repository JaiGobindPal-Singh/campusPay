import express from 'express';
import { validateStudent } from '../middlewares/protectRoute.js';
import { payFees, getPreviousTransactions, verifyPaymentController }from '../controllers/student.controller.js';
const router = express.Router();


router.post('/payfees',validateStudent,payFees);
router.post('/previoustransactions',validateStudent,getPreviousTransactions);
router.post('/verify-payment',validateStudent,verifyPaymentController);

export default router;