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
            const data = await approveComment(userToken, _id)
            if (data.success) {
                toast.success(data.message)
                fetchComments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    const deleteBlogComment = async () => {
        try {
            const confirm = window.confirm('Are you sure you want to delete this comment?');
            if (!confirm) return;

            const data = await deleteComment(userToken, _id)
            if (data) {
                toast.success(data.message)
                fetchComments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    return (
        <tr className='order-y border-gray-300'>
            <td className='px-6 py-4'>
                <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
                <br />
                <br />
                <b className='font-medium text-gray-600'>Name</b> : {comment.user.name}
                <br />
                <b className='font-medium text-gray-600'>Comment</b> : {comment.content}
            </td>

            <td className='px-6 py-4 max-sm:hidden'>
                {BlogDate.toLocaleDateString()}
            </td>
            <td className='px-6 py-4'>
                <div className='inline-flex items-center gap-4'>
                    {!comment.isApproved ?
                        <SiTicktick
                            onClick={acceptComment}
                            className='w-5 hover:scale-110 transition-all
                        cursor-pointer text-green-600' />
                        : <p className='text-xs border border-green-600
                        bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>
                    }
                    <RiDeleteBin6Line className='w-5 hover:scale-110
                    transition-all cursor-pointer text-red-400'
                        onClick={deleteBlogComment}
                    />

                </div>
            </td>
        </tr>
    )
}

export default CommentTableItem