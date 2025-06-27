import { IoCloseOutline } from "react-icons/io5";


const BlogModal = ({ blog, onViewClose }) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={onViewClose}
        >
            <div
                className="relative bg-white rounded-2xl shadow-lg w-full max-w-3xl h-[80vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onViewClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
                    title="Close"
                >

                    <IoCloseOutline className="w-6 h-6 text-white cursor-pointer" />
                </button>

                {/* Image Section */}
                <img
                    className="w-full h-48 object-cover rounded-t-2xl"
                    src={blog.image}
                    alt={blog.title}
                />

                {/* Content Section */}
                <div className="flex-grow overflow-y-auto p-6">
                    <div className="border-b border-b-gray-200 pb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {blog.title}
                        </h3>
                    </div>

                    <div className="mt-6 space-y-6">
                        <p className="text-gray-600 text-[14px] leading-6" dangerouslySetInnerHTML={{ __html: blog.description }}></p>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="border-t border-t-gray-200 p-4 flex justify-end">
                    <button
                        onClick={onViewClose}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogModal;
