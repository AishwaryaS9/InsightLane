import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import type { Blogs } from "../../utils/interface";
import Moment from 'moment';
import { analytics, logEvent } from "../../config/firebase";

const BlogModal: React.FC<{ blog: Blogs, onViewClose: () => void }> = ({ blog, onViewClose }) => {
    const trackBlogModalEvent = (action: string, extra: Record<string, any> = {}) => {
        if (analytics) {
            logEvent(analytics, "blog_modal", {
                action,
                blog_id: blog._id,
                blog_title: blog.title,
                blog_category: blog.category,
                blog_author: blog.authorName,
                ...extra,
            });
        }
    };

    useEffect(() => {
        trackBlogModalEvent("opened");

        return () => {
            trackBlogModalEvent("closed");
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={onViewClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-title"
            aria-describedby="blog-modal-description">
            <div
                className="relative bg-white rounded-2xl shadow-lg w-full max-w-3xl h-[80vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}>
                <button aria-label="Close blog details"
                    onClick={() => {
                        trackBlogModalEvent("closed_by_button");
                        onViewClose();
                    }}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
                >
                    <IoCloseOutline className="w-6 h-6 text-white cursor-pointer" aria-hidden="true" />
                </button>

                <img
                    className="w-full h-48 object-cover rounded-t-2xl"
                    src={blog.image}
                    alt={blog.title}
                />

                <div className="flex-grow overflow-y-auto p-6" id="blog-modal-description">
                    <div className="border-b border-b-gray-200 pb-4">
                        <h3 className="text-lg font-semibold text-gray-800" id="blog-modal-title">{blog.title}</h3>
                        <p className="text-sm text-gray-500 leading-6">
                            Published on {Moment(blog.createdAt).format('MMMM Do YYYY')}
                        </p>
                    </div>
                    <div className="mt-6 space-y-6">
                        <p className="text-gray-600 text-[14px] leading-6" dangerouslySetInnerHTML={{ __html: blog.description }}></p>
                    </div>
                </div>
                <div className="border-t border-t-gray-200 p-4 flex justify-between">
                    <p className="text-sm text-gray-500">Written By, {blog.authorName}</p>
                    <button aria-label="Close blog modal"
                        onClick={() => {
                            trackBlogModalEvent("closed_by_footer");
                            onViewClose();
                        }}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium cursor-pointer">
                        Close
                    </button>
                </div>
            </div>
        </div >
    );
};

export default BlogModal;
