import express from "express";
import { createNewClerk,createNewAccountant } from "../controllers/admin.controller.js";
import { validateAdmin } from "../middlewares/protectRoute.js";
const router = express.Router();

router.post('/create-accountant',validateAdmin, createNewAccountant);
router.post('/create-clerk',validateAdmin, createNewClerk);

export default router;