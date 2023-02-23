import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TODO, DOING, DONE, ARCHIVED } from "../modules/modules"
import { useSelector, useDispatch } from "react-redux";
import { changeStatusAction, deleteTaskAction } from "../features/kanban/tasksSlice";
import { selectUserById } from "../features/user/usersSlice";
import { TaskCardPropsI, formatDateString } from "../modules/modules";
import { RootState } from "../store/store";

//material design components
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

//The TaskCard component is used for displaying the task items under task pages, such as todo, doing, done, archive.
function TaskCard(props: TaskCardPropsI) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const statusList = [TODO, DOING, DONE, ARCHIVED];  //the list is used for filter the current status class out and construct the action menu for task items
    const {id, title, content, owner, assignee} = props.task;
    const createDate = new Date(props.task.createDate).toLocaleDateString();
    const dueDate = new Date(props.task.dueDate).toLocaleDateString();
    const completedDate = props.class===DONE?new Date(props.task.completedDate).toLocaleDateString():"";
    const ownerName = useSelector((state: RootState) => selectUserById(state, owner))?.name;
    const assigneeName = useSelector((state: RootState) => selectUserById(state, assignee))?.name;

    //material design components essential states and functions
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
    };
    const handleAlertOpen = () => {
        setOpenAlert(true);
    };

    //change the status of task
    function moveTo(status: string) {
        dispatch(changeStatusAction({id, status}));
    };

    //go to edit specific task
    function goToEdit() {
        navigate(`/kanban/edit-task/${id}`);
    };

    //delete specific task
    function deleteTask() {
        dispatch(deleteTaskAction(id));
    };

    //compare the current date with task due date to see if the task is overdue
    function isOverDue(dDate: string): boolean {
        const today = formatDateString(new Date());
        return today.localeCompare(dDate)>0?true:false;
    }

    return (
        <div className="task-card" style={((props.class === TODO || props.class === DOING) && isOverDue(props.task.dueDate))?{backgroundColor: "#fa8a82"}:undefined}>
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
                        {/* create menu items: create the button for changing the current status to another, so filter the current one out first */}
                        {statusList.filter(item => item !== props.class).map(item => <MenuItem key={item} onClick={()=>moveTo(item)}>{item===ARCHIVED?"Archive":item}</MenuItem>)}
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
            {props.class===DONE && <p>Completed on <span className="task-card-date">{completedDate}</span></p>}
            <pre className="task-card-content">{content}</pre>
        </div>
    )
}

export default TaskCard;