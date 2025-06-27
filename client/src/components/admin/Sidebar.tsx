import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LiaComments } from "react-icons/lia";
import { PiNotebook } from "react-icons/pi";
import { RiHome3Line } from "react-icons/ri";
import { LuUser } from "react-icons/lu";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* Hamburger Menu Button for Smaller Screens */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-100 rounded-full shadow-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <IoClose className="w-6 h-6 text-gray-700" /> : <HiMenuAlt3 className="w-6 h-6 text-gray-700" />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed md:relative top-0 left-0 h-screen bg-white shadow-md transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 md:z-auto flex flex-col border-r border-gray-200 min-h-full w-64`}
            >
                <NavLink to='/admin' end={true}
                    className={({ isActive }) => `flex items-center gap-4 py-3.5 px-4
                cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
                    <RiHome3Line className="w-6" />
                    <p className="text-base">Dashboard</p>
                </NavLink>

                <NavLink to='/admin/listBlog'
                    className={({ isActive }) => `flex items-center gap-4 py-3.5 px-4
                cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
                    <PiNotebook className="w-6" />
                    <p className="text-base">Blog Lists</p>
                </NavLink>

                <NavLink to='/admin/comments'
                    className={({ isActive }) => `flex items-center gap-4 py-3.5 px-4
                cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
                    <LiaComments className="w-6" />
                    <p className="text-base">Comments</p>
                </NavLink>

                <NavLink to='/admin/users'
                    className={({ isActive }) => `flex items-center gap-4 py-3.5 px-4
                cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
                    <LuUser className="w-6" />
                    <p className="text-base">Users</p>
                </NavLink>
            </div>

            {/* Overlay for Small Screens */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default Sidebar;
