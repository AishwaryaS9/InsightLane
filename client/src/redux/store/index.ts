import { configureStore, combineReducers, type ThunkAction, type Action, } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from './slice/loginSlice';
import registerReducer from './slice/registerslice';
import userProfileReducer from "./slice/userProfileSlice";

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    userProfile: userProfileReducer
})


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['login', 'userProfile'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>