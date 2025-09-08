import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getAllComments } from '../../api/blogApi';
import { useAppSelector } from '../../redux/store/hooks';
import type { Comment } from '../../utils/interface';
import CommentTableItem from '../../components/admin/CommentTableItem';
import Pagination from '../../components/Pagination';
import { analytics, logEvent } from "../../config/firebase";

const Comments = () => {
    const [allComments, setAllComments] = useState<Comment[]>([]);
    const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
    const [filter, setFilter] = useState('Not Approved');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const userToken = useAppSelector((state) => state.login.token);
    const userId = useAppSelector((state) => state.login.userId);
    const userRole = useAppSelector((state) => state.login.role);

    const trackCommentsPageView = (userId: string | null, userRole: string | null) => {
        if (analytics) {
            logEvent(analytics, "comments_page_view", {
                user_id: userId,
                user_role: userRole,
            });
        }
    };

    const trackCommentsFilterChange = (
        filter: "Approved" | "Not Approved",
        userId: string | null,
        userRole: string | null
    ) => {
        if (analytics) {
            logEvent(analytics, "comments_filter_changed", {
                filter,
                user_id: userId,
                user_role: userRole,
            });
        }
    };

    const trackCommentsPageChange = (
        page: number,
        userId: string | null,
        userRole: string | null
    ) => {
        if (analytics) {
            logEvent(analytics, "comments_page_changed", {
                page,
                user_id: userId,
                user_role: userRole,
            });
        }
    };

    const trackCommentsFetchSuccess = (count: number, userId: string | null, userRole: string | null) => {
        if (analytics) {
            logEvent(analytics, "comments_fetch_success", {
                count,
                user_id: userId,
                user_role: userRole,
            });
        }
    };

    const trackCommentsFetchError = (errorMessage: string, userId: string | null, userRole: string | null) => {
        if (analytics) {
            logEvent(analytics, "comments_fetch_error", {
                error_message: errorMessage,
                user_id: userId,
                user_role: userRole,
            });
        }
    };

    const fetchComments = async () => {
        try {
            const data = await getAllComments(userToken, 1, 1000);
            if (data) {
                setAllComments(data.data.comments);
                trackCommentsFetchSuccess(data.data.comments.length, userId || null, userRole || null);
            } else {
                toast.error(data.message);
                trackCommentsFetchError(data.message, userId || null, userRole || null);
            }
        } catch (error) {
            const msg = (error as Error).message;
            toast.error(msg);
            trackCommentsFetchError(msg, userId || null, userRole || null);
        }
    };

    useEffect(() => {
        fetchComments();
        trackCommentsPageView(userId || null, userRole || null);
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
            trackCommentsPageChange(newPage, userId || null, userRole || null);
        }
    };

    return (
        <main id='main-content' role='main' className="flex-1 p-4 sm:p-6 md:p-10 bg-blue-50/50 min-h-screen">
            <header className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700">
                    Comments
                </h1>
                <nav className="flex gap-2 sm:gap-4" role="navigation"
                    aria-label="Filter comments">
                    <button aria-pressed={filter === 'Approved'}
                        onClick={() => {
                            setFilter('Approved');
                            setPage(1);
                            trackCommentsFilterChange("Approved", userId || null, userRole || null);
                        }}
                        className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-lg shadow-md transition-all cursor-pointer ${filter === 'Approved'
                            ? 'bg-blue-300 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Approved
                    </button>
                    <button aria-pressed={filter === 'Not Approved'}
                        onClick={() => {
                            setFilter('Not Approved');
                            setPage(1);
                            trackCommentsFilterChange("Not Approved", userId || null, userRole || null);
                        }}
                        className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-lg shadow-md transition-all cursor-pointer ${filter === 'Not Approved'
                            ? 'bg-blue-300 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Not Approved
                    </button>
                </nav>
            </header>

            <section aria-labelledby="comments-table-heading" className="relative bg-white shadow-md rounded-lg overflow-hidden">
                <h2 id="comments-table-heading" className="sr-only">
                    Comments List
                </h2>
                <table className="w-full text-sm sm:text-base text-left text-gray-500"
                    role="table"
                    aria-describedby="comments-table-heading">
                    <thead className="bg-gray-100 text-gray-600 text-xs sm:text-sm uppercase">
                        <tr role="row">
                            <th scope="col" className="px-4 sm:px-6 py-3">Blog Title & Comment</th>
                            <th scope="col" className="px-4 sm:px-6 py-3 hidden sm:table-cell">Date</th>
                            <th scope="col" className="px-4 sm:px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredComments.length === 0 ? (
                            <tr role='row'>
                                <td colSpan={3} className="text-center py-10 text-gray-500"
                                    role="cell">
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
            </section >

            {totalPages > 1 && (
                <nav className="my-15" role="navigation"
                    aria-label="Comments pagination">
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </nav>
            )}
        </main >
    );
};

export default Comments;
