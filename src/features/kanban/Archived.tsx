import { useSelector } from "react-redux";
import { selectTasksByStatus } from "./tasksSlice";
import TaskCard from "../../components/TaskCard";
import Empty from "../../components/Empty";
import { ARCHIVED, sortTasksByCreateDate, TaskI } from "../../modules/modules";
import { RootState } from "../../store/store";

function Archived() {
    const tasksList = useSelector((state: RootState)=>selectTasksByStatus(state, ARCHIVED));
    sortTasksByCreateDate(tasksList);

    return (
        <div>
            {
                tasksList.length > 0 ? tasksList.map((task: TaskI) => {
                    return <TaskCard task={task} class={ARCHIVED} key={task.id}/>
                }) : <Empty />
            }
        </div>
    )
}

export default Archived;