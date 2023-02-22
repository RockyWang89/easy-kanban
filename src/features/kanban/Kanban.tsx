import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Button } from "@mui/material";

function Kanban() {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className="operations-wrapper">
                <Button onClick={()=>navigate('/kanban/create-task')}>Add New Task</Button>
            </div>
            <Outlet></Outlet>
        </div>
    );
}

export default Kanban;