import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment';
import { addBlogComment, getBlogById, getBlogComment, getRelatedBlogs } from '../api/blogApi';
import toast from 'react-hot-toast';
import type { Blogs, Comment, RelatedBlogs, User } from '../utils/interface';
import { LiaComments } from 'react-icons/lia';
import { useAppSelector } from '../redux/store/hooks';
import { getUserProfileById } from '../api/userApi';
import { ClipLoader } from 'react-spinners';
import { useAnalytics } from "../hooks/useAnalytics";

const Blog = () => {
    const { id } = useParams();
    const location = useLocation();
    const { sendEvent, trackPageView } = useAnalytics();

    const [data, setData] = useState<Blogs | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [content, setContent] = useState('');
    const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlogs[]>([]);
    const [authorProfile, setAuthorProfile] = useState<User | null>(null);

    const userToken = useAppSelector((state) => state.login.token);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        trackPageView(location.pathname);
    }, [location.pathname]);


    useEffect(() => {
        if (data) {
            sendEvent("blog_view", {
                blog_id: data._id,
                blog_title: data.title,
                author: data.author.name,
            });
        }
    }, [data]);


    const fetchBlogData = async () => {
        if (!id) return;
        try {
            const blogData = await getBlogById(id)

            if (blogData) {
                setData(blogData.blog)
                fetchUserProfile(blogData.blog.author._id)
            } else {
                toast.error(blogData.message)
            }

        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    const fetchUserProfile = async (authorId: string) => {
        try {
            const response = await getUserProfileById(authorId);
            if (response) {
                setAuthorProfile(response);
            } else {
                toast.error(response.message)
            }

        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    const handleRelatedBlog = async (blogId: string) => {
        sendEvent("related_blog_click", {
            clicked_blog_id: blogId,
            current_blog_id: data?._id,
        });
        try {
            const blogData = await getBlogById(blogId);
            if (blogData) {
                setData(blogData.blog);

                fetchUserProfile(blogData.blog.author._id)

                const commentData = await getBlogComment(userToken, blogId);
                if (commentData) {
                    setComments(commentData.comments);
                }

                const relatedBlogsData = await getRelatedBlogs(blogId);
                if (relatedBlogsData) {
                    setRelatedBlogs(relatedBlogsData.relatedBlogs);
                } else {
                    toast.error('Unable to load related blogs.');
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
        if (!id) return;
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
        if (!id) return;
        e.preventDefault();
        if (!userToken) {
            toast.error('You are not logged in. Please log in to add a comment.');
            return;
        }
        try {
            const data = await addBlogComment(userToken, id, content)
            if (data) {
                sendEvent("comment_added", {
                    blog_id: id,
                    user_id: userToken ? "logged_in_user" : "guest",
                });
                toast.success(data.message)
                setContent('')
                fetchComments()
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    const fetchRelatedBlogs = async () => {
        if (!id) return;
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
        if (!id) {
            toast.error("Invalid blog ID.");
            return;
        }
        fetchBlogData();
        fetchComments();
        fetchRelatedBlogs();
    }, [id]);

    return data ? (
        <main className='relative' id="main-content" role="main" aria-label="Blog page">
            <img src={assets.gradientBackground} alt="Gradient Background Image"
                className='absolute -top-50 -z-1 opacity-50' aria-hidden="true" />
            <Navbar />

            <header className='text-center mt-20 text-gray-600'>
                <p className='text-teal py-6 font-normal' aria-label="Publication date">Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto
                text-gray-800'>{data.title}</h1>
                <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
                <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary' aria-label={`Written by ${data.author.name}`}>{data.author.name}</p>
            </header>

            <article className='mx-5 max-w-5xl md:mx-auto my-10 mt-6' aria-label="Blog content">
                <img src={data.image} alt={data.title || "Blog featured image"}
                    className='rounded-3xl mb-5' />
                <div dangerouslySetInnerHTML={{ __html: data.description }}
                    className='rich-text max-w-3xl mx-auto'>
                </div>

                {/* About the Author */}
                <section className='mt-8 mb-10 max-w-4xl mx-auto mr-4' aria-labelledby="author-info">
                    <div className="w-full max-w-5xl border-b border-gray-300 space-y-4 p-3 text-gray-500 text-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="flex items-center gap-1">
                                    <img className="h-16 w-16 mr-2 rounded-full" src={authorProfile?.profilePicture || assets.defaultAvatar}
                                        alt={`Profile picture of ${authorProfile?.name || "author"}`} />
                                    <div>
                                        <p id="author-info" className='leading-6'>About the Author</p>
                                        <p className="font-semibold text-gray-700 text-2xl">{authorProfile?.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className='leading-6'>{authorProfile?.bio}</p>
                    </div>
                </section>

                {/* Comments section */}
                <section className='mt-14 mb-10 max-w-3xl mx-auto' aria-labelledby="comments-section">
                    <h2 id="comments-section" className='font-semibold mb-4'>Comments ({comments.length})</h2>
                    <div className='flex flex-col gap-4'>
                        {comments.length > 0 && comments.map((item, index) => (
                            <div key={index} className='relative bg-primary/2 border border-primary/5 *:max-w-xl p-4 rounded text-gray-600'
                                role="article"
                                aria-label={`Comment by ${item.user.name}`}>
                                <div className='flex items-center gap-2 mb-2'>
                                    <LiaComments className='w-6 h-6' aria-hidden="true" />
                                    <p className='font-medium'>{item.user.name}</p>
                                </div>
                                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                                <time
                                    className="absolute right-4 bottom-3 flex items-center gap-2 text-xs"
                                    dateTime={item.createdAt}>
                                    {Moment(item.createdAt).fromNow()}
                                </time>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Add Comment Section */}
                <section className='max-w-3xl mx-auto' aria-labelledby="add-comment-section">
                    <h2 id="add-comment-section" className='font-semibold mb-4'>Add your comment</h2>
                    <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'
                        aria-label="Comment form">
                        <label htmlFor="comment" className="sr-only">
                            Write your comment
                        </label>
                        <textarea id="comment" onChange={(e) => setContent(e.target.value)} value={content}
                            placeholder='Comment' required
                            className='w-full p-2 border border-gray-300 rounded outline-none h-48'>
                        </textarea>
                        <button type='submit'
                            className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>
                    </form>
                </section>
            </article>

            {/* Related Blogs */}
            {relatedBlogs.length > 0 && (
                <aside
                    className="mx-5 max-w-5xl md:mx-auto my-10"
                    aria-labelledby="related-blogs"
                >
                    <h2 className="font-semibold mb-4 text-xl">Related Blogs</h2>

                    <div
                        className={`grid gap-4 ${relatedBlogs.length === 1
                            ? 'grid-cols-1'
                            : relatedBlogs.length === 2
                                ? 'grid-cols-1 sm:grid-cols-2'
                                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                            }`}
                    >
                        {relatedBlogs.map((blog, index) => (
                            <article
                                onClick={() => handleRelatedBlog(blog._id)}
                                role="link"
                                tabIndex={0}
                                aria-label={`Read related blog: ${blog.title}`}
                                key={index}
                                className="rounded-lg shadow-md overflow-hidden border border-gray-200 hover:scale-102 duration-300 cursor-pointer"
                            >
                                <img
                                    src={blog.image}
                                    alt={blog.title || 'Related blog image'}
                                    className="h-40 w-full object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-800">{blog.title}</h3>
                                    <p className="text-sm text-gray-600 mt-2">{blog.subTitle}</p>
                                    <time
                                        className="text-xs text-gray-400 mt-4 block"
                                        dateTime={blog.createdAt}
                                    >
                                        Published on {Moment(blog.createdAt).format('MMMM Do YYYY')}
                                    </time>
                                </div>
                            </article>
                        ))}
                    </div>
                </aside>
            )}

        </main >

    ) : (
        <main className="flex items-center justify-center w-full min-h-[80vh]" role="main" aria-busy="true" aria-label="Loading blog content">
            <ClipLoader color="#00C2CB" size={35} />
        </main>
    )

}

export default Blog


