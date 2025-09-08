import { useEffect, useState } from 'react';
import UserCard from '../../components/admin/UserCard';
import { useAppSelector } from '../../redux/store/hooks';
import { assets } from '../../assets/assets';
import { getUserProfile } from '../../api/userApi';
import type { UserData, User } from '../../utils/interface';
import Pagination from '../../components/Pagination';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { analytics, logEvent } from "../../config/firebase";

const Users = () => {
    const userToken = useAppSelector((state) => state.login.token);
    const userId = useAppSelector((state) => state.login.userId);

    const [userData, setUserData] = useState<UserData | null>(null);
    const [userInfo, setUserInfo] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const getUserData = async () => {
        try {
            setLoading(true);
            const data = await getUserProfile(page, 8, search, userToken);
            if (data) {
                setUserData(data);
                setUserInfo(data.users);
                setTotalPages(data.totalPages || 1)
                setSearch(search);
                if (analytics) {
                    logEvent(analytics, "users_fetch_success", {
                        page,
                        search: search || "none",
                        total_users: data.totalUsers,
                        user_id: userId || null,
                    });
                }
            } else {
                toast.error(data.message);
                if (analytics) {
                    logEvent(analytics, "users_fetch_failed", {
                        reason: data.message,
                        page,
                        search: search || "none",
                        user_id: userId || null,
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            toast.error((error as Error).message);
            if (analytics) {
                logEvent(analytics, "users_fetch_error", {
                    message: (error as Error).message,
                    page,
                    search: search || "none",
                    user_id: userId || null,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserData();
    }, [page]);

    useEffect(() => {
        if (analytics) {
            logEvent(analytics, "page_view_users", {
                page_path: "/admin/users",
                page_title: "Users",
                user_id: userId || null,
            });
        }
    }, [userId]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            if (analytics) {
                logEvent(analytics, "users_pagination", {
                    from_page: page,
                    to_page: newPage,
                    user_id: userId || null,
                });
            }
        }
    };

    const handleUserDeleted = (deletedUserId: string) => {
        setUserInfo((prevUsers) => prevUsers.filter((user) => user._id !== deletedUserId));
        if (analytics) {
            logEvent(analytics, "user_deleted", {
                deleted_user_id: deletedUserId,
                by_user_id: userId || null,
            });
        }
    };


    return (
        <main className="w-full min-h-screen bg-blue-50/50 p-4 sm:p-6 flex flex-col">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6" aria-labelledby="user-stats-heading">
                <h2 id="user-stats-heading" className="sr-only">
                    User statistics
                </h2>
                {userData && (
                    [
                        { label: "Total Users", value: userData?.totalUsers, icon: assets.users },
                        { label: "Admin", value: userData?.totalAdmins, icon: assets.admin },
                        { label: "Authors", value: userData?.totalAuthors, icon: assets.author },
                        { label: "Readers", value: userData?.totalReaders, icon: assets.reader },
                    ].map(({ label, value, icon }, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-5 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                        >
                            <img src={icon} alt={`${label} icon`} className="w-6 h-6 sm:w-8 sm:h-8" />
                            <div>
                                <p className="text-xl sm:text-2xl font-semibold text-gray-700">{value}</p>
                                <p className="text-gray-500 text-xs sm:text-sm">{label}</p>
                            </div>
                        </div>
                    ))
                )}
            </section>

            <section className="p-4 sm:p-6 w-full max-w-7xl mx-auto" aria-labelledby="all-users-heading">
                <header className="flex items-center justify-between mb-4">
                    <h1 id="all-users-heading" className="text-lg sm:text-xl font-semibold text-gray-700">All Users</h1>
                </header>

                {loading ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <ClipLoader color="#00C2CB" size={35} />
                    </div>

                ) : userInfo.length === 0 ? (
                    <p className="text-center text-gray-600 text-base sm:text-lg" aria-live="polite">
                        No users found. Please check back later.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                        role="list">
                        {userInfo.map((user) => (
                            <UserCard key={user?._id} userInfo={user} onUserDeleted={handleUserDeleted} />
                        ))}
                    </div>
                )}
            </section>

            <nav className="my-10" aria-label="User list pagination">
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </nav>
        </main>
    );
};

export default Users;
