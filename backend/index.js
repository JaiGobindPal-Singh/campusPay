import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./shared/features/loginFeature/routes/auth.routes.js";
import studentRoutes from "./modules/studentModule/routes/student.routes.js";
import clerkRoutes from "./modules/clerkModule/routes/clerk.routes.js";
import adminRoutes from "./modules/adminModule/routes/admin.routes.js"
import accountantRoutes from "./modules/accountantModule/routes/accountant.routes.js";
import { connectDB } from "./shared/lib/db.js";
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
app.use('/api/accountant',accountantRoutes);
app.use('/api/clerk',clerkRoutes);
app.use('/api/admin',adminRoutes)

app.get("/", (req, res) => {
    res.send("Welcome to the CMS Backend!");
});






app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});