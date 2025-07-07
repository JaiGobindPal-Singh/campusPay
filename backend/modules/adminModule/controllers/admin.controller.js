import { DbFunctions } from "../../../shared/lib/db.js";
export const createNewAccountant = async (req, res) => {
    try {
        // Extracting data from the request body
        const { username, fullname, mobile, password } = req.body;

        // Validating the input data
        if (!username || !fullname || !mobile || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Creating a new accountant using the DbFunctions
        const newAccountant = await DbFunctions.createNewAccountant(username, fullname, mobile, password);
        if(!newAccountant) {
            return res.status(400).json({ message: "Error creating the accountant" });
        }
        // Sending a success response
        return res.status(201).json({
            message: "Accountant created successfully",
            data: {
                username: newAccountant.username,
                fullname: newAccountant.fullname,
                mobile: newAccountant.mobile,
            },
        });
    } catch (error) {
        process.env.NODE_ENV == "development" && console.log("Error creating accountant:", error);
        return res.status(500).json({error:error.message});
    }
}
export const createNewClerk = async (req, res) => {
    try {
        // Extracting data from the request body
        const { username, fullname, mobile, password } = req.body;

        // Validating the input data
        if (!username || !fullname || !mobile || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Creating a new clerk using the DbFunctions
        const newClerk = await DbFunctions.createNewClerk(username, fullname, mobile, password);
        if(!newClerk) {
            return res.status(400).json({ message: "error creating the clerk" });
        }
        // Sending a success response
        return res.status(201).json({
            message: "Clerk created successfully",
            data: {
                username: newClerk.username,
                fullname: newClerk.fullname,
                mobile: newClerk.mobile,
            },
        });
    } catch (error) {
        process.env.NODE_ENV == "development" && console.log("Error creating clerk:", error);
        return res.status(500).json({ error: error.message });
    }
}
export const getCurrentAdminDetails = (req, res) => {
    try {
        // Admin details are hardcoded in the environment variables
        const adminDetails = {
            username:req.admin.username,
            fullname: req.admin.fullname,
            mobile: req.admin.mobile
        };
        res.status(200).json({
            message: "Admin details fetched successfully",
            data: adminDetails
        });
    } catch (err) {
        process.env.NODE_ENV == "development" && console.log('error in getCurrentAdminDetails controller', err);
        res.status(500).json({ error: err.message });
    }
}