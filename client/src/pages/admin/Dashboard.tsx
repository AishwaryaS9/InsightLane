import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PiNotePencil, PiNotebook, PiNoteLight } from "react-icons/pi";
import { LiaComments } from "react-icons/lia";
import { getDashboardData } from '../../api/dashboardApi';
import { useAppSelector } from '../../redux/store/hooks';
import BlogTableItem from '../../components/admin/BlogTableItem';
import type { Blogs } from '../../utils/interface';
import AlertModal from '../../components/AlertModal';
import BlogModal from '../../components/author/BlogModal';
import { ClipLoader } from 'react-spinners';
import { analytics, logEvent } from "../../config/firebase";

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: [],
    });
    const [alertConfig, setAlertConfig] = useState<{
        message: string;
        onConfirm: () => void;
    } | null>(null);

    const [selectedBlog, setSelectedBlog] = useState<Blogs | null>(null);
    const [loading, setLoading] = useState(false);

    const userToken = useAppSelector((state) => state.login.token);
    const userId = useAppSelector((state) => state.login.userId);
    const userRole = useAppSelector((state) => state.login.role);


    const trackDashboardBlogViewOpened = (blog: Blogs, userId: string | null, userRole: string | null) => {
        if (analytics) {
            logEvent(analytics, "dashboard_blog_view_opened", {
                blog_id: blog._id,
                blog_title: blog.title,
                user_id: userId,
                user_role: userRole,
            });
        }
    };

    const trackDashboardBlogViewClosed = (userId: string | null, userRole: string | null) => {
        if (analytics) {
            logEvent(analytics, "dashboard_blog_view_closed", {
                user_id: userId,
                user_role: userRole,
            });
        }
    };

    const trackDashboardBlogDeleted = (blogId: string, userId: string | null, userRole: string | null) => {
        if (analytics) {
            logEvent(analytics, "dashboard_blog_deleted", {
                blog_id: blogId,
                user_id: userId,
                user_role: userRole,
            });
        }
    };


    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const data = await getDashboardData(userToken);
            if (data) {
                setDashboardData(data.dashboardData);
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
        fetchDashboardData();
    }, []);

    return (
        <main id='main-content' role='main' className="flex-1 p-4 sm:p-6 md:p-10 bg-blue-50/50 min-h-screen">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-6">
                Dashboard
            </h1>

            <section aria-labelledby="dashboard-stats-heading"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <h2 id="dashboard-stats-heading" className="sr-only">
                    Dashboard statistics
                </h2>
                {[
                    { icon: <PiNotebook aria-hidden="true" className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />, label: "Blogs", value: dashboardData.blogs },
                    { icon: <LiaComments aria-hidden="true" className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />, label: "Comments", value: dashboardData.comments },
                    { icon: <PiNotePencil aria-hidden="true" className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />, label: "Drafts", value: dashboardData.drafts },
                ].map((stat, index) => (
                    <div
                        key={index}
                        role="status"
                        aria-label={`${stat.value} ${stat.label}`}
                        className="flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-xl shadow hover:scale-105 transition-transform duration-300"
                    >
                        {stat.icon}
                        <div>
                            <p className="text-2xl sm:text-3xl font-semibold text-gray-700">
                                {stat.value}
                            </p>
                            <p className="text-sm sm:text-base text-gray-500">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </section>

            <section className="mt-8 sm:mt-10" aria-labelledby="latest-blogs-heading">
                <div className="flex items-center gap-3 text-gray-700 mb-4">
                    <PiNoteLight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" aria-hidden="true" />
                    <h2 id="latest-blogs-heading" className="text-lg sm:text-xl font-medium">Latest Blogs</h2>
                </div>

                <div className="relative overflow-x-auto shadow rounded-xl bg-white">
                    <table className="w-full text-sm sm:text-base text-left text-gray-500"
                        role="table"
                        aria-describedby="latest-blogs-heading">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs sm:text-sm">
                            <tr role="row">
                                <th scope="col" className="px-4 py-3">#</th>
                                <th scope="col" className="px-4 py-3">Blog Title</th>
                                <th scope="col" className="px-4 py-3 hidden sm:table-cell">Date</th>
                                <th scope="col" className="px-4 py-3 hidden sm:table-cell">Status</th>
                                <th scope="col" className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-500" aria-live="polite">
                                        <ClipLoader color="#00C2CB" size={35} />
                                    </td>
                                </tr>
                            ) : dashboardData.recentBlogs.length > 0 ? (
                                dashboardData.recentBlogs.map((blog: Blogs, index) => (
                                    <BlogTableItem
                                        key={blog._id}
                                        blog={blog}
                                        fetchBlogs={fetchDashboardData}
                                        index={index + 1}
                                        setAlert={(config) => {
                                            setAlertConfig({
                                                ...config,
                                                onConfirm: () => {
                                                    config.onConfirm();
                                                    trackDashboardBlogDeleted(blog._id, userId || null, userRole || null);
                                                    setAlertConfig(null);
                                                },
                                            });
                                        }}
                                        onSelectBlog={(b) => {
                                            setSelectedBlog(b);
                                            trackDashboardBlogViewOpened(b, userId || null, userRole || null);
                                        }}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center text-gray-500 py-6"
                                        role="row"
                                    >
                                        No blogs to display.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            {alertConfig && (
                <div className="fixed inset-0 flex items-center justify-center z-50"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Alert">
                    <AlertModal
                        message={alertConfig.message}
                        onConfirm={() => {
                            alertConfig.onConfirm();
                            setAlertConfig(null);
                        }}
                        onCancel={() => setAlertConfig(null)}
                    />
                </div>
            )}
            {selectedBlog && (
                <BlogModal blog={selectedBlog} onViewClose={() => {
                    setSelectedBlog(null);
                    trackDashboardBlogViewClosed(userId || null, userRole || null);
                }} />
            )}
        </main>
    );
};

export default Dashboard;
