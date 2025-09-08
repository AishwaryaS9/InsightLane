import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PiNotebook } from "react-icons/pi";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiHome3Line } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { analytics, logEvent } from "../../config/firebase";

const AuthorSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const trackAuthorSidebarEvent = (action: string, extra: Record<string, any> = {}) => {
        if (analytics) {
            logEvent(analytics, "author_sidebar", {
                action,
                ...extra,
            });
        }
    };

    return (
        <div className="relative">
            {/* Hamburger Menu Button for Smaller Screens */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-100 rounded-full shadow-md"
                onClick={() => {
                    setIsOpen(!isOpen);
                    trackAuthorSidebarEvent(isOpen ? "menu_closed" : "menu_opened");
                }}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
                aria-controls="author-sidebar"
            >
                {isOpen ? <IoClose className="w-6 h-6 text-gray-700" aria-hidden="true" /> : <HiMenuAlt3 className="w-6 h-6 text-gray-700" aria-hidden="true" />}
            </button>

            {/* Sidebar */}
            <nav id="author-sidebar"
                role="navigation"
                aria-label="Author Navigation"
                className={`fixed md:relative top-0 left-0 h-screen bg-white  transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 md:z-auto flex flex-col border-r border-gray-200 min-h-full w-64`}
            >
                <NavLink to='/author' end={true}
                    onClick={() => trackAuthorSidebarEvent("navigate_dashboard")}
                    className={({ isActive }) => `flex items-center gap-4 py-3.5 px-4
                cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`} >
                    <RiHome3Line className="w-6" aria-hidden="true" />
                    <p className="text-base">Dashboard</p>
                </NavLink>

                <NavLink to='/author/addBlog' onClick={() => trackAuthorSidebarEvent("navigate_add_blog")}
                    className={({ isActive }) => `flex items-center gap-4 py-3.5 px-4
                cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`} >
                    <MdOutlinePostAdd className="w-6" aria-hidden="true" />
                    <p className="text-base">Add Blogs</p>
                </NavLink>

                <NavLink to='/author/myBlogs' onClick={() => trackAuthorSidebarEvent("navigate_my_blogs")}
                    className={({ isActive }) => `flex items-center gap-4 py-3.5 px-4
                cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`} >
                    <PiNotebook className="w-6" aria-hidden="true" />
                    <p className="text-base">My Blogs</p>
                </NavLink>

                <NavLink to='/author/profile' onClick={() => trackAuthorSidebarEvent("navigate_profile")}
                    className={({ isActive }) => `flex items-center gap-4 py-3.5 px-4
                cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`} >
                    <BiUser className="w-6" aria-hidden="true" />
                    <p className="text-base">My Profile</p>
                </NavLink>
            </nav>

            {/* Overlay for Small Screens */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                ></div>
            )}
        </div>
    );
}

export default AuthorSidebar;
