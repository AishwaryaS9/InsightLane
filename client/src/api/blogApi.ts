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
