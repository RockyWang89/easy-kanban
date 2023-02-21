import { TODO, DOING, DONE, ARCHIVED } from "../modules/modules"
import { useSelector } from "react-redux";
import { selectUserById } from "../features/user/usersSlice";
import { TaskCardPropsI } from "../modules/modules";
import { RootState } from "../store/store";


function TaskCard(props: TaskCardPropsI) {
    const statusList = [TODO, DOING, DONE, ARCHIVED]
    const {title, content, owner, assignee} = props.task;
    const createDate = new Date(props.task.createDate).toLocaleDateString();
    const dueDate = new Date(props.task.dueDate).toLocaleDateString();
    const completedDate = props.class===DONE?new Date(props.task.completedDate).toLocaleDateString():"";
    const ownerName = useSelector((state: RootState) => selectUserById(state, owner))?.name;
    const assigneeName = useSelector((state: RootState) => selectUserById(state, assignee))?.name;

    return (
        <div>
            <h2>{title}</h2>
            <p>Created by {owner} on {createDate}</p>
            <p>Assigned to {assignee}, due on {dueDate}</p>
            {completedDate && <p>Completed on {completedDate}</p>}
            <p>{content}</p>
        </div>
    )
}

export default TaskCard;