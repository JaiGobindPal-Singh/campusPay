import express from 'express';
import { validateStudent } from '../middlewares/checkAuth.js';
import payFees from '../features/feesPaymentByStudent.js';
const router = express.Router();


router.post('/payfees',validateStudent,payFees);

export default router;