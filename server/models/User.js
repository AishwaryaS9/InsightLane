import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["reader", "author", "admin"], default: "reader" },
    bio: { type: String },
    profilePicture: { type: String },
    socialLinks: {
        facebook: { type: String },
        twitter: { type: String },
        linkedin: { type: String },
    },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    deleted: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
