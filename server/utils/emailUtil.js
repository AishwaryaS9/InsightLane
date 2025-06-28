import nodemailer from "nodemailer";

const createTransporter = () => {
    return nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

export const transporter = createTransporter();