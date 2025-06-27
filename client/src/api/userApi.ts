import axios from "axios";
import api from './endPoint';

export async function registerUser(name: string, email: string, password: string, role: string) {
    const url = `${api.baseUrl}/user/register`;
    console.log("API Endpoint:", url);

    try {
        const response = await axios.post(
            url,
            { name, email, password, role },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log("Response Data:", response.data);

        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Unexpected status code:", response.status);
            throw new Error("Unexpected response from the server.");
        }
    } catch (error: any) {
        console.error("Error during API call:", error);
        if (error.response) {
            console.error("Error Response Data:", error.response.data);
            console.error("Error Response Status:", error.response.status);
            console.error("Error Response Headers:", error.response.headers);

            throw new Error(error.response.data?.message || "Failed to register user.");
        } else if (error.request) {
            console.error("No response received:", error.request);
            throw new Error("No response from the server. Please try again later.");
        } else {
            console.error("Error Message:", error.message);
            throw new Error(error.message || "An unexpected error occurred.");
        }
    }
}

export async function loginUser(email: string, password: string) {
    const url = `${api.baseUrl}/user/login`;
    try {
        const response = await axios.post(url, {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Unexpected status code:", response.status);
            throw new Error("Unexpected response from the server.");
        }
    } catch (error: any) {
        console.error("Error during API call:", error);
        if (error.response) {
            console.error("Error Response Data:", error.response.data);
            console.error("Error Response Status:", error.response.status);
            console.error("Error Response Headers:", error.response.headers);

            throw new Error(error.response.data?.message || "Failed to login user.");
        } else if (error.request) {
            console.error("No response received:", error.request);
            throw new Error("No response from the server. Please try again later.");
        } else {
            console.error("Error Message:", error.message);
            throw new Error(error.message || "An unexpected error occurred.");
        }
    }
}

export async function getUserProfile(page: number = 1, limit: number = 5, search: string = '', token: string | null) {
    const url = `${api.baseUrl}/user/profile?search=${search}&page=${page}&limit=${limit}`
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.error(error)
    }
}


export async function getUserProfileById(id: string) {
    const url = `${api.baseUrl}/user/userprofile/${id}`
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.error(error)
    }
}


export async function updateUserProfile(token: string | null, formData: FormData) {
    const url = `${api.baseUrl}/user/profile`
    try {
        const response = await axios.put(url, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Profile update failed.');
        }
    } catch (error) {
        console.error(error)
        throw error;
    }
} 