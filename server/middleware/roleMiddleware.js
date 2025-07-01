export const authorize = (roles) => {
    return (req, res, next) => {
        console.log("Authorize Middleware Triggered");

        if (!req.user || !req.user.role) {
            console.error("User information or role is missing from req.user");
            return res.status(403).json({ success: false, message: "Access Forbidden: User role not found" });
        }

        if (!roles.includes(req.user.role)) {
            console.error(`Access Forbidden: Role '${req.user.role}' not authorized`);
            return res.status(403).json({ success: false, message: "Access Forbidden" });
        }

        next();
    };
};
