import { verifyToken } from "../lib/jwt.js";

export const validateStudent = (req, res, next) => {
    try{
        // Check if the student token is present in cookies
        const studentToken = req.cookies.student;
        
        if (!studentToken) {
            return res.status(401).json({ message: "Unauthorized access, please login" });
        }
        // Verify the token and extract student data
        const studentData = verifyToken(studentToken);
        if (!studentData) {
            return res.status(401).json({ message: "Invalid token, please login again" });
        }
        req.student = studentData; // Attach student data to the request object for further use
        next();
    }catch(err){
        console.log('error in validateStudent middleware', err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const validateAccountant = (req, res, next) => {
    try{
        const accountantToken = req.cookies.accountant;
        if (!accountantToken) {
            return res.status(401).json({ message: "Unauthorized access, please login" });
        }
        // Verify the token and extract accountant data
        const accountantData = verifyToken(accountantToken);
        if( !accountantData) {
            return res.status(401).json({ message: "Invalid token, please login again" });
        }
        req.accountant = accountantData; // Attach accountant data to the request object for further use
        next();
    }catch(err){
        console.log('error in validateAccountant middleware', err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
