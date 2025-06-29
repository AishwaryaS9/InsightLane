import toast from 'react-hot-toast';
import type { CommentTableItemProps } from '../../utils/interface';
import { SiTicktick } from "react-icons/si";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaTimesCircle } from "react-icons/fa";
import { approveComment, deleteComment, disApproveComment } from '../../api/blogApi';
import { useAppSelector } from '../../redux/store/hooks';
import AlertModal from '../AlertModal';
import { useState } from 'react';

const CommentTableItem: React.FC<CommentTableItemProps> = ({ comment, fetchComments }) => {
    const { blog, createdAt, _id } = comment;
    const BlogDate = new Date(createdAt);
    const userToken = useAppSelector((state) => state.login.token);

    const [showModal, setShowModal] = useState(false);

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

    const disapproveBlogComment = async () => {
        try {
            const data = await disApproveComment(userToken, _id);
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

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        setShowModal(false);
        deleteBlogComment();
    };

    const handleCancelDelete = () => {
        setShowModal(false);
    };

    return (
        <>
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
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-full border border-green-600">
                                    Approved
                                </span>
                                <button
                                    onClick={disapproveBlogComment}
                                    className="p-1 transition-all text-xs relative group"
                                    aria-label="Disapprove Comment"
                                >
                                    <FaTimesCircle className="w-5 h-5  text-yellow-500" />
                                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        Disapprove
                                    </span>
                                </button>
                            </div>
                        )}
                        <button
                            onClick={handleDeleteClick}
                            className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 shadow hover:shadow-md transition-all"
                            aria-label="Delete Comment"
                        >
                            <RiDeleteBin6Line className="w-5 h-5" />
                        </button>
                    </div>
                </td>
            </tr>
            {showModal && (
                <AlertModal
                    message="Are you sure you want to delete this comment?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </>
    );
};

export default CommentTableItem;
