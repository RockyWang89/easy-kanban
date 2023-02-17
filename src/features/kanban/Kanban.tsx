import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

function Kanban() {
    return (
        <div>
            <Navbar />
            <Outlet></Outlet>
        </div>
    );
}

export default Kanban;