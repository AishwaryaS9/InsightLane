// import jwt from 'jsonwebtoken'

// const auth = (req, res, next) => {
//     const token = req.headers.authorization;
//     try {
//         jwt.verify(token, process.env.JWT_SECRET)
//         next();
//     } catch (error) {
//         res.json({ success: false, message: "Invalid token" })
//     }
// }

// export default auth;

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export default auth;
