//*This file contains the routes for the accountant module
import express from 'express';
const router = express.Router();
import { validateAccountant } from '../middlewares/protectRoute.js';
import { payFees, getPreviousTransactions, printReciept,addFine, scholarship } from '../controllers/accountant.controller.js';


router.post('/payfees',validateAccountant,payFees);
router.post('/previoustransactions',validateAccountant,getPreviousTransactions);
router.post('/printreciept',validateAccountant,printReciept);
router.post('/addfine',validateAccountant,addFine);
router.post('/scholarship',validateAccountant,scholarship);

export default router;