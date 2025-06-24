import { useEffect, useState } from 'react'
import { LiaComments } from 'react-icons/lia'
import { PiNotebook, PiNoteLight, PiNotePencil } from 'react-icons/pi'
import { BiCommentCheck } from "react-icons/bi";
import { useAppSelector } from '../../redux/store/hooks';
import { getAuthorDashboardData } from '../../api/dashboardApi';
import toast from 'react-hot-toast';
import type { Blogs } from '../../utils/interface';
import BlogAuthorTableItem from '../../components/author/BlogAuthorTableItem';

const AuthorDashboard = () => {
  const [authorDashboardData, setAuthorDashboardData] = useState({
    totalBlogs: 0,
    drafts: 0,
    totalComments: 0,
    approvedComments: 0,
    recentBlogs: []
  });

  const userToken = useAppSelector((state) => state.login.token);

  const fetchAuthorDashboardData = async () => {
    try {
      const data = await getAuthorDashboardData(userToken);
      console.log("DATA", data.dashboardData)
      if (data) {
        setAuthorDashboardData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  useEffect(() => {
    fetchAuthorDashboardData();
  }, []);

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      <div className='flex flex-wrap gap-4'>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <PiNotebook className='w-6 h-6' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{authorDashboardData.totalBlogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <PiNotePencil className='w-6 h-6' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{authorDashboardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <LiaComments className='w-6 h-6' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{authorDashboardData.totalComments}</p>
            <p className='text-gray-400 font-light'>Comments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <BiCommentCheck className='w-6 h-6' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{authorDashboardData.approvedComments}</p>
            <p className='text-gray-400 font-light'>Approved Comments</p>
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
              </tr>
            </thead>
            <tbody>
              {authorDashboardData.recentBlogs.map((blog: Blogs, index) => {
                return <BlogAuthorTableItem key={blog._id} blog={blog} fetchBlogs={fetchAuthorDashboardData} index={index + 1} />
              })}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}

export default AuthorDashboard