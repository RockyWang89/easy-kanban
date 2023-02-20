import { useState, useEffect, ChangeEvent } from "react";
import { loginAction, getCurrentUser, getLoginError } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const currentUser = useSelector(getCurrentUser);
    const errorMsg = useSelector(getLoginError);

    useEffect(()=>{
        if(currentUser) {
            navigate('/kanban');
        }
    }, [currentUser]);

    function onUserIdChange(e: ChangeEvent<HTMLInputElement>) {
        setUserId(e.target.value);
    }

    function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    function login() {
        console.log(userId+', '+password);
        dispatch(loginAction({userId, password}));
    }

    function resetForm() {
        setUserId("");
        setPassword("");
    }

    return (
        <form>
            {errorMsg && <span>{errorMsg}</span>}
            <input type="text" value={userId} onChange={onUserIdChange}/>
            <input type="password" value={password} onChange={onPasswordChange}/>
            <button onClick={(e)=>{
                e.preventDefault();
                resetForm();
            }}>Reset</button>
            <button onClick={(e)=>{
                e.preventDefault();
                login();
            }}>Login</button>
        </form>
    )
}

export default Login;