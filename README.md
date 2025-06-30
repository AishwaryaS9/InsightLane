# InsightLane - MERN Stack Blog Application

## 🚀 Project Overview

**InsightLane** is a feature-rich blog application built using the MERN stack (MongoDB, Express.js, React, Node.js). It supports role-based functionality for Admins, Authors, and Readers, ensuring a versatile and engaging blogging experience.

---

## 🌐 Live URL & Repository

- **Live Application**: []()
- **GitHub Repository**: [https://github.com/AishwaryaS9/InsightLane.git](https://github.com/AishwaryaS9/InsightLane.git)

---

## 🚪 Admin Login Credentials

To access the Admin Dashboard and explore the full features of InsightLane, use the following login details:

- Email: insightlane@yopmail.com
- Password: admin123

---

## ✨ Features

### General User Features

- **Register & Login:** Register and log in as a Reader, Author, or Admin.

- **Profile Management:** View and update profile information, including the ability to change the password.

- **Forgot Password:** Reset your password via email and deep linking.

- **Remember Me:** Option to remember email ID for easy login.

- **Pagination & Categories:** Blogs displayed with pagination and category-based filtering.

- **Blog Details:** View detailed blogs with related blog suggestions.

- **AI Description Generation:** Gemini API (@google/genai) for blog description generation

- **Comments:** Write comments on blogs (login required).

- **Newsletter Subscription:** Subscribe to a weekly newsletter sent every Sunday at 7 PM.

### Reader Features

- **Read Blogs:** Browse and read published blogs.

- **Write Comments:** Add comments to blogs.

### Author Features

- **Write Blogs:** Create and submit blogs for Admin approval.

- **My Blogs Section:** View authored blogs, including unpublished drafts.

- **Edit Blogs:** Update existing blogs.

- **Author Dashboard:** Access detailed analytics on authored blogs.

### Admin Features

- **Blog Management:** Approve or disapprove blogs submitted by Authors.

- **Comment Moderation:** Approve or disapprove comments on blogs.

- **User Management:** View, manage, and delete users if necessary.

- **Blog Writing:** Write blogs and add comments.

- **Admin Dashboard:** View detailed analytics and manage the platform effectively.

### Additional Features

- **Contact Information:** View website contact details on the Contact page.

- **About Us:** Learn more about InsightLane and subscribe to the newsletter.

- **Logout**: The logout functionality clears all session data from Redux, and redirects the user to the login page. It also provides feedback to the user through a success notification, ensuring a smooth and clear logout process.

- **Responsive Design**: Ensures the app adapts smoothly to different screen sizes, providing an optimal experience on all devices.

---

## 🛠️ Tech Stack

### Core Technologies:

- **Frontend**: React.js, Vite

- **State Management**: Redux Toolkit

- **Styling**: Tailwind CSS

- **Animations**: framer-motion

- **Icons**: react-icons

- **API Integration**:

- **Backend**: Node.js with Express.js for server-side logic and APIs

- **Database**: MongoDB for a flexible and scalable NoSQL database

- **Authentication**: JSON Web Tokens (JWT) for secure authentication

- **Email Service:** NodeMailer for password resets and newsletters

- **File Uploads**: Multer for handling file uploads and Image Kit for storing Images

### Deployment:

- Frontend: Hosted on [Vercel](https://vercel.com/) for fast, reliable, and scalable deployment.

- Backend: Hosted on [Render](https://render.com/) to provide robust and scalable server-side support.

---

## 📂 Project Structure

```
InsightLane/
├── client/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── vite.svg
│   ├── README.md
│   ├── src/
│   │   ├── api/
│   │   │   ├── blogApi.ts
│   │   │   ├── dashboardApi.ts
│   │   │   ├── endPoint.ts
│   │   │   ├── newsLetterApi.ts
│   │   │   ├── userApi.ts
│   │   ├── App.tsx
│   │   ├── assets/
│   │   │   ├── assets.ts
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── BlogTableItem.tsx
│   │   │   │   ├── CommentTableItem.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── UserCard.tsx
│   │   │   ├── AlertModal.tsx
│   │   │   ├── author/
│   │   │   │   ├── AuthorSidebar.tsx
│   │   │   │   ├── BlogAuthorTableItem.tsx
│   │   │   │   ├── BlogModal.tsx
│   │   │   │   ├── EditBlogModal.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogCategories.tsx
│   │   │   ├── ChangePasswordModal.tsx
│   │   │   ├── EditProfileModal.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── ProfileModal.tsx
│   │   │   ├── ProfilePhotoSelector.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── pages/
│   │   │   ├── About.tsx
│   │   │   ├── admin/
│   │   │   │   ├── Comments.tsx
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Layout.tsx
│   │   │   │   ├── ListBlog.tsx
│   │   │   │   ├── Users.tsx
│   │   │   ├── author/
│   │   │   │   ├── AddBlog.tsx
│   │   │   │   ├── AuthorDashboard.tsx
│   │   │   │   ├── MyBlogs.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── ResetPassword.tsx
│   │   ├── redux/
│   │   │   ├── store/
│   │   │   │   ├── hooks.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── slice/
│   │   │   │   │   ├── loginSlice.ts
│   │   │   │   │   ├── userProfileSlice.ts
│   │   ├── utils/
│   │   │   ├── interface.ts
│   │   │   ├── regex.ts
│   │   ├── vite-env.d.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
├── README.md
├── server/
│   ├── .env
│   ├── .gitignore
│   ├── configs/
│   │   ├── db.js
│   │   ├── gemini.js
│   │   ├── imageKit.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── blogController.js
│   │   ├── newsLetterController.js
│   │   ├── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── multer.js
│   │   ├── roleMiddleware.js
│   ├── models/
│   │   ├── Blog.js
│   │   ├── Comment.js
│   │   ├── Subscriber.js
│   │   ├── User.js
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   ├── logo.svg
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── blogRoutes.js
│   │   ├── newsLetterRoutes.js
│   │   ├── userRoutes.js
│   ├── schedulers/
│   │   ├── newLetterScheduler.js
│   ├── server.js
│   ├── utils/
│   │   ├── emailUtil.js
│   ├── vercel.json

```

## 🚀 Getting Started

### Setup:

1.  Clone the repository:

    ```bash
    git clone https://github.com/AishwaryaS9/InsightLane.git
    ```

2.  Navigate to the project directory:
    ```bash
    cd insightlane
    ```
3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Set up environment variables:
    Create a .env file in the root directory and add the following:

        cd server

    ```bash
    MONGODB_URI=your_mongodb_uri
    PORT=your_port_no
    JWT_SECRET=your_jwt_secret
    IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
    IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
    IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
    GEMINI_API_KEY=your_gemini_api_key
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_password
    CLIENT_URL=your_client_url
    ```

5.  Run the application:

    ```bash
    npm run dev
    ```

6.  Open [http://localhost:5173](http://localhost:5173) in your browser to see the app.

## 🎯 Conclusion

InsightLane is a comprehensive platform that caters to the diverse needs of blog enthusiasts, whether they are Readers, Authors, or Admins. With its robust features, seamless user experience, and powerful analytics, InsightLane ensures that creating, reading, and managing blogs is effortless and enjoyable. The integration of modern technologies like the Gemini API for AI-driven blog description generation further enhances its capabilities, making it a must-have platform for blogging communities.
