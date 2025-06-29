import { useEffect, useState } from 'react';
import { blogCategories } from '../assets/assets';
import { motion } from 'motion/react';
import BlogCard from './BlogCard';
import { getAllBlogs } from '../api/blogApi';
import toast from 'react-hot-toast';
import type { Blogs } from '../utils/interface';
import Pagination from './Pagination';

const BlogCategories = () => {
    const [menu, setMenu] = useState('All');
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const getBlogData = async () => {
        try {
            const category = menu === "All" ? "" : menu;
            const data = await getAllBlogs(page, 8, search, category);
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


    return (
        <div>
            <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
                {blogCategories.map((item) => (
                    <div key={item} className='relative'>
                        <button
                            onClick={() => { setMenu(item); setPage(1); }}
                            className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5'}`}
                        >
                            {item}
                            {menu === item && (
                                <motion.div
                                    layoutId='underline'
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'
                                />
                            )}
                        </button>
                    </div>
                ))}
            </div>

            <div className='flex justify-center mb-16'>
                <div className='flex justify-between max-w-lg mx-auto w-full sm:w-3/4 md:w-2/3 border border-gray-300 bg-white rounded overflow-hidden'>
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
                        className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
                {blogs.length > 0 ? (
                    blogs.map((blog) =>
                        <BlogCard key={blog?._id} blog={blog} />
                    )
                ) : (
                    <div className='col-span-full text-center text-gray-500 text-lg'>
                        No blogs available in this category.
                    </div>
                )}
            </div>

            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default BlogCategories;
