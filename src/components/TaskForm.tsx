import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TaskFormPropsI, formatDateString } from "../modules/modules";
import { selectAllUsers } from "../features/user/usersSlice";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

//The form used in create and edit task pages
function TaskForm(props: TaskFormPropsI) {
    const navigate = useNavigate();
    const {title, content, assignee, dueDate} = props.taskInfo;
    const userOptions = useSelector(selectAllUsers);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>)=>props.setTitle(e.target.value);
    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>)=>props.setContent(e.target.value);
    const handleAssigneeChange = (e: SelectChangeEvent)=>props.setAssignee(e.target.value);
    const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>)=>props.setDueDate(e.target.value);

    //all the inputs are required
    const isValid = title && content && assignee && dueDate;

    return (
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
                    inputProps={{min: formatDateString(new Date())}}
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
                            props.handleSubmit();
                        }}
                        disabled={!isValid}
                    >Submit</Button>
                </div>
            </div>
        </form>
    );
}

export default TaskForm;