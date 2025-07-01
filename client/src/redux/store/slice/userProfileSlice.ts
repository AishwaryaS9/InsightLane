import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../../utils/interface';

export const initialState: { data: User } = {
    data: {
        profilePicture: "",
        name: "",
        email: "",
        role: "",
        bio: "",
        socialLinks: {
            facebook: "",
            twitter: "",
            linkedin: ""
        },
        _id: '',
        createdAt: '',
        updatedAt: ''
    },
 
};


export const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {
        userProfileDetails: (state: any, action: PayloadAction<{ data: [] }>) => {
            state.data = action.payload.data;
        },
        clearUserProfileDetails(state) {
            state.data = initialState.data;
        }

    }
})

export const { userProfileDetails, clearUserProfileDetails } = userProfileSlice.actions;

export default userProfileSlice.reducer;