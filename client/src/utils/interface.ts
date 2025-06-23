export interface BlogTableItemProps {
    blog: Blogs;
    fetchBlogs: () => Promise<void>;
    index: number;
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
