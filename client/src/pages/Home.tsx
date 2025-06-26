import toast from "react-hot-toast"
import BlogCategories from "../components/BlogCategories"
import Hero from "../components/Hero"
import { useAppDispatch, useAppSelector } from "../redux/store/hooks"
import { useEffect, useState } from "react"
import { getUserProfileById } from "../api/userApi"
import { userProfileDetails } from "../redux/store/slice/userProfileSlice"

const Home = () => {

    const [userProfile, setUserProfile] = useState(null);
    const dispatch = useAppDispatch();

    const userToken = useAppSelector((state) => state.login.token)
    const userId = useAppSelector((state) => state.login.userId) || ""


    const fetchUserProfile = async (userId: string) => {
        try {
            const data = await getUserProfileById(userId);
            if (data) {
                setUserProfile(data);
                dispatch(userProfileDetails({
                    data: data
                }))
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    useEffect(() => {
        if (userToken) {
            fetchUserProfile(userId)
        }
    }, [userId])

    return (
        <>
            <Hero />
            <BlogCategories />
        </>
    )
}

export default Home