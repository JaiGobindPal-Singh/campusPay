import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import studentRoutes from "./routes/student.routes.js";
import { connectDB } from "./lib/db.js";
config();
const app = express();
const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGOURI)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use('/api/login',authRoutes);
app.use('/api/student',studentRoutes);


app.get("/", (req, res) => {
    res.send("Welcome to the CMS Backend!");
});






app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});