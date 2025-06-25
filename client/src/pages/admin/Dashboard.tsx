import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PiNotePencil, PiNotebook, PiNoteLight } from "react-icons/pi";
import { LiaComments } from "react-icons/lia";
import { getDashboardData } from '../../api/dashboardApi';
import { useAppSelector } from '../../redux/store/hooks';
import BlogTableItem from '../../components/admin/BlogTableItem';
import type { Blogs } from '../../utils/interface';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: [],
    });

    const userToken = useAppSelector((state) => state.login.token);

    const fetchDashboardData = async () => {
        try {
            const data = await getDashboardData(userToken);
            if (data) {
                setDashboardData(data.dashboardData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className="flex-1 p-6 md:p-10 bg-blue-50/50 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Stats Cards */}
                {[
                    { icon: <PiNotebook className="w-8 h-8 text-blue-500" />, label: "Blogs", value: dashboardData.blogs },
                    { icon: <LiaComments className="w-8 h-8 text-green-500" />, label: "Comments", value: dashboardData.comments },
                    { icon: <PiNotePencil className="w-8 h-8 text-yellow-500" />, label: "Drafts", value: dashboardData.drafts },
                ].map((stat, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                        {stat.icon}
                        <div>
                            <p className="text-3xl font-semibold text-gray-700">{stat.value}</p>
                            <p className="text-gray-500">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Latest Blogs */}
            <section className="mt-10">
                <div className="flex items-center gap-3 text-gray-700 mb-4">
                    <PiNoteLight className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-medium">Latest Blogs</h2>
                </div>

                <div className="relative overflow-x-auto shadow rounded-2xl bg-white">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th scope="col" className="px-4 py-3">#</th>
                                <th scope="col" className="px-4 py-3">Blog Title</th>
                                <th scope="col" className="px-4 py-3 hidden sm:table-cell">Date</th>
                                <th scope="col" className="px-4 py-3 hidden sm:table-cell">Status</th>
                                <th scope="col" className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentBlogs.length > 0 ? (
                                dashboardData.recentBlogs.map((blog: Blogs, index) => (
                                    <BlogTableItem
                                        key={blog._id}
                                        blog={blog}
                                        fetchBlogs={fetchDashboardData}
                                        index={index + 1}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center text-gray-500 py-6"
                                    >
                                        No blogs to display.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
