import axios from "axios";
import api from "./endPoint";

export async function getDashboardData(token: string | null) {
    const url = `${api.baseUrl}/admin/dashboard`;
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

export async function getAuthorDashboardData(token: string | null) {
    const url = `${api.baseUrl}/blog/author/dashboard`;
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