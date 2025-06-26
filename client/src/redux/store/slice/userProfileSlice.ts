import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export const initialState = {
    data: [],
};

export const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {
        userProfileDetails: (state: any, action: PayloadAction<{ data: [] }>) => {
            state.data = action.payload.data;
        },
        clearUserProfileDetails(state) {
            state.data = [];
        }

    }
})

export const { userProfileDetails, clearUserProfileDetails } = userProfileSlice.actions;

export default userProfileSlice.reducer;