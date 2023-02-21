import { useSelector } from "react-redux";
import { selectTasksByStatus } from "./tasksSlice";
import TaskCard from "../../components/TaskCard";
import { ARCHIVED, sortTasksByDueDate, TaskI } from "../../modules/modules";
import { RootState } from "../../store/store";

function Archived() {
    const tasksList = useSelector((state: RootState)=>selectTasksByStatus(state, ARCHIVED));
    sortTasksByDueDate(tasksList);

    return (
        <div>
            {tasksList.map((task: TaskI) => {
                return <TaskCard task={task} class={ARCHIVED} key={task.id}/>
            })}
        </div>
    )
}

export default Archived;