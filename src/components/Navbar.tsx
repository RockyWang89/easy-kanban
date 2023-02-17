import { NavLink } from "react-router-dom";

function Navbar() {

    return (
        <div>
            <ul>
                <li><NavLink to='/kanban/todo'>TO DO</NavLink></li>
                <li><NavLink to='/kanban/doing'>DOING</NavLink></li>
                <li><NavLink to='/kanban/done'>DONE</NavLink></li>
                <li><NavLink to='/kanban/archived'>ARCHIVED</NavLink></li>
            </ul>
        </div>
    )
}

export default Navbar;