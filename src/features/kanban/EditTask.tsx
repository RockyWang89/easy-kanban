import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectTaskById, updateTaskAction } from "./tasksSlice";
import TaskForm from "../../components/TaskForm";
import { RootState } from "../../store/store";
import { TaskI } from "../../modules/modules";

function EditTask() {
    const navigate = useNavigate();
    const params = useParams();
    const taskId = params.taskId;
    if(!taskId) {
        navigate('/kanban');
    }
    const dispatch = useDispatch();
    const task: TaskI = useSelector((state: RootState)=>selectTaskById(state, taskId as string)) as TaskI;

    //initialize states for form inputs
    const [title, setTitle] = useState(task.title);
    const [content, setContent] = useState(task.content);
    const [assignee, setAssignee] = useState(task.assignee);
    const [dueDate, setDueDate] = useState(task.dueDate);

    function handleSubmit() {
        dispatch(updateTaskAction({
            id: taskId as string,
            changes: {
                title,
                content,
                assignee,
                dueDate
            }
        }));
        navigate(-1);
    }

    return (
        <div className="task-form">
            <h2>Edit Task</h2>
            <TaskForm
                taskInfo={{title, content, assignee, dueDate}}
                setTitle={setTitle}
                setContent={setContent}
                setAssignee={setAssignee}
                setDueDate={setDueDate}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default EditTask;