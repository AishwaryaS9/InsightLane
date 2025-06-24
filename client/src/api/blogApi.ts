import axios from "axios";
import api from "./endPoint";

export async function getAllBlogs() {
    const url = `${api.baseUrl}/blog/blogs`

    try {
        const response = await axios.get(url)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error)
    }
}

export async function getBlogById(id: string) {
    const url = `${api.baseUrl}/blog/blogs/${id}`

    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error)
    }
}

export async function getAllComments(token: string | null) {
    const url = `${api.baseUrl}/admin/all-comments`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error)
    }
}

export async function approveComment(token: string | null, id: string) {
    const url = `${api.baseUrl}/blog/blogs/approve-comment`;
    try {
        const response = await axios.post(url, {
            id: id
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error)
    }
}

export async function deleteComment(token: string | null, commentId: string) {
    const url = `${api.baseUrl}/blog/blogs/delete-comment`;
    try {
        const response = await axios.delete(url, {
            data: {
                id: commentId
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getBlogComment(token: string | null, blogId: string) {
    const url = `${api.baseUrl}/blog/blogs/allcomments`;
    try {
        const response = await axios.post(url, {

            blogId: blogId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.error(error);
    }
}

export async function addBlogComment(token: string | null, blogId: string, content: string) {
    const url = `${api.baseUrl}/blog/blogs/comments`;
    console.log('api trigg')
    try {
        const response = await axios.post(url, {
            blog: blogId,
            content: content
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("add comment api response", response.data)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.error(error);
    }
}

export async function addBlog(token: string | null, formData: FormData) {

    const url = `${api.baseUrl}/blog/addblog`;
    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        console.log("Add blog api response", response);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function generateAIContent(token: string | null, prompt: string) {
    const url = `${api.baseUrl}/blog/generate`;
    try {
        const response = await axios.post(url, {
            prompt
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.error(error);
    }
}

export async function publishBlog(token: string | null, id: string) {
    const url = `${api.baseUrl}/blog/blogs/toggle-publish`;
    try {
        const response = await axios.patch(url, {
            id: id
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error)
    }
}

export async function deleteBlogApi(token: string | null, id: string) {
    const url = `${api.baseUrl}/blog/blogs`;
    try {
        const response = await axios.delete(url, {
            data: {
                id: id
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error)
    }

}

export async function getBlogByAuthorId(token: string | null, authorId: string | null) {
    const url = `${api.baseUrl}/blog/author/${authorId}`
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error)
    }
}