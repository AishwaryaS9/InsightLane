import { useEffect, useState } from 'react';
import BlogTableItem from '../../components/admin/BlogTableItem';
import toast from 'react-hot-toast';
import type { Blogs } from '../../utils/interface';
import { getAllBlogs } from '../../api/blogApi';
import Pagination from '../../components/Pagination';
import BlogModal from '../../components/author/BlogModal';
import AlertModal from '../../components/AlertModal';
import { ClipLoader } from 'react-spinners';

const ListBlog = () => {
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedBlog, setSelectedBlog] = useState<Blogs | null>(null);
    const [loading, setLoading] = useState(false);
    const [alertConfig, setAlertConfig] = useState<{
        message: string;
        onConfirm: () => void;
    } | null>(null);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const data = await getAllBlogs(page, 5);
            if (data) {
                setBlogs(data.blogs);
                setTotalPages(data.totalPages || 1);
            }
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [page]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <main className="flex-1 p-4 sm:p-6 md:p-10 bg-blue-50/50 min-h-screen">
            <header>
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-6">
                    All Blogs
                </h1>
            </header>

            <section aria-labelledby="blogs-list-heading" className="relative overflow-x-auto shadow-md rounded-xl bg-white">
                <h2 id="blogs-list-heading" className="sr-only">
                    Blog list
                </h2>

                <table className="w-full text-sm sm:text-base text-left text-gray-500">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs sm:text-sm tracking-wider">
                        <tr>
                            <th scope="col" className="px-4 sm:px-6 py-3">#</th>
                            <th scope="col" className="px-4 sm:px-6 py-3">Blog Title</th>
                            <th scope="col" className="px-4 sm:px-6 py-3 hidden sm:table-cell">
                                Date
                            </th>
                            <th scope="col" className="px-4 sm:px-6 py-3 hidden sm:table-cell">
                                Status
                            </th>
                            <th scope="col" className="px-4 sm:px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500" aria-live="polite">
                                    {/* Loading blogs... */}
                                    <ClipLoader color="#00C2CB" size={35} />
                                </td>
                            </tr>
                        ) : blogs.length > 0 ? (
                            blogs.map((blog, index) => (
                                <BlogTableItem
                                    key={blog._id}
                                    blog={blog}
                                    fetchBlogs={fetchBlogs}
                                    index={(page - 1) * 5 + index + 1}
                                    onSelectBlog={setSelectedBlog}
                                    setAlert={setAlertConfig}
                                />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-6 text-gray-500" aria-live="polite"
                                >
                                    No blogs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
            {alertConfig && (
                <div className="fixed inset-0 flex items-center justify-center z-50" role="dialog"
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
                <BlogModal blog={selectedBlog} onViewClose={() => setSelectedBlog(null)} />
            )}

            <nav className="my-15" aria-label="Blog list pagination">
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </nav>
        </main>
    );
};

export default ListBlog;
