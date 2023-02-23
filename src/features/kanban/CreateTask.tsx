import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../user/usersSlice";
import { addTaskAction } from "./tasksSlice";
import { formatDateString } from "../../modules/modules";
import TaskForm from "../../components/TaskForm";

function CreateTask() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [assignee, setAssignee] = useState("");
    const [dueDate, setDueDate] = useState(formatDateString(new Date()));

    const owner = useSelector(getCurrentUser);

    function handleSubmit() {
        dispatch(addTaskAction(title, content, owner, assignee, dueDate));
        navigate("/kanban")
    }

    return (
        <div className="task-form">
            <h2>Create Task</h2>
            <TaskForm
                taskInfo={{title, content, assignee, dueDate}}
                setTitle={setTitle}
                setContent={setContent}
                setAssignee={setAssignee}
                setDueDate={setDueDate}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default CreateTask;