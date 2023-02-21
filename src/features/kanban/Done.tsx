import { useSelector } from "react-redux";
import { selectTasksByStatus } from "./tasksSlice";
import TaskCard from "../../components/TaskCard";
import { DONE, sortTasksByDueDate, TaskI } from "../../modules/modules";
import { RootState } from "../../store/store";

function Done() {
    const tasksList = useSelector((state: RootState)=>selectTasksByStatus(state, DONE));
    sortTasksByDueDate(tasksList);

    return (
        <div>
            {tasksList.map((task: TaskI) => {
                return <TaskCard task={task} class={DONE} key={task.id}/>
            })}
        </div>
    )
}

export default Done;