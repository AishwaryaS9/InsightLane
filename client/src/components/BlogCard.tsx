import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }: any) => {
    const { title, subTitle, category, image, _id, author, createdAt } = blog;

    const navigate = useNavigate();
    return (

        <div
            onClick={() => navigate(`/blog/${_id}`)}
            className="w-full rounded-lg overflow-hidden shadow hover:scale-102 duration-300 cursor-pointer flex flex-col justify-between h-full"
        >
            <div>
                <img src={image} alt="" className="aspect-video" />
                <span
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
            </div>
            <div className="flex justify-between items-center p-4 border-t border-gray-200 mt-auto">
                <div className="text-xs text-gray-600">
                    <span className="block font-normal">Written by</span>
                    <span className="block  font-medium">{author.name}</span>
                </div>
                <div className="text-xs text-gray-600 text-right">
                    <span className="block font-normal">Posted on</span>
                    <span className="block font-medium">
                        {new Date(createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </span>
                </div>
            </div>
        </div>

    )
}

export default BlogCard