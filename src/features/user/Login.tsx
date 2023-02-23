import { useState, useEffect, ChangeEvent } from "react";
import { loginAction, getCurrentUser, getLoginError } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import ErrorIcon from '@mui/icons-material/Error';

//login page
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const currentUser = useSelector(getCurrentUser);
    const error = useSelector(getLoginError);

    //if there's a valid current user in the state, go to the kanban page directly
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
        dispatch(loginAction({userId, password}));
    }

    function resetForm() {
        setUserId("");
        setPassword("");
    }

    return (
        <div className="login-wrapper">
            <h1>EasyKanban</h1>
            <form>
                <div>
                    <TextField
                        type="text"
                        label="User ID"
                        size="small"
                        margin="dense"
                        value={userId}
                        onChange={onUserIdChange}
                        autoFocus
                        error={error.type==="userId"}
                        helperText={error.type === "userId" && <span><ErrorIcon sx={{fontSize: "1.1em"}}/> {error.msg}</span>}
                    />
                </div>
                <div>
                    <TextField
                        type="password"
                        label="Password"
                        size="small"
                        margin="dense"
                        value={password}
                        onChange={onPasswordChange}
                        error={error.type==="password"}
                        helperText={error.type === "password" && <span><ErrorIcon sx={{fontSize: "1.1em"}}/> {error.msg}</span>}
                    />
                </div>
                <div className="login-btn-container">
                    <Button onClick={(e)=>{
                        e.preventDefault();
                        resetForm();
                    }}>Reset</Button>
                    <Button onClick={(e)=>{
                        e.preventDefault();
                        login();
                    }}>Login</Button>
                </div>
            </form>
        </div>
    )
}

export default Login;