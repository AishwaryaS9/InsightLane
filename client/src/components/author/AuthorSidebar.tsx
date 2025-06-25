import { NavLink } from 'react-router-dom'
import { PiNotebook } from "react-icons/pi";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiHome3Line } from "react-icons/ri";

const AuthorSidebar = () => {
    return (
        <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
            <NavLink to='/author' end={true}
                className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9
            md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`} >
                <RiHome3Line className='min-w-4 w-5' />
                <p>Dashboard</p>
            </NavLink>

            <NavLink to='/author/addBlog'
                className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9
            md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`} >
                <MdOutlinePostAdd className='min-w-4 w-5' />
                <p>Add Blogs</p>
            </NavLink>

            <NavLink to='/author/myBlogs'
                className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9
            md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`} >
                <PiNotebook className='min-w-4 w-5' />
                <p>My Blogs</p>
            </NavLink>

        </div>
    )
}

export default AuthorSidebar