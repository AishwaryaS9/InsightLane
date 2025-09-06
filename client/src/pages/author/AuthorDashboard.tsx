import { useEffect, useState } from 'react';
import { LiaComments } from 'react-icons/lia';
import { PiNotebook, PiNoteLight, PiNotePencil } from 'react-icons/pi';
import { BiCommentCheck } from "react-icons/bi";
import { useAppSelector } from '../../redux/store/hooks';
import { getAuthorDashboardData } from '../../api/dashboardApi';
import toast from 'react-hot-toast';
import type { Blogs } from '../../utils/interface';
import BlogAuthorTableItem from '../../components/author/BlogAuthorTableItem';
import { ClipLoader } from 'react-spinners';

const AuthorDashboard = () => {
  const [authorDashboardData, setAuthorDashboardData] = useState({
    totalBlogs: 0,
    drafts: 0,
    totalComments: 0,
    approvedComments: 0,
    recentBlogs: [],
  });
  const [loading, setLoading] = useState(false);

  const userToken = useAppSelector((state) => state.login.token);

  const fetchAuthorDashboardData = async () => {
    try {
      setLoading(true);
      const data = await getAuthorDashboardData(userToken);
      if (data) {
        setAuthorDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthorDashboardData();
  }, []);

  return (
    <main className="flex-1 p-6 md:p-10 bg-blue-50/50 min-h-screen" aria-labelledby="author-dashboard-heading">
      <h1 id="author-dashboard-heading" className="text-2xl font-semibold text-gray-700 mb-6">Author Dashboard</h1>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Author Statistics">
        {[
          { icon: <PiNotebook className="w-8 h-8 text-blue-500" aria-hidden="true" />, label: "Blogs", value: authorDashboardData.totalBlogs },
          { icon: <PiNotePencil className="w-8 h-8 text-yellow-500" aria-hidden="true" />, label: "Drafts", value: authorDashboardData.drafts },
          { icon: <LiaComments className="w-8 h-8 text-green-500" aria-hidden="true" />, label: "Comments", value: authorDashboardData.totalComments },
          { icon: <BiCommentCheck className="w-8 h-8 text-purple-500" aria-hidden="true" />, label: "Approved Comments", value: authorDashboardData.approvedComments },
        ].map((stat, index) => (
          <div
            key={index}
            role="status"
            aria-label={`${stat.label}: ${stat.value}`}
            className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            {stat.icon}
            <div>
              <p className="text-3xl font-semibold text-gray-700">{stat.value}</p>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Latest Blogs */}
      <section className="mt-10">
        <div className="flex items-center gap-3 text-gray-700 mb-4">
          <PiNoteLight className="w-6 h-6 text-blue-600" aria-hidden="true" />
          <h2 id="latest-blogs-heading" className="text-xl font-medium">Latest Blogs</h2>
        </div>

        <div className="relative overflow-x-auto shadow rounded-2xl bg-white">
          <table className="w-full text-sm text-left text-gray-500" aria-describedby="latest-blogs-heading">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th scope="col" className="px-4 py-3">#</th>
                <th scope="col" className="px-4 py-3">Blog Title</th>
                <th scope="col" className="px-4 py-3 hidden sm:table-cell">Date</th>
                <th scope="col" className="px-4 py-3 hidden sm:table-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500" aria-live="polite">
                    <ClipLoader color="#00C2CB" size={35} />
                  </td>
                </tr>
              ) : authorDashboardData.recentBlogs.length > 0 ? (
                authorDashboardData.recentBlogs.map((blog: Blogs, index) => (
                  <BlogAuthorTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchAuthorDashboardData}
                    index={index + 1}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 py-6">
                    No blogs to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default AuthorDashboard;
