import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface UserI {
    id: string;
    name: string;
    password: string
}

const usersAdapter = createEntityAdapter<UserI>();

const initialState = usersAdapter.getInitialState({
    currentUser: "",
    loginError: ""
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        loginAction: (state, action) => {
            const targetId = action.payload.userId;
            if(!state.ids.includes(targetId)) {
                state.loginError = "Invalid user id"
            } else if(state.entities[targetId]?.password !== action.payload.password) {
                state.loginError = "Password is incorrect"
            } else {
                state.currentUser = targetId;
            }
        },
        getUsersListAction: (state, action) => {
            usersAdapter.upsertMany(state, action.payload);
        },
        logoutAction: (state) => {
            state.currentUser = "";
            state.loginError = "";
        }
    }
});

export const { loginAction, getUsersListAction, logoutAction } = usersSlice.actions;

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors((state: RootState) => state.users);

export const getCurrentUser = (state: RootState) => state.users.currentUser;
export const getLoginError = (state: RootState) => state.users.loginError;

export default usersSlice.reducer;