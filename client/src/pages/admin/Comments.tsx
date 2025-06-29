import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getAllComments } from '../../api/blogApi';
import { useAppSelector } from '../../redux/store/hooks';
import type { Comment } from '../../utils/interface';
import CommentTableItem from '../../components/admin/CommentTableItem';
import Pagination from '../../components/Pagination';

const Comments = () => {
    const [allComments, setAllComments] = useState<Comment[]>([]);
    const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
    const [filter, setFilter] = useState('Not Approved');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const userToken = useAppSelector((state) => state.login.token);

    const fetchComments = async () => {
        try {
            const data = await getAllComments(userToken, 1, 1000);
            if (data) {
                setAllComments(data.data.comments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    useEffect(() => {
        const filtered = allComments.filter((comment) =>
            filter === 'Approved' ? comment.isApproved : !comment.isApproved
        );

        const startIndex = (page - 1) * 5;
        const endIndex = startIndex + 5;
        setFilteredComments(filtered.slice(startIndex, endIndex));

        setTotalPages(Math.ceil(filtered.length / 5));
    }, [allComments, filter, page]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="flex-1 p-4 sm:p-6 md:p-10 bg-blue-50/50 min-h-screen">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700">
                    Comments
                </h1>
                <div className="flex gap-2 sm:gap-4">
                    <button
                        onClick={() => {
                            setFilter('Approved');
                            setPage(1);
                        }}
                        className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-lg shadow-md transition-all cursor-pointer ${filter === 'Approved'
                            ? 'bg-blue-300 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Approved
                    </button>
                    <button
                        onClick={() => {
                            setFilter('Not Approved');
                            setPage(1);
                        }}
                        className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-lg shadow-md transition-all cursor-pointer ${filter === 'Not Approved'
                            ? 'bg-blue-300 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Not Approved
                    </button>
                </div>
            </div>

            <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full text-sm sm:text-base text-left text-gray-500">
                    <thead className="bg-gray-100 text-gray-600 text-xs sm:text-sm uppercase">
                        <tr>
                            <th className="px-4 sm:px-6 py-3">Blog Title & Comment</th>
                            <th className="px-4 sm:px-6 py-3 hidden sm:table-cell">Date</th>
                            <th className="px-4 sm:px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredComments.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center py-10 text-gray-500">
                                    No comments found.
                                </td>
                            </tr>
                        ) : (
                            filteredComments.map((comment) => (
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

            {totalPages > 1 && (
                <div className="my-15">
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default Comments;
