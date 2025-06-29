export type SetAlertType = React.Dispatch<React.SetStateAction<{
    message: string;
    onConfirm: () => void;
} | null>>;

export interface BlogTableItemProps {
    blog: Blogs;
    fetchBlogs: () => Promise<void>;
    index: number;
    setAlert: React.Dispatch<React.SetStateAction<{
        message: string;
        onConfirm: () => void;
    } | null>>;
}

export interface Blogs {
    _id: string;
    title: string;
    subTitle: string;
    description: string;
    category: string;
    image: string;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Comment {
    user: {
        _id: string;
        name: string;
    }
    _id: string;
    blog: Blogs;
    content: string;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
}



export interface CommentTableItemProps {
    comment: Comment;
    fetchComments: () => Promise<void>;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    bio: string;
    profilePicture: null | string;
}

export interface UserData {
    totalAdmins: number;
    totalAuthors: number;
    totalReaders: number;
    totalUsers: number;
    currentPage: number;
    totalPages: number;
    users: User[];
}


