import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const initialState = {
    token: null,
};

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        userRegistration: (state: any, action: PayloadAction<{ token: string; }>) => {
            state.token = action.payload.token;
        },
        clearRegisterUser(state) {
            state.token = null;
        },
    }
})

export const { userRegistration, clearRegisterUser } = registerSlice.actions;

export default registerSlice.reducer;