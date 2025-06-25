import { useEffect, useState } from 'react';
import { getBlogByAuthorId } from '../../api/blogApi';
import { useAppSelector } from '../../redux/store/hooks';
import toast from 'react-hot-toast';
import { PiEyeThin, PiCalendarDots } from "react-icons/pi";
import BlogModal from '../../components/author/BlogModal';
import type { Blogs } from '../../utils/interface';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blogs | null>(null);

    const userToken = useAppSelector((state) => state.login.token);
    const userId = useAppSelector((state) => state.login.userId);

    const fetchBlogByAuthor = async () => {
        try {
            const data = await getBlogByAuthorId(userToken, userId);
            if (data) {
                setBlogs(data.blogs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    useEffect(() => {
        fetchBlogByAuthor();
    }, []);

    const handleModal = (blog: Blogs) => {
        setSelectedBlog(blog);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedBlog(null);
        setModalOpen(false);
    };

    return (
        <>
            <div className="w-full min-h-screen bg-blue-50/50 py-12 px-6 sm:px-16">
                <h1 className="text-3xl font-semibold text-gray-800 mb-8">My Blogs</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {blogs.map((blog) => (
                        <div
                            className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
                            key={blog._id}
                        >
                            {/* Thumbnail */}
                            <div className="h-36 w-full">
                                <img
                                    className="h-full w-full object-cover"
                                    src={blog.image}
                                    alt={blog.title}
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col space-y-2 flex-grow">
                                <h2 className="text-md font-semibold text-gray-900">{blog.title}</h2>
                                <p
                                    className="text-gray-600 font-light text-sm line-clamp-2"
                                    dangerouslySetInnerHTML={{ __html: blog.description }}
                                ></p>
                                <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                                    <div
                                        className={`px-3 py-1 rounded-full font-medium text-xs ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}
                                    >
                                        {blog.isPublished ? 'Published' : 'Unpublished'}
                                    </div>
                                    <div className="flex items-center">
                                        <PiCalendarDots className="w-4 h-4 mr-1" />
                                        <span className="text-xs" title="Created On">
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-3 bg-gray-100 border-t border-gray-200 flex justify-between items-center" >
                                <button
                                    className="text-sm text-blue-600 font-normal hover:underline cursor-pointer"
                                    onClick={() => handleModal(blog)}
                                >
                                    <PiEyeThin className="inline-block w-4 h-4 mr-1" />
                                    Preview
                                </button>
                            </div>
                        </div>
                    ))}
                </div >
            </div >

            {modalOpen && selectedBlog && (
                <BlogModal blog={selectedBlog} onViewClose={closeModal} />
            )}
        </>
    );
};

export default MyBlogs;
