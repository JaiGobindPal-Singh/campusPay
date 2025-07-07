import { verifyToken } from "../../../shared/lib/jwt.js";

export const validateAdmin = (req, res, next) => {
    try {
        // Check if the request has a valid admin cookie
        const adminCookie = req.cookies.admin;
        if (!adminCookie) {
            return res.status(403).json({ message: "Access denied. Admin authentication required." });
        }
        const admin = verifyToken(adminCookie);
        if (!admin) {
            return res.status(403).json({ message: "Invalid admin authentication token. login again" });
        }
        // If the cookie is present, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log("Error in admin validation middleware:", error);
        return res.status(500).json({ error: error.message });
    }
}