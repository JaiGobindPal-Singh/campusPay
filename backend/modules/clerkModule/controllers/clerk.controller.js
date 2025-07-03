import { DbFunctions } from "../../../shared/lib/db.js";
export const addNewCourse = async (req, res) => {
    try{
        const { course, fees } = req.body;
        if (!course || !fees) {
            return res.status(400).json({ message: "Course name and fees are required" });
        }
        await DbFunctions.defineDegreeFees(courseName, fees);
        res.status(201).json({ message: "Course added successfully" });
    }catch(err){
        console.log("Error in addNewCourse:", err);
        res.status(500).json({ message: "Internal server error" });
    }
    
}
export const updateFees = async (req, res) => {
    try{
        const { course, fees } = req.body;
        if (!course || !fees) {
            return res.status(400).json({ message: "Course name and fees are required" });
        }
        await DbFunctions.defineDegreeFees(courseName, fees);
        res.status(201).json({ message: "fees updated" });
    }catch(err){
        console.log("Error in update fees:", err);
        res.status(500).json({ message: "Internal server error" });
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
            return res.status(400).json({ message: "Student already exists or some internal error" });
        }
        res.status(201).json({ message: "Student added successfully", data: student });
    }catch(err){
        console.log("Error in addNewStudent:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}