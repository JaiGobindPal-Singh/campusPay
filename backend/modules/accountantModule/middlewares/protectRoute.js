import { verifyToken } from "../../../shared/lib/jwt.js";
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
        process.env.NODE_ENV == "development" && console.log('error in validateAccountant middleware', err);
        return res.status(500).json({ error: err.message });
    }
}
