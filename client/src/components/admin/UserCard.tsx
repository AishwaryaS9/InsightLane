import { assets } from '../../assets/assets'

const roleColors: Record<string, string> = {
    admin: 'bg-purple-500',
    reader: 'bg-blue-500',
    author: 'bg-green-500',
};

const UserCard = ({ userInfo }: any) => {

    const roleColor = roleColors[userInfo.role?.toLowerCase()] || 'bg-primary';
    const formattedDate = new Date(userInfo.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className='user-card p-2'>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={userInfo.profilePicture || assets.defaultAvatar}
                        alt={`Avatar`}
                        className='w-12 h-12 rounded-full border-2 border-white'
                    />
                    <div className="space-y-2">
                        <p className="text-sm font-medium dark:text-gray-100">{userInfo?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{userInfo?.email}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Member Since: {formattedDate}</p>
                        <div className='items-center justify-center'>
                            <span className={`inline-block px-3 py-1 mt-2 text-[10px] text-white rounded-md capitalize ${roleColor}`}>
                                {userInfo.role || ''}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserCard


