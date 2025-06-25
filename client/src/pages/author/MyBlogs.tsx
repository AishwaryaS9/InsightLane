import { useEffect, useState } from 'react'
import { getBlogByAuthorId } from '../../api/blogApi';
import { useAppSelector } from '../../redux/store/hooks';
import toast from 'react-hot-toast';
import { PiEyeThin } from "react-icons/pi";
import { PiCalendarDots } from "react-icons/pi";
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
            const data = await getBlogByAuthorId(userToken, userId)
            if (data) {
                setBlogs(data.blogs)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    useEffect(() => {
        fetchBlogByAuthor()
    }, [])

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
            <div className="w-full min-h-screen bg-blue-50/50 p-6 flex flex-col px-5 sm:pt-12 sm:pl-16">
                <h1>All Blogs</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
                    {blogs.map((blog) => (
                        <div
                            className="relative bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-80 flex flex-col overflow-hidden"
                            key={blog._id}
                        >
                            <a href="#">
                                <img
                                    className="rounded-t-lg w-full h-32 object-cover object-center"
                                    src={blog.image}
                                    alt=""
                                />
                            </a>
                            <div className="p-5 flex-grow flex flex-col">
                                <a href="#">
                                    <h5 className="mb-2 text-lg font-semibold text-gray-900 hover:text-primary">
                                        {blog.title}
                                    </h5>
                                </a>
                                <p
                                    className="mb-3 text-gray-700 line-clamp-2 text-sm"
                                    dangerouslySetInnerHTML={{ __html: blog.description }}
                                ></p>
                                <div className='items-center justify-center'>
                                    <span className={`inline-block px-3 py-1 text-[11px] font-medium rounded-md capitalize ${blog.isPublished
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}>
                                        {blog.isPublished ? "Published" : "Unpublished"}
                                    </span>
                                </div>
                            </div>

                            <div className="px-3 flex justify-between items-center">

                                <a
                                    href="#"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary"
                                    onClick={() => handleModal(blog)}
                                >

                                    <PiEyeThin className="rtl:rotate-180 w-4 h-4 mr-1" />
                                    Preview
                                </a>
                                <div className="flex items-center text-gray-700">
                                    <PiCalendarDots className="w-3 h-3 mr-1" />
                                    <span
                                        className="text-xs"
                                        title="Created On"
                                    >
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {modalOpen && selectedBlog && (
                <BlogModal blog={selectedBlog} onViewClose={closeModal} />
            )}
            {/* <BlogModal blog={blogs}/> */}
        </>
    )
}

export default MyBlogs