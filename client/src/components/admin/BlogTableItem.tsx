import toast from 'react-hot-toast';
import type { BlogTableItemProps } from '../../utils/interface';
import { RxCross2 } from "react-icons/rx";
import { deleteBlogApi, publishBlog } from '../../api/blogApi';
import { useAppSelector } from '../../redux/store/hooks';
import { analytics, logEvent } from "../../config/firebase";


const BlogTableItem: React.FC<BlogTableItemProps> = ({ blog, fetchBlogs, index, setAlert, onSelectBlog }) => {
    const { title, createdAt } = blog;
    const BlogDate = new Date(createdAt);

    const userToken = useAppSelector((state) => state.login.token);

    const trackBlogAction = (action: string, extra: Record<string, any> = {}) => {
        if (analytics) {
            logEvent(analytics, "blog_table_item", {
                action,
                blogId: blog._id,
                blogTitle: blog.title,
                ...extra,
            });
        }
    };

    const deleteBlog = () => {
        if (setAlert) {
            setAlert({
                message: "Are you sure you want to delete this blog?",
                onConfirm: async () => {
                    try {
                        const data = await deleteBlogApi(userToken, blog._id);
                        if (data) {
                            toast.success(data.message);
                            trackBlogAction("delete_blog");
                            await fetchBlogs();
                        } else {
                            toast.error(data.message);
                        }
                    } catch (error) {
                        toast.error((error as Error).message);
                    }
                },
            });
        }
    };

    const togglePublish = async () => {
        try {
            const data = await publishBlog(userToken, blog._id);
            if (data) {
                toast.success(data.message);
                trackBlogAction(blog.isPublished ? "unpublish_blog" : "publish_blog");
                await fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <tr className="border-y border-gray-300 hover:bg-gray-50 transition-colors" aria-live="polite">
            <th className="px-4 py-4 text-sm" scope="row" >{index}</th>
            <td className="px-4 py-4 text-sm cursor-pointer"
                aria-label={`View details for blog titled ${title}`}
                onClick={() => {
                    trackBlogAction("view_blog");
                    onSelectBlog(blog);
                }}>{title}</td>
            <td className="px-4 py-4 hidden sm:table-cell text-gray-500 text-sm">{BlogDate.toDateString()}</td>
            <td className="px-4 py-4 hidden sm:table-cell">
                <span role="status"
                    aria-label={`Status: ${blog.isPublished ? 'Published' : 'Unpublished'}`}
                    className={`px-2 py-1 text-sm rounded-full ${blog.isPublished
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                        }`}
                >
                    {blog.isPublished ? 'Published' : 'Unpublished'}
                </span>
            </td>
            <td className="px-4 py-4 flex items-center gap-3">
                <button
                    onClick={togglePublish}
                    className={`px-3 py-1 text-sm font-normal rounded-lg  cursor-pointer ${blog.isPublished
                        ? "bg-orange-50 text-orange-400 hover:bg-orange-100"
                        : "bg-green-100 text-green-600 hover:bg-green-200"
                        } transition`}
                >
                    {blog.isPublished ? 'Unpublish' : 'Publish'}
                </button>

                <RxCross2 aria-label={`Delete blog titled ${title}`}
                    onClick={deleteBlog} aria-hidden="true" focusable="false"
                    className="w-6 h-6 p-1  rounded-full border border-red-200 text-red-400 hover:text-red-600 hover:border-red-400 hover:scale-110 transition-transform cursor-pointer"
                    title="Delete Blog"
                />
            </td>
        </tr>
    );
};

export default BlogTableItem;
