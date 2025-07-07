import { verifyToken } from "../../../shared/lib/jwt.js";
export const validateClerk = (req, res, next) => {
    try{
        const clerkToken = req.cookies.clerk;
        if (!clerkToken) {
            return res.status(401).json({ message: "Unauthorized access, please login" });
        }
        // Verify the token and extract clerk data
        const clerkData = verifyToken(clerkToken);
        if( !clerkData) {
            return res.status(401).json({ message: "Invalid token, please login again" });
        }
        req.clerk = clerkData; // Attach clerk data to the request object for further use
        next();
    }catch(err){
        process.env.NODE_ENV == "development" && console.log('error in validateclerk middleware', err);
        return res.status(500).json({ error: err.message });
    }
}