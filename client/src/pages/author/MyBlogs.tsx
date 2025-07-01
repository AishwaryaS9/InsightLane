import { useEffect, useState } from 'react';
import { getBlogByAuthorId } from '../../api/blogApi';
import { useAppSelector } from '../../redux/store/hooks';
import toast from 'react-hot-toast';
import { PiEyeThin, PiCalendarDots, PiNotebookThin } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import BlogModal from '../../components/author/BlogModal';
import type { Blogs } from '../../utils/interface';
import EditBlogModal from '../../components/author/EditBlogModal';
import Pagination from '../../components/Pagination';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blogs | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditBlogModalOpen, setIsEditBlogModalOpen] = useState(false);
    const [editSelectedBlog, setEditSelectedBlog] = useState<Blogs | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const userToken = useAppSelector((state) => state.login.token);
    const userId = useAppSelector((state) => state.login.userId);

    const fetchBlogByAuthor = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getBlogByAuthorId(userToken, userId, page, 4);
            if (data.blogs) {
                setBlogs(data.blogs);
                setTotalPages(data.totalPages || 1);
            } else {
                setError(data.message || 'No blogs found');
            }
        } catch (error) {
            toast.error((error as Error).message)
            setError((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogByAuthor();
    }, [page]);

    const handleModal = (blog: Blogs) => {
        setSelectedBlog(blog);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedBlog(null);
        setModalOpen(false);
    };

    const handleEditBlogModal = (blog: Blogs) => {
        setEditSelectedBlog(blog)
        setIsEditBlogModalOpen(true);
    }

    const closeEditBlogModal = () => {
        setEditSelectedBlog(null);
        setIsEditBlogModalOpen(false);
    }

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <>
            <div className="w-full min-h-screen bg-blue-50/50 py-12 px-6 sm:px-16">
                <h1 className="text-3xl font-semibold text-gray-800 mb-8">My Blogs</h1>

                {isLoading ? (
                    <div className="text-center">
                        <p className="text-gray-600">Loading blogs...</p>
                    </div>
                ) : error ? (
                    <div className="text-center justify-center mt-25">
                        <PiNotebookThin className="w-32 h-32 text-gray-400 mx-auto mt-4" />
                        <p className="text-gray-500">{error}</p>

                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {blogs.map((blog) => (
                            <div
                                className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
                                key={blog._id}>
                                <div className="h-36 w-full">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={blog.image}
                                        alt={blog.title}
                                    />
                                </div>

                                <div className="p-4 flex flex-col space-y-2 flex-grow">
                                    <h2 className="text-md font-semibold text-gray-900">{blog.title}</h2>
                                    <p
                                        className="text-gray-600 font-light text-sm line-clamp-2"
                                        dangerouslySetInnerHTML={{ __html: blog.description }}></p>
                                    <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                                        <div className={`px-3 py-1 rounded-full font-medium text-xs ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {blog.isPublished ? 'Published' : 'Unpublished'}
                                        </div>
                                        <div className="flex items-center relative group">
                                            <PiCalendarDots className="w-4 h-4 mr-1" />
                                            <span className="text-xs">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                Created On
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 bg-gray-100 border-t border-gray-200 flex justify-between items-center flex-row" >
                                    <button
                                        className="text-xs text-blue-600 font-normal hover:underline cursor-pointer"
                                        onClick={() => handleModal(blog)}
                                    >
                                        <PiEyeThin className="inline-block w-4 h-4 mr-1" />
                                        Preview
                                    </button>
                                    <button className="text-xs text-gray-500 font-normal hover:underline cursor-pointer"
                                        onClick={() => handleEditBlogModal(blog)}>
                                        <CiEdit className="inline-block w-4 h-4 mr-1" />
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="my-15">
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>

            </div >

            {modalOpen && selectedBlog && (
                <BlogModal blog={selectedBlog} onViewClose={closeModal} />
            )}

            {isEditBlogModalOpen && editSelectedBlog &&  (
                <EditBlogModal data={editSelectedBlog} isOpen={isEditBlogModalOpen} onViewClose={closeEditBlogModal} onRefresh={fetchBlogByAuthor} />
            )}
        </>
    );
};

export default MyBlogs;
