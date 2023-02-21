import { useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectTaskById, updateTaskAction } from "./tasksSlice";
import { selectAllUsers } from "../user/usersSlice";
import { RootState } from "../../store/store";
import { formatDateString } from "../../modules/modules";
import { TaskI } from "../../modules/modules";

function EditTaskForm() {
    const navigate = useNavigate();
    const params = useParams();
    const taskId = params.taskId;
    if(!taskId) {
        navigate('/kanban');
    }
    const dispatch = useDispatch();
    const task: TaskI = useSelector((state: RootState)=>selectTaskById(state, taskId as string)) as TaskI;
    const userOptions = useSelector(selectAllUsers);

    //initialize states for form inputs
    const [title, setTitle] = useState(task.title);
    const [content, setContent] = useState(task.content);
    const [assignee, setAssignee] = useState(task.assignee);
    const [dueDate, setDueDate] = useState(task.dueDate);

    //setup the handlers for controlled input component
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value);
    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>)=>setContent(e.target.value);
    const handleAssigneeChange = (e: ChangeEvent<HTMLSelectElement>)=>setAssignee(e.target.value);
    const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>)=>setDueDate(e.target.value);

    //all field cannot be empty
    const isValid = title && content && assignee && dueDate;

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
        <div>
            <button onClick={()=>navigate(-1)}>Go Back</button>
            <form>
                <label htmlFor="title">Title</label>
                <input id="title" value={title} onChange={handleTitleChange}/>
                <label htmlFor="content">Content</label>
                <textarea id="content" value={content} onChange={handleContentChange}></textarea>
                <label htmlFor="assignee">Assignee</label>
                <select id="assignee" value={assignee} onChange={handleAssigneeChange}>
                    <option value="">-Please select an assignee-</option>
                    {userOptions.map(user => <option key={user.id} value={user.id}>{user.id} - {user.name}</option>)}
                </select>
                <label htmlFor="due-date">Due Date</label>
                <input type="date" id="due-date" value={dueDate} onChange={handleDueDateChange} min={formatDateString(new Date())}/>
                <button 
                    onClick={(e)=>{
                        e.preventDefault();
                        handleSubmit();
                    }}
                    disabled={!isValid}
                >Submit</button>
            </form>
        </div>
    )
}

export default EditTaskForm;