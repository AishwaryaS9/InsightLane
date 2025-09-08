import type React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Blogs } from '../utils/interface';
import { analytics, logEvent } from '../config/firebase';

const BlogCard: React.FC<{ blog: Blogs }> = ({ blog }) => {
    const { title, subTitle, category, image, _id, author, createdAt } = blog;

    const handleClick = () => {
        if (analytics) {
            logEvent(analytics, 'blog_description_click', {
                blog_id: _id,
                title,
                category,
                author: author.name,
            });
        }
        navigate(`/blog/${_id}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
        }
    };

    const navigate = useNavigate();
    return (

        <article aria-label={`Read blog post: ${title}`}
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className="w-full rounded-lg overflow-hidden shadow hover:scale-102 duration-300 cursor-pointer flex flex-col justify-between h-full"
        >
            <header>
                <img src={image} alt={title || "Blog thumbnail"} className="aspect-video" />
                <span aria-label={`Category: ${category}`}
                    className="ml-4 mt-3 px-2 py-0.5 inline-block bg-primary/20 rounded-full text-primary text-xs capitalize"
                >
                    {category}
                </span>
                <div className="p-4">
                    <h5 className="mb-1 font-medium text-gray-900 text-sm">{title}</h5>
                    <p className="mb-2 text-xs font-normal text-gray-600">
                        {subTitle}
                    </p>
                </div>
            </header>

            <footer className="flex justify-between items-center p-4 border-t border-gray-200 mt-auto">
                <div className="text-xs text-gray-600" aria-label={`Written by ${author.name}`}>
                    <span className="block font-normal">Written by</span>
                    <span className="block  font-medium">{author.name}</span>
                </div>
                <div className="text-xs text-gray-600 text-right" aria-label={`Posted on ${new Date(createdAt).toLocaleDateString()}`}>
                    <span className="block font-normal">Posted on</span>
                    <time
                        dateTime={new Date(createdAt).toISOString()}
                        className="block font-medium"
                    >
                        {new Date(createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </time>
                </div>
            </footer>
        </article>

    )
}

export default BlogCard