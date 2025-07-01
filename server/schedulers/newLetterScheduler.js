import cron from "node-cron";
import Subscriber from "../models/Subscriber.js";
import Blog from "../models/Blog.js";
import { transporter } from "../utils/emailUtil.js";

cron.schedule("0 8 * * 0", async () => { 
    try {
        console.log("Starting weekly newsletter job...");

        const subscribers = await Subscriber.find({ isSubscribed: true });
        if (!subscribers.length) {
            console.log("No subscribers found.");
            return;
        }

        const latestBlogs = await Blog.find({ isPublished: true })
            .sort({ createdAt: -1 })
            .limit(5);

        if (!latestBlogs.length) {
            console.log("No blogs available for the newsletter.");
            return;
        }

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

        const blogList = latestBlogs.map(blog =>
            `<li><a href="${clientUrl}/blog/${blog._id}">${blog.title}</a></li>`
        ).join("");

        const emailContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                <h1 style="color: #69B99D;">Weekly Newsletter</h1>
                <p>Hello,</p>
                <p>Here are the latest blogs from InsightLane:</p>
                <ul>${blogList}</ul>
                <p>Thank you for subscribing,<br>The InsightLane Team</p>
            </div>
        `;

        for (const subscriber of subscribers) {
            await transporter.sendMail({
                from: `"InsightLane" <${process.env.EMAIL_USER}>`,
                to: subscriber.email,
                subject: "Weekly Newsletter",
                html: emailContent,
            });
        }

        console.log("Weekly newsletter sent successfully.");
    } catch (error) {
        console.error("Error sending weekly newsletter:", error.message);
    }
});
