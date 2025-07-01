import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ success: false, message: "Access Denied: No Token Provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            name: decoded.name,
            role: decoded.role,
        };

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token has expired" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(400).json({ success: false, message: "Invalid Token" });
        } else {
            return res.status(500).json({ success: false, message: "Internal Server Error during token verification" });
        }
    }
};

export default auth;
