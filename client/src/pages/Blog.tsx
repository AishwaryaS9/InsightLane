import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment';
import { addBlogComment, getBlogById, getBlogComment, getRelatedBlogs } from '../api/blogApi';
import toast from 'react-hot-toast';
import type { Comment } from '../utils/interface';
import { LiaComments } from 'react-icons/lia';
import { useAppSelector } from '../redux/store/hooks';

const Blog = () => {
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [content, setContent] = useState('');
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    const userToken = useAppSelector((state) => state.login.token);
    const userProfileData = useAppSelector((state) => state.userProfile.data)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const fetchBlogData = async () => {
        try {
            const data = await getBlogById(id)

            if (data) {
                setData(data.blog)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    const handleRelatedBlog = async (blogId: string) => {
        try {
            const blogData = await getBlogById(blogId);
            if (blogData) {
                setData(blogData.blog);
                const commentData = await getBlogComment(userToken, blogId);
                if (commentData) {
                    setComments(commentData.comments);
                }
                scrollToTop();
            } else {
                toast.error('Unable to load the selected blog.');
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };


    const fetchComments = async () => {
        try {
            const data = await getBlogComment(userToken, id)
            if (data) {
                setComments(data.comments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userToken) {
            toast.error('You are not logged in. Please log in to add a comment.');
            return;
        }
        try {
            const data = await addBlogComment(userToken, id, content)
            if (data) {
                toast.success(data.message)
                setContent('')
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    const fetchRelatedBlogs = async () => {
        try {
            const data = await getRelatedBlogs(id);
            if (data) {
                setRelatedBlogs(data.relatedBlogs)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }


    useEffect(() => {
        fetchBlogData();
        fetchComments();
        fetchRelatedBlogs();
    }, [])

    return data ? (
        <div className='relative'>
            <img src={assets.gradientBackground} alt=""
                className='absolute -top-50 -z-1 opacity-50' />
            <Navbar />

            <div className='text-center mt-20 text-gray-600'>
                <p className='text-teal py-6 font-normal'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto
                text-gray-800'>{data.title}</h1>
                <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
                <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>{data.author.name}</p>
            </div>

            <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
                <img src={data.image} alt=""
                    className='rounded-3xl mb-5' />
                <div dangerouslySetInnerHTML={{ __html: data.description }}
                    className='rich-text max-w-3xl mx-auto'>
                </div>

                {/* About the Author */}

                <div className='mt-8 mb-10 max-w-4xl mx-auto mr-4'>
                    <div className="w-full max-w-5xl border-b border-gray-300 space-y-4 p-3 text-gray-500 text-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="flex items-center gap-1">
                                    <img className="h-16 w-16 mr-2 rounded-full" src={userProfileData?.profilePicture || assets.defaultAvatar} alt="author" />
                                    <div>
                                        <p className='leading-6'>About the Author</p>
                                        <p className="font-semibold text-gray-700 text-2xl">{userProfileData?.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className='leading-6'>{userProfileData?.bio}</p>
                    </div>
                </div>

                {/* Comments section */}
                <div className='mt-14 mb-10 max-w-3xl mx-auto'>
                    <p className='font-semibold mb-4'>Comments ({comments.length})</p>
                    <div className='flex flex-col gap-4'>

                        {comments.length > 0 && comments.map((item, index) => (
                            <div key={index} className='relative bg-primary/2 border border-primary/5 *:max-w-xl p-4 rounded text-gray-600'>
                                <div className='flex items-center gap-2 mb-2'>
                                    <LiaComments className='w-6 h-6' />
                                    <p className='font-medium'>{item.user.name}</p>
                                </div>
                                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Comment Section */}
                <div className='max-w-3xl mx-auto'>
                    <p className='font-semibold mb-4'>Add your comment</p>
                    <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
                        <textarea onChange={(e) => setContent(e.target.value)} value={content}
                            placeholder='Comment' required
                            className='w-full p-2 border border-gray-300 rounded outline-none h-48'>
                        </textarea>
                        <button type='submit'
                            className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>
                    </form>
                </div>
            </div>

            {/* Related Blogs */}
            {relatedBlogs.length > 0 && (
                <div className="mx-5 max-w-5xl md:mx-auto my-10 ">
                    <p className="font-semibold mb-4 text-xl">Related Blogs</p>
                    <div className={`grid gap-4 ${relatedBlogs.length === 1 ? 'grid-cols-1' : relatedBlogs.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                        {relatedBlogs.map((blog, index) => (
                            <div onClick={() => handleRelatedBlog(blog._id)}
                                key={index} className="rounded-lg shadow-md overflow-hidden border border-gray-200  hover:scale-102 duration-300 cursor-pointer">
                                <img src={blog.image} alt="" className="h-40 w-full object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-800">{blog.title}</h3>
                                    <p className="text-sm text-gray-600 mt-2">{blog.subTitle}</p>
                                    <div className="text-xs text-gray-400 mt-4">Published on {Moment(blog.createdAt).format('MMMM Do YYYY')}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}


        </div >

    ) : <p>Loading...</p>

}

export default Blog


