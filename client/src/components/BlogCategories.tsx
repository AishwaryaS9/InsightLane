import { useEffect, useState } from 'react';
import { blogCategories } from '../assets/assets';
import { motion } from 'motion/react';
import BlogCard from './BlogCard';
import { getAllBlogs } from '../api/blogApi';
import toast from 'react-hot-toast';
import type { Blogs } from '../utils/interface';

const BlogCategories = () => {
    const [menu, setMenu] = useState('All');
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const getBlogData = async () => {
        try {
            const data = await getAllBlogs(page, 8, search);
            if (data) {
                setBlogs(data.blogs);
                setTotalPages(data.totalPages || 1);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    useEffect(() => {
        getBlogData();
    }, [page, search, menu]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const filteredBlogs = blogs.filter((blog: Blogs) => menu === "All" ? true : blog?.category === menu);

    return (
        <div>
            {/* Categories */}
            <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
                {blogCategories.map((item) => (
                    <div key={item} className='relative'>
                        <button onClick={() => { setMenu(item); setPage(1); }}
                            className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5'}`}>
                            {item}
                            {menu === item && (
                                <motion.div layoutId='underline'
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'>
                                </motion.div>
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className='flex justify-center mb-16'>
                <div className='flex justify-between max-w-lg mx-auto w-full sm:w-3/4 md:w-2/3
                border border-gray-300 bg-white rounded overflow-hidden'>
                    <input
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        type="text"
                        placeholder='Search for blogs'
                        required
                        className='w-full pl-4 outline-none placeholder:text-gray-400 text-base'
                    />
                    <button
                        type='submit'
                        className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 
                        transition-all cursor-pointer'>
                        Search
                    </button>
                </div>
            </div>

            {/* Blog Cards or No Blogs Message */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4
            gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) =>
                        <BlogCard key={blog?._id} blog={blog} />
                    )
                ) : (
                    <div className='col-span-full text-center text-gray-500 text-lg'>
                        No blogs available in this category.
                    </div>
                )}
            </div>

            {/* Pagination */}
            {filteredBlogs.length > 8 && (
                <div className="flex items-center gap-2 text-gray-500 justify-center mb-10">
                    <button
                        type="button"
                        aria-label="previous"
                        className="mr-4 flex items-center gap-1"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        <svg className="mt-px" width={23} height={23} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.75 12.5h11.5m-11.5 0 4.792-4.791M5.75 12.5l4.792 4.792" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>previous</span>
                    </button>

                    <div className="flex gap-2 text-sm md:text-base">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                            <button
                                key={pageNumber}
                                type="button"
                                onClick={() => handlePageChange(pageNumber)}
                                className={`flex items-center justify-center w-9 md:w-12 h-9 md:h-12 aspect-square rounded-md 
                                    ${page === pageNumber ? 'bg-indigo-500 text-white' : 'hover:bg-gray-300/10'}
                                    transition-all`}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        aria-label="next"
                        className="ml-4 flex items-center gap-1"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                    >
                        <span>next</span>
                        <svg className="mt-px" width={23} height={23} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.25 11.5H5.75m11.5 0-4.792-4.79m4.792 4.79-4.792 4.792" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};




export default BlogCategories;
