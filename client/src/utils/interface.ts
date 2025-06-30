export type SetAlertType = React.Dispatch<React.SetStateAction<{
    message: string;
    onConfirm: () => void;
} | null>>;


export interface BlogTableItemProps {
    blog: Blogs;
    fetchBlogs: () => Promise<void>;
    index: number;
    setAlert?: React.Dispatch<React.SetStateAction<{
        message: string;
        onConfirm: () => void;
    } | null>>;
    onSelectBlog: (blog: Blogs) => void;
}

export interface BlogAuthorTableItemProps {
    blog: Blogs;
    fetchBlogs: () => Promise<void>;
    index: number;
    setAlert?: React.Dispatch<React.SetStateAction<{
        message: string;
        onConfirm: () => void;
    } | null>>;
}

export interface Author {
    email: string;
    name: string;
    role: string;
    _id: string;
}

export interface Blogs {
    _id: string;
    author: Author;
    title: string;
    subTitle: string;
    description: string;
    category: string;
    image: string;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    message: string;
    authorName: string;
}

export interface RelatedBlogs {
    _id: string;
    title: string;
    subTitle: string;
    description: string;
    category: string;
    image: string;
    author: string;
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
    socialLinks: {
        facebook: string;
        twitter: string;
        linkedin: string;
    };
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
    totalUsers: number;
    totalAdmins: number;
    totalAuthors: number;
    totalReaders: number;
    currentPage: number;
    totalPages: number;
    users: User[];
}

export interface UserProfileData {
    profilePicture: string;
    name: string;
    email: string;
    role: string;
    bio: string;
    facebook: string;
    twitter: string;
    linkedin: string;
}

export interface ProfilePhotoSelectorProps {
    image: File | string | null;
    setImage: (image: File | null) => void;
}


export interface DeleteUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
}