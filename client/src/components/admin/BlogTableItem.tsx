import type { BlogTableItemProps } from '../../utils/interface';
import { RxCross2 } from "react-icons/rx";

const BlogTableItem: React.FC<BlogTableItemProps> = ({ blog, fetchBlogs, index }) => {
    const { title, createdAt } = blog;
    const BlogDate = new Date(createdAt);

    return (
        <tr className='border-y border-gray-300'>
            <th className='px-2 py-4'>{index}</th>
            <td className='px-2 py-4'>{title}</td>
            <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
            <td className='px-2 py-4 max-sm:hidden'>
                <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}>
                    {blog.isPublished ? 'Published' : 'Unpublished'}</p>
            </td>
            <td className='px-2 py-4 flex text-xs gap-3'>
                <button
                    className='border px-2 py-0.5 mt-1 rounded cursor-pointer'
                >{blog.isPublished ? 'Unpublish' : 'Publish'}</button>

                <RxCross2 className='w-6 h-6 rounded-3xl border border-red-200 hover:scale-110 transition-all cursor-pointer text-red-200 bg-red-50' />
            </td>
        </tr>
    )
}

export default BlogTableItem
