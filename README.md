# InsightLane - MERN Stack Blog Application

## 🚀 Project Overview

**InsightLane** is a feature-rich blog application built using the **MERN** Stack (MongoDB, Express.js, React, Node.js). It supports role-based functionality for Admins, Authors, and Readers, ensuring a versatile and engaging blogging experience.

---

## 🌐 Live URL & Repository

- **Live Application**: [https://insight-lane-blog.vercel.app/](https://insight-lane-blog.vercel.app/)
- **GitHub Repository**: [https://github.com/AishwaryaS9/InsightLane.git](https://github.com/AishwaryaS9/InsightLane.git)

---

## 🚪 Login Credentials

To access the Admin Dashboard and explore the full features of InsightLane, use these credentials:

- Email: insightlane@yopmail.com
- Password: admin123

To access the Author Dashboard and explore the full features of InsightLane, use these credentials:

- Email: henry@yopmail.com
- Password: henry123

To login as a Reader, use these credentials:

- Email: hitesh@yopmail.com
- Password: hitesh1234

---

## ✨ Features

### General User Features

- **User Authentication:**

  - **Signup:** Users can create an account by entering their name, email, password, and selecting a role (Reader/Author). Input validation ensures proper email and password format, and users receive instant feedback via toast notifications. Successful registration redirects to the login page.

  - **Login:** Users can log in with their email and password. Features include "Remember Me" for saving email, password visibility toggle, and responsive error handling for invalid credentials. Successful login dispatches user data and navigates to the home page.

  - **Forgot Password:** Users can reset their password by providing their registered email. On clicking "Send Email," the system validates the email and sends a reset link to the user's email address. Instant feedback via toast notifications indicates success or errors.

  - **Reset Password:** Users can set a new password using the reset link provided in their email. After validating the reset token, users enter a new password and confirm it. Mismatched passwords trigger an error notification. Upon successful password reset, users are redirected to the login page.

- **Pagination & Categories:** This feature organizes and displays blogs by categories, with features like dynamic data fetching, search functionality, and pagination. It uses a responsive grid layout for blog cards, offers interactive animations for category selection, and provides feedback when no blogs match the filters.

- **Blog Details:** This feature provides a comprehensive view of a selected blog, showcasing its main content, enabling users to interact through comments, and offering recommendations for related blogs. It ensures seamless navigation, real-time updates, and an enriched user experience.

- **Dashboard:** The Admin Dashboard provides a centralized interface for managing blogs, displaying key metrics like blog counts, comments, and drafts. Recent blogs are shown in a table format with options to publish, unpublish, or delete, supported by confirmation modals. A modal allows users to view detailed blog information, including the title, publication date, author, and full content, enhancing management efficiency.

- **Add Blog:** This feature allows users to create blog posts with ease, utilizing a Quill-powered editor for descriptions and **Gemini API (@google/genai)** for generating AI-assisted content based on titles. It ensures smooth validation, error handling, and seamless submission to the server.

- **Blog Lists:** This feature provides a paginated table to browse and manage blogs efficiently. Users can view detailed blog content through a modal and navigate seamlessly across pages with dynamic data fetching and error handling.

- **Comments:** This feature enables administrators to oversee and moderate blog comments efficiently. Only authenticated users can submit comments, ensuring a secure and accountable environment. Administrators can filter comments by approval status, review details, and perform actions such as approval or disapproval to maintain content quality.

- **Users:** This feature allows administrators to oversee platform users effectively, categorized by roles such as admins, authors, and readers. Admins can securely delete non-admin users through a confirmation-based workflow, ensuring responsible and streamlined user moderation.

- **My Profile:** This feature enables users to manage their personal information effectively. The interface displays key user details along with options to update personal details or modify security credentials through dedicated interfaces. Users can seamlessly make changes, ensuring validation and feedback throughout the process, with features like social link updates and visual customization, delivering a user-friendly and accessible experience.

- **Author Dashboard:** The AuthorDashboard provides authors with a clear and concise overview of their blogging activity, showcasing metrics such as total blogs, drafts, comments, and approved comments in an intuitive and visually engaging layout. It is designed to ensure an efficient and user-friendly experience for authors monitoring their content performance.

- **My Blogs:** This feature provides authors with a dedicated space to view and manage their blog posts, including options to preview and edit individual blogs seamlessly, ensuring an efficient and user-friendly experience.

- **Newsletter Subscription:** Stay engaged and inspired by subscribing to weekly newsletter, sent every Sunday at 7 PM. Users will receive the latest updates, curated stories, and exclusive insights directly into their inbox.

- **Logout**: The logout functionality clears all session data from Redux, and redirects the user to the login page. It also provides feedback to the user through a success notification, ensuring a smooth and clear logout process.

- **Responsive Design**: Delivers a seamless browsing experience by adapting flawlessly to various screen sizes, ensuring optimal usability and aesthetics across all devices.

---

## 🛠️ Tech Stack

### Core Technologies:

- **Frontend**: React.js, TypeScript, and Vite

- **State Management**: Redux Toolkit

- **Styling**: Tailwind CSS

- **Animations**: framer-motion

- **Icons**: react-icons

- **Text Editor**: Quill.js for content creation and AI-assisted blog generation

- **API Integration**: Axios for seamless backend communication

- **Backend**: Node.js with Express.js for server-side logic and APIs

- **AI Content Generation**: Gemini API (@google/genai) to generate intelligent and tailored content

- **Database**: MongoDB for a flexible and scalable NoSQL database

- **Authentication**: JSON Web Tokens (JWT) for secure authentication

- **Email Service:** NodeMailer for password resets and newsletters

- **File Uploads**: Multer for handling file uploads and Image Kit for storing images

### Deployment:

- Frontend: Hosted on [Vercel](https://vercel.com/) for fast, reliable, and scalable deployment.

- Backend: Hosted on [Vercel](https://vercel.com/) to provide robust and scalable server-side support.

---

## 📂 Project Structure

```
InsightLane/
├── .gitignore
├── client/
│   ├── .env
│   ├── .gitignore
│   ├── dist/
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── preview-image.jpg
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
│   │   ├── config/
│   │   │   ├── firebase.ts
│   │   ├── hooks/
│   │   │   ├── useAnalytics.ts
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
│   │   │   │   │   ├── registerSlice.ts
│   │   │   │   │   ├── userProfileSlice.ts
│   │   ├── types/
│   │   │   ├── global.d.ts
│   │   ├── utils/
│   │   │   ├── interface.ts
│   │   │   ├── regex.ts
│   │   ├── vite-env.d.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vercel.json
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
    cd InsightLane
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
