import { useEffect, useState } from 'react';
import { blogCategories } from '../assets/assets';
import { motion } from 'motion/react';
import BlogCard from './BlogCard';
import { getAllBlogs } from '../api/blogApi';
import toast from 'react-hot-toast';
import type { Blogs } from '../utils/interface';
import Pagination from './Pagination';
import { ClipLoader } from 'react-spinners';

const BlogCategories = () => {
    const [menu, setMenu] = useState('All');
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const getBlogData = async () => {
        try {
            setLoading(true);
            const category = menu === "All" ? "" : menu;
            const data = await getAllBlogs(page, 8, search, category);
            if (data) {
                setBlogs(data.blogs);
                setTotalPages(data.totalPages || 1);
            }
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setLoading(false);
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
        <main>
            <nav aria-label="Blog categories" className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
                {blogCategories.map((item) => (
                    <div key={item} className='relative'>
                        <button aria-pressed={menu === item}
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
            </nav>

            <section className='flex justify-center mb-16'>
                <div className='flex justify-between max-w-lg mx-auto w-full sm:w-3/4 md:w-2/3 border border-gray-300 bg-white rounded overflow-hidden'>
                    <label htmlFor="search" className="sr-only">
                        Search blogs
                    </label>
                    <input role="search" aria-label="Search blogs"
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
            </section>

            <section aria-label="Blog posts"
                aria-live="polite"
                className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
                {loading ? (
                    <div className="col-span-full flex justify-center items-center min-h-[200px]">
                        <ClipLoader color="#00C2CB" size={35} />
                    </div>
                ) : blogs.length > 0 ? (
                    blogs.map((blog) =>
                        <BlogCard key={blog?._id} blog={blog} />
                    )
                ) : (
                    <p role="status" className='col-span-full text-center text-gray-500 text-lg'>
                        No blogs available in this category.
                    </p>
                )}
            </section>

            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </main>
    );
};

export default BlogCategories;
