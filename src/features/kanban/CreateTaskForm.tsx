import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, selectAllUsers } from "../user/usersSlice";
import { addTaskAction } from "./tasksSlice";
import { formatDateString } from "../../modules/modules";

function CreateTaskForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [assignee, setAssignee] = useState("");
    const [dueDate, setDueDate] = useState(formatDateString(new Date()));

    const userOptions = useSelector(selectAllUsers);
    const owner = useSelector(getCurrentUser);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value);
    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>)=>setContent(e.target.value);
    const handleAssigneeChange = (e: ChangeEvent<HTMLSelectElement>)=>setAssignee(e.target.value);
    const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>)=>setDueDate(e.target.value);

    const isValid = title && content && assignee && dueDate;

    function handleSubmit() {
        dispatch(addTaskAction(title, content, owner, assignee, dueDate));
        navigate("/kanban")
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
    );
}

export default CreateTaskForm;