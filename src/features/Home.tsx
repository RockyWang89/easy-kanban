import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser, selectUserById } from "./user/usersSlice";
import { RootState } from "../store/store";
import { logoutAction } from "./user/usersSlice";

function Home() {
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUser);
    const currentUserName = useSelector((state: RootState)=>selectUserById(state, currentUserId))?.name;

    function logout() {
        dispatch(logoutAction());
    }

    return (
        <div>
            <h3>Welcome, {currentUserName}</h3>
            <button onClick={logout}>Logout</button>
            <Outlet></Outlet>
        </div>
    )
}

export default Home;