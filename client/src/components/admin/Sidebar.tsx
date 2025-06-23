import { NavLink } from 'react-router-dom'
import { LiaComments } from "react-icons/lia";
import { PiNotebook } from "react-icons/pi";
// import { MdOutlinePostAdd } from "react-icons/md";
import { RiHome3Line } from "react-icons/ri";
import { LuUser } from "react-icons/lu";


const Sidebar = () => {
    return (
        <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
            <NavLink to='/admin' end={true}
                className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9
            md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`} >
                <RiHome3Line className='min-w-4 w-5' />
                <p>Dashboard</p>
            </NavLink>

            {/* <NavLink to='/admin/addBlog'
                className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9
            md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`} >
                <MdOutlinePostAdd className='min-w-4 w-5' />
                <p>Add Blogs</p>
            </NavLink> */}

            <NavLink to='/admin/listBlog'
                className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9
            md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`} >
                {/* <img src={assets.list_icon} alt="" className='min-w-4 w-5' /> */}
                <PiNotebook className='min-w-4 w-5' />
                <p>Blog Lists</p>
            </NavLink>

            <NavLink to='/admin/comments'
                className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9
            md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`} >
                <LiaComments className='min-w-4 w-5' />
                <p>Comments</p>
            </NavLink>

            <NavLink to='/admin/users'
                className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9
            md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`} >
                <LuUser className='min-w-4 w-5' />
                <p>Users</p>
            </NavLink>
        </div>
    )
}

export default Sidebar