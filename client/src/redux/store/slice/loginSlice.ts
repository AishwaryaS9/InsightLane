import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const initialState = {
    isLoggedIn: false,
    token: null,
    userId: null,
    role: null,
    isLoading: false,
    data: [],
    authToken: null,
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        userLogin: (state: any, action: PayloadAction<{ token: string; userId: string; role: string }>) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.role = action.payload.role;
        },
        clearLogin(state) {
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
            state.role = null;
            state.data = [];
        },
        authTokenDetails(state: any, action: PayloadAction<{ authToken: string }>) {
            state.authToken = action.payload.authToken;
        },
        clearAuthTokenDetails(state) {
            state.authToken = null;
        }

    }
})

export const { userLogin, clearLogin, authTokenDetails, clearAuthTokenDetails } = loginSlice.actions;

export default loginSlice.reducer;