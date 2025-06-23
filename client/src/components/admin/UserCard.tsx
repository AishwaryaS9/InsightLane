import { assets } from '../../assets/assets'

const UserCard = ({ userInfo }: any) => {
    console.log("user info", userInfo)
    return (
        <div className="text-sm text-gray-500 w-60 divide-y divide-gray-500/30 border border-gray-500/30 rounded bg-white">
            <div className="flex flex-col items-center justify-between py-8">
                <img className="h-24 w-24 rounded-full" src={userInfo.profilePicture || assets.defaultAvatar} alt="userImage1" />
                <h2 className="text-lg text-gray-800 mt-3">{userInfo.name}</h2>
                <p>{userInfo.role}</p>
                <p className="bg-green-500/20 px-2 py-0.5 rounded-full mt-2 text-xs text-green-600 border border-green-500/30">Admin</p>
            </div>
            <div className="flex items-center divide-x divide-gray-500/30">
                <button type="button" className="flex items-center justify-center gap-2 w-1/2 py-3">
                    <svg width={18} height={14} viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 2.5c0-.825-.675-1.5-1.5-1.5H3c-.825 0-1.5.675-1.5 1.5m15 0v9c0 .825-.675 1.5-1.5 1.5H3c-.825 0-1.5-.675-1.5-1.5v-9m15 0L9 7.75 1.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Send Email
                </button>
            </div>
        </div>
    )
}

export default UserCard