import { DbFunctions } from "../../../shared/lib/db.js";
export const addNewCourse = async (req, res) => {
    try{
        const { course, fees } = req.body;
        if (!course || !fees) {
            return res.status(400).json({ message: "Course name and fees are required" });
        }
        const result = await DbFunctions.defineDegreeFees(course, fees);
        res.status(201).json({
            message: "Course added successfully",
            result
        });
    }catch(err){
        process.env.NODE_ENV == "development" && console.log("Error in addNewCourse:", err);
        res.status(500).json({ error:err.message});
    }
    
}
export const updateFees = async (req, res) => {
    try{
        const { course, fees } = req.body;
        if (!course || !fees) {
            return res.status(400).json({ message: "Course name and fees are required" });
        }
        const result = await DbFunctions.defineDegreeFees(course, fees);
        res.status(201).json({
            message: "fees updated",
            result
        });
    }catch(err){
        process.env.NODE_ENV == "development" && console.log("Error in update fees:", err);
        res.status(500).json({ error:err.message });
    }
    
}
export const addNewStudent = async (req, res) => {
    try{
        const { rollNo, name, mobile, degree } = req.body;
        if (!rollNo || !name || !mobile || !degree) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const student = await DbFunctions.addNewStudent(rollNo, name, mobile, degree);
        if (!student) {
            return res.status(400).json({ message: "entered degree does not exist" });
        }
        res.status(201).json({ message: "Student added successfully", data: student });
    }catch(err){
        process.env.NODE_ENV == "development" && console.log("Error in addNewStudent:", err);
        res.status(500).json({ error:err.message });
    }
}
export const getCurrentClerkDetails = (req, res) => {
    try {
        const clerk = req.clerk; // accessing clerk data from the request object
        if (!clerk) {
            return res.status(404).json({ message: "Clerk not found" });
        }
        res.status(200).json({
            message: "Current clerk details fetched successfully",
            data: {
                username: clerk.username,
                fullname: clerk.fullname,
                mobile: clerk.mobile,
            }
        });
    } catch (err) {
        process.env.NODE_ENV == "development" && console.log("Error in getCurrentClerkDetails:", err);
        res.status(500).json({ error: err.message });
    }
}