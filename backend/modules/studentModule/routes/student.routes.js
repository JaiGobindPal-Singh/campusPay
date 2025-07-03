import express from 'express';
import { validateStudent } from '../middlewares/protectRoute.js';
import { payFees, getPreviousTransactions, printReciept }from '../controllers/student.controller.js';
const router = express.Router();


router.post('/payfees',validateStudent,payFees);
router.post('/previoustransactions',validateStudent,getPreviousTransactions);
router.post('/printreciept',validateStudent,printReciept);

export default router;