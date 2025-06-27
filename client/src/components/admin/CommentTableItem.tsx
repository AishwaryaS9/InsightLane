import toast from 'react-hot-toast';
import type { CommentTableItemProps } from '../../utils/interface';
import { SiTicktick } from "react-icons/si";
import { RiDeleteBin6Line } from "react-icons/ri";
import { approveComment, deleteComment } from '../../api/blogApi';
import { useAppSelector } from '../../redux/store/hooks';

const CommentTableItem: React.FC<CommentTableItemProps> = ({ comment, fetchComments }) => {
    const { blog, createdAt, _id } = comment;
    const BlogDate = new Date(createdAt);
    const userToken = useAppSelector((state) => state.login.token);

    const acceptComment = async () => {
        try {
            const data = await approveComment(userToken, _id);
            if (data.success) {
                toast.success(data.message);
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const deleteBlogComment = async () => {
        try {
            const confirm = window.confirm('Are you sure you want to delete this comment?');
            if (!confirm) return;

            const data = await deleteComment(userToken, _id);
            if (data) {
                toast.success(data.message);
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <tr className="border-y border-gray-200 hover:bg-gray-50 transition-all">
            <td className="px-6 py-4 text-gray-700">
                <div className="flex flex-col">
                    <span className="font-medium text-gray-800">Blog: {blog.title}</span>
                    <span className="mt-2 text-sm">
                        <span className="font-medium text-gray-600">Name:</span> {comment.user.name}
                    </span>
                    <span className="text-sm">
                        <span className="font-medium text-gray-600">Comment:</span> {comment.content}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">
                {BlogDate.toLocaleDateString()}
            </td>
            <td className="px-6 py-4">
                <div className="flex gap-4 items-center justify-center">
                    {!comment.isApproved ? (
                        <button
                            onClick={acceptComment}
                            className="p-2 rounded-full bg-green-50 hover:bg-green-100 text-green-600 shadow hover:shadow-md transition-all"
                            aria-label="Approve Comment"
                        >
                            <SiTicktick className="w-5 h-5" />
                        </button>
                    ) : (
                        <span className="px-3 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-full border border-green-600">
                            Approved
                        </span>
                    )}
                    <button
                        onClick={deleteBlogComment}
                        className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 shadow hover:shadow-md transition-all"
                        aria-label="Delete Comment"
                    >
                        <RiDeleteBin6Line className="w-5 h-5" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default CommentTableItem;
