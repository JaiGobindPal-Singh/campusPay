import express from "express";
import { studentLogin, accountantLogin, adminLogin } from "../controllers/auth.controller.js";
const router = express.Router();

// Route for student login
router.post("/student", studentLogin);

// Route for accountant login
router.post("/accountant", accountantLogin);

// Route for admin login
router.post("/admin", adminLogin);

export default router;
