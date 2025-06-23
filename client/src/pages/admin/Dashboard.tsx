import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { PiNotePencil, PiNotebook } from "react-icons/pi";
import { LiaComments } from "react-icons/lia";
import { PiNoteLight } from "react-icons/pi";
import { getDashboardData } from '../../api/dashboardApi';
import { useAppSelector } from '../../redux/store/hooks';
import BlogTableItem from '../../components/admin/BlogTableItem';
import type { Blogs } from '../../utils/interface';


const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    });

    const userToken = useAppSelector((state) => state.login.token);

    const fetchDashboardData = async () => {
        try {
            const data = await getDashboardData(userToken);
            if (data) {
                setDashboardData(data.dashboardData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, []);


    return (
        <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
            <div className='flex flex-wrap gap-4'>

                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <PiNotebook className='w-6 h-6' />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
                        <p className='text-gray-400 font-light'>Blogs</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <LiaComments className='w-6 h-6' />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
                        <p className='text-gray-400 font-light'>Comments</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <PiNotePencil className='w-6 h-6' />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
                        <p className='text-gray-400 font-light'>Drafts</p>
                    </div>
                </div>
            </div>

            <div>
                <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
                    <PiNoteLight className='w-6 h-6' />
                    <p>Latest Blogs</p>
                </div>

                <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
                    <table className='w-full text-sm text-gray-500'>
                        <thead className='text-xs text-gray-600 text-left uppercase'>
                            <tr>
                                <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                                <th scope='col' className='px-2 py-4'>Blog Title</th>
                                <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                                <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                                <th scope='col' className='px-2 py-4'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentBlogs.map((blog: Blogs, index) => {
                                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboardData} index={index + 1} />
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard