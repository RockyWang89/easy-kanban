import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, selectAllUsers } from "../user/usersSlice";
import { addTaskAction } from "./tasksSlice";
import { formatDateString } from "../../modules/modules";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

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
    const handleAssigneeChange = (e: SelectChangeEvent)=>setAssignee(e.target.value);
    const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>)=>setDueDate(e.target.value);

    const isValid = title && content && assignee && dueDate;

    function handleSubmit() {
        dispatch(addTaskAction(title, content, owner, assignee, dueDate));
        navigate("/kanban")
    }

    return (
        <div className="task-form">
            <h2>Create Task</h2>
            <form>
                <div className="input-wrapper">
                    <TextField
                        value={title}
                        onChange={handleTitleChange}
                        fullWidth
                        label="Title"
                        required
                    />
                </div>
                <div className="input-wrapper">
                    <TextField
                        value={content}
                        onChange={handleContentChange}
                        multiline
                        fullWidth
                        required
                        rows={6}
                        label="Content"
                    />
                </div>
                <div className="input-wrapper">
                    <FormControl fullWidth>
                        <InputLabel id="assignee-label">Assignee</InputLabel>
                        <Select
                            value={assignee}
                            onChange={handleAssigneeChange}
                            labelId="assignee-label"
                            label="Assignee"
                            required
                        >
                            {userOptions.map(user => <MenuItem key={user.id} value={user.id}>{user.id} - {user.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <div className="input-wrapper">
                    <TextField
                        type="date"
                        value={dueDate}
                        onChange={handleDueDateChange}
                        required
                        label="Due Date"
                    />
                </div>
                <div className="btn-wrapper">
                    <div className="left-btn-wrapper">
                        <Button 
                            onClick={(e)=>{
                                e.preventDefault();
                                navigate(-1);
                            }}
                        >Cancel</Button>
                    </div>
                    <div className="right-btn-wrapper">
                        <Button 
                            onClick={(e)=>{
                                e.preventDefault();
                                handleSubmit();
                            }}
                            disabled={!isValid}
                        >Submit</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateTaskForm;