// import toast from 'react-hot-toast';
// import type { BlogTableItemProps } from '../../utils/interface';
// import { RxCross2 } from "react-icons/rx";
// import { deleteBlogApi, publishBlog } from '../../api/blogApi';
// import { useAppSelector } from '../../redux/store/hooks';

// const BlogTableItem: React.FC<BlogTableItemProps> = ({ blog, fetchBlogs, index }) => {
//     const { title, createdAt } = blog;
//     const BlogDate = new Date(createdAt);

//     const userToken = useAppSelector((state) => state.login.token);

//     const deleteBlog = async () => {
//         const confirm = window.confirm('Are you sure you want to delete this blog?')
//         if (!confirm) return;
//         try {
//             const data = await deleteBlogApi(userToken, blog._id)
//             if (data) {
//                 toast.success(data.message)
//                 await fetchBlogs();
//             } else {
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error((error as Error).message);
//         }
//     }

//     const togglePublish = async () => {
//         try {
//             const data = await publishBlog(userToken, blog._id)
//             if (data) {
//                 toast.success(data.message)
//                 await fetchBlogs();
//             } else {
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error((error as Error).message);
//         }
//     }

//     return (
//         <tr className='border-y border-gray-300'>
//             <th className='px-2 py-4'>{index}</th>
//             <td className='px-2 py-4'>{title}</td>
//             <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
//             <td className='px-2 py-4 max-sm:hidden'>
//                 <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}>
//                     {blog.isPublished ? 'Published' : 'Unpublished'}</p>
//             </td>
//             <td className='px-2 py-4 flex text-xs gap-3'>
//                 <button onClick={togglePublish}
//                     className='border px-2 py-0.5 mt-1 rounded cursor-pointer'
//                 >{blog.isPublished ? 'Unpublish' : 'Publish'}</button>

//                 <RxCross2 onClick={deleteBlog} className='w-6 h-6 rounded-3xl border border-red-200 hover:scale-110 transition-all cursor-pointer text-red-200 bg-red-50' />
//             </td>
//         </tr>
//     )
// }

// export default BlogTableItem



import toast from 'react-hot-toast';
import type { BlogTableItemProps } from '../../utils/interface';
import { RxCross2 } from "react-icons/rx";
import { deleteBlogApi, publishBlog } from '../../api/blogApi';
import { useAppSelector } from '../../redux/store/hooks';

const BlogTableItem: React.FC<BlogTableItemProps> = ({ blog, fetchBlogs, index }) => {
    const { title, createdAt } = blog;
    const BlogDate = new Date(createdAt);

    const userToken = useAppSelector((state) => state.login.token);

    const deleteBlog = async () => {
        const confirm = window.confirm('Are you sure you want to delete this blog?');
        if (!confirm) return;
        try {
            const data = await deleteBlogApi(userToken, blog._id);
            if (data) {
                toast.success(data.message);
                await fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const togglePublish = async () => {
        try {
            const data = await publishBlog(userToken, blog._id);
            if (data) {
                toast.success(data.message);
                await fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <tr className="border-y border-gray-300 hover:bg-gray-50 transition-colors">
            <th className="px-4 py-4 text-gray-600">{index}</th>
            <td className="px-4 py-4 font-medium text-gray-700">{title}</td>
            <td className="px-4 py-4 hidden sm:table-cell text-gray-500">{BlogDate.toDateString()}</td>
            <td className="px-4 py-4 hidden sm:table-cell">
                <span
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
                <RxCross2
                    onClick={deleteBlog}
                    className="w-6 h-6 p-1  rounded-full border border-red-200 text-red-400 hover:text-red-600 hover:border-red-400 hover:scale-110 transition-transform cursor-pointer"
                    title="Delete Blog"
                />
            </td>
        </tr >
    );
};

export default BlogTableItem;
