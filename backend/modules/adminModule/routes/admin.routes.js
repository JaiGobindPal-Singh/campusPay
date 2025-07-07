import express from "express";
import { createNewClerk,createNewAccountant, getCurrentAdminDetails } from "../controllers/admin.controller.js";
import { validateAdmin } from "../middlewares/protectRoute.js";
const router = express.Router();

router.post('/create-accountant',validateAdmin, createNewAccountant);
router.post('/create-clerk',validateAdmin, createNewClerk);
router.post('/getCurrentAdminDetails', validateAdmin, getCurrentAdminDetails);
export default router;