import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function Kanban() {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <button onClick={()=>navigate('/kanban/create-task')}>Add New Task</button>
            <Outlet></Outlet>
        </div>
    );
}

export default Kanban;