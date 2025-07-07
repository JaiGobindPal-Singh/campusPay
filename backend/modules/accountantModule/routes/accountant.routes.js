//*This file contains the routes for the accountant module
import express from 'express';
const router = express.Router();
import { validateAccountant } from '../middlewares/protectRoute.js';
import { payFees, getPreviousTransactions, printReceipt,addFine, scholarship, getStudentDetails, getCurrentAccountantDetails } from '../controllers/accountant.controller.js';
import { get } from 'http';


router.post('/studentdetails',validateAccountant,getStudentDetails);
router.post('/payfees',validateAccountant,payFees);
router.post('/previoustransactions',validateAccountant,getPreviousTransactions);
router.post('/printreceipt',validateAccountant,printReceipt);
router.post('/addfine',validateAccountant,addFine);
router.post('/scholarship',validateAccountant,scholarship);
router.post('/getCurrentAccountantDetails',validateAccountant, getCurrentAccountantDetails);

export default router;