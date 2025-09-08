import React, { useEffect } from 'react'
import type { BlogAuthorTableItemProps } from '../../utils/interface';
import { analytics, logEvent } from "../../config/firebase";

const BlogAuthorTableItem: React.FC<BlogAuthorTableItemProps> = ({ blog, index }) => {
    const { title, createdAt } = blog;
    const BlogDate = new Date(createdAt);

    const trackBlogAuthorEvent = (action: string, extra: Record<string, any> = {}) => {
        if (analytics) {
            logEvent(analytics, "blog_author_table", {
                action,
                blog_id: blog._id,
                blog_title: blog.title,
                is_published: blog.isPublished,
                ...extra,
            });
        }
    };

    useEffect(() => {
        trackBlogAuthorEvent("row_rendered", { row_index: index });
    }, [index, blog._id]);

    return (
        <tr className='border-y border-gray-300'>
            <th className='px-4 py-3' scope="row" aria-label={`Row ${index}`}>{index}</th>
            <td className='px-2 py-4' aria-label={`Blog title: ${title}`}
                onClick={() => trackBlogAuthorEvent("row_clicked", { row_index: index })}>{title}</td>
            <td className='px-2 py-4 max-sm:hidden' aria-label={`Created on ${BlogDate.toDateString()}`}>{BlogDate.toDateString()}</td>
            <td className='px-2 py-4 max-sm:hidden'>
                <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}
                    role="status"
                    aria-label={`Blog is ${blog.isPublished ? "published" : "unpublished"}`}>
                    {blog.isPublished ? 'Published' : 'Unpublished'}</p>
            </td>

        </tr>
    )
}

export default BlogAuthorTableItem