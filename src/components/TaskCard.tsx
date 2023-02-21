import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TODO, DOING, DONE, ARCHIVED } from "../modules/modules"
import { useSelector, useDispatch } from "react-redux";
import { changeStatusAction, deleteTaskAction } from "../features/kanban/tasksSlice";
import { selectUserById } from "../features/user/usersSlice";
import { TaskCardPropsI } from "../modules/modules";
import { RootState } from "../store/store";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


function TaskCard(props: TaskCardPropsI) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const statusList = [TODO, DOING, DONE, ARCHIVED];
    const {id, title, content, owner, assignee} = props.task;
    const createDate = new Date(props.task.createDate).toLocaleDateString();
    const dueDate = new Date(props.task.dueDate).toLocaleDateString();
    const completedDate = props.class===DONE?new Date(props.task.completedDate).toLocaleDateString():"";
    const ownerName = useSelector((state: RootState) => selectUserById(state, owner))?.name;
    const assigneeName = useSelector((state: RootState) => selectUserById(state, assignee))?.name;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openAlert, setOpenAlert] = useState(false);
    const openMenu = Boolean(anchorEl);
    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAlertClose = () => {
        setOpenAlert(false);
    }

    const handleAlertOpen = () => {
        setOpenAlert(true);
    }

    function moveTo(status: string) {
        dispatch(changeStatusAction({taskId:id, status}))
    }

    function goToEdit() {
        navigate(`/kanban/edit-task/${id}`)
    }

    function deleteTask() {
        dispatch(deleteTaskAction(id));
    }

    return (
        <div className="task-card">
            <div>
                <h2 className="task-card-span-1">{title}</h2>
                <div className="task-card-span-1 right-align action-btn">
                    <Button
                        id="basic-button"
                        aria-controls={openMenu ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                        onClick={handleMenuClick}
                    >
                        Actions
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleMenuClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        {statusList.filter(item => item !== props.class).map(item => <MenuItem id={item} onClick={()=>moveTo(item)}>{item===ARCHIVED?"Archive":item}</MenuItem>)}
                        <MenuItem onClick={goToEdit}>Edit</MenuItem>
                        <MenuItem onClick={handleAlertOpen}>Delete</MenuItem>
                    </Menu>
                    <Dialog
                        open={openAlert}
                        onClose={handleAlertClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Do you want to permanently delete the task?"}
                        </DialogTitle>
                        <DialogActions>
                        <Button onClick={handleAlertClose}>Cancel</Button>
                        <Button onClick={deleteTask} autoFocus>
                            Delete
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <div>
                <p className="task-card-span-1">Created by <span className="task-card-username">{ownerName}</span> on <span className="task-card-date">{createDate}</span></p>
                <div className="task-card-span-1">
                    <p className="task-card-span-1">Assigned to <span className="task-card-username">{assigneeName}</span></p>
                    <p className="task-card-span-1">due on <span className="task-card-date">{dueDate}</span></p>
                </div>
            </div>
            {completedDate && <p>Completed on <span className="task-card-date">{completedDate}</span></p>}
            <p className="task-card-content">{content}</p>
        </div>
    )
}

export default TaskCard;