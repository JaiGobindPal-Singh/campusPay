import { generateTokenForStudent, verifyToken, generateTokenForAccountant } from "../../../lib/jwt.js";
import { DbFunctions } from "../../../lib/db.js";
import { verifyPassword } from "../../../lib/bcrypt.js";
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
}
export const studentLogin = async (req, res) => {
    try {
        const { rollNo, mobile } = req.body;

        //checking if roll number and mobile number are provided
        if (!rollNo || !mobile) {
            return res.status(400).json({ message: "Roll number and mobile number are required" });
        }
        //fetching the studend data from the database
        const student = await DbFunctions.getStudentDetails(rollNo, mobile);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        //sending the response with student data and setting a cookie
        const token = await generateTokenForStudent({
            rollNo: student.rollNo,
            mobile: student.mobile,
        });
        res.cookie("student",token,cookieOptions);
        res.status(200).json({
            message: "Student login successful",
            data: {
                rollNo: student.rollNo,
                name: student.name,
                mobile: student.mobile,
                pendingFees: student.pendingFees,
                fine: student.fine,
                class: student.degree,
            }
        })
    } catch (err) {
        process.env.NODE_ENV == "development" && console.log('error in student login controller');
        res.status(500).json({ error:err});
    }
};
export const accountantLogin = async (req, res) => {
    try {

        //checking if the request body has username and password
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Accountant username and password are required" });
        }


        //fetching the accountant data from the database
        const accountant = await DbFunctions.getAccountantDetails(username);
        if (!accountant) {
            return res.status(404).json({ message: "Accountant not found" });
        }
        const isPasswordMatch = verifyPassword(password, accountant.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        //sending the response with accountant data and setting a cookie
        const token =generateTokenForAccountant({
            username: accountant.username,
            fullname: accountant.fullname,
            mobile: accountant.mobile,
        })
        res.cookie("accountant",token,cookieOptions);
        return res.status(200).json({
            message: "Accountant login successful",
            data: {
                username: accountant.username,
                fullname: accountant.fullname,
                mobile: accountant.mobile,
            }
        });
    } catch (err) {
        process.env.NODE_ENV == "development" && console.log('error in accountant login controller', err);
        res.status(400).json({ error:err.message });
    }
};
export const adminLogin = (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        if (username != process.env.uuuuad || password != process.env.password) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // Generate a token for the admin [using the same function as accountant]
        const generateTokenForAdmin = generateTokenForAccountant;
        const token = generateTokenForAdmin({
            username: process.env.uuuuad,
            fullname: "Admin",
            mobile: "0000000000",
        });
        res.cookie("admin", token,cookieOptions);
        return res.status(200).json({
            message: "Admin login successful",
            data: {
                username: process.env.uuuuad,
                fullname: "Admin",
                mobile: "0000000000",
            }
        });
    } catch (err) {
        process.env.NODE_ENV == "development" && console.log('error in admin login controller', err);
        return res.status(500).json({ error:err.message });
    }
}
export const clerkLogin = async (req, res) => {
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({ message: "Username and password are required" });
        }
        //fetching the clerk data from the database
        const clerk =await DbFunctions.getClerkDetails(username);
        if(!clerk){
            return res.status(404).json({ message: "Clerk not found" });
        }
        process.env.NODE_ENV == "development" && console.log(clerk)
        const isPasswordMatch = verifyPassword(password, clerk.password);
        if(!isPasswordMatch){
            return res.status(401).json({ message: "Invalid username or password" });
        }
        //sending the response with clerk data and setting a cookie
        const generateTokenForClerk = generateTokenForAccountant;
        const token = generateTokenForClerk({
            username: clerk.username,
            fullname: clerk.fullname,
            mobile: clerk.mobile,
        });
        res.cookie("clerk",token,cookieOptions);
        return res.status(200).json({
            message: "Clerk login successful",
            data: {
                username: clerk.username,
                fullname: clerk.fullname,
                mobile: clerk.mobile,
            }
        });

    }catch(err){
        process.env.NODE_ENV == "development" && console.log('error in clerk login controller', err);
        return res.status(500).json({ error:err.message});
    }
}