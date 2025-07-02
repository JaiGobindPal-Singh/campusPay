import { generateTokenForStudent, verifyToken, generateTokenForAccountant } from "../lib/jwt.js";
import { DbFunctions } from "../lib/db.js";
import { verifyAccountantPassword } from "../lib/bcrypt.js";
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
        res.cookie("student", token);
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
        console.log('error in student login controller');
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
        const accountant = await DbFunctions.getAccountantDetails(username, password);
        if (!accountant) {
            return res.status(404).json({ message: "Accountant not found" });
        }
        const isPasswordMatch = verifyAccountantPassword(password, accountant.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        //sending the response with accountant data and setting a cookie
        res.cookie("accountant", generateTokenForAccountant({
            username: accountant.username,
            fullname: accountant.fullname,
            mobile: accountant.mobile,
        }));
        return res.status(200).json({
            message: "Accountant login successful",
            data: {
                username: accountant.username,
                fullname: accountant.fullname,
                mobile: accountant.mobile,
            }
        });
    } catch (err) {
        console.log('error in accountant login controller', err);
    }
};

export const adminLogin = (req, res) => {
    try {

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        if (username != process.env.uuuuad || password != process.env.password) {
            console.log(username, process.env.uuuuad, password, process.env.password);
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // Generate a token for the admin [using the same function as accountant]
        const token = generateTokenForAccountant({
            username: process.env.username,
            fullname: "Admin",
            mobile: "0000000000",
        });
        res.cookie("admin", token);
        return res.status(200).json({
            message: "Admin login successful",
            data: {
                username: process.env.username,
                fullname: "Admin",
                mobile: "0000000000",
            }
        });
    } catch (err) {
        console.log('error in admin login controller', err);
        return res.status(500).json({ message: "Internal server error" });
    }
}