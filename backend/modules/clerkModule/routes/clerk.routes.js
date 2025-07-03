import express from 'express';
import { addNewCourse, updateFees,addNewStudent } from '../controllers/clerk.controller.js';
import { validateClerk } from '../middlewares/protectRoute.js';
const router = express.Router();


router.post('/addNewCourse',validateClerk, addNewCourse);
router.post('/updateFees',validateClerk, updateFees);
router.post('/addNewStudent',validateClerk, addNewStudent);

export default router;