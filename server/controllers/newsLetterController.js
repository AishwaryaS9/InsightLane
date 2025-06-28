import Subscriber from "../models/Subscriber.js";
import { transporter } from "../utils/emailUtil.js";

export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        let subscriber = await Subscriber.findOne({ email });
        if (subscriber) {
            if (subscriber.isSubscribed) {
                return res.status(400).json({ success: false, message: "You are already subscribed" });
            } else {
                subscriber.isSubscribed = true;
                await subscriber.save();
                return res.json({ success: true, message: "Subscription reactivated" });
            }
        }

        await Subscriber.create({ email });

        const emailContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                <h1 style="color: #69B99D;">InsightLane</h1>
                <p>Hello,</p>
                <p>Thank you for subscribing to our weekly newsletter!</p>
                <p>You’ll receive the latest updates, blogs, and insights directly to your inbox.</p>
                <p>If you have any questions, feel free to reply to this email.</p>
                <p>Thank you,<br>The InsightLane Team</p>
            </div>
        `;

        await transporter.sendMail({
            from: `"InsightLane" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Subscription Confirmation",
            html: emailContent,
        });

        res.json({ success: true, message: "Subscribed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
