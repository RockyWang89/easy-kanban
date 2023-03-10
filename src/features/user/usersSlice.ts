import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { UserI } from "../../modules/modules";

const usersAdapter = createEntityAdapter<UserI>();

const initialState = usersAdapter.getInitialState({
    currentUser: "",
    loginError: {
        type: "",
        msg: ""
    }
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        loginAction: (state, action) => {
            const targetId = action.payload.userId;
            //Give the type and msg seperately to show the exact error on login page
            if(!state.ids.includes(targetId)) {
                state.loginError.type = "userId"
                state.loginError.msg = "Invalid user id"
            } else if(state.entities[targetId]?.password !== action.payload.password) {
                state.loginError.type = "password"
                state.loginError.msg = "Password is incorrect"
            } else {
                state.currentUser = targetId;
            }
        },
        getUsersListAction: (state, action) => {
            usersAdapter.upsertMany(state, action.payload);
        },
        logoutAction: (state) => {
            state.currentUser = "";
            state.loginError.type = "";
            state.loginError.msg = "";
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