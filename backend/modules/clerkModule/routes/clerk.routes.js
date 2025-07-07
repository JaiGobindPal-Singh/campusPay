import express from 'express';
import { addNewCourse, updateFees,addNewStudent, getCurrentClerkDetails } from '../controllers/clerk.controller.js';
import { validateClerk } from '../middlewares/protectRoute.js';
const router = express.Router();


router.post('/addNewCourse',validateClerk, addNewCourse);
router.post('/updatecoursefees',validateClerk, updateFees);
router.post('/addNewStudent',validateClerk, addNewStudent);
router.post('/getCurrentClerkDetails', validateClerk, getCurrentClerkDetails);
export default router;