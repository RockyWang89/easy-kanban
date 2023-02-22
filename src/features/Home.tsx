import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser, selectUserById } from "./user/usersSlice";
import { RootState } from "../store/store";
import { logoutAction } from "./user/usersSlice";

import { Button } from "@mui/material";

function Home() {
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUser);
    const currentUserName = useSelector((state: RootState)=>selectUserById(state, currentUserId))?.name;

    function logout() {
        dispatch(logoutAction());
    }

    return (
        <div>
            <div className="header">
                <h1 className="logo">EasyKanban</h1>
                <div className="account-section">
                    <h3>Welcome, {currentUserName}</h3>
                    <Button onClick={logout}>Logout</Button>
                </div>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default Home;