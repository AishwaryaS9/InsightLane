import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { getAllComments } from '../../api/blogApi';
import { useAppSelector } from '../../redux/store/hooks';
import type { Comment } from '../../utils/interface';
import CommentTableItem from '../../components/admin/CommentTableItem';


const Comments = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [filter, setFilter] = useState('Not Approved');

    const userToken = useAppSelector((state) => state.login.token);

    const fetchComments = async () => {
        try {
            const data = await getAllComments(userToken);
            if (data) {
                setComments(data.comments)
                fetchComments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
            <div className='flex justify-between items-center max-w-3xl'>
                <h1>Comments</h1>
                <div className='flex gap-4'>
                    <button onClick={() => setFilter('Approved')} className={`shadow-custom-sm border rounded-full px-4
                         py-1 cursor-pointer text-xs ${filter === 'Approved' ? 'text-primary' : 'text-gray-700'}`}>
                        Approved
                    </button>

                    <button onClick={() => setFilter('Not Approved')} className={`shadow-custom-sm border rounded-full px-4
                         py-1 cursor-pointer text-xs ${filter === 'Not Approved' ? 'text-primary' : 'text-gray-700'}`}>
                        Not Approved
                    </button>
                </div>
            </div>

            <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-gray-700 text-left uppercase'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>Blog Title & Comment</th>
                            <th scope='col' className='px-6 py-3 max-sm:hidden'>Date</th>
                            <th scope='col' className='px-6 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center py-15 text-gray-500">
                                    No comments available.
                                </td>
                            </tr>
                        ) : comments
                            .filter((comment) => {
                                if (filter === 'Approved') return comment.isApproved === true;
                                return comment.isApproved === false;
                            }).length === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center py-4 text-gray-500">
                                    No {filter.toLowerCase()} comments found.
                                </td>
                            </tr>
                        ) : (
                            comments
                                .filter((comment) => {
                                    if (filter === 'Approved') return comment.isApproved === true;
                                    return comment.isApproved === false;
                                })
                                .map((comment) => (
                                    <CommentTableItem
                                        key={comment._id}
                                        comment={comment}
                                        fetchComments={fetchComments}
                                    />
                                ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Comments