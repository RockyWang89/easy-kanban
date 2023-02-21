import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksReducer from '../features/kanban/tasksSlice';
import usersReducer from '../features/user/usersSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['tasks']
}

const usersPersistConfig = {
    key: 'users',
    storage,
    whitelist: ['currentUser']
}

const persistedUsersReducer = persistReducer(usersPersistConfig, usersReducer);

const rootReducer = combineReducers({
    tasks: tasksReducer,
    users: persistedUsersReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>