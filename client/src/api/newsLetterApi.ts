import axios from "axios";
import api from "./endPoint";

export async function subscribeToNewsLetter(email: string) {
    const url = `${api.baseUrl}/newsletter/subscribe`;
    try {
        const response = await axios.post(
            url,
            { email },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 400) {
                return error.response.data;
            }
            throw new Error("An unexpected error occurred.");
        }
    }
}
